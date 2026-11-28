# H2.8A + H2.8B — character pose and rear-view review

Status: implemented for **owner visual review**, not final art approval. Scope is the existing unified P2/P3 opening. P4–P6 were not changed; P7 remains suspended.

## Evidence and what the videos actually show

- Reopened `docs/reference/Screen Recording 2026-11-27 232138.mp4` (35.3 s) and sampled 05–21 s at 2 fps. The public MACACO composition shows a spectral full-body character, a strong push-in to head/upper torso, later raised-hand views, then an environmental/landing change. This sampling does not establish a sustained complete back-armor shot, exact bone angles or the original scroll mapping. Our rear turn is therefore an **owner-requested addition**, not an asserted copy of the video.
- Reopened the owner's latest local screen recording (2026-11-28, 13.87 s) at 2 fps with 4 fps detail from 04–07 s. It shows the head diving much too far toward the chest and then recovering; no deliberate back view appears. The browser recording's seconds are operator scroll time, not authored progress. The private local recording is not part of this repository.
- The local-only GLB contains `power_on`, `build`, `descent` and `idle`; no dedicated turn, fist or look clip. The model faces the positive-Z camera in the existing first viewport. The source-only, neutral render at 35% and 38% shows a normal downward look with a visible neck/chest gap. The severe fold comes from our additive code, not the untouched source clip at those sampled times.

## Confirmed root cause and correction

H2.7 multiplied a local-Z head/neck quaternion offset after `rig.mixer.update(0)` and assumed the mixer always restored the original animation pose. Three.js 0.187.0 `AnimationMixer.update()` evaluates actions, then `PropertyMixer.apply()` writes a binding **only when its two accumulation buffers differ**. When a seek reuses the same interpolated animation value, the binding can be skipped even though application code changed the actual bone after the preceding evaluation. Thus repeated updates compounded the head/neck offset. This is confirmed by a local rig test using the actual GLB animation channels: eight repeated samples at 24% changed the head 60.25226° and neck 23.43143°; at 28%, head changed 66.00474°. The reported line-level hypotheses about the rotation axis and source clip were investigated rather than assumed.

The fix stores each controlled joint's **animation-only quaternion**. Before each mixer evaluation it restores that quaternion, and immediately after evaluation it captures the new base. Additive articulation is then applied exactly once to the known base. This covers 15 finger joints, head, neck and two spine joints, including same-progress and reverse seeks. It does not alter the source GLB or Three.js internals. [`scripts/h28-rig-diagnostics.mjs`](../scripts/h28-rig-diagnostics.mjs) decodes the ignored local GLB in memory and samples the real project pose function; it needs Node 24's built-in TypeScript stripping and the owner's local GLB.

At each of 24%, 28%, 35%, 38%, 40%, 45% and 55%, eight repeated seeks and a 17% → 65% → target reverse sequence differed by **at most 0.000002°** across the 19 controlled joints (normalized quaternion-angle comparison). A browser sequence 49% → 62.5% → 38% → 24% → 49% also produced pixel-identical 1440×900 screenshots at the two 49% visits (FFmpeg PSNR = infinity). These are deterministic-pose checks, not a real-device frame-rate measurement.

## Bone axes, pose limits and turn

- Bind-pose `Head_Jt` local +Z transforms to approximately world `(-1, 0.015, 0)`; `Neck_Jt` local +Z has the same direction. Thus local Z is the pitch axis in this rig. `Spine_1_Jt` local +X is approximately world `(-0.019, 0.992, -0.125)` and `Spine_2_Jt` local +X approximately `(0.009, 1, 0.008)`, suitable for a small upper-body yaw lead. These are bind-pose measurements; animated parents can rotate their world axes.
- Head and neck are bounded separately: head −0.14 to +0.18 rad and neck −0.04 to +0.055 rad; total authored offset remains under about 13.5°. Head-up samples 19–25%, gentle look-down 32.5–39.5%, and late lift 55–61%. The original `build` clip continues to animate the shoulders, elbows and wrist. The fist moves from open toward the authored grip over 57–62.5%, holds briefly and releases into descent.
- The root yaw rises smoothly from 0 to **2.62 rad / 150.1°** between 39–46.5%, holds to 50%, and unwinds by 56%. The torso leads through the two measured spine joints, then relaxes; hips and shoulder poses still come from the source clip and follow the root. The rotation occurs in the floating holographic passage before the platform appears at 60.5%, avoiding a grounded turn with sliding feet. This is an original authored turn, not a model-viewer auto-rotation.

## Camera, scroll allocation and update paths

Desktop travel stays **28 viewport heights**; `scrub: true` is unchanged. The added motion consumes existing progress: full-body ~17.5–21%, head-up 19–25%, push-in 21–28%, look-down 32.5–39.5%, body turn 39–46.5%, stable rear 46.5–49.5%, rear three-quarter/shoulder travel 49.5–56%, open hand ~53.5–57%, head lift 55–61%, fist closure 57–62.5%. At a 900px viewport, the rear hold alone spans about 756px of user-controlled scroll. Later landing and About coordinates stay unchanged.

The camera approaches from front-left, holds the helmet, moves around the **front-side** shoulder as the character turns, and then approaches the hand. The new shot sampler interpolates target and camera **orbital angle/radius** rather than drawing a chord through the character. All review positions keep camera Z positive; measured target-relative horizontal radius is at least about 3.98 world units in the added shots. Neutral screenshots show the entire helmet and raised hand at the reviewed positions without armor intersection. This is sampled visual evidence, not a geometric guarantee for every intermediate subframe or aspect ratio.

`ScrollTrigger.onUpdate` remains the primary absolute progress callback. The passive native scroll-position callback remains because previous fast programmatic reversals coalesced ScrollTrigger callbacks; an equality guard now skips duplicate DOM/controller updates at the same progress. The scene still coalesces WebGL drawing into one RAF. There is no second progress clock, numeric scrub delay or new smooth-scroll library.

## Rendered review frames and access

The development-only `?cinematicDebug=1&cinematicNeutral=1` path omits aura, afterimages, bloom, custom material shader, backdrop and typography. `&cinematicSource=1` additionally shows retimed original clips without additive head/finger/spine poses or root yaw. Neither mode affects production; the normal `?cinematicDebug=1` timeline inspector remains available.

Actual 1440×900 Chrome/SwiftShader captures are in ignored `artifacts/h28/`: `neutral-head.png`, `look-up.png`, `look-down.png`, `mid-turn.png`, `rear.png`, `rear-hold.png`, `rear-three-quarter.png`, `shoulder.png`, `open-hand.png`, `half-closed.png`, `closed-fist.png`, plus `final-rear.png`, `final-hand.png` and `final-about.png` with the existing effects. Owner-review comparisons include source-only frames in `%TEMP%/h28-source-0.35.png` and `h28-source-0.38.png`. The normal first viewport was also rendered without errors. 390×844 Vietnamese direct `#about` and reduced-motion renders are saved as `mobile-about.png` and `reduced-about.png`; neither had document-level horizontal overflow. The normal desktop sequence and neutral/source captures produced no JS exception or console warning.

The first reduced-motion direct-`#about` capture exposed a Chrome/SwiftShader paint issue: the About heading had visible computed styles and bounds, but no glyph pixels. Giving that heading its own static `translateZ(0)` paint layer under `prefers-reduced-motion` restored it without introducing movement; `reduced-about.png` is the rechecked final capture. This is a browser-render observation, not a claim about every GPU/browser.

Preview: `http://localhost:3000/en?cinematicDebug=1`, `http://localhost:3000/en?cinematicDebug=1&cinematicNeutral=1`, and `http://localhost:3000/en?cinematicDebug=1&cinematicSource=1`. The corresponding `/vi` paths work. The inspection modes are local development only.

## Limits and handoff

Head/chest clearance, back armor, camera framing and fist readability were checked in still frames and with deterministic reverse seeks. Real GPU, wheel/trackpad motion, all aspect ratios, exact finger collisions and perceived mechanical weight still require owner visual review. The reference video does not prove MACACO's source rigging or animation timings. The provisional GLB remains ignored and **must not be committed or distributed** without the rights clearance in `P7_ASSET_PROVENANCE.md`.

No dependency, Playwright, production build, commit, push or deploy was performed. Automated E2E remains **DEFERRED until P11**. H2.8A/B stops here; aura, environment, jump and landing refinements are not part of this gate.

Changed: `src/lib/glacier/cinematic-animation.ts`, `cinematic-shot-plan.ts`, `cinematic-scene.ts`, `cinematic-afterimages.ts`, `cinematic-timing.ts`, `src/components/sections/glacial-cinematic-stage.tsx`, `src/app/globals.css`, `docs/ARCHITECTURE.md`, `docs/DECISIONS.md`, `docs/TASKS.md`, this report, and the new diagnostic script. TypeScript checking and ESLint passed once after the main implementation; the subsequent reduced-motion CSS-only fix was checked by browser capture and `git diff --check`.
