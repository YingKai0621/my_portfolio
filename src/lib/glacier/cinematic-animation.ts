import { Quaternion, Vector3 } from "three";
import type { loadGlacierCharacter } from "./character";
import { ramp } from "./cinematic-shot-plan";

export type CinematicRig = Pick<Awaited<ReturnType<typeof loadGlacierCharacter>>, "root" | "mixer" | "clips">;
const zAxis = new Vector3(0, 0, 1);
const turn = new Quaternion();
type PoseTrack = { bone: NonNullable<ReturnType<CinematicRig["root"]["getObjectByName"]>>; open: Quaternion; closed: Quaternion };
const poses = new WeakMap<CinematicRig, PoseTrack[]>();

// Build presents the right hand at 75%, then lowers it. Hold that presentation
// while retiming only its real finger tracks; no invented animation names.
function handPoses(rig: CinematicRig) {
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
  poses.set(rig, result);
  return result;
}

export function sampleCinematicAnimation(rig: CinematicRig, p: number) {
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
  const gesture = ramp(p, .455, .485) * (1 - ramp(p, .592, .635));
  const closure = ramp(p, .505, .578);
  for (const pose of handPoses(rig)) {
    turn.copy(pose.open).slerp(pose.closed, closure);
    pose.bone.quaternion.slerp(turn, gesture);
  }
  // Mixer sampling restores the base every seek. Pitch only articulated joints.
  const pitch = .20 * ramp(p, .195, .25) - .40 * ramp(p, .335, .41) + .38 * ramp(p, .485, .565);
  const articulation = ramp(p, .19, .22) * (1 - ramp(p, .59, .65));
  for (const [name, share] of [["Head_Jt", .72], ["Neck_Jt", .28]] as const) {
    const bone = rig.root.getObjectByName(name);
    if (bone) bone.quaternion.multiply(turn.setFromAxisAngle(zAxis, pitch * articulation * share));
  }
  rig.root.updateMatrixWorld(true);
}

export function sampleRootPosition(p: number, target: Vector3) {
  // Actual descent supplies the fall: no artificial second upward arc.
  return target.set(ramp(p, .63, .715) * 2.7, -.1 * ramp(p, .61, .64) * (1 - ramp(p, .66, .685)), 0);
}
