import type { loadGlacierCharacter, CharacterClip } from "./character";

type Character = Awaited<ReturnType<typeof loadGlacierCharacter>>;
const SCENE_CLIPS: readonly CharacterClip[] = ["power_on", "build", "idle", "descent"];

export function sampleCharacterAnimation(character: Character, progress: number) {
  const time = Math.max(0, Math.min(0.99999, progress)) * 4;
  const index = Math.min(3, Math.floor(time));
  const local = time - index;
  const blendWidth = 0.1;
  const nextWeight = index < 3 ? Math.max(0, Math.min(1, (local - (1 - blendWidth)) / blendWidth)) : 0;
  const current = SCENE_CLIPS[index];
  const next = SCENE_CLIPS[Math.min(3, index + 1)];

  for (const name of SCENE_CLIPS) {
    const { action } = character.clips[name];
    action.enabled = true;
    action.setEffectiveWeight(name === current ? 1 - nextWeight : name === next ? nextWeight : 0);
  }
  const active = character.clips[current];
  active.action.time = Math.min(active.clip.duration - 0.001, active.clip.duration * local);
  if (nextWeight > 0) character.clips[next].action.time = character.clips[next].clip.duration * nextWeight * blendWidth;
  character.mixer.update(0);
}
