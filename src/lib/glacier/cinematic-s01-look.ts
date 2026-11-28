import type { MeshStandardMaterial } from "three";

import type { MaterialRole } from "./character";

export type S01LookVariant = "neutral" | "cyan" | "balanced" | "contrast" | "spectral" | "acid" | "emerald" | "toxic";

type SurfaceProfile = {
  color: string;
  metalness: number;
  roughness: number;
  environment: number;
  emissive?: string;
  emissiveIntensity?: number;
};

export type S01LightingProfile = {
  environment: number;
  exposure: number;
  key: number;
  fill: number;
  rim: number;
  spectral: number;
};

const NEUTRAL: Record<MaterialRole, SurfaceProfile> = {
  silver: { color: "#70777A", metalness: .84, roughness: .29, environment: .92 },
  graphite: { color: "#262B2E", metalness: .72, roughness: .38, environment: .72 },
  gold: { color: "#70777A", metalness: .84, roughness: .29, environment: .92 },
  emissive: { color: "#5F686C", metalness: .5, roughness: .35, environment: .75 },
};

// The cyan profile is a fixed S01-framing comparison of the pre-R2 palette.
// It intentionally preserves the previous cold cyan pigment family.
const CYAN: Record<string, SurfaceProfile> = {
  AI_White_A: { color: "#182A35", metalness: .91, roughness: .2, environment: 1.15 },
  AI_White_B: { color: "#243843", metalness: .89, roughness: .27, environment: 1.05 },
  AI_White_C: { color: "#0E1B23", metalness: .93, roughness: .19, environment: 1.3 },
  AI_Black_A: { color: "#080E12", metalness: .79, roughness: .34, environment: .9 },
  AI_Black_B: { color: "#0C151B", metalness: .83, roughness: .29, environment: .95 },
  AI_Black_C: { color: "#05090C", metalness: .8, roughness: .39, environment: .85 },
  AI_Gold: { color: "#05A5D4", metalness: .85, roughness: .21, environment: 1.12, emissive: "#00D9FF", emissiveIntensity: .38 },
  MAT_Emissive_Limbs: { color: "#008DB4", metalness: .5, roughness: .35, environment: .75, emissive: "#00D9FF", emissiveIntensity: 2.7 },
};

const BALANCED: Record<string, SurfaceProfile> = {
  AI_White_A: { color: "#626A66", metalness: .88, roughness: .29, environment: 1.24 },
  AI_White_B: { color: "#4B524F", metalness: .84, roughness: .36, environment: 1.08 },
  AI_White_C: { color: "#767E79", metalness: .9, roughness: .25, environment: 1.34 },
  AI_Black_A: { color: "#080A08", metalness: .74, roughness: .43, environment: .72 },
  AI_Black_B: { color: "#101311", metalness: .78, roughness: .37, environment: .8 },
  AI_Black_C: { color: "#050705", metalness: .7, roughness: .48, environment: .64 },
  AI_Gold: { color: "#B6FF00", metalness: .76, roughness: .25, environment: 1.22, emissive: "#B6FF00", emissiveIntensity: .24 },
  MAT_Emissive_Limbs: { color: "#7EB000", metalness: .42, roughness: .31, environment: .82, emissive: "#B6FF00", emissiveIntensity: 1.45 },
};

const CONTRAST: Record<string, SurfaceProfile> = {
  AI_White_A: { color: "#515854", metalness: .9, roughness: .24, environment: 1.16 },
  AI_White_B: { color: "#3B413E", metalness: .86, roughness: .33, environment: 1 },
  AI_White_C: { color: "#69716C", metalness: .92, roughness: .2, environment: 1.4 },
  AI_Black_A: { color: "#050605", metalness: .7, roughness: .48, environment: .58 },
  AI_Black_B: { color: "#090B09", metalness: .75, roughness: .42, environment: .66 },
  AI_Black_C: { color: "#030403", metalness: .66, roughness: .54, environment: .5 },
  AI_Gold: { color: "#B6FF00", metalness: .72, roughness: .2, environment: 1.32, emissive: "#B6FF00", emissiveIntensity: .34 },
  MAT_Emissive_Limbs: { color: "#90C900", metalness: .35, roughness: .27, environment: .88, emissive: "#B6FF00", emissiveIntensity: 1.85 },
};

const SPECTRAL: Record<string, SurfaceProfile> = {
  AI_White_A: { color: "#656A66", metalness: .92, roughness: .2, environment: 1.42 },
  AI_White_B: { color: "#505552", metalness: .9, roughness: .27, environment: 1.32 },
  AI_White_C: { color: "#7B807B", metalness: .94, roughness: .18, environment: 1.55 },
  AI_Black_A: { color: "#090B09", metalness: .8, roughness: .36, environment: .82 },
  AI_Black_B: { color: "#111411", metalness: .84, roughness: .31, environment: .9 },
  AI_Black_C: { color: "#060706", metalness: .76, roughness: .41, environment: .74 },
  AI_Gold: { color: "#B6FF00", metalness: .82, roughness: .18, environment: 1.4, emissive: "#B6FF00", emissiveIntensity: .2 },
  MAT_Emissive_Limbs: { color: "#7EAA08", metalness: .5, roughness: .28, environment: .98, emissive: "#B6FF00", emissiveIntensity: 1.35 },
};

// H3.1.1-R3: green is carried by the major armor slots themselves. The
// brighter source multipliers compensate for the embedded base-color maps;
// the displayed result is still controlled by PBR light and reflection.
const ACID: Record<string, SurfaceProfile> = {
  AI_White_A: { color: "#4F9F31", metalness: .88, roughness: .27, environment: 1.34 },
  AI_White_B: { color: "#397724", metalness: .84, roughness: .34, environment: 1.18 },
  AI_White_C: { color: "#75BE3D", metalness: .91, roughness: .22, environment: 1.45 },
  AI_Black_A: { color: "#070A07", metalness: .76, roughness: .42, environment: .72 },
  AI_Black_B: { color: "#101610", metalness: .8, roughness: .36, environment: .82 },
  AI_Black_C: { color: "#040604", metalness: .72, roughness: .47, environment: .64 },
  AI_Gold: { color: "#B6FF00", metalness: .74, roughness: .22, environment: 1.32, emissive: "#B6FF00", emissiveIntensity: .3 },
  MAT_Emissive_Limbs: { color: "#8CC900", metalness: .4, roughness: .29, environment: .9, emissive: "#B6FF00", emissiveIntensity: 1.55 },
};

const EMERALD: Record<string, SurfaceProfile> = {
  AI_White_A: { color: "#16A46D", metalness: .92, roughness: .2, environment: 1.48 },
  AI_White_B: { color: "#0D7B51", metalness: .89, roughness: .27, environment: 1.3 },
  AI_White_C: { color: "#27C486", metalness: .94, roughness: .17, environment: 1.62 },
  AI_Black_A: { color: "#050806", metalness: .8, roughness: .38, environment: .78 },
  AI_Black_B: { color: "#0B130F", metalness: .84, roughness: .32, environment: .9 },
  AI_Black_C: { color: "#030504", metalness: .76, roughness: .43, environment: .7 },
  AI_Gold: { color: "#54FF92", metalness: .8, roughness: .18, environment: 1.46, emissive: "#66FF99", emissiveIntensity: .25 },
  MAT_Emissive_Limbs: { color: "#20C96B", metalness: .46, roughness: .25, environment: 1.02, emissive: "#66FF99", emissiveIntensity: 1.5 },
};

const TOXIC: Record<string, SurfaceProfile> = {
  AI_White_A: { color: "#83BD28", metalness: .86, roughness: .25, environment: 1.42 },
  AI_White_B: { color: "#5E8D1D", metalness: .82, roughness: .32, environment: 1.24 },
  AI_White_C: { color: "#A5DA35", metalness: .9, roughness: .2, environment: 1.55 },
  AI_Black_A: { color: "#101410", metalness: .78, roughness: .4, environment: .8 },
  AI_Black_B: { color: "#1A2118", metalness: .82, roughness: .34, environment: .9 },
  AI_Black_C: { color: "#090C09", metalness: .74, roughness: .45, environment: .72 },
  AI_Gold: { color: "#C8FF19", metalness: .72, roughness: .2, environment: 1.4, emissive: "#C8FF19", emissiveIntensity: .34 },
  MAT_Emissive_Limbs: { color: "#A8D612", metalness: .38, roughness: .27, environment: .96, emissive: "#C8FF19", emissiveIntensity: 1.72 },
};

const PROFILES: Record<Exclude<S01LookVariant, "neutral">, Record<string, SurfaceProfile>> = {
  cyan: CYAN,
  balanced: BALANCED,
  contrast: CONTRAST,
  spectral: SPECTRAL,
  acid: ACID,
  emerald: EMERALD,
  toxic: TOXIC,
};

const LIGHTING: Record<S01LookVariant, S01LightingProfile> = {
  neutral: { key: 3, fill: .8, rim: 1.9, environment: 1.1, spectral: 0, exposure: .9 },
  cyan: { key: 2.85, fill: .72, rim: 2.25, environment: 1.05, spectral: .2, exposure: .86 },
  balanced: { key: 3.4, fill: .7, rim: 2.1, environment: 1.2, spectral: .34, exposure: .91 },
  contrast: { key: 4.15, fill: .32, rim: 2.8, environment: 1.02, spectral: .22, exposure: .9 },
  spectral: { key: 3.2, fill: .58, rim: 3.8, environment: 1.48, spectral: .94, exposure: .92 },
  acid: { key: 3.55, fill: .92, rim: 1.65, environment: 1.32, spectral: .42, exposure: .92 },
  emerald: { key: 3.45, fill: .74, rim: 1.75, environment: 1.52, spectral: .5, exposure: .93 },
  toxic: { key: 3.75, fill: 1.05, rim: 2.15, environment: 1.4, spectral: .58, exposure: .94 },
};

function fallbackProfile(role: MaterialRole, variant: Exclude<S01LookVariant, "neutral">) {
  if (role === "graphite") return PROFILES[variant].AI_Black_A;
  if (role === "gold") return PROFILES[variant].AI_Gold;
  if (role === "emissive") return PROFILES[variant].MAT_Emissive_Limbs;
  return PROFILES[variant].AI_White_A;
}

export function applyS01Look(slots: Map<MeshStandardMaterial, MaterialRole>, variant: S01LookVariant) {
  for (const [material, role] of slots) {
    const profile = variant === "neutral"
      ? NEUTRAL[role]
      : PROFILES[variant][material.name] ?? fallbackProfile(role, variant);
    material.color.set(profile.color);
    material.metalness = profile.metalness;
    material.roughness = profile.roughness;
    material.envMapIntensity = profile.environment;
    material.emissive.set(profile.emissive ?? "#000000");
    material.emissiveIntensity = profile.emissiveIntensity ?? 0;
    material.needsUpdate = true;
  }
}

export function getS01LightingProfile(variant: S01LookVariant) {
  return LIGHTING[variant];
}
