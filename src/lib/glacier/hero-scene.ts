import {
  ACESFilmicToneMapping, Color, PerspectiveCamera, Scene, SRGBColorSpace, Vector2, Vector3, WebGLRenderer,
} from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";

import { loadGlacierCharacter } from "./character";
import { applyHeroMaterialGrade } from "./hero-materials";
import { createHeroLighting } from "./hero-lighting";
import { glacierPixelRatio } from "./quality-policy";

export type GlacialHeroController = {
  setPointer(x: number, y: number): void;
  setReducedMotion(reduced: boolean): void;
  setVisible(visible: boolean): void;
  resize(): void;
  dispose(): void;
};

type Options = { canvas: HTMLCanvasElement; reducedMotion: boolean };

export async function createGlacialHeroScene({ canvas, reducedMotion }: Options): Promise<GlacialHeroController> {
  const renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "high-performance" });
  renderer.setClearColor(new Color("#0B1013"), 0);
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.9;

  const scene = new Scene();
  const camera = new PerspectiveCamera(34, 1, 0.05, 100);
  const lighting = createHeroLighting(scene, renderer);
  let character: Awaited<ReturnType<typeof loadGlacierCharacter>>;
  try {
    character = await loadGlacierCharacter();
  } catch (error) {
    lighting.dispose();
    renderer.dispose();
    throw error;
  }
  applyHeroMaterialGrade(character.materialSlots);
  scene.add(character.root);
  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  const bloom = new UnrealBloomPass(new Vector2(1, 1), 0.22, 0.28, 1.32);
  composer.addPass(bloom);
  composer.addPass(new OutputPass());
  for (const [name, clip] of Object.entries(character.clips)) {
    clip.action.setEffectiveWeight(name === "idle" ? 1 : 0);
  }
  character.mixer.update(0);

  let disposed = false;
  let visible = false;
  let reduced = reducedMotion;
  let frame = 0;
  let lastTime = 0;
  let elapsed = reducedMotion ? 2 : 0;
  let targetX = 0;
  let targetY = 0;
  let pointerX = 0;
  let pointerY = 0;
  const aim = new Vector3();

  const draw = (time: number) => {
    frame = 0;
    if (disposed || !visible || document.hidden) return;
    const delta = lastTime ? Math.min(0.05, (time - lastTime) / 1000) : 0;
    lastTime = time;
    if (!reduced) {
      elapsed += delta;
      if (elapsed < 4.5) character.mixer.update(delta * 0.42);
      pointerX += (targetX - pointerX) * Math.min(1, delta * 3.2);
      pointerY += (targetY - pointerY) * Math.min(1, delta * 3.2);
    }
    const mobile = camera.aspect < 0.78;
    if (mobile) {
      camera.position.set(1.45 + pointerX * 0.09, 5.05 - pointerY * 0.06, 6.3);
      aim.set(-0.18 + pointerX * 0.08, 4.75 - pointerY * 0.04, 0);
      camera.fov = 40;
    } else {
      camera.position.set(1.5 + pointerX * 0.1, 4.1 - pointerY * 0.07, 2.45);
      aim.set(-1.17 + pointerX * 0.09, 4.48 - pointerY * 0.045, 0);
      camera.fov = 31;
    }
    // The idle rig translates its hips relative to the bind pose; follow that offset as P7 does.
    const hipsOffset = character.getHipsOffset();
    camera.position.add(hipsOffset);
    aim.add(hipsOffset);
    camera.lookAt(aim);
    camera.updateProjectionMatrix();
    lighting.setActivation(reduced ? 1 : Math.min(1, elapsed / 1.3));
    if (!mobile && !reduced) composer.render(delta);
    else renderer.render(scene, camera);
    if (!reduced && (elapsed < 4.5 || Math.abs(targetX - pointerX) > 0.001 || Math.abs(targetY - pointerY) > 0.001)) schedule();
  };
  const schedule = () => {
    if (!frame && !disposed && visible && !document.hidden) frame = requestAnimationFrame(draw);
  };
  const resize = () => {
    if (disposed) return;
    const ratio = glacierPixelRatio();
    const width = Math.max(1, canvas.clientWidth);
    const height = Math.max(1, canvas.clientHeight);
    renderer.setPixelRatio(ratio);
    renderer.setSize(width, height, false);
    composer.setPixelRatio(ratio);
    composer.setSize(width, height);
    camera.aspect = canvas.clientWidth / Math.max(1, canvas.clientHeight);
    camera.updateProjectionMatrix();
    schedule();
  };
  resize();

  return {
    setPointer(x, y) { targetX = Math.max(-1, Math.min(1, x)); targetY = Math.max(-1, Math.min(1, y)); schedule(); },
    setReducedMotion(value) { reduced = value; if (value) { elapsed = 2; targetX = targetY = pointerX = pointerY = 0; } schedule(); },
    setVisible(value) {
      visible = value;
      if (!value) { if (frame) cancelAnimationFrame(frame); frame = 0; lastTime = 0; }
      else schedule();
    },
    resize,
    dispose() {
      disposed = true;
      if (frame) cancelAnimationFrame(frame);
      character.dispose();
      lighting.dispose();
      composer.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
    },
  };
}
