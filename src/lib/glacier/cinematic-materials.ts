import type { MeshStandardMaterial } from "three";

import type { MaterialRole } from "./character";
import { ramp } from "./cinematic-shot-plan";

type Uniform = { value: number };
type EffectUniforms = { holo: Uniform; dither: Uniform; phase: Uniform };

// Each real GLB material keeps its maps and normal detail. Named slots retain
// distinct metal/roughness responses instead of a flat armor replacement.
const armor: Record<string, { pigment: string; grade: number; metal: number; rough: number; env: number }> = {
  AI_White_A: { pigment: "vec3(0.095, 0.135, 0.165)", grade: 0.91, metal: 0.91, rough: 0.2, env: 1.15 },
  AI_White_B: { pigment: "vec3(0.14, 0.19, 0.22)", grade: 0.9, metal: 0.89, rough: 0.27, env: 1.05 },
  AI_White_C: { pigment: "vec3(0.055, 0.085, 0.11)", grade: 0.94, metal: 0.93, rough: 0.19, env: 1.3 },
  AI_Black_A: { pigment: "vec3(0.025, 0.035, 0.045)", grade: 0.65, metal: 0.79, rough: 0.34, env: 0.9 },
  AI_Black_B: { pigment: "vec3(0.045, 0.065, 0.08)", grade: 0.64, metal: 0.83, rough: 0.29, env: 0.95 },
  AI_Black_C: { pigment: "vec3(0.015, 0.025, 0.035)", grade: 0.68, metal: 0.8, rough: 0.39, env: 0.85 },
  AI_Gold: { pigment: "vec3(0.01, 0.37, 0.48)", grade: 0.96, metal: 0.85, rough: 0.21, env: 1.12 },
  MAT_Emissive_Limbs: { pigment: "vec3(0.0, 0.39, 0.53)", grade: 0.95, metal: 0.5, rough: 0.35, env: 0.75 },
};

export function createCinematicMaterials(slots: Map<MeshStandardMaterial, MaterialRole>) {
  const instances: EffectUniforms[] = [];
  const surfaces: { material: MeshStandardMaterial; role: MaterialRole; metal: number; rough: number; env: number }[] = [];
  for (const [material, role] of slots) {
    const settings = armor[material.name] ?? armor[role === "graphite" ? "AI_Black_A" : role === "gold" ? "AI_Gold" : role === "emissive" ? "MAT_Emissive_Limbs" : "AI_White_A"];
    material.metalness = settings.metal;
    material.roughness = settings.rough;
    material.envMapIntensity = settings.env;
    if (role === "emissive" || role === "gold") {
      material.emissive.set("#00D9FF");
      material.emissiveIntensity = role === "emissive" ? 2.7 : 0.38;
    }
    surfaces.push({ material, role, metal: settings.metal, rough: settings.rough, env: settings.env });
    const uniforms: EffectUniforms = { holo: { value: 0 }, dither: { value: 0 }, phase: { value: 0 } };
    instances.push(uniforms);
    const previousCompile = material.onBeforeCompile.bind(material);
    material.onBeforeCompile = (shader, renderer) => {
      previousCompile(shader, renderer);
      shader.uniforms.uHoloMix = uniforms.holo;
      shader.uniforms.uDitherMix = uniforms.dither;
      shader.uniforms.uCinematicPhase = uniforms.phase;
      shader.vertexShader = shader.vertexShader
        .replace("#include <common>", "#include <common>\nvarying vec3 vCinematicNormal;")
        .replace("#include <defaultnormal_vertex>", "#include <defaultnormal_vertex>\nvCinematicNormal = normalize(transformedNormal);");
      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <common>",
        `#include <common>
        uniform float uHoloMix;
        uniform float uDitherMix;
        uniform float uCinematicPhase;
        varying vec3 vCinematicNormal;
        float cinematicBayer(vec2 pixel) {
          vec2 p = mod(floor(pixel), 4.0);
          float x = p.x; float y = p.y;
          float row = 0.0;
          if (y < 1.0) row = x < 1.0 ? 0.0 : (x < 2.0 ? 8.0 : (x < 3.0 ? 2.0 : 10.0));
          else if (y < 2.0) row = x < 1.0 ? 12.0 : (x < 2.0 ? 4.0 : (x < 3.0 ? 14.0 : 6.0));
          else if (y < 3.0) row = x < 1.0 ? 3.0 : (x < 2.0 ? 11.0 : (x < 3.0 ? 1.0 : 9.0));
          else row = x < 1.0 ? 15.0 : (x < 2.0 ? 7.0 : (x < 3.0 ? 13.0 : 5.0));
          return row / 16.0;
        }`,
      );
      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <color_fragment>",
        `#include <color_fragment>
        float sourceLuma = dot(diffuseColor.rgb, vec3(0.2126, 0.7152, 0.0722));
        vec3 graphitePigment = ${settings.pigment} * (0.72 + sourceLuma * 0.82);
        diffuseColor.rgb = mix(diffuseColor.rgb, graphitePigment, ${settings.grade.toFixed(2)});
        float facing = 1.0 - abs(dot(normalize(vCinematicNormal), normalize(vViewPosition)));
        float fresnel = pow(clamp(facing, 0.0, 1.0), 1.6);
        float thinFilm = 16.0 * fresnel + 6.0 * normalize(vCinematicNormal).y +
          3.0 * normalize(vCinematicNormal).x + uCinematicPhase * 8.0;
        vec3 spectrum = vec3(
          0.41 + 0.45 * sin(thinFilm + 2.8),
          0.37 + 0.42 * sin(thinFilm + 0.55),
          0.55 + 0.40 * sin(thinFilm + 4.9)
        );
        spectrum = clamp(spectrum, vec3(0.015), vec3(1.0));
        float threshold = cinematicBayer(gl_FragCoord.xy);
        float ditherReveal = smoothstep(threshold - 0.2, threshold + 0.2, uHoloMix);
        diffuseColor.rgb = mix(diffuseColor.rgb, spectrum * (0.55 + sourceLuma * .6 + 0.65 * fresnel), ditherReveal * ${role === "graphite" ? "0.08" : role === "emissive" ? "0.43" : "0.86"});
        diffuseColor.rgb += ditherReveal * fresnel * vec3(0.09, 0.14, 0.20);
        diffuseColor.rgb = mix(diffuseColor.rgb, floor(diffuseColor.rgb * 23.0 + threshold) / 23.0, uDitherMix * 0.24);`,
      );
    };
    material.customProgramCacheKey = () => `glacial-cinematic-${material.name}-h27`;
    material.needsUpdate = true;
  }
  return {
    setProgress(progress: number) {
      const holo = ramp(progress, .13, .20) * (1 - ramp(progress, .38, .585)) + ramp(progress, .65, .68) * (1 - ramp(progress, .71, .735)) * .35;
      const dither = ramp(progress, .14, .21) * (1 - ramp(progress, .58, .74));
      for (const value of instances) {
        value.holo.value = holo;
        value.dither.value = dither;
        value.phase.value = progress;
      }
      for (const surface of surfaces) {
        surface.material.metalness = surface.metal;
        surface.material.roughness = surface.rough * (1 - 0.48 * holo);
        surface.material.envMapIntensity = surface.env * (1 + 0.8 * holo);
        if (surface.role === "emissive") surface.material.emissiveIntensity = .18 + ramp(progress, .125, .205) * 2.52;
      }
    },
  };
}
