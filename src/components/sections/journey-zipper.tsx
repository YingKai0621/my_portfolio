"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { journeyArtwork } from "@/content/journey";

type JourneyZipperProps = {
  heading: string;
  scrollCue: string;
  overlayPeriod: string;
  overlayLine: string;
  photoNote: string;
};

const revealImages = Object.values(journeyArtwork);

function ZipperTeeth({ lower = false, detached = false }: { lower?: boolean; detached?: boolean }) {
  const patternId = `${lower ? "lower" : "upper"}-${detached ? "detached" : "closing"}-teeth`;
  return (
    <svg className={`journey-teeth${lower ? " journey-teeth-lower" : ""}`} width="100%" height="24" aria-hidden="true" focusable="false">
      <defs>
        <pattern id={patternId} width="48" height="24" patternUnits="userSpaceOnUse">
          <path d="M0 1H48L37 23H11Z" fill="#6f8992" />
          <path d="M3 2H45L35 20H13Z" fill="#a5bac0" />
          <path d="M11 23H37" stroke="#223842" strokeWidth="2" />
        </pattern>
      </defs>
      <rect width="100%" height="24" fill={`url(#${patternId})`} />
    </svg>
  );
}

function ZipperSlider() {
  return (
    <svg viewBox="0 0 72 88" fill="none" aria-hidden="true" focusable="false">
      <path d="M8 21H64L56 44H16L8 21Z" fill="#9ab2b9" />
      <path d="M16 24H56L51 37H21L16 24Z" fill="#334d57" />
      <path d="M27 42H45L49 67L36 83L23 67L27 42Z" fill="#d1dee0" />
      <path d="M32 49H40L42 64L36 72L30 64L32 49Z" fill="#10252d" />
      <path d="M36 4V21" stroke="#1ba6cd" strokeWidth="6" />
      <path d="M23 42H49" stroke="#0b1013" strokeWidth="3" />
    </svg>
  );
}

export function JourneyZipper({ heading, scrollCue, overlayPeriod, overlayLine, photoNote }: JourneyZipperProps) {
  const stageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();

    media.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      const upper = stage.querySelector<HTMLElement>(".journey-flap-upper");
      const lower = stage.querySelector<HTMLElement>(".journey-flap-lower");
      const upperLip = stage.querySelector<HTMLElement>(".journey-lip-upper");
      const lowerLip = stage.querySelector<HTMLElement>(".journey-lip-lower");
      const detachedTeeth = stage.querySelectorAll<HTMLElement>(".journey-detached-teeth");
      const slider = stage.querySelector<HTMLElement>(".journey-slider");
      const headingElement = stage.querySelector<HTMLElement>(".journey-arrival-heading");
      const cue = stage.querySelector<HTMLElement>(".journey-scroll-cue");
      if (!upper || !lower || !upperLip || !lowerLip || !slider || !headingElement || !cue || detachedTeeth.length !== 2) return;

      const context = gsap.context(() => {
        const sliderStart = () => stage.clientWidth - slider.offsetWidth;
        const sliderEnd = () => -slider.offsetWidth / 2;
        gsap.set([upper, lower], { yPercent: 0 });
        gsap.set([upperLip, lowerLip], { scaleX: 1, transformOrigin: "left center" });
        gsap.set(detachedTeeth, { opacity: 0 });
        gsap.set(slider, { x: sliderStart, opacity: 1 });
        gsap.set(headingElement, { y: 0, opacity: 1 });
        gsap.set(cue, { opacity: 1 });

        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: stage,
            start: "top top",
            end: () => `+=${Math.max(window.innerHeight * 1.45, 900)}`,
            pin: true,
            pinSpacing: true,
            // Direct scroll sync keeps the reveal complete when the pin releases,
            // including during a fast wheel gesture or an abrupt reverse.
            scrub: true,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });

        timeline
          .fromTo(slider, { x: sliderStart }, { x: sliderEnd, duration: 0.52, immediateRender: false }, 0.03)
          .to([upperLip, lowerLip], { scaleX: 0, duration: 0.52 }, 0.03)
          .to(cue, { opacity: 0, duration: 0.12 }, 0.1)
          .to(detachedTeeth, { opacity: 0.75, duration: 0.12 }, 0.45)
          .to(upper, { yPercent: -115, duration: 0.46, ease: "power2.inOut" }, 0.52)
          .to(lower, { yPercent: 115, duration: 0.46, ease: "power2.inOut" }, 0.52)
          .to(headingElement, { y: -36, opacity: 0, duration: 0.2 }, 0.52)
          .to(slider, { opacity: 0, duration: 0.1 }, 0.52);

        return () => timeline.kill();
      }, stage);
      return () => context.revert();
    });
    return () => media.revert();
  }, []);

  return (
    <div className="journey-stage" ref={stageRef}>
      <div className="journey-underlay" aria-hidden="true">
        <div className="journey-reveal-photos">
          {revealImages.map((src, index) => (
            <div className={`journey-reveal-photo journey-reveal-photo-${index + 1}`} key={src}>
              <Image src={src} alt="" fill sizes="(max-width: 700px) 100vw, 40vw" />
            </div>
          ))}
        </div>
        <div className="journey-reveal-shade" />
      </div>
      <div className="journey-underlay-content" aria-hidden="true">
        <span className="journey-reveal-period">{overlayPeriod}</span>
        <span className="journey-reveal-line">{overlayLine}</span>
        <span className="journey-reveal-note">{photoNote}</span>
      </div>
      <div className="journey-flap journey-flap-upper" aria-hidden="true">
        <div className="journey-arrival-heading"><span className="journey-arrival-title">{heading}</span></div>
        <div className="journey-lip journey-lip-upper"><ZipperTeeth /></div>
        <div className="journey-detached-teeth journey-detached-teeth-upper"><ZipperTeeth detached /></div>
      </div>
      <div className="journey-flap journey-flap-lower" aria-hidden="true">
        <div className="journey-lip journey-lip-lower"><ZipperTeeth lower /></div>
        <div className="journey-detached-teeth journey-detached-teeth-lower"><ZipperTeeth lower detached /></div>
        <div className="journey-scroll-cue"><span>{scrollCue}</span><span aria-hidden="true">↓</span></div>
      </div>
      <div className="journey-slider" aria-hidden="true"><ZipperSlider /></div>
      <h2 className="journey-mobile-heading">{heading}</h2>
    </div>
  );
}
