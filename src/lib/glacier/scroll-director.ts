import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function createGlacierScrollDirector(section: HTMLElement, stage: HTMLElement, onProgress: (value: number) => void) {
  gsap.registerPlugin(ScrollTrigger);
  const state = { progress: 0 };
  const timeline = gsap.timeline({ paused: true }).to(state, {
    progress: 1,
    duration: 1,
    ease: "none",
    onUpdate: () => onProgress(state.progress),
  });
  const trigger = ScrollTrigger.create({
    trigger: section,
    start: "top top",
    end: () => `+=${Math.round(window.innerHeight * 2.7)}`,
    pin: stage,
    pinSpacing: true,
    scrub: true,
    animation: timeline,
    invalidateOnRefresh: true,
  });
  return () => { trigger.kill(); timeline.kill(); };
}
