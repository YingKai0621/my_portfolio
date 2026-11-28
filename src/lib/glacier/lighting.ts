import { AmbientLight, DirectionalLight, PMREMGenerator, Scene, WebGLRenderer } from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

export function createGlacierLighting(scene: Scene, renderer: WebGLRenderer) {
  const pmrem = new PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  const environment = pmrem.fromScene(room, 0.05);
  scene.environment = environment.texture;
  room.dispose();
  pmrem.dispose();

  const ambient = new AmbientLight(0xc6dbe2, 0.45);
  const key = new DirectionalLight(0xf3f7fa, 2.5);
  key.position.set(-3, 6, 5);
  const rim = new DirectionalLight(0x1ba6cd, 3);
  rim.position.set(4, 4, -4);
  const side = new DirectionalLight(0xadc3cd, 1.25);
  side.position.set(2, 1, 5);
  scene.add(ambient, key, rim, side);

  return {
    setIntensity(keyValue: number, rimValue: number) { key.intensity = keyValue; rim.intensity = rimValue; },
    dispose() { scene.remove(ambient, key, rim, side); scene.environment = null; environment.dispose(); },
  };
}
