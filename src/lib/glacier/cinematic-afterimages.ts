import { AnimationMixer, Mesh, MeshBasicMaterial, Scene, SkinnedMesh } from "three";
import { clone } from "three/addons/utils/SkeletonUtils.js";
import { sampleCinematicAnimation, sampleRootPosition, type CinematicRig } from "./cinematic-animation";
import { ramp } from "./cinematic-shot-plan";
import { CONTACT_PROGRESS } from "./cinematic-timing";

// Two pose-owned rigs; shared immutable geometry, independent skeletons/mixers.
// No history buffer: reverse/fast seeks sample the same previous coordinates.
export function createCinematicAfterimages(scene: Scene, source: CinematicRig) {
  const entries = [.006, .012].map((delay, index) => {
    const root = clone(source.root) as typeof source.root;
    const mixer = new AnimationMixer(root);
    const clips = Object.fromEntries(Object.entries(source.clips).map(([name, { clip }]) => {
      const action = mixer.clipAction(clip).play();
      action.setEffectiveWeight(0);
      return [name, { clip, action }];
    })) as CinematicRig["clips"];
    const material = new MeshBasicMaterial({ color: index ? "#7964FF" : "#70D9F4", transparent: true, opacity: .28, depthWrite: false, toneMapped: false });
    const density = { value: 0 };
    material.onBeforeCompile = (shader) => {
      shader.uniforms.uGhostDensity = density;
      shader.fragmentShader = shader.fragmentShader.replace("#include <common>", "#include <common>\nuniform float uGhostDensity;")
        .replace("#include <alphatest_fragment>", `#include <alphatest_fragment>
          vec2 pixel=mod(floor(gl_FragCoord.xy/2.),4.);
          float threshold=mod(pixel.x*4.+pixel.y*7.,16.)/16.;
          if(threshold>uGhostDensity) discard;`);
    };
    material.customProgramCacheKey = () => "h27-ghost-dither";
    root.traverse(object => {
      if (object instanceof Mesh) { object.material = material; object.castShadow = false; object.frustumCulled = false; }
    });
    root.visible = false;
    scene.add(root);
    return { root, mixer, clips, material, density, delay };
  });
  return {
    setProgress(p: number, enabled: boolean, groundCorrection: number) {
      const opacity = ramp(p, .679, .691) * (1 - ramp(p, .706, .735));
      entries.forEach((entry, i) => {
        entry.root.visible = enabled && opacity > .005;
        if (!entry.root.visible) return;
        const previous = p - entry.delay;
        entry.root.position.set(0, 0, 0);
        entry.root.rotation.y = 0;
        sampleCinematicAnimation(entry, previous);
        sampleRootPosition(previous, entry.root.position);
        entry.root.position.y += groundCorrection * ramp(previous, .68, CONTACT_PROGRESS);
        entry.root.updateMatrixWorld(true);
        entry.material.opacity = opacity * (.24 - i * .07);
        entry.density.value = opacity * (.7 - i * .2);
      });
    },
    dispose() {
      entries.forEach(({ root, mixer, material }) => {
        scene.remove(root); mixer.stopAllAction(); mixer.uncacheRoot(root); material.dispose();
        const skeletons = new Set<SkinnedMesh["skeleton"]>();
        root.traverse(o => { if (o instanceof SkinnedMesh) skeletons.add(o.skeleton); });
        skeletons.forEach(s => s.dispose());
      });
    },
  };
}
