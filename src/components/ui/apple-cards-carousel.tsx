"use client";

// Adapted from Aceternity UI Apple Cards Carousel: native horizontal rail and arrow navigation.
// The demo modal/card treatment is omitted because each work has its own accessible route.
import { IconArrowNarrowLeft, IconArrowNarrowRight } from "@tabler/icons-react";
import { useEffect, useRef, useState, type ReactNode } from "react";

type CarouselProps = {
  items: ReactNode[];
  label: string;
  previousLabel: string;
  nextLabel: string;
  slideLabels: string[];
  goToLabels: string[];
};

export function Carousel({ items, label, previousLabel, nextLabel, slideLabels, goToLabels }: CarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const settledTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const frame = useRef<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => () => {
    if (settledTimer.current) clearTimeout(settledTimer.current);
    if (frame.current) cancelAnimationFrame(frame.current);
  }, []);

  function nearestIndex() {
    const track = trackRef.current;
    if (!track) return 0;
    const slides = Array.from(track.children) as HTMLElement[];
    const center = track.scrollLeft + track.clientWidth / 2;
    const trackLeft = track.getBoundingClientRect().left;
    const slideCenter = (slide: HTMLElement) => slide.getBoundingClientRect().left - trackLeft + track.scrollLeft + slide.offsetWidth / 2;
    return slides.reduce((best, slide, index) =>
      Math.abs(slideCenter(slide) - center) <
      Math.abs(slideCenter(slides[best]) - center) ? index : best, 0);
  }

  function handleScroll() {
    if (frame.current === null) {
      frame.current = requestAnimationFrame(() => {
        setCurrentIndex(nearestIndex());
        frame.current = null;
      });
    }
    if (settledTimer.current) clearTimeout(settledTimer.current);
    settledTimer.current = setTimeout(() => {
      const index = nearestIndex();
      setCurrentIndex(index);
      setAnnouncement(slideLabels[index]);
    }, 150);
  }

  function goTo(index: number) {
    const track = trackRef.current;
    const slide = track?.children[index] as HTMLElement | undefined;
    if (!track || !slide) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const padding = Number.parseFloat(window.getComputedStyle(track).scrollPaddingLeft) || 0;
    const left = track.scrollLeft + slide.getBoundingClientRect().left - track.getBoundingClientRect().left - padding;
    setCurrentIndex(index);
    track.scrollTo({ left, behavior: reduceMotion ? "auto" : "smooth" });
  }

  return (
    <section className="works-carousel" aria-label={label} aria-roledescription="carousel">
      <div className="works-carousel-track" ref={trackRef} onScroll={handleScroll}>
        {items.map((item, index) => (
          <div className="works-carousel-slide" role="group" aria-roledescription="slide" aria-label={slideLabels[index]} key={index}>
            {item}
          </div>
        ))}
      </div>
      <div className="works-carousel-footer">
        <div className="works-carousel-markers" aria-label={label}>
          {items.map((_, index) => (
            <button
              className="works-carousel-marker"
              type="button"
              aria-label={goToLabels[index]}
              aria-current={currentIndex === index ? "true" : undefined}
              key={index}
              onClick={() => goTo(index)}
            ><span /></button>
          ))}
        </div>
        <div className="works-carousel-controls">
          <button type="button" aria-label={previousLabel} onClick={() => goTo((currentIndex - 1 + items.length) % items.length)}>
            <IconArrowNarrowLeft aria-hidden="true" size={25} stroke={1.5} />
          </button>
          <button type="button" aria-label={nextLabel} onClick={() => goTo((currentIndex + 1) % items.length)}>
            <IconArrowNarrowRight aria-hidden="true" size={25} stroke={1.5} />
          </button>
        </div>
      </div>
      <p className="sr-only" role="status" aria-live="polite">{announcement}</p>
    </section>
  );
}
