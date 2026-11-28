import {
  ACESFilmicToneMapping, Box3, Color, PerspectiveCamera, Scene, SRGBColorSpace, Vector2, Vector3, WebGLRenderer,
} from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";

import { loadGlacierCharacter } from "./character";
import { sampleCinematicAnimation, sampleRootPosition } from "./cinematic-animation";
import { createCinematicAura } from "./cinematic-aura";
import { createCinematicAfterimages } from "./cinematic-afterimages";
import { CONTACT_PROGRESS } from "./cinematic-timing";
import { createCinematicBackdrop } from "./cinematic-backdrop";
import { createCinematicEnvironment } from "./cinematic-environment";
import { createCinematicMaterials } from "./cinematic-materials";
import { applyS01Look, getS01LightingProfile, type S01LookVariant } from "./cinematic-s01-look";
import { createS01Atmosphere, type S01AtmosphereVariant } from "./cinematic-s01-atmosphere";
import { getS01PreviewCamera } from "./cinematic-s01-preview";
import { createCinematicType } from "./cinematic-type";
import { sampleCinematicShot, sampleCinematicCameraArc, HARD_CUT_PROGRESS, clamp01, ramp } from "./cinematic-shot-plan";
import { createHeroLighting } from "./hero-lighting";
import { glacierPixelRatio } from "./quality-policy";

export type CinematicSceneController = {
  setProgress(progress: number): void;
  setVisible(visible: boolean): void;
  resize(): void;
  dispose(): void;
};

export type CinematicInspection = "off" | "neutral" | "source" | "s01" | "s01-diagnostic";

export type S01SceneOptions = {
  atmosphere?: S01AtmosphereVariant;
  backgroundOnly?: boolean;
};

// One renderer, one provisional character and one absolute scroll coordinate.
// Nothing animates in an independent loop: seeking backward samples the same pose.
export async function createCinematicScene(canvas: HTMLCanvasElement, words: readonly string[], inspection: CinematicInspection = "off", s01Look: S01LookVariant = "neutral", s01Options: S01SceneOptions = {}): Promise<CinematicSceneController> {
  const neutral = inspection !== "off";
  const s01Preview = inspection === "s01" || inspection === "s01-diagnostic";
  const renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "high-performance" });
  renderer.setClearColor(new Color("#0B1013"), 0);
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.78;
  const scene = new Scene();
  const camera = new PerspectiveCamera(31, 1, 0.05, 100);
  scene.add(camera);
  const lighting = createHeroLighting(scene, renderer, s01Preview ? s01Look : true);
  let character: Awaited<ReturnType<typeof loadGlacierCharacter>>;
  try {
    character = await loadGlacierCharacter();
  } catch (error) {
    lighting.dispose();
    renderer.dispose();
    throw error;
  }
  scene.add(character.root);
  if (s01Preview) applyS01Look(character.materialSlots, s01Look);
  // Calibrate the actual skinned contact pose once, not per frame or from a
  // chapter boundary. 30% of descent gives the deepest compressed bounds;
  // feet stop translating at 27%, earlier: CONTACT_PROGRESS is .705, not .715.
  sampleCinematicAnimation(character, .715, inspection === "source");
  const groundCorrection = -new Box3().setFromObject(character.root, true).min.y;
  sampleCinematicAnimation(character, 0, inspection === "source");
  const constrained = window.matchMedia("(max-width: 767px), (prefers-reduced-motion: reduce)").matches || navigator.hardwareConcurrency < 6;
  const aura = neutral ? null : createCinematicAura(scene);
  const afterimages = neutral || constrained ? null : createCinematicAfterimages(scene, character);
  const materials = neutral ? null : createCinematicMaterials(character.materialSlots);
  const backdrop = neutral ? null : createCinematicBackdrop(scene);
  const s01Atmosphere = s01Preview && s01Options.atmosphere && s01Options.atmosphere !== "off"
    ? createS01Atmosphere(scene, s01Options.atmosphere)
    : null;
  const typography = neutral ? null : createCinematicType(camera, words);
  const environment = neutral ? null : createCinematicEnvironment(scene);
  const composer = neutral ? null : new EffectComposer(renderer);
  composer?.addPass(new RenderPass(scene, camera));
  const bloom = neutral ? null : new UnrealBloomPass(new Vector2(1, 1), 0.24, 0.26, 1.38);
  if (bloom) composer?.addPass(bloom);
  composer?.addPass(new OutputPass());

  const position = new Vector3();
  const target = new Vector3();
  const auraOrigin = new Vector3();
  const palm = new Vector3();
  const palmJoint = character.root.getObjectByName("Right_Middle_1_Jt");
  let progress = 0;
  let visible = false;
  let disposed = false;
  let frame = 0;

  const draw = () => {
    frame = 0;
    if (disposed || !visible || document.hidden) return;
    character.root.position.set(0, 0, 0);
    character.root.rotation.y = 0;
    character.root.visible = !s01Options.backgroundOnly;
    sampleCinematicAnimation(character, progress, inspection === "source");
    materials?.setProgress(progress);
    backdrop?.setProgress(progress);
    typography?.setProgress(progress);
    const hipsOffset = character.getHipsOffset();
    environment?.setProgress(progress);
    const { from, to, mix } = sampleCinematicShot(progress);
    // Stop chasing the animated hips during descent: the platform stays fixed.
    const tracking = 1 - ramp(progress, .65, .705);
    sampleCinematicCameraArc(from, to, mix, target, position);
    position.addScaledVector(hipsOffset, tracking);
    target.addScaledVector(hipsOffset, tracking);
    if (s01Preview) {
      const preview = getS01PreviewCamera(camera.aspect, inspection === "s01-diagnostic");
      position.copy(preview.position).add(hipsOffset);
      target.copy(preview.target).add(hipsOffset);
    } else if (camera.aspect < 0.78) {
      if (progress < 0.15) {
        position.set(1.45, 5.05, 6.3).add(hipsOffset);
        target.set(-0.18, 4.75, 0).add(hipsOffset);
      } else {
        position.sub(target).multiplyScalar(1.3).add(target);
        target.y += 0.26;
        position.y += 0.26;
        // The desktop close-up is deliberately left-weighted. Pan its mobile
        // framing back toward the helmet, then release with the next camera move.
        const closeUpPan = progress >= HARD_CUT_PROGRESS ? 1.1 * (1 - ramp(progress, .56, .635)) : 0;
        position.x -= closeUpPan;
        target.x -= closeUpPan;
      }
    }
    sampleRootPosition(progress, character.root.position);
    character.root.position.y += groundCorrection * ramp(progress, .68, CONTACT_PROGRESS);
    character.root.updateMatrixWorld(true);
    auraOrigin.set(0, 2.9, 0).add(hipsOffset).add(character.root.position);
    if (palmJoint) palmJoint.getWorldPosition(palm); else palm.copy(auraOrigin);
    aura?.setProgress(progress, auraOrigin, palm, !constrained);
    afterimages?.setProgress(progress, camera.aspect >= .78, groundCorrection);
    const elapsed = (progress - CONTACT_PROGRESS) / .025;
    const impact = elapsed >= 0 && elapsed <= 1 ? Math.exp(-elapsed * 4) * Math.sin(Math.PI * Math.min(1, elapsed * 5)) : 0;
    const shake = !constrained && elapsed >= 0 && elapsed <= 1 ? Math.sin(elapsed * Math.PI * 5) * Math.exp(-elapsed * 4) : 0;
    position.y -= shake * .14;
    position.x += shake * .055;
    camera.position.copy(position);
    camera.lookAt(target);
    camera.rotateZ(shake * .0105);
    const previewCamera = s01Preview ? getS01PreviewCamera(camera.aspect, inspection === "s01-diagnostic") : null;
    camera.fov = previewCamera?.fov ?? ((from.fov + (to.fov - from.fov) * mix) + (camera.aspect < 0.78 ? 7 : 0));
    camera.updateProjectionMatrix();
    if (s01Preview) {
      canvas.dataset.s01Camera = position.toArray().map(value => value.toFixed(4)).join(",");
      canvas.dataset.s01Target = target.toArray().map(value => value.toFixed(4)).join(",");
      canvas.dataset.s01Fov = camera.fov.toFixed(2);
      canvas.dataset.s01RootRotation = [character.root.rotation.x, character.root.rotation.y, character.root.rotation.z]
        .map(value => value.toFixed(4)).join(",");
      canvas.dataset.s01Look = s01Look;
      canvas.dataset.s01Atmosphere = s01Options.atmosphere ?? "off";
      canvas.dataset.s01BackgroundOnly = String(Boolean(s01Options.backgroundOnly));
    }
    typography?.resize(camera.aspect, camera.fov);
    const s01Lighting = getS01LightingProfile(s01Look);
    if (s01Preview) lighting.setScene(s01Lighting.key, s01Lighting.fill, s01Lighting.rim, s01Lighting.environment, s01Lighting.spectral);
    else lighting.setScene(
      from.key + (to.key - from.key) * mix,
      from.fill + (to.fill - from.fill) * mix,
      from.rim + (to.rim - from.rim) * mix,
      from.environment + (to.environment - from.environment) * mix,
      ramp(progress, .14, .21) * (1 - ramp(progress, .43, .59)) * 2.5,
    );
    renderer.toneMappingExposure = s01Preview ? s01Lighting.exposure : .73 + ramp(progress, .16, .24) * (1 - ramp(progress, .43, .59)) * .10;
    if (bloom) bloom.strength = .20 + Math.max(0, impact) * .25;
    if (camera.aspect >= 0.78 && composer) composer.render();
    else renderer.render(scene, camera);
  };
  const schedule = () => {
    if (!frame && !disposed && visible && !document.hidden) frame = requestAnimationFrame(draw);
  };
  const resize = () => {
    if (disposed) return;
    const width = Math.max(1, canvas.clientWidth);
    const height = Math.max(1, canvas.clientHeight);
    const ratio = glacierPixelRatio();
    renderer.setPixelRatio(ratio);
    renderer.setSize(width, height, false);
    composer?.setPixelRatio(ratio);
    composer?.setSize(width, height);
    backdrop?.resize(width, height, ratio);
    s01Atmosphere?.resize(width, height, ratio);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    typography?.resize(camera.aspect, camera.fov);
    schedule();
  };
  resize();

  return {
    setProgress(value) { progress = clamp01(value); schedule(); },
    setVisible(value) {
      visible = value;
      if (!value && frame) { cancelAnimationFrame(frame); frame = 0; }
      else if (value) schedule();
    },
    resize,
    dispose() {
      disposed = true;
      if (frame) cancelAnimationFrame(frame);
      character.dispose();
      aura?.dispose();
      afterimages?.dispose();
      environment?.dispose();
      backdrop?.dispose();
      s01Atmosphere?.dispose();
      typography?.dispose();
      lighting.dispose();
      composer?.dispose();
      delete canvas.dataset.s01Camera;
      delete canvas.dataset.s01Target;
      delete canvas.dataset.s01Fov;
      delete canvas.dataset.s01RootRotation;
      delete canvas.dataset.s01Look;
      delete canvas.dataset.s01Atmosphere;
      delete canvas.dataset.s01BackgroundOnly;
      renderer.dispose();
      renderer.forceContextLoss();
    },
  };
}
