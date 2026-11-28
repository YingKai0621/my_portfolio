// Asset-specific replacement boundary. Do not publish this provisional file without rights confirmation.
export const CHARACTER_MANIFEST = {
  url: "/assets/provisional/mecha-full.glb",
  height: 5,
  clips: ["power_on", "build", "descent", "idle"] as const,
  nodes: { head: ["Head_Jt", "Helmet_Jt"], hips: "Hips_Jt" },
} as const;

export type CharacterClip = (typeof CHARACTER_MANIFEST.clips)[number];
