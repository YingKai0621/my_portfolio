import {
  AmbientLight, Color, DirectionalLight, DoubleSide, Mesh, MeshBasicMaterial,
  PlaneGeometry, PMREMGenerator, Scene, WebGLRenderer,
} from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

import type { S01LookVariant } from "./cinematic-s01-look";

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

type LightingMode = boolean | "neutral" | Exclude<S01LookVariant, "neutral">;

const S01_REFLECTIONS: Record<Exclude<S01LookVariant, "neutral">, readonly [string, string, string, string]> = {
  cyan: ["#F2F5EF", "#00D9FF", "#5F7B91", "#7964FF"],
  balanced: ["#F2F5EF", "#B6FF00", "#929A94", "#963CFF"],
  contrast: ["#FFFFFF", "#B6FF00", "#59605C", "#963CFF"],
  spectral: ["#F2F5EF", "#B6FF00", "#B6A8C8", "#963CFF"],
  acid: ["#F2F5EF", "#B6FF00", "#819478", "#963CFF"],
  emerald: ["#F2F5EF", "#42F59E", "#A7D9CC", "#61E9FF"],
  toxic: ["#FFFFFF", "#C8FF19", "#97A37B", "#B72CFF"],
};

const S01_LIGHT_COLORS: Record<Exclude<S01LookVariant, "neutral">, { ambient: string; fill: string; rim: string; spectral: string; secondary: string }> = {
  cyan: { ambient: "#66808D", fill: "#65879A", rim: "#00D9FF", spectral: "#B075EF", secondary: "#F17ACD" },
  balanced: { ambient: "#737A75", fill: "#B6FF00", rim: "#963CFF", spectral: "#B6FF00", secondary: "#F17ACD" },
  contrast: { ambient: "#737A75", fill: "#B6FF00", rim: "#963CFF", spectral: "#B6FF00", secondary: "#F17ACD" },
  spectral: { ambient: "#737A75", fill: "#B6FF00", rim: "#963CFF", spectral: "#B6FF00", secondary: "#F17ACD" },
  acid: { ambient: "#6E7B68", fill: "#B6FF00", rim: "#963CFF", spectral: "#B6FF00", secondary: "#963CFF" },
  emerald: { ambient: "#58756B", fill: "#38E58D", rim: "#9DEEFF", spectral: "#66FF99", secondary: "#EAFDFC" },
  toxic: { ambient: "#7D885F", fill: "#C8FF19", rim: "#B72CFF", spectral: "#C8FF19", secondary: "#D84CFF" },
};

export function createHeroLighting(scene: Scene, renderer: WebGLRenderer, mode: LightingMode = false) {
  const cinematic = mode === true;
  const neutral = mode === "neutral";
  const s01Variant = typeof mode === "string" && mode !== "neutral" ? mode : null;
  const s01Reflections = s01Variant ? S01_REFLECTIONS[s01Variant] : null;
  const s01Colors = s01Variant ? S01_LIGHT_COLORS[s01Variant] : null;
  // Broad rectangular reflections give the armor distinct metallic planes without a borrowed HDRI.
  const environment = cinematic || neutral || s01Variant ? new Scene() : new RoomEnvironment();
  const panels = [
    addReflectionPanel(environment, new Color(s01Reflections?.[0] ?? (neutral ? "#E5E8E9" : cinematic ? "#F2FBFF" : "#DAE6EB")), cinematic ? 0.42 : neutral ? 0.75 : s01Variant ? 0.56 : 1.2, 5.6, -3.1, 0.5, 2.2, 0.4),
    addReflectionPanel(environment, new Color(s01Reflections?.[1] ?? (neutral ? "#8A9296" : cinematic ? "#00D9FF" : "#5EBDD6")), s01Variant ? 0.58 : neutral ? 0.85 : 0.55, 4.4, 3.1, 0.7, -1.4, -0.45),
    addReflectionPanel(environment, new Color(s01Reflections?.[2] ?? (neutral ? "#BEC3C5" : cinematic ? "#5F7B91" : "#809CA7")), cinematic ? 1.9 : neutral ? 2.5 : s01Variant ? 1.7 : 4.4, 0.8, 0, 3.8, 1.2),
    ...((cinematic || s01Variant) ? [addReflectionPanel(environment, new Color(s01Reflections?.[3] ?? "#7964FF"), s01Variant === "spectral" ? 1.05 : 0.7, 4.2, -1.1, 1.3, -3.2, 0.55)] : []),
  ];
  const pmrem = new PMREMGenerator(renderer);
  const reflected = pmrem.fromScene(environment, 0.035);
  scene.environment = reflected.texture;
  scene.environmentIntensity = 0.58;
  pmrem.dispose();
  for (const panel of panels) { panel.geometry.dispose(); (panel.material as MeshBasicMaterial).dispose(); }
  if (environment instanceof RoomEnvironment) environment.dispose();

  const ambient = new AmbientLight(neutral ? "#A4AAAD" : s01Colors?.ambient ?? (cinematic ? "#66808D" : "#8AA6B2"), neutral ? 0.28 : s01Variant ? .12 : cinematic ? 0.095 : 0.32);
  const key = new DirectionalLight(neutral ? "#F1F2F2" : s01Variant ? "#F2F5EF" : "#E8F3F6", 0.8);
  key.position.set(-3.5, 6.5, 5);
  const fill = new DirectionalLight(neutral ? "#899094" : s01Colors?.fill ?? (cinematic ? "#65879A" : "#7499A9"), 0.55);
  fill.position.set(3.5, 2.2, 5);
  const rim = new DirectionalLight(neutral ? "#DDE0E1" : s01Colors?.rim ?? (cinematic ? "#00D9FF" : "#1BA6CD"), 0.25);
  rim.position.set(3, 5, -4);
  const spectral = new DirectionalLight(s01Colors?.spectral ?? "#B075EF", 0);
  spectral.position.set(-5, 2.5, -2);
  const spectralPink = new DirectionalLight(s01Colors?.secondary ?? "#F17ACD", 0);
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
