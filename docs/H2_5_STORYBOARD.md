# H2.5 — Reference comparison and original shot plan

## Evidence and limits

The requested `docs/references/macaco-reference.mp4` and `docs/references/current-hero.mp4` paths were not present. The owner-supplied `docs/reference/Screen Recording 2026-11-27 232138.mp4` was decoded with FFmpeg (35.3 seconds, 2558 × 1416) and inspected as sequential contact-sheet frames. `C:/Users/taola/Videos/Screen Recordings/Screen Recording 2026-11-27 231953.mp4` was also decoded (11.77 seconds, 2544 × 1388); it records the earlier H2.3 Hero, not the latest H2.4 composition. The latest H2.4 state was compared using local browser captures and source inspection. Recording seconds describe the operator's browsing, **not** normalized scroll positions or authored animation timings. The [public Studio MACACO page](https://studiomacaco.ch/en/) establishes the reference site's identity but does not disclose its choreography implementation.

## Side-by-side diagnosis

- **Camera and coverage:** MACACO begins with a very large helmet profile and holds it through small mechanical head movement, then alternates full-figure, shoulder-detail and upper-body angles. H2.4 has varied cameras, but each shot is close to a heading/phase boundary, so changes read as section switches rather than camera reactions to motion.
- **Weight and timing:** the reference lets anticipation, action and settling happen within one composition. H2.4 samples its clips deterministically, but the text, camera, lighting and background frequently advance together. The resulting performance feels faster than the nominal 6.2-viewport scroll span suggests.
- **Lighting, materials and environment:** MACACO uses metallic highlights, dark negative space, iridescence, luminous environmental accents and foreground depth at different moments. H2.4 already has independent PBR/holographic material and lighting branches, but its architecture appears mainly during a single late chapter; the visible descent pose can look airborne over its platform.
- **Typography and continuity:** MACACO alternates type beside, behind and partly intersecting the figure. Its next composition can begin evolving before the previous line leaves. H2.4's major headings sometimes overlap during opacity crossfades; the separate Bone `THE HUMAN SIDE` screen repeats the arrival feeling before the actual About heading.

## Original Glacial Precision storyboard

These are **design progress ranges**, not timestamps from either recording. Camera, skeleton, material, lighting, environment and typography sample the same absolute scroll progress; their beats intentionally overlap without separate controllers.

1. **Identity / 0–0.30.** Preserve the owner's name and close helmet crop. Keep the face/shoulder composition steady while the first `power_on` anticipation begins near 0.19. Let the camera start lowering before the identity type exits directionally.
2. **Awakening / 0.19–0.57.** The head and upper body wake with a low-angle camera move, then a held mechanical detail. Cold rim light develops before `DRIVEN BY CURIOSITY` appears at 0.345. The line is gone by 0.57; character movement continues across its exit.
3. **Transformation / 0.47–0.79.** The build clip starts before the `BUILT TO EXPLORE` title. Iridescence and dither grow across an upper-body close-up and later a wider reveal; the camera changes while the pose holds. Text appears only after the new composition has arrived and exits before the next large headline.
4. **Digital world / 0.70–0.985.** Architecture starts assembling during the previous material state. A wider descent gives way to a closer final upper-body image so the provisional airborne/crouched clip is not presented as a false grounded landing. `FORM FOLLOWS FUNCTION` is a concise bridge from engineering to people, not a second About introduction.
5. **About handoff / 0.945–1.00 and normal page flow.** The camera and character shift left only at the end; a partial bottom-up Bone reveal joins the actual P3 About section. On the pinned desktop path, About overlaps the final 55svh of the stage, so its real `BEHIND THE CODE.` heading enters the frame before the pin releases rather than following an empty interstitial. There is no separate `THE HUMAN SIDE` slide or new portrait/personal claim.

## Pacing and unresolved visual risk

The H2.2/H2.3 pin was 3.65 viewport-heights. H2.4 increased it to 6.2; H2.5 uses 9.0 (+45% over H2.4, about 2.47× the original). `scrub: true` remains direct because a 0.48-second numeric scrub visibly lagged behind sampled software-WebGL scroll in prior review. Extra distance is assigned to clip action, camera exploration, lit material transitions and the environment construction, not a blank final panel. The final impression still needs owner review in a real browser, especially hardware frame pacing and the provisional `descent` clip's contact with the environment. No unverified asset rights are implied.
