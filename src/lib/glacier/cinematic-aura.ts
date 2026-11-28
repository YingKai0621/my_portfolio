import { AdditiveBlending, BufferAttribute, BufferGeometry, DoubleSide, Group, Mesh, Scene, ShaderMaterial, Vector3 } from "three";
import { ramp } from "./cinematic-shot-plan";

// Three broken, non-coplanar ribbons, not a camera-facing halo or particle cloud.
// Depth testing lets the armor occlude the rear portions naturally.
export function createCinematicAura(scene: Scene) {
  const group = new Group();
  const ribbons = Array.from({ length: 3 }, (_, index) => {
    const count = 96;
    const vertices = new Float32Array((count + 1) * 6);
    const uv = new Float32Array((count + 1) * 4);
    const indices: number[] = [];
    for (let i = 0; i <= count; i++) {
      uv.set([i / count, 0, i / count, 1], i * 4);
      if (i < count) { const a = i * 2; indices.push(a, a + 1, a + 2, a + 1, a + 3, a + 2); }
    }
    const geometry = new BufferGeometry();
    geometry.setAttribute("position", new BufferAttribute(vertices, 3));
    geometry.setAttribute("uv", new BufferAttribute(uv, 2));
    geometry.setIndex(indices);
    const material = new ShaderMaterial({
      transparent: true, depthWrite: false, side: DoubleSide, blending: AdditiveBlending,
      uniforms: { uStrength: { value: 0 }, uPhase: { value: index * 1.7 } },
      vertexShader: `varying vec2 vUv; void main(){vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
      fragmentShader: `varying vec2 vUv; uniform float uStrength; uniform float uPhase;
        void main(){
          float edge=pow(1.-abs(vUv.y*2.-1.),2.);
          float taper=sin(vUv.x*3.14159);
          float streak=.35+.65*pow(.5+.5*sin(vUv.x*24.-uPhase),3.);
          vec3 spectrum=.5+.5*cos(vec3(.3,2.1,4.4)+vUv.x*5.+uPhase*.16);
          vec3 color=mix(vec3(.05,.8,1.),spectrum,.6);
          gl_FragColor=vec4(color*1.8,edge*taper*streak*uStrength);
        }`,
    });
    const mesh = new Mesh(geometry, material);
    mesh.frustumCulled = false;
    group.add(mesh);
    return { geometry, material, vertices, count, index };
  });
  scene.add(group);
  return {
    setProgress(p: number, origin: Vector3, palm: Vector3, enabled: boolean) {
      const strength = ramp(p, .17, .24) * (1 - ramp(p, .63, .70));
      group.visible = enabled && strength > .001;
      if (!group.visible) return;
      const gather = ramp(p, .445, .53) * .65;
      group.position.copy(origin).lerp(palm, gather);
      ribbons.forEach(({ geometry, material, vertices, count, index }) => {
        material.uniforms.uStrength.value = strength * (.55 + .3 * ramp(p, .505, .578));
        material.uniforms.uPhase.value = index * 1.7 + p * 19;
        for (let i = 0; i <= count; i++) {
          const t = i / count;
          const angle = t * Math.PI * (1.3 + index * .24) + index * 2.1 + p * 11;
          const radius = (1.65 + Math.sin(t * 11 + index + p * 6) * .23 + Math.sin(t * 21 + p * 8) * .09) * (1 - gather * .55);
          const y = (t - .5) * 4.5 * (1 - gather * .65) + Math.sin(angle * 1.7) * .2;
          const width = .045 + .025 * Math.sin(t * 14 + index);
          vertices.set([Math.cos(angle)*radius,y-width,Math.sin(angle)*radius*.85,Math.cos(angle)*radius,y+width,Math.sin(angle)*radius*.85], i * 6);
        }
        geometry.attributes.position.needsUpdate = true;
      });
    },
    dispose() { scene.remove(group); ribbons.forEach(({ geometry, material }) => { geometry.dispose(); material.dispose(); }); },
  };
}
