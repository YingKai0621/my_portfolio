"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const BackgroundCubesGrid = dynamic(
  () => import("@/components/ui/background-cubes-grid").then((module) => module.BackgroundCubesGrid),
  { ssr: false },
);

export function HeroCubes() {
  const [enabled, setEnabled] = useState(false);
  const regionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: no-preference)");
    let inView = false;
    const update = () => setEnabled(query.matches && inView && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      update();
    }, { rootMargin: "100px" });
    if (regionRef.current) observer.observe(regionRef.current);
    query.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      query.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  return (
    <div className="hero-cubes" aria-hidden="true" ref={regionRef}>
      <div className="hero-cubes-static" />
      {enabled ? (
        <BackgroundCubesGrid
          variant="isometric"
          cellSize={150}
          gap={0.025}
          amplitude={0.7}
          topColor="#18242B"
          leftColor="#111B21"
          rightColor="#0B1216"
          glowColor="#1BA6CD"
          glow={0}
          idleRipples={false}
        />
      ) : null}
    </div>
  );
}
