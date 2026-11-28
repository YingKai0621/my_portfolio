import {
  ACESFilmicToneMapping, Color, PerspectiveCamera, Scene, SRGBColorSpace, Vector3, WebGLRenderer,
} from "three";

import { loadGlacierCharacter } from "./character";
import { sampleCharacterAnimation } from "./animation-adapter";
import { createMaterialController } from "./material-controller";
import { createGlacierLighting } from "./lighting";
import { glacierPixelRatio } from "./quality-policy";
import { eased, SHOTS, shotAt } from "./shot-plan";

export type GlacierSceneController = {
  setProgress(progress: number): void;
  setVisible(visible: boolean): void;
  resize(): void;
  dispose(): void;
};

type Options = { canvas: HTMLCanvasElement; onReady: (diagnostics: Record<string, unknown>) => void };

export async function createGlacierScene({ canvas, onReady }: Options): Promise<GlacierSceneController> {
  const renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "high-performance" });
  renderer.setClearColor(new Color("#0b1013"), 0);
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.82;
  const scene = new Scene();
  const camera = new PerspectiveCamera(35, 1, 0.05, 100);
  const lighting = createGlacierLighting(scene, renderer);

  let disposed = false;
  let frame = 0;
  let visible = false;
  let progress = 0;
  let character: Awaited<ReturnType<typeof loadGlacierCharacter>>;
  try {
    character = await loadGlacierCharacter();
  } catch (error) {
    lighting.dispose();
    renderer.dispose();
    throw error;
  }
  scene.add(character.root);
  const materials = createMaterialController(character.materialSlots);

  const position = new Vector3();
  const target = new Vector3();
  const draw = () => {
    frame = 0;
    if (!visible || disposed || document.hidden) return;
    sampleCharacterAnimation(character, progress);
    materials.setProgress(progress);
    const hipsOffset = character.getHipsOffset();
    const { scene: sceneIndex, local } = shotAt(progress);
    const from = SHOTS[sceneIndex];
    const to = SHOTS[Math.min(3, sceneIndex + 1)];
    // Hold the composition before a deliberate camera move near the next chapter.
    const move = eased(Math.max(0, Math.min(1, (local - 0.52) / 0.48)));
    position.copy(from.position).lerp(to.position, move);
    target.copy(from.target).lerp(to.target, move);
    // Build/descent clips translate the complete character. Track that motion instead of letting it leave the frame.
    position.add(hipsOffset);
    target.add(hipsOffset);
    if (camera.aspect < 0.8) {
      target.x = hipsOffset.x;
      position.sub(target).multiplyScalar(1.55).add(target);
      const clearances = [0.45, 0.8, 0.8, 0];
      const textClearance = clearances[sceneIndex] + (clearances[Math.min(3, sceneIndex + 1)] - clearances[sceneIndex]) * move;
      position.y += textClearance;
      target.y += textClearance;
    }
    camera.position.copy(position);
    camera.lookAt(target);
    camera.fov = from.fov + (to.fov - from.fov) * move;
    camera.updateProjectionMatrix();
    lighting.setIntensity(from.key + (to.key - from.key) * move, from.rim + (to.rim - from.rim) * move);
    renderer.render(scene, camera);
  };
  const schedule = () => {
    if (!frame && visible && !disposed && !document.hidden) frame = requestAnimationFrame(draw);
  };
  const resize = () => {
    if (disposed) return;
    const width = Math.max(1, canvas.clientWidth);
    const height = Math.max(1, canvas.clientHeight);
    renderer.setPixelRatio(glacierPixelRatio());
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    schedule();
  };
  resize();
  onReady({ ...character.diagnostics, head: character.headPosition.toArray(), height: character.height });

  return {
    setProgress(value) { progress = Math.max(0, Math.min(1, value)); schedule(); },
    setVisible(value) { visible = value; schedule(); },
    resize,
    dispose() {
      disposed = true;
      if (frame) cancelAnimationFrame(frame);
      character.dispose();
      lighting.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
    },
  };
}
