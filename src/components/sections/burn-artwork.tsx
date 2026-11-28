"use client";

import { animate, type AnimationPlaybackControls } from "motion";
import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

import { ProjectArtwork } from "@/components/sections/project-artwork";
import type { ProjectSlug } from "@/content/projects";

type BurnDirection = "left-to-right" | "right-to-left";

type BurnArtworkProps = {
  activeSlug: ProjectSlug;
  slugs: readonly ProjectSlug[];
  shouldBurn: boolean;
  duration?: number;
  edgeColor?: string;
  noiseIntensity?: number;
  direction?: BurnDirection;
};

type BurnRuntime = {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.OrthographicCamera;
  geometry: THREE.PlaneGeometry;
  material: THREE.ShaderMaterial;
  textures: Map<ProjectSlug, THREE.Texture>;
  currentSlug: ProjectSlug;
  transientTexture?: THREE.CanvasTexture;
  animation?: AnimationPlaybackControls;
};

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;
  uniform sampler2D uFrom;
  uniform sampler2D uTo;
  uniform float uProgress;
  uniform float uAspect;
  uniform float uFromTextureAspect;
  uniform float uTextureAspect;
  uniform float uNoiseIntensity;
  uniform float uSeed;
  uniform vec2 uOrigin;
  uniform vec3 uEdgeColor;
  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float weight = 0.5;
    for (int i = 0; i < 4; i++) {
      value += weight * noise(p);
      p *= 2.08;
      weight *= 0.5;
    }
    return value;
  }

  vec2 coverUv(vec2 uv, float textureAspect) {
    if (uAspect > textureAspect) {
      float crop = textureAspect / uAspect;
      return vec2(uv.x, (uv.y - 0.5) * crop + 0.5);
    }
    float crop = uAspect / textureAspect;
    return vec2((uv.x - 0.5) * crop + 0.5, uv.y);
  }

  void main() {
    vec3 fromColor = texture2D(uFrom, coverUv(vUv, uFromTextureAspect)).rgb;
    vec3 toColor = texture2D(uTo, coverUv(vUv, uTextureAspect)).rgb;
    if (uProgress <= 0.001) { gl_FragColor = vec4(fromColor, 1.0); return; }
    if (uProgress >= 0.999) { gl_FragColor = vec4(toColor, 1.0); return; }

    vec2 space = vec2((vUv.x - uOrigin.x) * uAspect, vUv.y - uOrigin.y);
    float distanceToSpark = length(space);
    float maxReach = length(vec2(uAspect, 1.0)) + 0.15;
    float coarse = fbm(vUv * vec2(7.0 * uAspect, 7.0) + uSeed);
    float fine = noise(vUv * vec2(33.0 * uAspect, 33.0) - uSeed);
    float ragged = ((coarse - 0.5) * 0.22 + (fine - 0.5) * 0.035)
      * uNoiseIntensity * sin(3.14159265 * uProgress);
    float signedFront = distanceToSpark / maxReach + ragged - uProgress;
    float revealed = 1.0 - smoothstep(-0.012, 0.012, signedFront);
    vec3 color = mix(fromColor, toColor, revealed);

    float ember = (1.0 - smoothstep(0.0, 0.022, abs(signedFront)))
      * smoothstep(0.0, 0.035, uProgress) * (1.0 - smoothstep(0.96, 1.0, uProgress));
    float charRing = smoothstep(-0.038, -0.008, signedFront)
      * (1.0 - smoothstep(-0.008, 0.018, signedFront));
    color *= 1.0 - 0.48 * charRing;
    color = mix(color, uEdgeColor, ember * 0.82);
    float sparks = step(0.965, hash(floor(vUv * vec2(360.0 * uAspect, 360.0)) + uSeed))
      * (1.0 - smoothstep(0.005, 0.055, abs(signedFront)));
    color += uEdgeColor * sparks * 0.38;
    gl_FragColor = vec4(color, 1.0);
  }
`;

export function BurnArtwork({
  activeSlug,
  slugs,
  shouldBurn,
  duration = 1.12,
  edgeColor = "#D6A375",
  noiseIntensity = 1,
  direction = "left-to-right",
}: BurnArtworkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sourcesRef = useRef<HTMLDivElement>(null);
  const runtimeRef = useRef<BurnRuntime | null>(null);
  const activeSlugRef = useRef(activeSlug);
  const [ready, setReady] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    activeSlugRef.current = activeSlug;
  }, [activeSlug]);

  useEffect(() => {
    if (reducedMotion || !canvasRef.current || !sourcesRef.current) return;
    const canvas = canvasRef.current;
    const source = sourcesRef.current;
    let cancelled = false;
    let resizeObserver: ResizeObserver | undefined;
    let runtime: BurnRuntime | null = null;

    const handleContextLost = (event: Event) => {
      event.preventDefault();
      runtimeRef.current?.animation?.stop();
      setReady(false);
    };
    canvas.addEventListener("webglcontextlost", handleContextLost);

    async function initialize() {
      const textures = new Map<ProjectSlug, THREE.Texture>();
      try {
        const svgs = Array.from(source.querySelectorAll("svg"));
        for (let index = 0; index < slugs.length; index++) {
          const clone = svgs[index].cloneNode(true) as SVGSVGElement;
          clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
          clone.setAttribute("width", "1200");
          clone.setAttribute("height", "720");
          const url = URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(clone)], { type: "image/svg+xml" }));
          try {
            const texture = await new THREE.TextureLoader().loadAsync(url);
            texture.colorSpace = THREE.SRGBColorSpace;
            texture.minFilter = THREE.LinearFilter;
            textures.set(slugs[index], texture);
          } finally {
            URL.revokeObjectURL(url);
          }
        }
        if (cancelled) return;
        const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false, powerPreference: "low-power" });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
        const geometry = new THREE.PlaneGeometry(2, 2);
        const material = new THREE.ShaderMaterial({
          uniforms: {
            uFrom: { value: textures.get(activeSlugRef.current) },
            uTo: { value: textures.get(activeSlugRef.current) },
            uProgress: { value: 0 },
            uAspect: { value: 5 / 3 },
            uFromTextureAspect: { value: 5 / 3 },
            uTextureAspect: { value: 5 / 3 },
            uNoiseIntensity: { value: noiseIntensity },
            uSeed: { value: 1.37 },
            uOrigin: { value: new THREE.Vector2(direction === "left-to-right" ? 0.12 : 0.88, 0.5) },
            uEdgeColor: { value: new THREE.Color(edgeColor) },
          },
          vertexShader,
          fragmentShader,
        });
        scene.add(new THREE.Mesh(geometry, material));
        runtime = { renderer, scene, camera, geometry, material, textures, currentSlug: activeSlugRef.current };
        runtimeRef.current = runtime;
        const resize = () => {
          if (!canvas.parentElement) return;
          const { width, height } = canvas.parentElement.getBoundingClientRect();
          if (!width || !height) return;
          renderer.setSize(width, height, false);
          material.uniforms.uAspect.value = width / height;
          renderer.render(scene, camera);
        };
        resizeObserver = new ResizeObserver(resize);
        if (canvas.parentElement) resizeObserver.observe(canvas.parentElement);
        resize();
        setReady(true);
      } catch (error) {
        console.warn("Burn artwork unavailable; retaining static artwork.", error);
        setReady(false);
      } finally {
        if (cancelled || !runtime) textures.forEach((texture) => texture.dispose());
      }
    }

    void initialize();
    return () => {
      cancelled = true;
      resizeObserver?.disconnect();
      canvas.removeEventListener("webglcontextlost", handleContextLost);
      runtime?.animation?.stop();
      runtime?.transientTexture?.dispose();
      runtime?.textures.forEach((texture) => texture.dispose());
      runtime?.material.dispose();
      runtime?.geometry.dispose();
      runtime?.renderer.dispose();
      if (runtimeRef.current === runtime) runtimeRef.current = null;
    };
  }, [slugs, reducedMotion, direction, edgeColor, noiseIntensity]);

  useEffect(() => {
    const runtime = runtimeRef.current;
    if (!ready || !runtime || runtime.currentSlug === activeSlug) return;
    const nextTexture = runtime.textures.get(activeSlug);
    if (!nextTexture) return;
    const uniforms = runtime.material.uniforms;
    runtime.animation?.stop();
    let snapshotTexture: THREE.CanvasTexture | undefined;
    if (shouldBurn && uniforms.uProgress.value > 0 && uniforms.uProgress.value < 1) {
      runtime.renderer.render(runtime.scene, runtime.camera);
      const snapshot = document.createElement("canvas");
      snapshot.width = runtime.renderer.domElement.width;
      snapshot.height = runtime.renderer.domElement.height;
      const context = snapshot.getContext("2d");
      if (context) {
        context.drawImage(runtime.renderer.domElement, 0, 0);
        snapshotTexture = new THREE.CanvasTexture(snapshot);
        snapshotTexture.colorSpace = THREE.SRGBColorSpace;
      }
    }
    runtime.transientTexture?.dispose();
    runtime.transientTexture = snapshotTexture;
    if (!shouldBurn) {
      uniforms.uFrom.value = nextTexture;
      uniforms.uTo.value = nextTexture;
      uniforms.uFromTextureAspect.value = 5 / 3;
      uniforms.uProgress.value = 0;
      runtime.currentSlug = activeSlug;
      runtime.renderer.render(runtime.scene, runtime.camera);
      return;
    }

    uniforms.uFrom.value = runtime.transientTexture ?? runtime.textures.get(runtime.currentSlug);
    uniforms.uFromTextureAspect.value = runtime.transientTexture ? uniforms.uAspect.value : 5 / 3;
    uniforms.uTo.value = nextTexture;
    uniforms.uProgress.value = 0;
    uniforms.uSeed.value += 2.17;
    runtime.currentSlug = activeSlug;
    runtime.animation = animate(0, 1, {
      duration,
      ease: [0.55, 0.05, 0.25, 1],
      onUpdate: (progress) => {
        uniforms.uProgress.value = progress;
        runtime.renderer.render(runtime.scene, runtime.camera);
      },
      onComplete: () => {
        uniforms.uFrom.value = nextTexture;
        uniforms.uFromTextureAspect.value = 5 / 3;
        uniforms.uProgress.value = 0;
        runtime.renderer.render(runtime.scene, runtime.camera);
        runtime.transientTexture?.dispose();
        runtime.transientTexture = undefined;
      },
    });
  }, [activeSlug, duration, ready, shouldBurn]);

  return (
    <div className="burn-artwork">
      <ProjectArtwork slug={activeSlug} />
      <canvas ref={canvasRef} className="burn-artwork-canvas" data-ready={ready && !reducedMotion} aria-hidden="true" />
      <div ref={sourcesRef} hidden aria-hidden="true">
        {slugs.map((slug) => <ProjectArtwork slug={slug} key={slug} />)}
      </div>
    </div>
  );
}
