import { readFileSync } from "node:fs";
import { registerHooks } from "node:module";
import { AnimationClip, AnimationMixer, Bone, Group, Quaternion, QuaternionKeyframeTrack, Vector3, VectorKeyframeTrack } from "three";
import { MeshoptDecoder } from "three/addons/libs/meshopt_decoder.module.js";

const buffer = readFileSync(new URL("../public/assets/provisional/mecha-full.glb", import.meta.url));
const jsonLength = buffer.readUInt32LE(12);
const gltf = JSON.parse(buffer.subarray(20, 20 + jsonLength).toString("utf8"));
const binaryStart = 28 + jsonLength;
await MeshoptDecoder.ready;
const decodedViews = new Map();
function decodeView(index) {
  if (decodedViews.has(index)) return decodedViews.get(index);
  const view = gltf.bufferViews[index];
  const extension = view.extensions?.EXT_meshopt_compression;
  let result;
  if (extension) {
    const start = binaryStart + extension.byteOffset;
    const source = buffer.subarray(start, start + extension.byteLength);
    result = new Uint8Array(extension.count * extension.byteStride);
    MeshoptDecoder.decodeGltfBuffer(result, extension.count, extension.byteStride, source, extension.mode, extension.filter);
  } else {
    const start = binaryStart + (view.byteOffset ?? 0);
    result = buffer.subarray(start, start + view.byteLength);
  }
  decodedViews.set(index, result);
  return result;
}
function accessorValues(index) {
  const accessor = gltf.accessors[index];
  if (accessor.componentType !== 5126) throw new Error(`Accessor ${index} is not FLOAT`);
  const size = { SCALAR: 1, VEC3: 3, VEC4: 4 }[accessor.type];
  const view = decodeView(accessor.bufferView);
  const offset = (accessor.byteOffset ?? 0) + view.byteOffset;
  const stride = gltf.bufferViews[accessor.bufferView].byteStride ?? size * 4;
  const values = new Float32Array(accessor.count * size);
  const data = new DataView(view.buffer);
  for (let i = 0; i < accessor.count; i++) {
    for (let component = 0; component < size; component++) values[i * size + component] = data.getFloat32(offset + i * stride + component * 4, true);
  }
  return values;
}
const bones = gltf.nodes.map((node) => {
  const bone = new Bone();
  bone.name = node.name ?? "";
  if (node.translation) bone.position.fromArray(node.translation);
  if (node.rotation) bone.quaternion.fromArray(node.rotation);
  if (node.scale) bone.scale.fromArray(node.scale);
  return bone;
});
gltf.nodes.forEach((node, index) => node.children?.forEach((child) => bones[index].add(bones[child])));
const parented = new Set(gltf.nodes.flatMap((node) => node.children ?? []));
const rigRoot = new Group();
for (let index = 0; index < bones.length; index++) {
  if (!parented.has(index)) rigRoot.add(bones[index]);
}
rigRoot.updateMatrixWorld(true);
const names = ["Head_Jt", "Neck_Jt", "Spine_1_Jt", "Spine_2_Jt", "Hips_Jt", "Right_Middle_1_Jt", "Right_Shoulder_Jt", "Left_Shoulder_Jt"];
for (const name of names) {
  const index = bones.findIndex((bone) => bone.name === name);
  if (index < 0) {
    console.log(name, "missing");
    continue;
  }
  const bone = bones[index];
  const world = bone.getWorldQuaternion(new Quaternion());
  const axes = [new Vector3(1, 0, 0), new Vector3(0, 1, 0), new Vector3(0, 0, 1)]
    .map((axis) => axis.applyQuaternion(world).toArray().map((value) => Number(value.toFixed(3))));
  console.log(JSON.stringify({ name, parent: bone.parent?.name, position: bone.position.toArray(), quaternion: bone.quaternion.toArray(), worldAxes: axes }));
}
for (const clip of gltf.animations) {
  console.log(`clip ${clip.name}: ${clip.channels.length} channels`);
  for (const channel of clip.channels) {
    const name = gltf.nodes[channel.target.node]?.name;
    if (names.includes(name)) {
      const sampler = clip.samplers[channel.sampler];
      const output = gltf.accessors[sampler.output];
      const view = gltf.bufferViews[output.bufferView];
      console.log(`  ${name}.${channel.target.path}: ${output.count} ${output.componentType}/${output.type}, stride ${view.byteStride ?? "none"}, meshopt ${view.extensions?.EXT_meshopt_compression ? "yes" : "no"}`);
    }
  }
}

const clips = Object.fromEntries(gltf.animations.map((animation) => {
  const tracks = animation.channels.map((channel) => {
    const sampler = animation.samplers[channel.sampler];
    if (sampler.interpolation && sampler.interpolation !== "LINEAR") throw new Error(`Unsupported interpolation ${sampler.interpolation}`);
    const name = gltf.nodes[channel.target.node]?.name;
    const times = accessorValues(sampler.input);
    const values = accessorValues(sampler.output);
    if (channel.target.path === "rotation") return new QuaternionKeyframeTrack(`${name}.quaternion`, times, values);
    if (channel.target.path === "translation") return new VectorKeyframeTrack(`${name}.position`, times, values);
    if (channel.target.path === "scale") return new VectorKeyframeTrack(`${name}.scale`, times, values);
    throw new Error(`Unsupported channel ${channel.target.path}`);
  });
  return [animation.name, new AnimationClip(animation.name, -1, tracks)];
}));
const mixer = new AnimationMixer(rigRoot);
const head = bones.find((bone) => bone.name === "Head_Jt");
const neck = bones.find((bone) => bone.name === "Neck_Jt");
for (const [name, clip] of Object.entries(clips)) {
  const action = mixer.clipAction(clip);
  action.play();
  action.paused = true;
  action.setEffectiveWeight(1);
  for (const fraction of [.2, .4, .6, .8]) {
    action.time = clip.duration * fraction;
    mixer.update(0);
    const headWorld = head.getWorldQuaternion(new Quaternion());
    console.log(JSON.stringify({ clip: name, fraction, headLocal: head.quaternion.toArray().map((v) => +v.toFixed(4)), neckLocal: neck.quaternion.toArray().map((v) => +v.toFixed(4)), headForward: new Vector3(0, 1, 0).applyQuaternion(headWorld).toArray().map((v) => +v.toFixed(3)) }));
  }
  action.stop();
}

registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier === "./cinematic-shot-plan" && context.parentURL?.endsWith("/cinematic-animation.ts")) {
      return nextResolve("./cinematic-shot-plan.ts", context);
    }
    return nextResolve(specifier, context);
  },
});
const { sampleCinematicAnimation, sampleRootYaw } = await import("../src/lib/glacier/cinematic-animation.ts");
const actions = Object.fromEntries(Object.entries(clips).map(([name, clip]) => {
  const action = mixer.clipAction(clip).play();
  action.setEffectiveWeight(0);
  return [name, { clip, action }];
}));
const rig = { root: rigRoot, mixer, clips: actions };
const angle = (a, b) => 2 * Math.acos(Math.min(1, Math.abs(a.clone().normalize().dot(b.clone().normalize())))) * 180 / Math.PI;
const controlled = bones.filter((bone) => /^(Right_(Index|Middle|Anular|Pinky|Thumb)_[123]_Jt|Head_Jt|Neck_Jt|Spine_[12]_Jt)$/.test(bone.name));
const snapshot = () => controlled.map((bone) => bone.quaternion.clone());
const maxChange = (before) => Math.max(...controlled.map((bone, index) => angle(before[index], bone.quaternion)));
for (const progress of [.24, .28, .35, .38, .40, .45, .55]) {
  sampleCinematicAnimation(rig, progress);
  const first = snapshot();
  for (let repeat = 0; repeat < 8; repeat++) sampleCinematicAnimation(rig, progress);
  const repeated = maxChange(first);
  sampleCinematicAnimation(rig, .17);
  sampleCinematicAnimation(rig, .65);
  sampleCinematicAnimation(rig, progress);
  const reversed = maxChange(first);
  console.log(JSON.stringify({ progress, joints: controlled.length, repeatedMaxDegrees: +repeated.toFixed(6), reverseSeekMaxDegrees: +reversed.toFixed(6), rootYawDegrees: +(sampleRootYaw(progress) * 180 / Math.PI).toFixed(3) }));
  if (repeated > .01 || reversed > .01) process.exitCode = 1;
}
