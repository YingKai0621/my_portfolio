"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import type { GlacierSceneController } from "@/lib/glacier/scene";
import { createGlacierScrollDirector } from "@/lib/glacier/scroll-director";

type Labels = {
  label: string; loading: string; unavailable: string;
  skip: string; scroll: string; scenes: string[];
};

export function GlacierExperience({ labels }: { labels: Labels }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const controllerRef = useRef<GlacierSceneController | null>(null);
  const progressRef = useRef(0);
  const sceneRef = useRef(0);
  const [sceneIndex, setSceneIndex] = useState(0);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!section || !stage || !canvas) return;
    let alive = true;
    let requested = false;
    let visible = false;
    let stopScroll: (() => void) | null = null;
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateProgress = (value: number) => {
      progressRef.current = value;
      controllerRef.current?.setProgress(value);
      const next = Math.min(3, Math.floor(Math.min(0.99999, value) * 4));
      if (next !== sceneRef.current) { sceneRef.current = next; setSceneIndex(next); }
    };
    const setupScroll = () => {
      stopScroll?.();
      stopScroll = null;
      const isReduced = motionQuery.matches;
      setReduced(isReduced);
      if (isReduced) { updateProgress(1); return; }
      stopScroll = createGlacierScrollDirector(section, stage, updateProgress);
    };
    setupScroll();

    const loadObserver = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || requested) return;
      requested = true;
      loadObserver.disconnect();
      import("@/lib/glacier/scene").then(({ createGlacierScene }) =>
        createGlacierScene({ canvas, onReady: (diagnostics) => {
          if (!alive) return;
          if (process.env.NODE_ENV === "development") console.info("[Project Glacier] Character verified", diagnostics);
          setReady(true);
        } }),
      ).then((controller) => {
        if (!alive) { controller.dispose(); return; }
        controllerRef.current = controller;
        controller.setProgress(motionQuery.matches ? 1 : progressRef.current);
        controller.setVisible(visible);
      }).catch((error) => {
        if (!alive) return;
        console.error("[Project Glacier] Could not load the provisional model", error);
        stopScroll?.();
        stopScroll = null;
        setFailed(true);
      });
    }, { rootMargin: "700px 0px" });
    loadObserver.observe(section);

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      controllerRef.current?.setVisible(visible);
    }, { threshold: 0.01 });
    visibilityObserver.observe(stage);
    const onVisibility = () => controllerRef.current?.setVisible(visible && !document.hidden);
    const onMotionChange = () => setupScroll();
    document.addEventListener("visibilitychange", onVisibility);
    motionQuery.addEventListener("change", onMotionChange);
    const resizeObserver = new ResizeObserver(() => controllerRef.current?.resize());
    resizeObserver.observe(stage);

    return () => {
      alive = false;
      loadObserver.disconnect();
      visibilityObserver.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      motionQuery.removeEventListener("change", onMotionChange);
      stopScroll?.();
      controllerRef.current?.dispose();
      controllerRef.current = null;
    };
  }, []);

  const skipExperience = (event: MouseEvent<HTMLAnchorElement>) => {
    const end = document.getElementById("glacier-end");
    if (!end) return;
    event.preventDefault();
    const html = document.documentElement;
    const previous = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";
    end.scrollIntoView({ block: "end" });
    html.style.scrollBehavior = previous;
    end.focus({ preventScroll: true });
    ScrollTrigger.update();
  };

  return (
    <div className={`glacier-experience glacier-scene-${sceneIndex}${reduced ? " is-reduced" : ""}${failed ? " is-failed" : ""}`} ref={sectionRef}>
      <div className="glacier-stage" ref={stageRef}>
        <div className="glacier-atmosphere" aria-hidden="true" />
        <canvas className={`glacier-canvas${ready ? " is-ready" : ""}`} ref={canvasRef} aria-hidden="true" />
        <div className="glacier-copy" aria-live="off">
          {labels.scenes.map((heading, index) => (
            <div key={heading} className={`glacier-chapter glacier-chapter-${index}${sceneIndex === index ? " is-active" : ""}`} aria-hidden={sceneIndex !== index}>
              <p className="glacier-chapter-index">0{index + 1} / 04</p>
              <h2>{heading}</h2>
            </div>
          ))}
        </div>
        {failed && <ol className="glacier-fallback">{labels.scenes.map((heading, index) => <li key={heading}><span>0{index + 1}</span>{heading}</li>)}</ol>}
        {!ready && <p className="glacier-status" role="status">{failed ? labels.unavailable : labels.loading}</p>}
        <div className="glacier-bottom-bar">
          <p className="glacier-scroll-cue">{labels.scroll}</p>
          <div className="glacier-actions">
            <a href="#glacier-end" onClick={skipExperience}>{labels.skip} <span aria-hidden="true">↘</span></a>
          </div>
        </div>
      </div>
      {!failed && <ol className="sr-only" aria-label={labels.label}>{labels.scenes.map((heading) => <li key={heading}>{heading}</li>)}</ol>}
    </div>
  );
}
