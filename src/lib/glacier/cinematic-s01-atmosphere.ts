import { Color, Mesh, PlaneGeometry, Scene, ShaderMaterial, Vector2 } from "three";

export type S01AtmosphereVariant = "off" | "restrained" | "rich";

// H3.1.1-R4 — deterministic, screen-space atmosphere for the isolated S01
// review. The plane is rendered behind the character in the existing WebGL
// context; it never overlays the model or foreground identity typography.
export function createS01Atmosphere(scene: Scene, variant: Exclude<S01AtmosphereVariant, "off">) {
  const uniforms = {
    uResolution: { value: new Vector2(1, 1) },
    uPixelRatio: { value: 1 },
    uVariant: { value: variant === "rich" ? 1 : 0 },
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
      uniform float uVariant;
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
        field = mix(field, max(field, alternate * 0.9), uVariant * 0.82);

        // Preserve deliberate black breathing room around the central subject,
        // lower identity lockup, and future industrial stripe band.
        float sideEnergy = smoothstep(0.08, 0.68, abs(p.x) + 0.28 * abs(p.y));
        float centralQuiet = 1.0 - 0.24 * (1.0 - smoothstep(0.08, 0.46, length(p * vec2(0.85, 1.18))));
        float identityQuiet = 1.0 - 0.5 * smoothstep(0.55, 0.94, 1.0 - distance(uv, vec2(0.5, 0.08)));
        float stripeReserve = 1.0 - 0.16 * (1.0 - smoothstep(0.04, 0.22, abs(uv.y - 0.52)));
        float edgeFade = 1.0 - smoothstep(0.46, 0.9, length(p * vec2(0.82, 1.0)));
        float density = smoothstep(
          mix(0.39, 0.29, uVariant),
          mix(0.7, 0.61, uVariant),
          field
        );
        density *= mix(0.82, 1.0, sideEnergy) * centralQuiet * identityQuiet * stripeReserve;

        vec3 organic = mix(uOlive, uGreen, smoothstep(0.44, 0.8, broad));
        organic = mix(organic, uAcid, smoothstep(0.72, 0.91, field) * mix(0.18, 0.31, uVariant));
        float violetField = smoothstep(0.68, 0.87, secondary)
          * smoothstep(0.02, 0.55, uv.x)
          * mix(0.08, 0.2, uVariant);
        organic = mix(organic, uViolet, violetField);

        float diffuseField = density * mix(0.23, 0.39, uVariant) * edgeFade;
        vec3 color = mix(uBlack, organic, diffuseField);

        // Fine luminance-dependent halftone. The organic field selects the
        // clusters, so this never becomes a uniform decorative dot grid.
        vec2 cssPixel = gl_FragCoord.xy / max(uPixelRatio, 1.0);
        float cellSize = mix(6.4, 5.2, uVariant);
        vec2 cellId = floor(cssPixel / cellSize);
        vec2 cellUv = fract(cssPixel / cellSize) - 0.5;
        float cellNoise = hash21(cellId + vec2(17.0, 43.0));
        float cluster = smoothstep(mix(0.42, 0.3, uVariant), 0.9, density + (cellNoise - 0.5) * 0.16);
        float radius = mix(0.08, 0.32, clamp(density * 1.16, 0.0, 1.0));
        float dotShape = 1.0 - smoothstep(radius, radius + 0.075, length(cellUv));
        float missingCells = step(mix(0.2, 0.1, uVariant), cellNoise);
        float halftone = dotShape * cluster * missingCells * edgeFade;
        color = mix(color, organic, halftone * mix(0.46, 0.68, uVariant));

        // Sparse deterministic square micro-specks share this shader and this
        // draw call; no DOM nodes or continuously animated particle system.
        float speckCell = mix(15.0, 12.0, uVariant);
        vec2 speckId = floor(cssPixel / speckCell);
        vec2 speckUv = fract(cssPixel / speckCell);
        float speckNoise = hash21(speckId + vec2(91.7, 13.2));
        float speckGate = step(mix(0.986, 0.974, uVariant), speckNoise);
        float speckShape = step(speckUv.x, mix(0.09, 0.13, uVariant))
          * step(speckUv.y, mix(0.09, 0.13, uVariant));
        float speckMask = speckGate * speckShape * smoothstep(0.12, 0.58, density) * edgeFade;
        color = mix(color, mix(uAcid, uViolet, step(0.996, speckNoise)), speckMask * 0.72);

        float vignette = 1.0 - smoothstep(0.54, 0.88, length(p * vec2(0.76, 1.0)));
        color = mix(uBlack, color, 0.68 + 0.32 * vignette);
        gl_FragColor = vec4(max(color, uBlack), 1.0);
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
