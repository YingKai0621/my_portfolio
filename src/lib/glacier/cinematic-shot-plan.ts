import { Vector3 } from "three";

export type CinematicShot = {
  at: number;
  moveFrom: number;
  position: Vector3;
  target: Vector3;
  fov: number;
  key: number;
  fill: number;
  rim: number;
  environment: number;
};

// H2.7: arrival and hold are separate intervals. No perpetual zoom-out.
export const CINEMATIC_SHOTS: readonly CinematicShot[] = [
  { at: 0, moveFrom: 0, position: new Vector3(1.5, 4.12, 2.55), target: new Vector3(-1.13, 4.43, 0), fov: 31, key: 3.45, fill: 0.16, rim: 4.2, environment: 1.1 },
  { at: .095, moveFrom: .065, position: new Vector3(2.45, 2.45, 3.65), target: new Vector3(-.3, 3.85, 0), fov: 31, key: 3.2, fill: .12, rim: 4.9, environment: 1.2 },
  { at: .175, moveFrom: .12, position: new Vector3(1.7, 2.8, 8.6), target: new Vector3(0, 2.9, 0), fov: 33, key: 3.5, fill: .3, rim: 4.8, environment: 1.7 },
  { at: .28, moveFrom: .21, position: new Vector3(-1.85, 4.15, 2.85), target: new Vector3(.42, 4.25, 0), fov: 32, key: 4.1, fill: .24, rim: 4.7, environment: 1.8 },
  { at: .40, moveFrom: .345, position: new Vector3(1.6, 4.5, 3.9), target: new Vector3(.45, 4.1, .12), fov: 34, key: 3.7, fill: .25, rim: 4.5, environment: 1.6 },
  { at: .475, moveFrom: .415, position: new Vector3(3.4, 4.3, 3.6), target: new Vector3(.3, 4.05, .18), fov: 35, key: 3.4, fill: .25, rim: 4.5, environment: 1.65 },
  { at: .585, moveFrom: .55, position: new Vector3(3.3, 4.3, 3.7), target: new Vector3(.3, 4.05, .15), fov: 35, key: 3.7, fill: .32, rim: 5.1, environment: 1.8 },
  { at: .65, moveFrom: .60, position: new Vector3(1.5, 3.1, 9.3), target: new Vector3(.4, 2.8, 0), fov: 36, key: 3.9, fill: .25, rim: 5.2, environment: 1.65 },
  { at: .69, moveFrom: .658, position: new Vector3(4, 5.2, 11.6), target: new Vector3(2.2, 3, 0), fov: 38, key: 4.1, fill: .25, rim: 5.2, environment: 1.65 },
  { at: .715, moveFrom: .697, position: new Vector3(4.4, 3.8, 9.3), target: new Vector3(2.7, 1.35, 0), fov: 38, key: 4, fill: .28, rim: 5.2, environment: 1.5 },
  { at: .765, moveFrom: .739, position: new Vector3(4, 3.5, 9.6), target: new Vector3(.25, 1.85, 0), fov: 38, key: 3.5, fill: .27, rim: 4.4, environment: 1.4 },
  { at: 1, moveFrom: .78, position: new Vector3(4.15, 3.55, 9.8), target: new Vector3(.28, 1.86, 0), fov: 38, key: 3.4, fill: .27, rim: 4.3, environment: 1.4 },
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
  return { from: CINEMATIC_SHOTS[index - 1], to, mix: ramp(progress, to.moveFrom, to.at) };
}
