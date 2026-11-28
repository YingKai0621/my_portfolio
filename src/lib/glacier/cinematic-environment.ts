import { BoxGeometry, Color, DoubleSide, Group, Mesh, MeshBasicMaterial, MeshStandardMaterial, PlaneGeometry, PointLight, Scene, ShaderMaterial } from "three";
import { ramp } from "./cinematic-shot-plan";
import { CONTACT_PROGRESS } from "./cinematic-timing";

export function createCinematicEnvironment(scene: Scene) {
  const group = new Group();
  const box = new BoxGeometry(1, 1, 1);
  const plane = new PlaneGeometry(1, 1);
  const stone = new MeshStandardMaterial({ color: "#10191F", metalness: .76, roughness: .28 });
  const top = new MeshStandardMaterial({ color: "#19242B", metalness: .85, roughness: .23 });
  const body = new MeshStandardMaterial({ color: "#0B1013", metalness: .8, roughness: .29 });
  const platform = new Group();
  platform.position.set(2.7, -.35, 0);
  const slab = new Mesh(box, stone); slab.scale.set(6.2, .62, 5.3); platform.add(slab);
  const surface = new Mesh(box, top); surface.scale.set(6.05, .08, 5.15); surface.position.y = .31; platform.add(surface);
  const edgeMaterial = new MeshBasicMaterial({ color: "#1BA6CD", transparent: true, opacity: .45, toneMapped: false });
  const edge = new Mesh(box, edgeMaterial); edge.scale.set(5.7, .018, .012); edge.position.set(0, -.02, 2.657); platform.add(edge);
  group.add(platform);
  const floor = new Mesh(plane, stone); floor.rotation.x = -Math.PI / 2; floor.scale.set(40, 40, 1); floor.position.set(0, -.68, -12); group.add(floor);
  const placements = [
    [-4.4,-3.5,7,.48], [5.5,-4.3,8.5,.46], [-6.4,-8.2,10,.68], [7.3,-9.4,13,.68],
    [-2.1,-12.2,11,.72], [3,-15,15,.8], [-8.7,-17,14,.8], [8.8,-19.5,17,.7],
  ];
  const structures = placements.map(([x,z,h,w], i) => {
    const pillar = new Group();
    const shell = new Mesh(box, body); shell.scale.set(w,h,w*.75); shell.position.y=h/2; pillar.add(shell);
    const light = new ShaderMaterial({
      transparent: true, depthWrite: false, side: DoubleSide,
      uniforms: { uColor:{value:new Color(i%3===0?"#70D9F4":i%3===1?"#E8F3F6":"#8B7EE8")}, uEnergy:{value:0} },
      vertexShader:`varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
      fragmentShader:`varying vec2 vUv;uniform vec3 uColor;uniform float uEnergy;
        void main(){float core=pow(1.-abs(vUv.x*2.-1.),6.);float falloff=smoothstep(0.,.18,vUv.y)*(1.-smoothstep(.68,1.,vUv.y));
        gl_FragColor=vec4(mix(uColor,uColor+vec3(1.4),core)*uEnergy,falloff*(.25+.75*core));}`,
    });
    const strip = new Mesh(plane, light); strip.scale.set(w*.23,h*.95,1); strip.position.set(w*.22,h*.52,w*.38+.003); pillar.add(strip);
    pillar.position.set(x,0,z); group.add(pillar);
    return { pillar, light, h, start:.46+i*.014 };
  });
  // Local lights react with the same hand/impact coordinates as the emissive cores.
  const cyan = new PointLight("#70D9F4", 0, 22, 2); cyan.position.set(-3,7,3);
  const violet = new PointLight("#8578DF", 0, 20, 2); violet.position.set(5,5,-2);
  group.add(cyan,violet);
  const shadowMaterial = new ShaderMaterial({
    transparent:true,depthWrite:false,
    uniforms:{uOpacity:{value:0}},
    vertexShader:`varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
    fragmentShader:`varying vec2 vUv;uniform float uOpacity;void main(){float d=length((vUv-.5)*2.);gl_FragColor=vec4(0.,0.,0.,(1.-smoothstep(.18,.95,d))*uOpacity);}`,
  });
  const shadow=new Mesh(plane,shadowMaterial);shadow.rotation.x=-Math.PI/2;shadow.position.set(2.7,.008,.15);shadow.scale.set(3.4,3.4,1);group.add(shadow);
  scene.add(group);
  return {
    setProgress(p:number) {
      const world=ramp(p,.425,.47), landing=ramp(p,.605,.65);
      group.visible=world>.001;
      floor.visible=landing>.01;
      platform.visible=landing>.001;
      platform.position.y=-.35-(1-landing)*1.8;
      const elapsed=(p-CONTACT_PROGRESS)/.025;
      const impact=elapsed>=0&&elapsed<=1?Math.exp(-elapsed*4)*Math.sin(Math.PI*Math.min(1,elapsed*5)):0;
      structures.forEach(({pillar,light,h,start},i)=>{
        const arrival=ramp(p,start,start+.085);
        pillar.position.y=-(1-arrival)*h;
        pillar.visible=arrival>.001;
        light.uniforms.uEnergy.value=(.65+arrival*1.8+Math.max(0,impact)*.7)*(1-i*.055);
      });
      const charge=ramp(p,.49,.585);
      cyan.intensity=charge*12+Math.max(0,impact)*22;
      violet.intensity=charge*5+Math.max(0,impact)*8;
      cyan.position.y=7-ramp(p,.66,.72)*5;
      edgeMaterial.opacity=landing*(.3+Math.max(0,impact)*.6);
      shadowMaterial.uniforms.uOpacity.value=ramp(p,.695,CONTACT_PROGRESS)*.8;
      shadow.visible=landing>.01;
    },
    dispose(){scene.remove(group);box.dispose();plane.dispose();[stone,top,body,edgeMaterial,shadowMaterial].forEach(m=>m.dispose());structures.forEach(s=>s.light.dispose());},
  };
}
