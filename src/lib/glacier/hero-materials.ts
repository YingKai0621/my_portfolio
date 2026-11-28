import type { MeshStandardMaterial } from "three";

import type { MaterialRole } from "./character";

// Hero-only grade. The source maps continue to provide panel markings and roughness detail.
const grade: Record<MaterialRole, { tone: string; strength: number; metal: number; rough: number }> = {
  silver: { tone: "vec3(0.71, 0.78, 0.81)", strength: 0.87, metal: 0.77, rough: 0.44 },
  graphite: { tone: "vec3(0.10, 0.15, 0.18)", strength: 0.66, metal: 0.74, rough: 0.54 },
  gold: { tone: "vec3(0.17, 0.44, 0.52)", strength: 0.98, metal: 0.8, rough: 0.4 },
  emissive: { tone: "vec3(0.06, 0.42, 0.54)", strength: 1, metal: 0.28, rough: 0.45 },
};

const armorPanels: Record<string, (typeof grade)[MaterialRole]> = {
  AI_White_A: { tone: "vec3(0.42, 0.5, 0.54)", strength: 0.94, metal: 0.77, rough: 0.48 },
  AI_White_B: { tone: "vec3(0.3, 0.39, 0.43)", strength: 0.94, metal: 0.8, rough: 0.45 },
  AI_White_C: { tone: "vec3(0.13, 0.21, 0.25)", strength: 0.98, metal: 0.83, rough: 0.43 },
};

export function applyHeroMaterialGrade(slots: Map<MeshStandardMaterial, MaterialRole>) {
  for (const [material, role] of slots) {
    const settings = armorPanels[material.name] ?? grade[role];
    // Preserve embedded base-color and metallic-roughness maps; adjust their response, not the geometry.
    material.metalness = settings.metal;
    material.roughness = settings.rough;
    material.envMapIntensity = role === "silver" ? 1.5 : 1.8;
    if (role === "emissive") {
      material.emissive.set("#1BA6CD");
      material.emissiveIntensity = 1.55;
    } else if (role === "gold") {
      material.emissive.set("#1BA6CD");
      material.emissiveIntensity = 0.22;
    }

    const previousCompile = material.onBeforeCompile.bind(material);
    material.onBeforeCompile = (shader, renderer) => {
      previousCompile(shader, renderer);
      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <color_fragment>",
        `#include <color_fragment>
        float heroLuminance = dot(diffuseColor.rgb, vec3(0.2126, 0.7152, 0.0722));
        vec3 heroPigment = ${settings.tone} * (0.72 + heroLuminance * 0.92);
        diffuseColor.rgb = mix(diffuseColor.rgb, heroPigment, ${settings.strength.toFixed(2)});
        // GLACIAL_HERO_GRADE_END`,
      );
    };
    material.customProgramCacheKey = () => `glacial-hero-grade-${role}-1`;
    material.needsUpdate = true;
  }
}
