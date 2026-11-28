import { Color, Mesh, PlaneGeometry, Scene, ShaderMaterial, Vector2 } from "three";

export type S01AtmosphereVariant = "off" | "restrained" | "rich" | "corrected" | "dense";

// H3.1.1-R4 — deterministic, screen-space atmosphere for the isolated S01
// review. The plane is rendered behind the character in the existing WebGL
// context; it never overlays the model or foreground identity typography.
export function createS01Atmosphere(scene: Scene, variant: Exclude<S01AtmosphereVariant, "off">) {
  const uniforms = {
    uResolution: { value: new Vector2(1, 1) },
    uPixelRatio: { value: 1 },
    uProfile: {
      value: variant === "restrained" ? 0
        : variant === "rich" ? 1
        : variant === "corrected" ? 2
        : 3,
    },
    uBlack: { value: new Color("#080A08") },
    uOlive: { value: new Color("#202B0D") },
    uGreen: { value: new Color("#587A10") },
    uAcid: { value: new Color("#B6FF00") },
    uViolet: { value: new Color("#963CFF") },
  };
  const geometry = new PlaneGeometry(2, 2);
  const material = new ShaderMaterial({
    uniforms,
    depthTest: false,
    depthWrite: false,
    toneMapped: false,
    vertexShader: `
      void main() {
        gl_Position = vec4(position.xy, 0.999, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec2 uResolution;
      uniform float uPixelRatio;
      uniform float uProfile;
      uniform vec3 uBlack;
      uniform vec3 uOlive;
      uniform vec3 uGreen;
      uniform vec3 uAcid;
      uniform vec3 uViolet;

      float hash21(vec2 p) {
        p = fract(p * vec2(123.34, 345.45));
        p += dot(p, p + 34.345);
        return fract(p.x * p.y);
      }

      float noise2(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        return mix(
          mix(hash21(i), hash21(i + vec2(1.0, 0.0)), f.x),
          mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0)), f.x),
          f.y
        );
      }

      float fbm(vec2 p) {
        float value = 0.0;
        float amplitude = 0.52;
        mat2 turn = mat2(0.82, -0.57, 0.57, 0.82);
        for (int i = 0; i < 5; i++) {
          value += amplitude * noise2(p);
          p = turn * p * 2.03 + vec2(7.13, 3.71);
          amplitude *= 0.5;
        }
        return value;
      }

      void main() {
        vec2 resolution = max(uResolution, vec2(1.0));
        vec2 uv = gl_FragCoord.xy / resolution;
        vec2 p = uv - 0.5;
        p.x *= resolution.x / resolution.y;

        vec2 warp = vec2(
          fbm(p * 1.18 + vec2(-1.9, 2.7)),
          fbm(p * 1.31 + vec2(4.2, -3.4))
        ) - 0.5;
        float broad = fbm(p * 1.52 + warp * 1.18 + vec2(1.7, -0.8));
        float secondary = fbm(p * 3.18 - warp * 0.64 + vec2(-4.6, 5.3));
        float fine = fbm(p * 7.4 + vec2(9.1, -2.8));
        float field = broad * 0.64 + secondary * 0.29 + fine * 0.07;
        float alternate = fbm(p * 1.28 - warp * 0.96 + vec2(-7.4, -2.1));
        float tertiary = fbm(p * 1.08 + warp.yx * 0.82 + vec2(5.6, 1.3));
        float crossing = fbm(p * 2.04 - warp.yx * 0.48 + vec2(-1.4, -6.7));
        float legacyRich = step(0.5, uProfile) * (1.0 - step(1.5, uProfile));
        float revised = step(1.5, uProfile);
        float denseProfile = step(2.5, uProfile);
        field = mix(field, max(field, alternate * 0.9), legacyRich * 0.82);
        float distributedField = max(field * 0.96, alternate * 0.8);
        distributedField = max(distributedField, mix(tertiary, crossing, 0.34) * mix(0.9, 1.03, denseProfile));
        field = mix(field, distributedField, revised);

        // Preserve deliberate black breathing room around the central subject,
        // lower identity lockup, and future industrial stripe band.
        float sideEnergy = smoothstep(0.08, 0.68, abs(p.x) + 0.28 * abs(p.y));
        float centralQuiet = mix(
          1.0 - 0.24 * (1.0 - smoothstep(0.08, 0.46, length(p * vec2(0.85, 1.18)))),
          1.0 - 0.13 * (1.0 - smoothstep(0.05, 0.42, length(p * vec2(0.86, 1.14)))),
          revised
        );
        float identityQuiet = mix(
          1.0 - 0.5 * smoothstep(0.55, 0.94, 1.0 - distance(uv, vec2(0.5, 0.08))),
          1.0 - 0.38 * smoothstep(0.5, 0.94, 1.0 - distance(uv, vec2(0.5, 0.08))),
          revised
        );
        float stripeReserve = mix(
          1.0 - 0.16 * (1.0 - smoothstep(0.04, 0.22, abs(uv.y - 0.52))),
          1.0 - 0.08 * (1.0 - smoothstep(0.035, 0.2, abs(uv.y - 0.52))),
          revised
        );
        float edgeFade = mix(
          1.0 - smoothstep(0.46, 0.9, length(p * vec2(0.82, 1.0))),
          1.0 - smoothstep(0.6, 1.02, length(p * vec2(0.78, 0.96))),
          revised
        );
        float legacyVariant = step(0.5, uProfile);
        float lowThreshold = mix(mix(0.39, 0.29, legacyVariant), mix(0.37, 0.26, denseProfile), revised);
        float highThreshold = mix(mix(0.7, 0.61, legacyVariant), mix(0.7, 0.55, denseProfile), revised);
        float density = smoothstep(lowThreshold, highThreshold, field);
        float sideWeight = mix(mix(0.82, 1.0, sideEnergy), mix(0.93, 1.0, sideEnergy), revised);
        density *= sideWeight * centralQuiet * identityQuiet * stripeReserve;

        vec3 organic = mix(uOlive, uGreen, smoothstep(mix(0.44, 0.39, revised), 0.8, broad));
        float acidWeight = mix(mix(0.18, 0.31, legacyVariant), mix(0.17, 0.25, denseProfile), revised);
        organic = mix(organic, uAcid, smoothstep(0.72, 0.91, field) * acidWeight);
        float violetWeight = mix(mix(0.08, 0.2, legacyVariant), mix(0.05, 0.075, denseProfile), revised);
        float violetField = smoothstep(0.7, 0.88, secondary)
          * smoothstep(0.02, 0.55, uv.x)
          * violetWeight;
        organic = mix(organic, uViolet, violetField);

        float diffuseStrength = mix(mix(0.23, 0.39, legacyVariant), mix(0.17, 0.26, denseProfile), revised);
        float diffuseField = density * diffuseStrength * edgeFade;
        vec3 color = mix(uBlack, organic, diffuseField);

        // Fine luminance-dependent halftone. The organic field selects the
        // clusters, so this never becomes a uniform decorative dot grid.
        vec2 cssPixel = gl_FragCoord.xy / max(uPixelRatio, 1.0);
        float cellSize = mix(mix(6.4, 5.2, legacyVariant), mix(5.0, 4.2, denseProfile), revised);
        vec2 cellId = floor(cssPixel / cellSize);
        vec2 cellUv = fract(cssPixel / cellSize) - 0.5;
        float cellNoise = hash21(cellId + vec2(17.0, 43.0));
        float clusterThreshold = mix(mix(0.42, 0.3, legacyVariant), mix(0.27, 0.13, denseProfile), revised);
        float cluster = smoothstep(clusterThreshold, 0.9, density + (cellNoise - 0.5) * 0.16);
        float radius = mix(0.08, 0.32, clamp(density * 1.16, 0.0, 1.0));
        float dotShape = 1.0 - smoothstep(radius, radius + 0.075, length(cellUv));
        float missingCells = step(mix(mix(0.2, 0.1, legacyVariant), mix(0.16, 0.1, denseProfile), revised), cellNoise);
        float halftone = dotShape * cluster * missingCells * edgeFade;
        float halftoneStrength = mix(mix(0.46, 0.68, legacyVariant), mix(0.43, 0.62, denseProfile), revised);
        color = mix(color, organic, halftone * halftoneStrength);

        // Sparse deterministic square micro-specks share this shader and this
        // draw call; no DOM nodes or continuously animated particle system.
        float speckCell = mix(mix(15.0, 12.0, legacyVariant), mix(15.0, 13.5, denseProfile), revised);
        vec2 speckId = floor(cssPixel / speckCell);
        vec2 speckUv = fract(cssPixel / speckCell);
        float speckNoise = hash21(speckId + vec2(91.7, 13.2));
        float speckGate = step(mix(mix(0.986, 0.974, legacyVariant), mix(0.994, 0.991, denseProfile), revised), speckNoise);
        float speckSize = mix(mix(0.09, 0.13, legacyVariant), mix(0.08, 0.095, denseProfile), revised);
        float speckShape = step(speckUv.x, speckSize) * step(speckUv.y, speckSize);
        float speckMask = speckGate * speckShape * smoothstep(0.12, 0.58, density) * edgeFade;
        color = mix(color, mix(uAcid, uViolet, step(0.996, speckNoise)), speckMask * 0.72);

        float vignette = 1.0 - smoothstep(0.54, 0.88, length(p * vec2(0.76, 1.0)));
        color = mix(uBlack, color, 0.68 + 0.32 * vignette);
        gl_FragColor = vec4(max(color, uBlack), 1.0);
        #include <colorspace_fragment>
      }
    `,
  });
  const plane = new Mesh(geometry, material);
  plane.frustumCulled = false;
  plane.renderOrder = -120;
  scene.add(plane);

  return {
    resize(width: number, height: number, pixelRatio: number) {
      uniforms.uResolution.value.set(width * pixelRatio, height * pixelRatio);
      uniforms.uPixelRatio.value = pixelRatio;
    },
    dispose() {
      scene.remove(plane);
      geometry.dispose();
      material.dispose();
    },
  };
}
