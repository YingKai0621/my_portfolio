"use client";

import { useCallback, useEffect, useRef, type ReactNode } from "react";
import { useAnimate, useReducedMotion } from "motion/react";

type Playback = { stop: () => void };

export function PosterReveal({ children, replayLabel }: { children: ReactNode; replayLabel: string }) {
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const prefersReducedMotion = useReducedMotion();
  const active = useRef<Playback[]>([]);

  const play = useCallback(() => {
    if (prefersReducedMotion || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    active.current.forEach((animation) => animation.stop());
    const ease = [0.22, 1, 0.36, 1] as const;
    const portrait = scope.current?.querySelector(".poster-portrait-asset");
    active.current = [
      animate(".poster-name-layer", { opacity: [0.7, 1], transform: ["translateY(-22px) scale(1.025)", "translateY(0) scale(1)"] }, { duration: 1.55, ease }),
      ...(portrait ? [animate(portrait, { opacity: [0.48, 1], transform: ["translateY(36px) scale(1.055)", "translateY(0) scale(1)"] }, { duration: 1.7, delay: 0.12, ease })] : []),
      animate(".poster-profile", { opacity: [0.85, 1], transform: ["translateY(18px)", "translateY(0)"] }, { duration: 0.85, delay: portrait ? 0.55 : 0.22, ease }),
      animate(".poster-links", { opacity: [0.85, 1], transform: ["translateY(18px)", "translateY(0)"] }, { duration: 0.85, delay: portrait ? 0.7 : 0.36, ease }),
    ];
  }, [animate, prefersReducedMotion, scope]);

  useEffect(() => {
    scope.current?.classList.add("is-motion-ready");
    play();
    return () => active.current.forEach((animation) => animation.stop());
  }, [play, scope]);

  return (
    <div className="poster-frame poster-scene" ref={scope}>
      {children}
      <button className="poster-replay" type="button" onClick={play}>
        {replayLabel}
      </button>
    </div>
  );
}
