import assert from "node:assert/strict";
import { Vector3 } from "three";
import {
  CINEMATIC_SHOTS, HARD_CUT_PROGRESS, sampleCinematicCameraArc, sampleCinematicShot,
} from "../src/lib/glacier/cinematic-shot-plan.ts";

function sample(progress) {
  const { from, to, mix } = sampleCinematicShot(progress);
  const target = new Vector3();
  const position = new Vector3();
  sampleCinematicCameraArc(from, to, mix, target, position);
  return {
    position: position.toArray(),
    target: target.toArray(),
    fov: from.fov + (to.fov - from.fov) * mix,
    mix,
  };
}

const before = sample(HARD_CUT_PROGRESS - 1e-8);
const exact = sample(HARD_CUT_PROGRESS);
const after = sample(HARD_CUT_PROGRESS + 1e-8);
const near = (actual, expected) => actual.forEach((value, index) => assert.ok(Math.abs(value - expected[index]) < 1e-10));
near(before.position, CINEMATIC_SHOTS[2].position.toArray());
near(before.target, CINEMATIC_SHOTS[2].target.toArray());
assert.equal(before.fov, CINEMATIC_SHOTS[2].fov);
near(exact.position, CINEMATIC_SHOTS[3].position.toArray());
near(exact.target, CINEMATIC_SHOTS[3].target.toArray());
assert.equal(exact.fov, CINEMATIC_SHOTS[3].fov);
assert.deepEqual(after, exact);

for (let index = 0; index <= 10000; index++) {
  const shot = sample(index / 10000);
  assert.ok([...shot.position, ...shot.target, shot.fov, shot.mix].every(Number.isFinite));
}
const checkpoints = [.26, HARD_CUT_PROGRESS - .0001, HARD_CUT_PROGRESS, HARD_CUT_PROGRESS + .0001, .5];
const forward = checkpoints.map(sample);
const reverse = checkpoints.toReversed().map(sample).toReversed();
assert.deepEqual(forward, reverse);
console.log(JSON.stringify({ cut: HARD_CUT_PROGRESS, before, exact, after, finiteSamples: 10001, reversible: true }));
