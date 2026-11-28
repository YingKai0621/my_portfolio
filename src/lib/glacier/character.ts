import { AnimationMixer, Box3, Group, Mesh, MeshStandardMaterial, Vector3 } from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/addons/libs/meshopt_decoder.module.js";
import { CHARACTER_MANIFEST, type CharacterClip } from "./manifest";

// Provisional local-development asset. Permission scope is documented in DESIGN_REFERENCES.
export type { CharacterClip } from "./manifest";
export type MaterialRole = "silver" | "graphite" | "gold" | "emissive";

export async function loadGlacierCharacter() {
  const loader = new GLTFLoader();
  loader.setMeshoptDecoder(MeshoptDecoder);
  const gltf = await loader.loadAsync(CHARACTER_MANIFEST.url);
  const root = gltf.scene;
  const rawBounds = new Box3().setFromObject(root);
  if (rawBounds.isEmpty()) throw new Error("Mecha model has no visible geometry");
  const size = rawBounds.getSize(new Vector3());
  const center = rawBounds.getCenter(new Vector3());
  const normalized = new Group();
  const scale = CHARACTER_MANIFEST.height / size.y;
  root.scale.setScalar(scale);
  root.position.set(-center.x * scale, -rawBounds.min.y * scale, -center.z * scale);
  normalized.add(root);
  normalized.updateMatrixWorld(true);

  const head = CHARACTER_MANIFEST.nodes.head.map((name) => root.getObjectByName(name)).find(Boolean);
  const headPosition = head?.getWorldPosition(new Vector3()) ?? new Vector3(0, 4.35, 0);
  const hips = root.getObjectByName(CHARACTER_MANIFEST.nodes.hips);
  const hipsOrigin = hips?.getWorldPosition(new Vector3()) ?? new Vector3(0, 2.5, 0);
  const mixer = new AnimationMixer(root);
  const clips = Object.fromEntries(CHARACTER_MANIFEST.clips.map((name) => {
    const clip = gltf.animations.find((item) => item.name === name);
    if (!clip) throw new Error(`Missing character clip: ${name}`);
    const action = mixer.clipAction(clip);
    if (!action) throw new Error(`Could not create animation action: ${name}`);
    action.play();
    action.setEffectiveWeight(0);
    return [name, { clip, action }];
  })) as Record<CharacterClip, { clip: (typeof gltf.animations)[number]; action: NonNullable<ReturnType<typeof mixer.clipAction>> }>;

  let meshes = 0;
  let materials = 0;
  const materialSet = new Set<unknown>();
  const materialSlots = new Map<MeshStandardMaterial, MaterialRole>();
  normalized.traverse((object) => {
    if (!(object instanceof Mesh)) return;
    meshes++;
    // The build/descent clips translate the skeleton far beyond its bind-pose bounds.
    // Static frustum bounds would otherwise cull the visible skinned character.
    object.frustumCulled = false;
    object.castShadow = false;
    object.receiveShadow = false;
    for (const material of Array.isArray(object.material) ? object.material : [object.material]) {
      materialSet.add(material);
      if (material instanceof MeshStandardMaterial) {
        const role: MaterialRole = material.name.includes("Gold") ? "gold" : material.name.includes("Black") ? "graphite" : material.name.includes("Emissive") ? "emissive" : "silver";
        materialSlots.set(material, role);
      }
    }
  });
  materials = materialSet.size;

  return {
    root: normalized,
    mixer,
    clips,
    height: CHARACTER_MANIFEST.height,
    headPosition,
    getHipsOffset: () => hips ? hips.getWorldPosition(new Vector3()).sub(hipsOrigin) : new Vector3(),
    materialSlots,
    diagnostics: { meshes, materials, joints: gltf.parser.json.skins?.[0]?.joints?.length ?? 0, clips: gltf.animations.map((clip) => ({ name: clip.name, duration: clip.duration })) },
    dispose() {
      mixer.stopAllAction();
      normalized.traverse((object) => {
        if (!(object instanceof Mesh)) return;
        object.geometry.dispose();
        for (const material of Array.isArray(object.material) ? object.material : [object.material]) {
          for (const value of Object.values(material)) {
            if (value && typeof value === "object" && "isTexture" in value && value.isTexture && "dispose" in value && typeof value.dispose === "function") value.dispose();
          }
          material.dispose();
        }
      });
    },
  };
}
