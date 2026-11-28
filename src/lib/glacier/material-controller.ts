import type { MeshStandardMaterial } from "three";

import type { MaterialRole } from "./character";

type Uniform = { value: number };
type MaterialUniforms = { glacier: Uniform; holo: Uniform; dither: Uniform; progress: Uniform };

const roleColor: Record<MaterialRole, string> = {
  silver: "vec3(0.56, 0.68, 0.72)",
  graphite: "vec3(0.055, 0.09, 0.11)",
  gold: "vec3(0.68, 0.42, 0.18)",
  emissive: "vec3(0.18, 0.48, 0.56)",
};

const bayerFunction = `
float glacierBayer4(vec2 pixel) {
  vec2 p = mod(floor(pixel), 4.0);
  float x = p.x; float y = p.y;
  float threshold = 0.0;
  if (y < 1.0) threshold = x < 1.0 ? 0.0 : (x < 2.0 ? 8.0 : (x < 3.0 ? 2.0 : 10.0));
  else if (y < 2.0) threshold = x < 1.0 ? 12.0 : (x < 2.0 ? 4.0 : (x < 3.0 ? 14.0 : 6.0));
  else if (y < 3.0) threshold = x < 1.0 ? 3.0 : (x < 2.0 ? 11.0 : (x < 3.0 ? 1.0 : 9.0));
  else threshold = x < 1.0 ? 15.0 : (x < 2.0 ? 7.0 : (x < 3.0 ? 13.0 : 5.0));
  return threshold / 16.0;
}`;

export function createMaterialController(slots: Map<MeshStandardMaterial, MaterialRole>) {
  const uniforms: MaterialUniforms[] = [];
  for (const [material, role] of slots) {
    const values: MaterialUniforms = {
      glacier: { value: 0 }, holo: { value: 0 }, dither: { value: 0 }, progress: { value: 0 },
    };
    uniforms.push(values);
    const previousCompile = material.onBeforeCompile.bind(material);
    material.onBeforeCompile = (shader, renderer) => {
      previousCompile(shader, renderer);
      shader.uniforms.uGlacier = values.glacier;
      shader.uniforms.uHolo = values.holo;
      shader.uniforms.uDither = values.dither;
      shader.uniforms.uGlacierProgress = values.progress;
      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <common>",
        `#include <common>\nuniform float uGlacier; uniform float uHolo; uniform float uDither; uniform float uGlacierProgress;\n${bayerFunction}`,
      );
      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <color_fragment>",
        `#include <color_fragment>
        float glacierThreshold = glacierBayer4(gl_FragCoord.xy);
        vec3 glacierTone = ${roleColor[role]};
        diffuseColor.rgb = mix(diffuseColor.rgb, mix(diffuseColor.rgb, glacierTone, ${role === "gold" ? "0.12" : "0.58"}), uGlacier);
        vec3 orderedTone = floor(diffuseColor.rgb * 9.0 + glacierThreshold) / 9.0;
        diffuseColor.rgb = mix(diffuseColor.rgb, orderedTone, uDither * 0.28);
        float scan = sin(gl_FragCoord.y * 0.065 + gl_FragCoord.x * 0.012 - uGlacierProgress * 21.0);
        diffuseColor.rgb += uHolo * (0.02 + 0.018 * scan) * vec3(0.18, 0.58, 0.72);`,
      );
    };
    material.customProgramCacheKey = () => `glacier-original-${role}`;
    material.needsUpdate = true;
  }
  return {
    setProgress(progress: number) {
      const rise = Math.max(0, Math.min(1, (progress - 0.48) / 0.1));
      const fall = 1 - Math.max(0, Math.min(1, (progress - 0.72) / 0.1));
      const transformation = rise * fall;
      for (const value of uniforms) {
        value.glacier.value = transformation;
        value.holo.value = transformation * Math.max(0, Math.min(1, (progress - 0.55) / 0.1));
        value.dither.value = transformation * 0.75;
        value.progress.value = progress;
      }
    },
  };
}
