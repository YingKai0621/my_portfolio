"use client";

// Adapted from the Aceternity UI Layout Text Flip registry component.
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type LayoutTextFlipProps = {
  text: string;
  words: string[];
  duration?: number;
  className?: string;
};

export function LayoutTextFlip({ text, words, duration = 3600, className }: LayoutTextFlipProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref);
  const reducedMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reducedMotion || !inView || words.length < 2) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setIndex((current) => (current + 1) % words.length);
    }, duration);
    return () => window.clearInterval(timer);
  }, [duration, inView, reducedMotion, words.length]);

  const current = words[index % words.length] ?? "";

  return (
    <span ref={ref} className={cn("hero-flip", className)}>
      <span className="sr-only">{text} {words.join(", ")}</span>
      <span aria-hidden="true" className="hero-flip-static">{text}</span>
      <span aria-hidden="true" className="hero-flip-window">
        {reducedMotion ? (
          <span className="hero-flip-word">{words[0]}</span>
        ) : (
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              className="hero-flip-word"
              key={`${index}-${current}`}
              initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -14, filter: "blur(4px)" }}
              transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
            >{current}</motion.span>
          </AnimatePresence>
        )}
      </span>
    </span>
  );
}
