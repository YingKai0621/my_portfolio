import { Vector3 } from "three";

export type Shot = { position: Vector3; target: Vector3; fov: number; key: number; rim: number };

// Positions are in normalized character-height units (the adapter maps every asset to 5 units).
export const SHOTS: readonly Shot[] = [
  { position: new Vector3(0.65, 4.35, 2.4), target: new Vector3(-0.58, 4.32, 0), fov: 32, key: 1.35, rim: 3.4 },
  { position: new Vector3(-3.55, 3.6, 5.6), target: new Vector3(0.78, 3.2, 0), fov: 34, key: 2.45, rim: 2.2 },
  { position: new Vector3(3.6, 2.85, 6.2), target: new Vector3(-0.66, 2.8, 0), fov: 36, key: 2.15, rim: 4.1 },
  { position: new Vector3(0.9, 2.55, 10), target: new Vector3(-0.46, 2.55, 0), fov: 35, key: 2.2, rim: 2.1 },
];

export function shotAt(progress: number) {
  const scene = Math.min(3, Math.floor(Math.min(progress, 0.99999) * 4));
  const local = Math.max(0, Math.min(1, progress * 4 - scene));
  return { scene, local };
}

export function eased(t: number) { return t * t * (3 - 2 * t); }
