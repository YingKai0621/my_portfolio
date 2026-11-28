import { Mesh, PlaneGeometry, Scene, ShaderMaterial, Vector2 } from "three";

import { ramp } from "./cinematic-shot-plan";

// Original screen-space field. It is sampled from the same absolute scroll
// coordinate as the character, so reverse scrolling reproduces the same image.
export function createCinematicBackdrop(scene: Scene) {
  const uniforms = {
    uProgress: { value: 0 },
    uEnergy: { value: 0 },
    uResolution: { value: new Vector2(1, 1) },
  };
  const geometry = new PlaneGeometry(2, 2);
  const material = new ShaderMaterial({
    uniforms,
    depthTest: false,
    depthWrite: false,
    toneMapped: false,
    vertexShader: `void main() { gl_Position = vec4(position.xy, 0.999, 1.0); }`,
    fragmentShader: `
      uniform float uProgress;
      uniform float uEnergy;
      uniform vec2 uResolution;
      float hash21(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
      float noise2(vec2 p) {
        vec2 i = floor(p), f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        return mix(mix(hash21(i), hash21(i + vec2(1., 0.)), f.x),
                   mix(hash21(i + vec2(0., 1.)), hash21(i + vec2(1., 1.)), f.x), f.y);
      }
      float bayer4(vec2 pixel) {
        vec2 p = mod(floor(pixel), 4.0);
        float x = p.x, y = p.y;
        float row;
        if (y < 1.) row = x < 1. ? 0. : (x < 2. ? 8. : (x < 3. ? 2. : 10.));
        else if (y < 2.) row = x < 1. ? 12. : (x < 2. ? 4. : (x < 3. ? 14. : 6.));
        else if (y < 3.) row = x < 1. ? 3. : (x < 2. ? 11. : (x < 3. ? 1. : 9.));
        else row = x < 1. ? 15. : (x < 2. ? 7. : (x < 3. ? 13. : 5.));
        return row / 16.;
      }
      void main() {
        vec2 uv = gl_FragCoord.xy / max(uResolution, vec2(1.));
        vec2 p = (uv - .5) * vec2(uResolution.x / uResolution.y, 1.);
        float phase = uProgress * 2.8;
        vec2 warp = vec2(noise2(p * 2.5 + phase * .37), noise2(p * 2.5 - phase * .26 + 17.));
        vec2 q = p * 1.55 + (warp - .5) * .82;
        float field = noise2(q * 2.2 + vec2(phase * .34, -phase * .19));
        float field2 = noise2(q * 3.1 - vec2(phase * .15, phase * .27));
        float lobe = smoothstep(.44, .72, field * .68 + field2 * .32);
        vec3 cyan = vec3(.00, .72, .91);
        vec3 violet = vec3(.34, .25, .86);
        vec3 pink = vec3(.89, .20, .48);
        vec3 green = vec3(.03, .54, .48);
        vec3 spectral = mix(cyan, violet, smoothstep(.37, .72, field));
        spectral = mix(spectral, pink, smoothstep(.61, .84, field2) * .68);
        spectral = mix(spectral, green, smoothstep(.14, .32, field2) * .35);
        float darkness = lobe * .32;
        vec3 base = vec3(.006, .010, .014);
        vec3 color = spectral * uEnergy * darkness;
        float edge = smoothstep(.22, .95, length(p));
        color *= 1. - edge * .52;
        float threshold = bayer4(gl_FragCoord.xy / 1.5);
        color = floor(color * 30. + threshold) / 30.;
        gl_FragColor = vec4(base + max(color, vec3(0.)), 1.);
      }
    `,
  });
  const plane = new Mesh(geometry, material);
  plane.frustumCulled = false;
  plane.renderOrder = -100;
  scene.add(plane);
  return {
    setProgress(progress: number) {
      uniforms.uProgress.value = progress;
      uniforms.uEnergy.value = ramp(progress, .13, .23) * (1 - ramp(progress, .60, .78)) * 1.2 + ramp(progress, .50, .60) * .22;
    },
    resize(width: number, height: number, pixelRatio: number) {
      uniforms.uResolution.value.set(width * pixelRatio, height * pixelRatio);
    },
    dispose() { scene.remove(plane); geometry.dispose(); material.dispose(); },
  };
}
