"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";

import { technologyMarkName, type TechnologyMark } from "@/components/sections/technology-logos";

type Point = { x: number; y: number; z: number };
type HitTarget = { mark: TechnologyMark; x: number; y: number; radius: number };

function spherePoints(count: number): Point[] {
  const angle = Math.PI * (3 - Math.sqrt(5));
  return Array.from({ length: count }, (_, index) => {
    const y = 1 - (2 * (index + 0.5)) / count;
    const ring = Math.sqrt(1 - y * y);
    return { x: Math.cos(index * angle) * ring, y, z: Math.sin(index * angle) * ring };
  });
}

type Props = {
  marks: readonly TechnologyMark[];
  activeMarks: readonly TechnologyMark[];
  cloudLabel: string;
  keyboardHint: string;
  pauseLabel: string;
  resumeLabel: string;
};

// Original, responsive canvas adaptation of the public Icon Cloud interaction.
// Semantic technology names remain in the adjacent inventory when canvas is unavailable.
export function CapabilityIconCloud({
  marks, activeMarks, cloudLabel, keyboardHint, pauseLabel, resumeLabel,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const paintRef = useRef<() => void>(() => {});
  const sizeRef = useRef({ width: 0, height: 0 });
  const hitTargetsRef = useRef<HitTarget[]>([]);
  const rotationRef = useRef({ x: -0.18, y: 0.28 });
  const dragRef = useRef<{ pointerId: number; x: number; y: number } | null>(null);
  const activeMarksRef = useRef(activeMarks);
  const instructionId = useId();
  const [ready, setReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [paused, setPaused] = useState(false);
  const [hoveredMark, setHoveredMark] = useState<TechnologyMark | null>(null);
  const [focused, setFocused] = useState(false);
  const [focusIndex, setFocusIndex] = useState(0);

  useEffect(() => {
    activeMarksRef.current = activeMarks;
    paintRef.current();
  }, [activeMarks]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const points = spherePoints(marks.length);
    const images = marks.map((mark) => {
      const image = new Image();
      image.onload = () => paintRef.current();
      image.src = `/images/technologies/${mark}.svg`;
      return image;
    });

    const paint = () => {
      const { width, height } = sizeRef.current;
      if (!width || !height) return;
      context.clearRect(0, 0, width, height);
      const radius = Math.min(width, height) * 0.38;
      const { x: tilt, y: turn } = rotationRef.current;
      const cosX = Math.cos(tilt);
      const sinX = Math.sin(tilt);
      const cosY = Math.cos(turn);
      const sinY = Math.sin(turn);
      const active = new Set<string>(activeMarksRef.current);

      const projected = points.map((point, index) => {
        const x = point.x * cosY - point.z * sinY;
        const turnedZ = point.x * sinY + point.z * cosY;
        return {
          index,
          x,
          y: point.y * cosX - turnedZ * sinX,
          z: point.y * sinX + turnedZ * cosX,
        };
      }).sort((a, b) => a.z - b.z);

      const hitTargets: HitTarget[] = [];
      for (const point of projected) {
        const image = images[point.index];
        if (!image.complete || !image.naturalWidth) continue;
        const depth = (point.z + 1) / 2;
        const iconSize = (44 + depth * 18) * Math.min(1, width / 520);
        const centerX = width / 2 + point.x * radius;
        const centerY = height / 2 + point.y * radius;
        const mark = marks[point.index];
        context.globalAlpha = active.has(mark)
          ? 0.78 + depth * 0.22
          : 0.72 + depth * 0.22;
        context.drawImage(image, centerX - iconSize / 2, centerY - iconSize / 2, iconSize, iconSize);
        hitTargets.push({ mark, x: centerX, y: centerY, radius: iconSize * 0.52 });
      }
      context.globalAlpha = 1;
      hitTargetsRef.current = hitTargets;
    };

    paintRef.current = paint;
    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      if (!width || !height) return;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      sizeRef.current = { width, height };
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      paint();
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    resize();
    setReady(true);

    return () => {
      resizeObserver.disconnect();
      images.forEach((image) => { image.onload = null; });
      paintRef.current = () => {};
      hitTargetsRef.current = [];
    };
  }, [marks]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => setReducedMotion(preference.matches);
    const syncVisibility = () => setPageVisible(!document.hidden);
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.05 },
    );
    observer.observe(canvas);
    syncPreference();
    syncVisibility();
    preference.addEventListener("change", syncPreference);
    document.addEventListener("visibilitychange", syncVisibility);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", syncPreference);
      document.removeEventListener("visibilitychange", syncVisibility);
    };
  }, []);

  useEffect(() => {
    paintRef.current();
    if (!ready || reducedMotion || paused || !inView || !pageVisible) return;
    let frame = 0;
    let previous = 0;
    const tick = (now: number) => {
      if (previous && !dragRef.current) {
        rotationRef.current.y += Math.min(now - previous, 32) * 0.0002;
      }
      previous = now;
      paintRef.current();
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [activeMarks, ready, reducedMotion, paused, inView, pageVisible]);

  const onPointerDown = (event: PointerEvent<HTMLCanvasElement>) => {
    if (reducedMotion || dragRef.current) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    event.currentTarget.dataset.dragging = "true";
    dragRef.current = { pointerId: event.pointerId, x: event.clientX, y: event.clientY };
  };

  const onPointerMove = (event: PointerEvent<HTMLCanvasElement>) => {
    const drag = dragRef.current;
    if (drag?.pointerId === event.pointerId && !reducedMotion) {
      rotationRef.current.y += (event.clientX - drag.x) * 0.006;
      rotationRef.current.x = Math.max(-1.1, Math.min(1.1,
        rotationRef.current.x + (event.clientY - drag.y) * 0.006,
      ));
      dragRef.current = { pointerId: drag.pointerId, x: event.clientX, y: event.clientY };
      paintRef.current();
      return;
    }
    if (event.pointerType === "touch") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const hit = [...hitTargetsRef.current].reverse().find((target) =>
      Math.hypot(target.x - x, target.y - y) < target.radius,
    );
    setHoveredMark((previous) => previous === hit?.mark ? previous : hit?.mark ?? null);
  };

  const endDrag = (event: PointerEvent<HTMLCanvasElement>) => {
    if (dragRef.current?.pointerId !== event.pointerId) return;
    dragRef.current = null;
    delete event.currentTarget.dataset.dragging;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const onKeyDown = (event: KeyboardEvent<HTMLCanvasElement>) => {
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      const step = event.key === "ArrowRight" ? 1 : -1;
      setFocusIndex((index) => (index + step + marks.length) % marks.length);
    } else if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      setFocusIndex(event.key === "Home" ? 0 : marks.length - 1);
    }
  };

  const visibleMark = hoveredMark ?? (focused ? marks[focusIndex] : null);

  return (
    <div className="expertise-cloud" data-ready={ready}>
      <span className="sr-only" id={instructionId}>{keyboardHint}</span>
      <canvas
        ref={canvasRef}
        className="expertise-cloud-canvas"
        role="img"
        tabIndex={ready ? 0 : -1}
        aria-label={`${cloudLabel}: ${technologyMarkName(marks[focusIndex])}`}
        aria-describedby={instructionId}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerLeave={() => setHoveredMark(null)}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      />
      <output className="expertise-cloud-name" data-visible={Boolean(visibleMark)} aria-live="polite">
        {visibleMark ? technologyMarkName(visibleMark) : ""}
      </output>
      {ready && !reducedMotion && (
        <button
          className="expertise-cloud-toggle"
          type="button"
          onClick={() => setPaused((value) => !value)}
          aria-label={paused ? resumeLabel : pauseLabel}
        >
          {paused ? (
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m8 5 11 7-11 7V5Z" fill="currentColor" /></svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 5v14m10-14v14" stroke="currentColor" strokeWidth="3" strokeLinecap="square" /></svg>
          )}
        </button>
      )}
    </div>
  );
}
