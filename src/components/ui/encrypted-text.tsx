"use client";

// Adapted from the Aceternity UI Encrypted Text registry component.
import { useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type EncryptedTextProps = {
  text: string;
  className?: string;
  encryptedClassName?: string;
  revealedClassName?: string;
  revealDelayMs?: number;
  flipDelayMs?: number;
};

const CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const REVEAL_KEY = "lkd-hero-name-revealed";

export function EncryptedText({
  text,
  className,
  encryptedClassName,
  revealedClassName,
  revealDelayMs = 26,
  flipDelayMs = 52,
}: EncryptedTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reducedMotion = useReducedMotion();
  const [frame, setFrame] = useState<{ revealed: number; seed: number } | null>(null);

  useEffect(() => {
    if (!inView || reducedMotion || sessionStorage.getItem(REVEAL_KEY)) return;

    let raf = 0;
    const start = performance.now();

    const update = (now: number) => {
      const elapsed = now - start;
      const revealed = Math.min(text.length, Math.floor(elapsed / revealDelayMs));
      if (revealed >= text.length) {
        sessionStorage.setItem(REVEAL_KEY, "1");
        setFrame(null);
        return;
      }
      setFrame({ revealed, seed: Math.floor(elapsed / flipDelayMs) });
      raf = requestAnimationFrame(update);
    };

    raf = requestAnimationFrame(update);
    return () => {
      cancelAnimationFrame(raf);
    };
  }, [flipDelayMs, inView, reducedMotion, revealDelayMs, text]);

  return (
    <span ref={ref} className={cn(className)} aria-label={text} role="text">
      <span aria-hidden="true">
        {Array.from(text).map((char, index) => {
          const revealed = !frame || index < frame.revealed;
          const display = revealed || char === " " ? char : CHARSET[(index * 7 + frame.seed * 11) % CHARSET.length];
          return <span className={revealed ? revealedClassName : encryptedClassName} key={index}>{display}</span>;
        })}
      </span>
    </span>
  );
}
