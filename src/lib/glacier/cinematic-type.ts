import { CanvasTexture, DoubleSide, Mesh, MeshBasicMaterial, PerspectiveCamera, PlaneGeometry, SRGBColorSpace } from "three";

import { ramp } from "./cinematic-shot-plan";

const windows = [
  [0, .0075, .05, .07],
  [.215, .225, .24, .255],
  [2, 2.1, 2.2, 2.3],
  [2, 2.1, 2.2, 2.3], // SYSTEMS must never survive into the personal introduction.
] as const;

// Camera-attached outline text sits physically behind the model, so its depth
// is naturally occluded by armor instead of approximating a DOM silhouette.
export function createCinematicType(camera: PerspectiveCamera, words: readonly string[]) {
  const geometry = new PlaneGeometry(1, 1);
  const family = getComputedStyle(document.documentElement).getPropertyValue("--font-be-vietnam-pro").trim() || "Arial";
  const entries = words.map((word) => {
    const canvas = document.createElement("canvas");
    canvas.width = 1600;
    canvas.height = 340;
    const context = canvas.getContext("2d");
    if (context) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.font = `900 220px ${family}`;
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.lineJoin = "round";
      context.lineWidth = 2.4;
      context.strokeStyle = "#A8D6E4";
      context.strokeText(word, 800, 180, 1530);
    }
    const texture = new CanvasTexture(canvas);
    texture.colorSpace = SRGBColorSpace;
    const material = new MeshBasicMaterial({ map: texture, transparent: true, opacity: 0, depthWrite: false, depthTest: true, side: DoubleSide, toneMapped: false });
    const mesh = new Mesh(geometry, material);
    mesh.position.set(0, 0, -18);
    mesh.renderOrder = 4;
    camera.add(mesh);
    return { mesh, material, texture };
  });
  return {
    setProgress(progress: number) {
      entries.forEach(({ mesh, material }, index) => {
        const [enter, full, leave, gone] = windows[index];
        material.opacity = .26 * ramp(progress, enter, full) * (1 - ramp(progress, leave, gone));
        mesh.position.x = (progress - enter) * (index % 2 ? -1.2 : 1.2);
      });
    },
    resize(aspect: number, fov: number) {
      const height = 2 * Math.tan((fov * Math.PI / 180) / 2) * 18;
      entries.forEach(({ mesh }, index) => {
        mesh.scale.set(height * aspect * 1.25, height * .28, 1);
        mesh.position.y = index === 3 ? height * .15 : -height * .08;
      });
    },
    dispose() { entries.forEach(({ mesh, material, texture }) => { camera.remove(mesh); material.dispose(); texture.dispose(); }); geometry.dispose(); },
  };
}
