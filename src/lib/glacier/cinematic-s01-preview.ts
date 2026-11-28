import { Vector3 } from "three";

export type S01PreviewCamera = {
  position: Vector3;
  target: Vector3;
  fov: number;
};

// H3.1.1 is intentionally isolated from the production shot plan. These
// values frame the authored opening pose for visual approval before any S01
// camera is allowed into the scroll timeline.
const DESKTOP_CAMERA: S01PreviewCamera = {
  position: new Vector3(1.87, 4.13, 2.73),
  target: new Vector3(-0.3, 4.35, 0),
  fov: 31,
};

const MOBILE_CAMERA: S01PreviewCamera = {
  position: new Vector3(1.9, 3.98, 5.45),
  target: new Vector3(-0.18, 3.9, 0),
  fov: 39,
};

const DIAGNOSTIC_CAMERA: S01PreviewCamera = {
  position: new Vector3(2.5, 3.45, 7.5),
  target: new Vector3(0, 3.15, 0),
  fov: 38,
};

export function getS01PreviewCamera(aspect: number, diagnostic: boolean): S01PreviewCamera {
  if (diagnostic) return DIAGNOSTIC_CAMERA;
  return aspect < 0.78 ? MOBILE_CAMERA : DESKTOP_CAMERA;
}
