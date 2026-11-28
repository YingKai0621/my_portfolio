"use client";

import { AnimatePresence, motion, useInView, useReducedMotion, type Variants } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";

import { TechnologyLogo, TechnologyLogos, type TechnologyMark } from "@/components/sections/technology-logos";
import type { ProjectSlug } from "@/content/projects";

const easeOut = [0.23, 1, 0.32, 1] as const;

const groupVariants: Variants = {
  enter: (enabled: boolean) => enabled
    ? { opacity: 0, x: 24, filter: "blur(3px)" }
    : { opacity: 1, x: 0, filter: "blur(0px)" },
  visible: (enabled: boolean) => ({
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: enabled ? 0.38 : 0, ease: easeOut },
  }),
  exit: (enabled: boolean) => enabled
    ? { opacity: 0, x: -24, filter: "blur(3px)", transition: { duration: 0.22, ease: easeOut } }
    : { opacity: 0, transition: { duration: 0 } },
};

function MarqueeSet({ marks, duplicate, stagger }: {
  marks: readonly TechnologyMark[];
  duplicate?: boolean;
  stagger: boolean;
}) {
  return (
    <ul className="tech-marquee-set" aria-hidden={duplicate ? true : undefined}>
      {marks.map((mark, index) => (
        <motion.li
          key={mark}
          initial={stagger ? { opacity: 0, x: 16, filter: "blur(2px)" } : false}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          transition={{ duration: stagger ? 0.35 : 0, delay: stagger ? 0.16 + index * 0.05 : 0, ease: easeOut }}
        >
          <TechnologyLogo mark={mark} />
        </motion.li>
      ))}
    </ul>
  );
}

export function AnimatedTechnologyStack({
  slug,
  marks,
  heading,
  pauseLabel,
  resumeLabel,
  transitioning,
  animateSwitch,
}: {
  slug: ProjectSlug;
  marks: readonly TechnologyMark[];
  heading: string;
  pauseLabel: string;
  resumeLabel: string;
  transitioning: boolean;
  animateSwitch: boolean;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const headingId = useId();
  const inView = useInView(rootRef, { margin: "100px" });
  const reducedMotion = useReducedMotion();
  const [pageVisible, setPageVisible] = useState(true);
  const [userPaused, setUserPaused] = useState(false);
  const motionEnabled = animateSwitch && !reducedMotion;
  const paused = userPaused || !inView || !pageVisible || transitioning || !!reducedMotion;

  useEffect(() => {
    const onVisibilityChange = () => setPageVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  return (
    <div className="project-exhibition-technologies tech-stack" data-paused={paused} ref={rootRef}>
      <div className="tech-stack-heading-row">
        <h3 id={headingId}>{heading}</h3>
        <button
          className="tech-stack-toggle"
          type="button"
          aria-label={userPaused ? resumeLabel : pauseLabel}
          title={userPaused ? resumeLabel : pauseLabel}
          onClick={() => setUserPaused((value) => !value)}
        >
          {userPaused ? (
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false"><path d="m8 5 11 7-11 7V5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /></svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false"><path d="M8 5v14M16 5v14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
          )}
        </button>
      </div>

      <div className="tech-stack-window" role="group" aria-labelledby={headingId} tabIndex={0}>
        <div className="tech-marquee-viewport">
          <AnimatePresence mode="wait" initial={false} custom={motionEnabled}>
            <motion.div
              key={slug}
              className="tech-marquee-panel"
              custom={motionEnabled}
              variants={groupVariants}
              initial="enter"
              animate="visible"
              exit="exit"
            >
              <div className="tech-marquee-track">
                <MarqueeSet marks={marks} stagger={motionEnabled} />
                <MarqueeSet marks={marks} duplicate stagger={motionEnabled} />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="tech-stack-static">
        <TechnologyLogos marks={marks} />
      </div>
    </div>
  );
}
