"use client";

import { useEffect, useRef } from "react";

import type { GlacialHeroController } from "@/lib/glacier/hero-scene";

export function GlacialHeroStage() {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // The provisional GLB is authorized only for local visual review, not public builds.
    if (process.env.NODE_ENV !== "development") return;
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;

    let disposed = false;
    let controller: GlacialHeroController | null = null;
    let visible = true;
    let idleId = 0;
    let timerId: ReturnType<typeof setTimeout> | undefined;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(pointer: fine)");

    const load = async () => {
      try {
        const { createGlacialHeroScene } = await import("@/lib/glacier/hero-scene");
        if (disposed) return;
        const next = await createGlacialHeroScene({ canvas, reducedMotion: motion.matches });
        if (disposed) { next.dispose(); return; }
        controller = next;
        controller.setVisible(visible && !document.hidden);
        canvas.classList.add("is-ready");
      } catch (error) {
        if (process.env.NODE_ENV === "development") console.warn("[Glacial Hero] 3D visual unavailable", error);
      }
    };

    // The identity is server-rendered; model decoding never blocks the first text paint.
    if ("requestIdleCallback" in window) idleId = window.requestIdleCallback(load, { timeout: 650 });
    else timerId = setTimeout(load, 100);

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      controller?.setVisible(visible && !document.hidden);
    }, { threshold: 0.01 });
    observer.observe(host);

    const resize = new ResizeObserver(() => controller?.resize());
    resize.observe(host);

    const onPointer = (event: PointerEvent) => {
      if (!finePointer.matches || motion.matches) return;
      const rect = host.getBoundingClientRect();
      controller?.setPointer(
        ((event.clientX - rect.left) / rect.width - 0.5) * 2,
        ((event.clientY - rect.top) / rect.height - 0.5) * 2,
      );
    };
    const onPointerLeave = () => controller?.setPointer(0, 0);
    const onVisibility = () => controller?.setVisible(visible && !document.hidden);
    const onMotion = () => controller?.setReducedMotion(motion.matches);
    host.addEventListener("pointermove", onPointer, { passive: true });
    host.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibility);
    motion.addEventListener("change", onMotion);

    return () => {
      disposed = true;
      if (idleId) window.cancelIdleCallback(idleId);
      if (timerId) clearTimeout(timerId);
      observer.disconnect();
      resize.disconnect();
      host.removeEventListener("pointermove", onPointer);
      host.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      motion.removeEventListener("change", onMotion);
      controller?.dispose();
    };
  }, []);

  return <div className="awakening-render" ref={hostRef} aria-hidden="true"><canvas ref={canvasRef} /></div>;
}
