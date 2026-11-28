import { Vector3 } from "three";

export type CinematicShot = {
  at: number;
  moveFrom: number;
  transition: "smooth" | "hold" | "cut";
  position: Vector3;
  target: Vector3;
  fov: number;
  key: number;
  fill: number;
  rim: number;
  environment: number;
};

// H2.9.1: hold the elevated full-body composition, then cut directly to the
// left-weighted helmet/shoulder close-up. The character never turns for it.
export const HARD_CUT_PROGRESS = .44;
export const CINEMATIC_SHOTS: readonly CinematicShot[] = [
  { at: 0, moveFrom: 0, transition: "hold", position: new Vector3(1.5, 4.12, 2.55), target: new Vector3(-1.13, 4.43, 0), fov: 31, key: 3.45, fill: 0.16, rim: 4.2, environment: 1.1 },
  { at: .095, moveFrom: .065, transition: "smooth", position: new Vector3(2.45, 2.45, 3.65), target: new Vector3(-.3, 3.85, 0), fov: 31, key: 3.2, fill: .12, rim: 4.9, environment: 1.2 },
  { at: .175, moveFrom: .12, transition: "smooth", position: new Vector3(1.7, 2.8, 8.6), target: new Vector3(0, 2.9, 0), fov: 33, key: 3.5, fill: .3, rim: 4.8, environment: 1.7 },
  { at: HARD_CUT_PROGRESS, moveFrom: HARD_CUT_PROGRESS, transition: "cut", position: new Vector3(-2.4, 4.5, 1.6), target: new Vector3(1, 4.35, 0), fov: 34, key: 3.5, fill: .3, rim: 4.8, environment: 1.7 },
  { at: .635, moveFrom: .56, transition: "smooth", position: new Vector3(3.3, 4.3, 3.7), target: new Vector3(.3, 4.05, .15), fov: 35, key: 3.7, fill: .32, rim: 5.1, environment: 1.8 },
  { at: .65, moveFrom: .60, transition: "smooth", position: new Vector3(1.5, 3.1, 9.3), target: new Vector3(.4, 2.8, 0), fov: 36, key: 3.9, fill: .25, rim: 5.2, environment: 1.65 },
  { at: .69, moveFrom: .658, transition: "smooth", position: new Vector3(4, 5.2, 11.6), target: new Vector3(2.2, 3, 0), fov: 38, key: 4.1, fill: .25, rim: 5.2, environment: 1.65 },
  { at: .715, moveFrom: .697, transition: "smooth", position: new Vector3(4.4, 3.8, 9.3), target: new Vector3(2.7, 1.35, 0), fov: 38, key: 4, fill: .28, rim: 5.2, environment: 1.5 },
  { at: .765, moveFrom: .739, transition: "smooth", position: new Vector3(4, 3.5, 9.6), target: new Vector3(.25, 1.85, 0), fov: 38, key: 3.5, fill: .27, rim: 4.4, environment: 1.4 },
  { at: 1, moveFrom: .78, transition: "smooth", position: new Vector3(4.15, 3.55, 9.8), target: new Vector3(.28, 1.86, 0), fov: 38, key: 3.4, fill: .27, rim: 4.3, environment: 1.4 },
];

export const clamp01 = (value: number) => Math.max(0, Math.min(1, value));
export const smooth01 = (value: number) => {
  const t = clamp01(value);
  return t * t * (3 - 2 * t);
};
export const ramp = (value: number, from: number, to: number) => smooth01((value - from) / (to - from));

export function sampleCinematicShot(progress: number) {
  const nextIndex = CINEMATIC_SHOTS.findIndex((shot, index) => index > 0 && progress < shot.at);
  const index = nextIndex === -1 ? CINEMATIC_SHOTS.length - 1 : nextIndex;
  if (index === 0) return { from: CINEMATIC_SHOTS[0], to: CINEMATIC_SHOTS[0], mix: 0 };
  const to = CINEMATIC_SHOTS[index];
  // At a cut, the previous frame stays intact until the exact boundary.
  // At and after that boundary the next interval starts from the cut shot.
  // Never feed a zero-width interval to ramp(), which would yield NaN.
  if (to.transition === "cut" || to.transition === "hold") {
    const held = CINEMATIC_SHOTS[index - 1];
    return { from: held, to: held, mix: 0 };
  }
  return { from: CINEMATIC_SHOTS[index - 1], to, mix: ramp(progress, to.moveFrom, to.at) };
}

export function sampleCinematicCameraArc(from: CinematicShot, to: CinematicShot, mix: number, target: Vector3, output: Vector3) {
  target.copy(from.target).lerp(to.target, mix);
  const startX = from.position.x - from.target.x;
  const startZ = from.position.z - from.target.z;
  const endX = to.position.x - to.target.x;
  const endZ = to.position.z - to.target.z;
  const startAngle = Math.atan2(startX, startZ);
  const endAngle = Math.atan2(endX, endZ);
  const radius = Math.hypot(startX, startZ) + (Math.hypot(endX, endZ) - Math.hypot(startX, startZ)) * mix;
  const angle = startAngle + (endAngle - startAngle) * mix;
  return output.set(target.x + Math.sin(angle) * radius, from.position.y + (to.position.y - from.position.y) * mix, target.z + Math.cos(angle) * radius);
}
