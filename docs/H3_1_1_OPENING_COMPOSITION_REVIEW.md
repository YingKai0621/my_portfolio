# H3.1.1-R1 — Opening Static Composition Review

Status: **visual approval required**. This review covers S01 only. It does not approve animation, the later shot sequence, final art direction, or production use of the provisional character.

## Reference evidence inspected

- `docs/reference/Screen Recording 2026-11-27 232138.mp4`, opening interval approximately `00:00.000–00:00.400`.
- `artifacts/h3-master-storyboard/general/frame-000.jpg`.
- `artifacts/h3-master-storyboard/contact-sheets/opening-native-000-030.jpg`.
- The inspected reference uses a tight three-quarter helmet/upper-body silhouette, intentional lower-body crop, a full-width stripe behind the subject, small perimeter HUD groups, and controlled negative space. The proposal borrows those observable composition principles only; it does not copy MACACO branding, assets, shaders, or graphic design.

## Git state before H3.1.1

- Branch: `main`.
- HEAD: `faa4e5b422f0b4d7a218590c21a6d627a4c34115`.
- The working tree already contained uncommitted H2.9.1/H3 documentation work. It was preserved in place: `docs/ARCHITECTURE.md`, `docs/DECISIONS.md`, `docs/TASKS.md`, `scripts/h28-rig-diagnostics.mjs`, `src/lib/glacier/cinematic-afterimages.ts`, `src/lib/glacier/cinematic-animation.ts`, `src/lib/glacier/cinematic-scene.ts`, `src/lib/glacier/cinematic-shot-plan.ts`, `src/lib/glacier/cinematic-timing.ts`, plus the untracked H2.9/H3 review files and camera-check script.
- No reset, revert, asset modification, commit, push, or deployment was performed.

## H3.1.1 implementation

The proposal is exposed as a development-only branch of the existing cinematic renderer. It creates no second renderer and does not edit `CINEMATIC_SHOTS`, `HARD_CUT_PROGRESS`, ScrollTrigger travel, or any later scene.

Files changed specifically for H3.1.1:

- `src/lib/glacier/cinematic-s01-preview.ts` — isolated S01 camera proposals.
- `src/lib/glacier/cinematic-scene.ts` — narrow `s01`/`s01-diagnostic` inspection modes and runtime camera evidence.
- `src/lib/glacier/cinematic-materials.ts` — direct neutral graphite material grade with no new shader.
- `src/lib/glacier/hero-lighting.ts` — neutral reflection/light mode; existing modes retain their previous call contract.
- `src/components/sections/glacial-cinematic-stage.tsx` — isolated static review mode and temporary guide markup.
- `src/components/sections/glacial-cinematic.tsx` — localized identity data for the isolated preview.
- `src/app/globals.css` — isolated S01 layout, responsive treatment, and review guides.
- `messages/en.json`, `messages/vi.json` — localized temporary portfolio/name labels.
- `docs/H3_1_1_OPENING_COMPOSITION_REVIEW.md` — this gate report.

All PNG evidence and the local CDP capture helper are under ignored `artifacts/h3-1-1/`.

## Pose and character state

- Selected authored clip: `idle`.
- Sampled clip time: `0.48 s` of the verified `1.8333 s` clip, approximately `26.2%` of the clip.
- Cinematic progress: `0.0000`; the idle clip has full weight at this point.
- Root rotation at render time: `(0.0000, 0.0000, 0.0000)` radians.
- No manual root yaw, broad spine offset, or new additive pose was introduced. At this sample, the existing head/neck additive ramps are also zero.
- The authored pose is a crouched mechanical stance. The diagnostic frame exposes the complete pose: helmet/neck spacing remains open, the chest is readable, both shoulder structures retain separation, and the crop used by the clean composition does not conceal a collapsed rig.
- The existing normalized character root remains at the origin. Camera and target both follow the same authored hip offset, so that offset does not alter their relative framing.

## Camera and framing

Desktop proposal before the authored hip-tracking offset:

- Position: `(1.8700, 4.1300, 2.7300)`.
- Target: `(-0.3000, 4.3500, 0.0000)`.
- FOV: `31°`.
- Near/far: `0.05 / 100`.

Actual sampled desktop camera at `1920 × 1080`, including the authored hip offset:

- Position: `(1.9290, 2.6608, 2.0673)`.
- Target: `(-0.2410, 2.8808, -0.6627)`.
- FOV: `31°`.

Actual sampled mobile camera at `390 × 844`:

- Position: `(1.9590, 2.5108, 4.7873)`.
- Target: `(-0.1210, 2.4308, -0.6627)`.
- FOV: `39°`.

Uncropped diagnostic camera:

- Position: `(2.5590, 1.9808, 6.8373)`.
- Target: `(0.0590, 1.6808, -0.6627)`.
- FOV: `38°`.

R1 removes the former left-column composition. The character now anchors the horizontal center, with negative space distributed on both sides for secondary graphics. The helmet and visor retain immediate dominance, the forward shoulder silhouette remains clear, and the lower torso is cropped intentionally. The temporary identity is centered over the lower torso as `PORTFOLIO`, a single-line personal name on desktop, career direction, and the existing scroll cue. No near-plane intersection is visible. Mobile wraps the name deliberately, shifts the subject upward, and retains a readable lower-center hierarchy without horizontal page overflow.

## Temporary composition guides

The R1 guide view reserves a centered top navigation region, an integrated lower-center identity region, upper-left system initialization, upper-right signal/status, middle-left technical graphics, middle-right unit identification, and secondary information in both lower corners. The full-width diagonal stripe now occupies 28% of the stage height around its midpoint. It is rendered below the WebGL canvas, so it demonstrably passes behind the character, while the foreground identity remains below it. These are static review aids, not final graphics.

## Preview URLs

With the existing development server running:

- Clean S01: `http://localhost:3000/en?cinematicS01=1`
- Guides enabled: `http://localhost:3000/en?cinematicS01=1&s01Guides=1`
- Uncropped neutral diagnostic: `http://localhost:3000/en?cinematicS01=diagnostic`
- Vietnamese content can be inspected by replacing `/en` with `/vi`.

## Rendered evidence

- `artifacts/h3-1-1/r1-desktop-clean-1920x1080.png`
- `artifacts/h3-1-1/r1-desktop-guides-1920x1080.png`
- `artifacts/h3-1-1/r1-mobile-clean-390x844.png`
- `artifacts/h3-1-1/r1-mobile-vi-390x844.png`
- `artifacts/h3-1-1/neutral-pose-diagnostic-1440x900.png`
- `artifacts/h3-1-1/r1-reference-vs-s01-1920x540.png`

The captures used real hardware WebGL through ANGLE/D3D11: `NVIDIA GeForce RTX 3060 Laptop GPU`; they were not software-rendered. Browser capture reported no application exception. The only logged network error was the existing missing `/favicon.ico` request.

Two independent R1 `1440 × 900` samples produced no visible composition drift. Their raster hashes differ because of sub-pixel GPU output, but the measured average PSNR is `78.029235 dB`, consistent with a visually stable repeat sample. No skeletal sampling code changed in H3.1.1-R1, so the rig diagnostic was not rerun.

## Validation

- `npm run typecheck` — passed (`tsc --noEmit`, exit 0).
- `npm run lint` — passed (`eslint`, exit 0).
- Production build — not run; intentionally outside this lightweight visual gate.
- Playwright — **DEFERRED** to P11 per project policy.
- No dependency was installed.

## Known limitations and approval questions

- The provisional GLB remains local-only and is not authorized for commit, redistribution, or deployment without written rights confirmation.
- This is a deliberately neutral graphite previsualization. Final color, stripe design, HUD, pixel treatment, materials, shaders, atmosphere, and motion are absent by design.
- The selected source idle is a crouched pose. Approval should judge whether its close-up reads as monumental and mechanically plausible for S01; selecting or authoring a different pose would be a separate approved task.
- Mobile prioritizes a centered silhouette, readable wrapped identity, and an unclipped helmet over matching the desktop scale exactly.
- Owner approval is required for the desktop silhouette/scale, crop, negative space, mobile framing, and the reserved graphic regions before H3.1.2.

## Scope confirmation

No later shots were redesigned. H3.1.2, idle behavior, first-scroll motion, Awakening, Ascension, the existing H2.9.1 hard cut, final color treatment, final stripe/HUD, new shaders, Pixel Dither transitions, P4–P6, P7, and P8 remain untouched by this task.
