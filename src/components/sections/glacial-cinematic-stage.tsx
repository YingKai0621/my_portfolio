"use client";

import { useEffect, useLayoutEffect, useRef, type MouseEvent, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";

import type { CinematicInspection, CinematicSceneController } from "@/lib/glacier/cinematic-scene";
import type { S01AtmosphereVariant } from "@/lib/glacier/cinematic-s01-atmosphere";
import type { S01LookVariant } from "@/lib/glacier/cinematic-s01-look";
import { clamp01, ramp } from "@/lib/glacier/cinematic-shot-plan";
import { ABOUT_PROGRESS, CHAPTER_WINDOWS, CINEMATIC_TRAVEL, REVIEW_SHOTS } from "@/lib/glacier/cinematic-timing";

type Props = {
  children: ReactNode;
  label: string;
  skipLabel: string;
  scrollLabel: string;
  ghostWords: readonly string[];
  previewIdentity: { label: string; name: string; career: string };
};

export function GlacialCinematicStage({ children, label, skipLabel, scrollLabel, ghostWords, previewIdentity }: Props) {
  const t = useTranslations("GlacialCinematic");
  const stageRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const controllerRef = useRef<CinematicSceneController | null>(null);
  const progressRef = useRef(0);
  const visibleRef = useRef(true);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const inspectorRef = useRef<HTMLDetailsElement>(null);
  const rangeRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLOutputElement>(null);
  const fallbackRef = useRef<(() => void) | null>(null);

  useLayoutEffect(() => {
    if (process.env.NODE_ENV !== "development") return;
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!stage || !canvas) return;
    const params = new URLSearchParams(window.location.search);
    const s01Preview = params.has("cinematicS01");
    const s01Diagnostic = params.get("cinematicS01") === "diagnostic";
    const requestedAtmosphere = params.get("s01Background");
    const s01Atmosphere = requestedAtmosphere === "restrained" || requestedAtmosphere === "rich";
    const backgroundOnly = s01Atmosphere && params.has("s01BackgroundOnly");
    stage.classList.toggle("is-s01-preview", s01Preview);
    stage.classList.toggle("is-s01-diagnostic", s01Diagnostic);
    stage.classList.toggle("has-s01-guides", s01Preview && params.has("s01Guides") && !s01Diagnostic);
    stage.classList.toggle("has-s01-atmosphere", s01Preview && s01Atmosphere);
    stage.classList.toggle("is-s01-background-only", s01Preview && backgroundOnly);
    document.documentElement.classList.toggle("has-s01-background-only", s01Preview && backgroundOnly);
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    fallbackRef.current = () => {
      media.revert();
      stage.classList.remove("is-enhanced");
      if (inspectorRef.current) inspectorRef.current.hidden = true;
      if (window.location.hash === "#about") requestAnimationFrame(() => document.getElementById("about")?.scrollIntoView({ behavior: "instant" }));
    };
    const panels = Array.from(stage.querySelectorAll<HTMLElement>(".cinematic-chapter"));
    const beams = stage.querySelector<HTMLElement>(".cinematic-beams");
    const phaseAwakening = stage.querySelector<HTMLElement>(".cinematic-phase-awakening");
    const phaseTransformation = stage.querySelector<HTMLElement>(".cinematic-phase-transformation");
    const phaseDigital = stage.querySelector<HTMLElement>(".cinematic-phase-digital");
    const graphicBands = stage.querySelector<HTMLElement>(".cinematic-graphic-bands");
    const pixelField = stage.querySelector<HTMLElement>(".cinematic-pixel-field");
    const ditherOverlay = stage.querySelector<HTMLElement>(".cinematic-dither");
    const scrollCue = stage.querySelector<HTMLElement>(".cinematic-scroll-cue");
    const skipControl = stage.querySelector<HTMLElement>(".cinematic-skip");
    let lastProgress = Number.NaN;
    let lastDesktop: boolean | undefined;

    const update = (value: number, desktop: boolean) => {
      const progress = clamp01(value);
      if (lastDesktop === desktop && Math.abs(progress - lastProgress) < .00005) return;
      lastProgress = progress;
      lastDesktop = desktop;
      progressRef.current = progress;
      if (rangeRef.current) rangeRef.current.value = progress.toFixed(4);
      if (outputRef.current) outputRef.current.value = progress.toFixed(4);
      stage.dataset.progress = progress.toFixed(4);
      controllerRef.current?.setProgress(progress);
      if (!desktop) return;
      panels.forEach((panel, index) => {
        const [enter, full, leave, gone] = CHAPTER_WINDOWS[index];
        const incoming = index === 0 ? 1 : ramp(progress, enter, full);
        const outgoing = 1 - ramp(progress, leave, gone);
        const opacity = incoming * outgoing;
        panel.style.opacity = opacity.toFixed(3);
        panel.style.visibility = opacity > 0.005 ? "visible" : "hidden";
        panel.style.transform = `translate3d(${((1 - incoming) * (index % 2 ? -34 : 34) - (1 - outgoing) * (index % 2 ? 28 : -28)).toFixed(1)}px, 0, 0)`;
        const accessible = opacity > 0.15;
        panel.inert = !accessible;
        panel.setAttribute("aria-hidden", String(!accessible));
      });
      if (phaseAwakening) phaseAwakening.style.opacity = (ramp(progress, 0.1, 0.2) * (1 - ramp(progress, 0.28, 0.4))).toFixed(3);
      if (phaseTransformation) phaseTransformation.style.opacity = (ramp(progress, 0.21, 0.3) * (1 - ramp(progress, 0.55, 0.67))).toFixed(3);
      if (phaseDigital) phaseDigital.style.opacity = (ramp(progress, 0.47, 0.58) * (1 - ramp(progress, 0.92, 1))).toFixed(3);
      if (graphicBands) {
        graphicBands.style.opacity = (0.42 + ramp(progress, 0.18, 0.28) * 0.25 - ramp(progress, 0.76, 0.87) * 0.5).toFixed(3);
        graphicBands.style.transform = `translate3d(${(progress * 19).toFixed(1)}%, 0, 0) rotate(-16deg)`;
      }
      if (pixelField) pixelField.style.opacity = "0";
      if (ditherOverlay) ditherOverlay.style.opacity = (.15 * (1 - ramp(progress, .1, .15))).toFixed(3);
      if (beams) beams.style.transform = `translate3d(${(progress * 12).toFixed(1)}%, 0, 0) rotate(-16deg)`;
      if (scrollCue) scrollCue.style.opacity = (1 - ramp(progress, 0.03, 0.13)).toFixed(3);
      if (skipControl) {
        skipControl.style.opacity = (1 - ramp(progress, .73, .755)).toFixed(3);
        skipControl.inert = progress > .755;
      }
      canvas.style.opacity = (1 - ramp(progress, 0.985, 1) * 0.6).toFixed(3);
    };

    if (s01Preview) {
      update(0, window.innerWidth >= 768);
      panels.forEach((panel, index) => {
        const active = index === 0 && !s01Diagnostic;
        panel.style.opacity = active ? "1" : "0";
        panel.style.visibility = active ? "visible" : "hidden";
        panel.style.transform = "none";
        panel.inert = !active;
        panel.setAttribute("aria-hidden", String(!active));
      });
      if (inspectorRef.current) inspectorRef.current.hidden = true;
      return () => {
        fallbackRef.current = null;
        media.revert();
        stage.classList.remove("is-s01-preview", "is-s01-diagnostic", "has-s01-guides", "has-s01-atmosphere", "is-s01-background-only");
        document.documentElement.classList.remove("has-s01-background-only");
        panels.forEach((panel) => {
          panel.inert = false;
          panel.removeAttribute("aria-hidden");
          panel.style.removeProperty("opacity");
          panel.style.removeProperty("visibility");
          panel.style.removeProperty("transform");
        });
      };
    }

    media.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      update(0, true);
      const trigger = ScrollTrigger.create({
        trigger: stage,
        start: "top top",
        end: () => `+=${Math.round(window.innerHeight * CINEMATIC_TRAVEL)}`,
        pin: true,
        pinSpacing: true,
        scrub: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => update(self.progress, true),
        onLeaveBack: () => update(0, true),
        onLeave: () => update(1, true),
      });
      triggerRef.current = trigger;
      stage.classList.add("is-pinned");
      requestAnimationFrame(() => ScrollTrigger.refresh());
      update(trigger.progress, true);
      // Sample the absolute document scroll position too. Fast reversals can
      // coalesce ScrollTrigger's callback after pin translation has changed.
      const onScrollPosition = () => update((window.scrollY - trigger.start) / (trigger.end - trigger.start), true);
      window.addEventListener("scroll", onScrollPosition, { passive: true });
      // A direct /en/#about or /vi/#work URL should land at its actual destination
      // after ScrollTrigger inserts the pin spacer.
      const routeToHash = () => {
        if (window.location.hash === "#about") window.scrollTo({ top: trigger.start + (trigger.end - trigger.start) * ABOUT_PROGRESS, behavior: "instant" });
        else if (window.location.hash === "#work") document.getElementById("work")?.scrollIntoView({ behavior: "instant" });
      };
      window.addEventListener("hashchange", routeToHash);
      if (window.location.hash) requestAnimationFrame(routeToHash);
      return () => { window.removeEventListener("scroll", onScrollPosition); window.removeEventListener("hashchange", routeToHash); triggerRef.current = null; stage.classList.remove("is-pinned"); trigger.kill(); panels.forEach((panel) => { panel.inert = false; panel.removeAttribute("aria-hidden"); panel.style.removeProperty("opacity"); panel.style.removeProperty("visibility"); panel.style.removeProperty("transform"); }); };
    });
    media.add("(max-width: 767px) and (prefers-reduced-motion: no-preference)", () => {
      panels.forEach((panel) => { panel.inert = false; panel.removeAttribute("aria-hidden"); });
      const trigger = ScrollTrigger.create({
        trigger: stage,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => update(self.progress, false),
      });
      update(trigger.progress, false);
      return () => trigger.kill();
    });
    return () => { fallbackRef.current = null; media.revert(); };
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!stage || !canvas || process.env.NODE_ENV !== "development") return;
    const params = new URLSearchParams(window.location.search);
    const s01Value = params.get("cinematicS01");
    const requestedLook = params.get("s01Material");
    const requestedAtmosphere = params.get("s01Background");
    const s01Atmosphere: S01AtmosphereVariant = requestedAtmosphere === "restrained" || requestedAtmosphere === "rich"
      ? requestedAtmosphere
      : "off";
    const requestedS01Look: S01LookVariant = requestedLook === "cyan" || requestedLook === "balanced" || requestedLook === "contrast" || requestedLook === "spectral" || requestedLook === "acid" || requestedLook === "emerald" || requestedLook === "toxic"
      ? requestedLook
      : "neutral";
    // R4 background reviews are locked to the owner-selected R2 Variant C.
    const s01Look: S01LookVariant = s01Atmosphere === "off" ? requestedS01Look : "spectral";
    const s01BackgroundOnly = s01Atmosphere !== "off" && params.has("s01BackgroundOnly");
    const inspection: CinematicInspection = params.has("cinematicSource") ? "source"
      : s01Value === "diagnostic" ? "s01-diagnostic"
      : s01Value !== null ? "s01"
      : params.has("cinematicNeutral") ? "neutral"
      : "off";
    stage.classList.toggle("is-neutral-inspection", inspection === "neutral" || inspection === "source");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (inspectorRef.current) inspectorRef.current.hidden = !new URLSearchParams(window.location.search).has("cinematicDebug") || reduced.matches || window.innerWidth < 768;
    if (reduced.matches && s01Value === null) return;
    let disposed = false;
    let idleId = 0;
    let timerId: ReturnType<typeof setTimeout> | undefined;
    const load = async () => {
      try {
        const { createCinematicScene } = await import("@/lib/glacier/cinematic-scene");
        if (disposed) return;
        const controller = await createCinematicScene(canvas, ghostWords, inspection, s01Look, {
          atmosphere: s01Atmosphere,
          backgroundOnly: s01BackgroundOnly,
        });
        if (disposed) { controller.dispose(); return; }
        controllerRef.current = controller;
        controller.setProgress(progressRef.current);
        controller.setVisible(visibleRef.current && !document.hidden);
        canvas.classList.add("is-ready");
      } catch (error) {
        console.warn("[Glacial Awakening] Optional 3D scene unavailable", error);
        fallbackRef.current?.();
      }
    };
    if ("requestIdleCallback" in window) idleId = window.requestIdleCallback(load, { timeout: 650 });
    else timerId = setTimeout(load, 100);

    const observer = new IntersectionObserver(([entry]) => {
      visibleRef.current = entry.isIntersecting;
      controllerRef.current?.setVisible(entry.isIntersecting && !document.hidden);
    }, { threshold: 0.01 });
    observer.observe(stage);
    const resize = new ResizeObserver(() => controllerRef.current?.resize());
    resize.observe(canvas);
    const onVisibility = () => controllerRef.current?.setVisible(visibleRef.current && !document.hidden);
    const onContextLost = (event: Event) => {
      event.preventDefault();
      canvas.classList.remove("is-ready");
      controllerRef.current?.setVisible(false);
      fallbackRef.current?.();
    };
    document.addEventListener("visibilitychange", onVisibility);
    canvas.addEventListener("webglcontextlost", onContextLost);
    return () => {
      disposed = true;
      if (idleId) window.cancelIdleCallback(idleId);
      if (timerId) clearTimeout(timerId);
      observer.disconnect();
      resize.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      controllerRef.current?.dispose();
      controllerRef.current = null;
      stage.classList.remove("is-neutral-inspection");
    };
  }, [ghostWords]);

  const skip = (event: MouseEvent<HTMLAnchorElement>) => {
    const target = document.getElementById("about");
    if (!target) return;
    event.preventDefault();
    const root = document.documentElement;
    const previous = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    const trigger = triggerRef.current;
    if (trigger) window.scrollTo({ top: trigger.start + (trigger.end - trigger.start) * ABOUT_PROGRESS, behavior: "instant" });
    else target.scrollIntoView({ behavior: "instant", block: "start" });
    window.history.replaceState(null, "", "#about");
    requestAnimationFrame(() => { root.style.scrollBehavior = previous; });
  };

  const seek = (value: number) => {
    const trigger = triggerRef.current;
    if (trigger) window.scrollTo({ top: trigger.start + (trigger.end - trigger.start) * clamp01(value), behavior: "instant" });
  };

  return (
    <section className={process.env.NODE_ENV === "development" ? "cinematic-opening is-enhanced" : "cinematic-opening"} id="home" aria-label={label} ref={stageRef}>
      <div className="awakening-atmosphere cinematic-atmosphere" aria-hidden="true" />
      <div className="cinematic-phase-field cinematic-phase-awakening" aria-hidden="true" />
      <div className="cinematic-phase-field cinematic-phase-transformation" aria-hidden="true" />
      <div className="cinematic-phase-field cinematic-phase-digital" aria-hidden="true" />
      <div className="cinematic-beams" aria-hidden="true" />
      <div className="cinematic-graphic-bands" aria-hidden="true" />
      <div className="cinematic-pixel-field" aria-hidden="true" />
      <div className="awakening-dither cinematic-dither" aria-hidden="true" />
      {process.env.NODE_ENV === "development" && <div className="s01-stripe-guide" aria-hidden="true"><span>INDUSTRIAL STRIPE BAND · BEHIND CHARACTER</span></div>}
      <div className="awakening-render cinematic-render" aria-hidden="true"><canvas ref={canvasRef} /></div>
      {children}
      {process.env.NODE_ENV === "development" && (
        <div className="s01-preview-identity">
          <p className="s01-preview-label">{previewIdentity.label}</p>
          <p className="s01-preview-name">{previewIdentity.name}</p>
          <p className="s01-preview-career">{previewIdentity.career}</p>
        </div>
      )}
      {process.env.NODE_ENV === "development" && (
        <div className="s01-composition-guides" aria-hidden="true">
          <span className="s01-guide s01-guide-nav">PORTFOLIO NAVIGATION</span>
          <span className="s01-guide s01-guide-identity">PORTFOLIO · LUONG KHUONG DUY · CAREER · SCROLL</span>
          <span className="s01-guide s01-guide-hud-upper-left">SYSTEM INITIALIZATION</span>
          <span className="s01-guide s01-guide-hud-upper-right">SIGNAL / STATUS</span>
          <span className="s01-guide s01-guide-hud-middle-left">TECHNICAL GRAPHICS</span>
          <span className="s01-guide s01-guide-hud-middle-right">UNIT IDENTIFIER</span>
          <span className="s01-guide s01-guide-hud-lower-left">SECONDARY INFO</span>
          <span className="s01-guide s01-guide-hud-lower-right">SECONDARY INFO</span>
        </div>
      )}
      <a className="cinematic-skip" href="#about" onClick={skip}>{skipLabel}<span aria-hidden="true">↘</span></a>
      <div className="cinematic-scroll-cue" aria-hidden="true">{scrollLabel}<span>↓</span></div>
      {process.env.NODE_ENV === "development" && (
        <details className="cinematic-inspector" ref={inspectorRef} hidden>
          <summary>{t("inspect")}</summary>
          <label>{t("inspectProgress")}<input ref={rangeRef} type="range" min="0" max="1" step="0.0005" defaultValue="0" onChange={event => seek(Number(event.currentTarget.value))} /></label>
          <output ref={outputRef}>0.0000</output>
          <label>{t("inspectShot")}<select defaultValue="" onChange={event => seek(Number(event.currentTarget.value))}>
            <option value="" disabled>—</option>
            {REVIEW_SHOTS.map((p, i) => <option value={p} key={p}>{String(i + 1).padStart(2, "0")} · {p.toFixed(3)}</option>)}
          </select></label>
        </details>
      )}
    </section>
  );
}
