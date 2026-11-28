import {
  AmbientLight, Color, DirectionalLight, DoubleSide, Mesh, MeshBasicMaterial,
  PlaneGeometry, PMREMGenerator, Scene, WebGLRenderer,
} from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

function addReflectionPanel(environment: Scene, color: Color, width: number, height: number, x: number, y: number, z: number, rotationY = 0) {
  const panel = new Mesh(
    new PlaneGeometry(width, height),
    new MeshBasicMaterial({ color, side: DoubleSide, toneMapped: false }),
  );
  panel.position.set(x, y, z);
  panel.rotation.y = rotationY;
  environment.add(panel);
  return panel;
}

export function createHeroLighting(scene: Scene, renderer: WebGLRenderer, cinematic = false) {
  // Broad rectangular reflections give the armor distinct metallic planes without a borrowed HDRI.
  const environment = cinematic ? new Scene() : new RoomEnvironment();
  const panels = [
    addReflectionPanel(environment, new Color(cinematic ? "#F2FBFF" : "#DAE6EB"), cinematic ? 0.42 : 1.2, 5.6, -3.1, 0.5, 2.2, 0.4),
    addReflectionPanel(environment, new Color(cinematic ? "#00D9FF" : "#5EBDD6"), 0.55, 4.4, 3.1, 0.7, -1.4, -0.45),
    addReflectionPanel(environment, new Color(cinematic ? "#5F7B91" : "#809CA7"), cinematic ? 1.9 : 4.4, 0.8, 0, 3.8, 1.2),
    ...(cinematic ? [addReflectionPanel(environment, new Color("#7964FF"), 0.7, 4.2, -1.1, 1.3, -3.2, 0.55)] : []),
  ];
  const pmrem = new PMREMGenerator(renderer);
  const reflected = pmrem.fromScene(environment, 0.035);
  scene.environment = reflected.texture;
  scene.environmentIntensity = 0.58;
  pmrem.dispose();
  for (const panel of panels) { panel.geometry.dispose(); (panel.material as MeshBasicMaterial).dispose(); }
  if (environment instanceof RoomEnvironment) environment.dispose();

  const ambient = new AmbientLight(cinematic ? "#66808D" : "#8AA6B2", cinematic ? 0.095 : 0.32);
  const key = new DirectionalLight("#E8F3F6", 0.8);
  key.position.set(-3.5, 6.5, 5);
  const fill = new DirectionalLight(cinematic ? "#65879A" : "#7499A9", 0.55);
  fill.position.set(3.5, 2.2, 5);
  const rim = new DirectionalLight(cinematic ? "#00D9FF" : "#1BA6CD", 0.25);
  rim.position.set(3, 5, -4);
  const spectral = new DirectionalLight("#B075EF", 0);
  spectral.position.set(-5, 2.5, -2);
  const spectralPink = new DirectionalLight("#F17ACD", 0);
  spectralPink.position.set(4.2, 4.6, 1.8);
  scene.add(ambient, key, fill, rim, spectral, spectralPink);

  return {
    setActivation(value: number) {
      key.intensity = 0.9 + value * 2.0;
      fill.intensity = 0.55 + value * 0.6;
      rim.intensity = 0.25 + value * 3.2;
    },
    setScene(keyLevel: number, fillLevel: number, rimLevel: number, environmentLevel: number, spectralLevel = 0) {
      key.intensity = keyLevel;
      fill.intensity = fillLevel;
      rim.intensity = rimLevel;
      scene.environmentIntensity = environmentLevel;
      spectral.intensity = spectralLevel;
      spectralPink.intensity = spectralLevel * 0.48;
    },
    dispose() {
      scene.remove(ambient, key, fill, rim, spectral, spectralPink);
      scene.environment = null;
      reflected.dispose();
    },
  };
}
