import { Quaternion, Vector3, type Object3D } from "three";
import type { loadGlacierCharacter } from "./character";
import { ramp } from "./cinematic-shot-plan";

export type CinematicRig = Pick<Awaited<ReturnType<typeof loadGlacierCharacter>>, "root" | "mixer" | "clips">;
const zAxis = new Vector3(0, 0, 1);
const torsoAxis = new Vector3(1, 0, 0);
const turn = new Quaternion();
type PoseTrack = { bone: NonNullable<ReturnType<CinematicRig["root"]["getObjectByName"]>>; open: Quaternion; closed: Quaternion };
type RigPose = { fingers: PoseTrack[]; baseRotations: Map<Object3D, Quaternion> };
const poses = new WeakMap<CinematicRig, RigPose>();

// Build presents the right hand at 75%, then lowers it. Hold that presentation
// while retiming only its real finger tracks; no invented animation names.
function rigPose(rig: CinematicRig) {
  const saved = poses.get(rig);
  if (saved) return saved;
  const clip = rig.clips.build.clip;
  const result: PoseTrack[] = [];
  for (const track of clip.tracks) {
    if (!/^Right_(Index|Middle|Anular|Pinky|Thumb)_[123]_Jt\.quaternion$/.test(track.name)) continue;
    const bone = rig.root.getObjectByName(track.name.split(".")[0]);
    if (!bone) continue;
    const interpolate = (track as typeof track & { createInterpolant(): { evaluate(t: number): ArrayLike<number> } }).createInterpolant();
    const open = new Quaternion().fromArray(Array.from(interpolate.evaluate(clip.duration * .68)));
    const closed = new Quaternion().fromArray(Array.from(interpolate.evaluate(clip.duration * .86)));
    // The source grip is relaxed, not a full fist. Extend the verified local-Z
    // flexion axis only on the four long fingers; preserve the authored thumb.
    if (!track.name.includes("Thumb")) {
      const flexion = track.name.includes("_1_") ? .32 : track.name.includes("_2_") ? .60 : .55;
      closed.multiply(new Quaternion().setFromAxisAngle(zAxis, flexion));
    }
    result.push({ bone, open, closed });
  }
  const baseRotations = new Map<Object3D, Quaternion>();
  for (const { bone } of result) baseRotations.set(bone, bone.quaternion.clone());
  for (const name of ["Head_Jt", "Neck_Jt", "Spine_1_Jt", "Spine_2_Jt"]) {
    const bone = rig.root.getObjectByName(name);
    if (bone) baseRotations.set(bone, bone.quaternion.clone());
  }
  const state = { fingers: result, baseRotations };
  poses.set(rig, state);
  return state;
}

export function sampleCinematicAnimation(rig: CinematicRig, p: number, originalClipsOnly = false) {
  const pose = rigPose(rig);
  // PropertyMixer skips binding.setValue when its two accumulation buffers are
  // equal. Restore our last animation-only values before every mixer sample,
  // so a repeated seek cannot multiply offsets into the previous pose.
  for (const [bone, base] of pose.baseRotations) bone.quaternion.copy(base);
  const activation = ramp(p, .0625, .08);
  const building = ramp(p, .175, .19);
  const falling = ramp(p, .64, .66);
  const resting = ramp(p, .748, .768);
  const weights = {
    idle: 1 - activation + resting,
    power_on: activation * (1 - building),
    build: building * (1 - falling),
    descent: falling * (1 - resting),
  };
  const total = Object.values(weights).reduce((s, v) => s + v, 0);
  const buildTime = p < .30 ? .15 * ramp(p, .18, .28)
    : p < .42 ? .15 + .45 * ramp(p, .32, .42)
    : p < .49 ? .60 + .15 * ramp(p, .425, .475)
    : .75 + .245 * ramp(p, .592, .65);
  const descentTime = p < .68 ? .15 * ramp(p, .65, .68)
    : p < .715 ? .15 + .15 * ramp(p, .68, .715)
    : p < .735 ? .30 + .15 * ramp(p, .715, .735)
    : .45 + .545 * ramp(p, .735, .768);
  const times = {
    idle: p < .5 ? .48 : .12 + ramp(p, .77, 1) * 1.3,
    power_on: ramp(p, .0625, .19) * rig.clips.power_on.clip.duration,
    build: buildTime * rig.clips.build.clip.duration,
    descent: descentTime * rig.clips.descent.clip.duration,
  };
  for (const name of ["idle", "power_on", "build", "descent"] as const) {
    const { action, clip } = rig.clips[name];
    action.enabled = true;
    action.paused = true;
    action.setEffectiveWeight(weights[name] / Math.max(.001, total));
    action.time = Math.min(clip.duration - .001, times[name]);
  }
  rig.mixer.update(0);
  for (const [bone, base] of pose.baseRotations) base.copy(bone.quaternion);
  if (originalClipsOnly) {
    rig.root.updateMatrixWorld(true);
    return;
  }
  const gesture = ramp(p, .51, .535) * (1 - ramp(p, .642, .67));
  const closure = ramp(p, .57, .625);
  for (const finger of pose.fingers) {
    turn.copy(finger.open).slerp(finger.closed, closure);
    finger.bone.quaternion.slerp(turn, gesture);
  }
  // Local +Z is the measured left/right pitch axis for Head_Jt and Neck_Jt.
  // The two bounded joint envelopes have a combined maximum below 14 degrees.
  const up = ramp(p, .19, .25);
  const down = ramp(p, .325, .395);
  const lift = ramp(p, .55, .61);
  const articulation = 1 - ramp(p, .625, .66);
  const headPitch = Math.max(-.14, Math.min(.18, .14 * up - .28 * down + .32 * lift)) * articulation;
  const neckPitch = Math.max(-.04, Math.min(.055, .045 * up - .085 * down + .095 * lift)) * articulation;
  for (const [name, pitch] of [["Head_Jt", headPitch], ["Neck_Jt", neckPitch]] as const) {
    const bone = rig.root.getObjectByName(name);
    if (bone) bone.quaternion.multiply(turn.setFromAxisAngle(zAxis, pitch));
  }
  // The root supplies the turn; a restrained upper-body lead and release keep
  // the hips and shoulder animation from reading as a rigid turntable spin.
  const torsoLead = .11 * ramp(p, .365, .415) * (1 - ramp(p, .47, .515));
  const torsoRelease = -.085 * ramp(p, .49, .535) * (1 - ramp(p, .565, .6));
  for (const [name, scale] of [["Spine_1_Jt", .6], ["Spine_2_Jt", .4]] as const) {
    const bone = rig.root.getObjectByName(name);
    if (bone) bone.quaternion.multiply(turn.setFromAxisAngle(torsoAxis, (torsoLead + torsoRelease) * scale));
  }
  rig.root.updateMatrixWorld(true);
}

export function sampleRootYaw(p: number) {
  // The model faces +Z. Turning toward -Z exposes its back to the front-side
  // camera; all angles are sampled directly from scroll progress.
  return 2.62 * ramp(p, .39, .465) * (1 - ramp(p, .50, .56));
}

export function sampleRootPosition(p: number, target: Vector3) {
  // Actual descent supplies the fall: no artificial second upward arc.
  return target.set(ramp(p, .63, .715) * 2.7, -.1 * ramp(p, .61, .64) * (1 - ramp(p, .66, .685)), 0);
}
