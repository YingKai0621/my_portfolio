"use client";

// Adapted from Aceternity UI Following Pointer. Scoped to project artwork only.
import { AnimatePresence, motion, useMotionValue, useReducedMotion } from "motion/react";
import { useRef, useState, type ReactNode } from "react";

type FollowerPointerCardProps = {
  children: ReactNode;
  title: string;
  className?: string;
};

export function FollowerPointerCard({ children, title, className }: FollowerPointerCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);

  return (
    <div
      className={className}
      ref={ref}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse" && window.matchMedia("(hover: hover) and (pointer: fine)").matches && !reduceMotion) {
          setVisible(true);
        }
      }}
      onPointerMove={(event) => {
        if (!visible || event.pointerType !== "mouse") return;
        const bounds = ref.current?.getBoundingClientRect();
        if (!bounds) return;
        x.set(event.clientX - bounds.left);
        y.set(event.clientY - bounds.top);
      }}
      onPointerLeave={() => setVisible(false)}
    >
      {children}
      <AnimatePresence>
        {visible && !reduceMotion && (
          <motion.span
            aria-hidden="true"
            className="project-follow-pointer"
            style={{ left: x, top: y }}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.16 }}
          >
            {title}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
