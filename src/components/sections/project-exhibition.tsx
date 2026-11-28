"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";

import { AnimatedTechnologyStack } from "@/components/sections/animated-technology-stack";
import { BurnArtwork } from "@/components/sections/burn-artwork";
import type { TechnologyMark } from "@/components/sections/technology-logos";
import { FollowerPointerCard } from "@/components/ui/following-pointer";
import type { ProjectSlug } from "@/content/projects";
import { Link } from "@/i18n/navigation";

type ExhibitionItem = {
  slug: ProjectSlug;
  displayName: string;
  title: string;
  category: string;
  role: string;
  summary: string;
  technologyMarks: readonly TechnologyMark[];
};

const BURN_DURATION_MS = 1120;

export function ProjectExhibition({
  items,
  labels,
}: {
  items: ExhibitionItem[];
  labels: {
    explore: string;
    caseStudy: string;
    artworkNote: string;
    selection: string;
    techStack: string;
    pauseTechStack: string;
    resumeTechStack: string;
  };
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [animateSwitch, setAnimateSwitch] = useState(false);
  const [stackTransitioning, setStackTransitioning] = useState(false);
  const reducedMotion = useReducedMotion();
  const selectedIndexRef = useRef(0);
  const stackTimerRef = useRef<number | null>(null);
  const slugs = useMemo(() => items.map((item) => item.slug), [items]);
  const active = items[selectedIndex];

  useEffect(() => () => {
    if (stackTimerRef.current !== null) window.clearTimeout(stackTimerRef.current);
  }, []);

  function selectProject(index: number, animate: boolean) {
    if (selectedIndexRef.current === index) return;
    selectedIndexRef.current = index;
    setSelectedIndex(index);
    if (stackTimerRef.current !== null) window.clearTimeout(stackTimerRef.current);
    const shouldAnimate = animate && !reducedMotion;
    setAnimateSwitch(shouldAnimate);
    setStackTransitioning(shouldAnimate);
    if (shouldAnimate) {
      stackTimerRef.current = window.setTimeout(() => {
        setStackTransitioning(false);
        stackTimerRef.current = null;
      }, BURN_DURATION_MS);
    } else {
      stackTimerRef.current = null;
    }
  }

  return (
    <div className="project-exhibition">
      <div className="project-exhibition-body">
        <div className="project-exhibition-index" role="group" aria-label={labels.selection} data-animate={animateSwitch && !reducedMotion}>
          <ol className="project-exhibition-index-list">
            {items.map((item, index) => (
              <li key={item.slug}>
                <button
                  type="button"
                  className="project-exhibition-selector"
                  data-active={selectedIndex === index}
                  aria-pressed={selectedIndex === index}
                  onClick={(event) => selectProject(index, event.detail > 0)}
                >
                  <span className="project-exhibition-selector-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  <span className="project-exhibition-selector-indicator" aria-hidden="true">
                    {selectedIndex === index && (
                      <motion.span
                        className="project-exhibition-selector-cube"
                        layoutId="project-exhibition-active-cube"
                        transition={animateSwitch && !reducedMotion
                          ? { type: "spring", stiffness: 420, damping: 36, mass: 0.8 }
                          : { duration: 0 }}
                      >
                        <svg viewBox="0 0 24 26" fill="none" focusable="false">
                          <path d="M12 1 22 7 12 13 2 7Z" fill="currentColor" />
                          <path d="M2 7 12 13v12L2 19Z" fill="currentColor" fillOpacity="0.72" />
                          <path d="M22 7 12 13v12l10-6Z" fill="currentColor" fillOpacity="0.42" />
                        </svg>
                      </motion.span>
                    )}
                  </span>
                  <span className="project-exhibition-selector-name">{item.displayName}</span>
                  <svg className="project-exhibition-selector-arrow" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 12h15m-6-6 6 6-6 6" />
                  </svg>
                </button>
              </li>
            ))}
          </ol>
        </div>

        <div className="project-exhibition-visual">
          <div className="project-exhibition-stage">
            <FollowerPointerCard className="project-artwork-frame" title={labels.explore}>
              <Link
                className="project-artwork-link"
                href={`/projects/${active.slug}`}
                aria-label={`${labels.explore}: ${active.title}`}
              >
                <BurnArtwork activeSlug={active.slug} slugs={slugs} shouldBurn={animateSwitch} />
              </Link>
            </FollowerPointerCard>
          </div>
          <p className="project-artwork-note">{labels.artworkNote}</p>
        </div>

        <article className="project-exhibition-copy">
          <h3 className="sr-only">{active.displayName}</h3>
          <p className="project-exhibition-category">{active.category}</p>
          <p className="project-exhibition-role">{active.role}</p>
          <p className="project-exhibition-summary">{active.summary}</p>
          <Link className="project-feature-link" href={`/projects/${active.slug}`} aria-label={`${labels.caseStudy}: ${active.title}`}>
            <span>{labels.caseStudy}</span>
            <svg aria-hidden="true" focusable="false" viewBox="0 0 32 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 12h26m-8-8 8 8-8 8" />
            </svg>
          </Link>
        </article>
      </div>
      <AnimatedTechnologyStack
        slug={active.slug}
        marks={active.technologyMarks}
        heading={labels.techStack}
        pauseLabel={labels.pauseTechStack}
        resumeLabel={labels.resumeTechStack}
        transitioning={stackTransitioning}
        animateSwitch={animateSwitch}
      />
    </div>
  );
}
