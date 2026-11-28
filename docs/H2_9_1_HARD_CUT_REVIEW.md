# H2.9.1 — cinematic hard-cut review

Status: implemented locally for owner visual review; **not yet approved**. Scope is one camera transition in the unified Hero/About scene. H2.9.2, P4–P6, P7 and P8 are not part of this task.

## Reference evidence

Decoded `docs/reference/Screen Recording 2026-11-27 232138.mp4` at its native 30 fps for 08–11 s (90 consecutive frames). Frame 047 of the extracted interval (~9.53 s) is a holographic full-body figure, elevated and almost centered, with the helmet and legs visible. Frame 048 (~9.57 s) is already an extreme helmet/shoulder/torso view: the figure occupies the left side, the near shoulder is intentionally cropped, a shoulder spike extends right, and the right side retains negative space. The model, spectral material, background and type treatment remain visually continuous; the recording does not expose its actual camera coordinates, scroll mapping or implementation. The character asset differs from ours, so the goal is relative composition and cut semantics, not pixel identity. No proprietary frames or source are added to Git.

## Implemented boundary

- Removed `sampleRootYaw()` (the 2.62-radian turn/unwind) and its additive `torsoLead`/`torsoRelease`, without changing the GLB or its skeletal clips. The H2.8 `baseRotations` restoration before `mixer.update(0)`, capture afterward, bounded head/neck offsets, deterministic finger articulation and original-clips inspection mode remain intact. Main and afterimage roots now stay at zero authored yaw.
- `HARD_CUT_PROGRESS = .44`. The first composition holds the existing elevated full-body shot from `.175` until the cut. The close-up becomes active **at exactly `.44`** and holds until `.56`; only then does the previously existing later camera movement resume. Total desktop travel remains 28 viewport heights. No camera orbit, intermediate side/rear view, flash or crossfade occurs between these two shots.
- Configured camera values before tracking offsets/shake: A position `(1.7, 2.8, 8.6)`, target `(0, 2.9, 0)`, FOV `33°`; B position `(-2.4, 4.5, 1.6)`, target `(1, 4.35, 0)`, FOV `34°`. The root, clip times and shader/background/aura progress keep their original absolute scroll coordinate. A and B use the same key/fill/rim/environment levels at the boundary, avoiding an authored lighting jump.
- The shot type distinguishes `smooth`, `hold` and `cut`. A cut never feeds its zero-width interval to `ramp()`: values just before `.44` remain A; exactly `.44` and just after use B. The camera sampler receives no intermediate orbital mix at that boundary.
- A 390px Vietnamese browser review initially found the helmet outside the left edge after the cut. The mobile-only camera framing now pans 1.1 world units at the cut and releases that offset during the already scheduled `.56–.635` move; no desktop camera value or model pose changes. The helmet is visible in [mobile cut](../artifacts/h29-1/mobile-at-cut.png) and [mobile established close-up](../artifacts/h29-1/mobile-close-up.png). The mobile section remains unpinned and had no document-level horizontal overflow in the reviewed capture.

## Rendered frames and verification

The following are **actual 1440×900 Chrome/SwiftShader renders**, stored in Git-ignored `artifacts/h29-1/`. Each also has a `-neutral.png` counterpart from `?cinematicNeutral=1` for pose/framing inspection.

1. [Established full-body at 26%](../artifacts/h29-1/01-full-body.png).
2. [Immediately before cut, debug 43.98%](../artifacts/h29-1/02-before-cut.png).
3. [At cut, debug 44.00%](../artifacts/h29-1/03-at-cut.png).
4. [Immediately after cut, debug 44.01%](../artifacts/h29-1/04-after-cut.png).
5. [Established close-up at 48%](../artifacts/h29-1/05-close-up.png).

The exact cut is validated in the shot sampler, not inferred from subpixel browser scrolling: `node --experimental-strip-types scripts/h29-camera-cut-check.mjs` sampled 10,001 values across 0–1 and found finite camera position, target and FOV throughout; just before `.44` gives A, at/after gives B. A forward/reverse sample sequence returned identical numeric states. Browser scroll sequence 43.98% → 44.00% → 48% → 43.98% → 44.00% produced byte-identical PNG hashes at each repeated position, with no JS exceptions or console errors in the capture. The H2.8 rig diagnostic re-ran at 10 progress values including 43.99/44.00/44.01%: maximum repeated/reverse difference was `0.000003°` across 19 controlled joints; exit 0.

The browser's programmatic `scrollTo()` rounded to whole pixels; a requested `.44005` produced stage debug progress `.4400`. This is why the browser's five screenshot seek arguments differ slightly from the exact code boundary. The scene inspector can be opened at `/en?cinematicDebug=1` or `/vi?cinematicDebug=1`; neutral mode adds `&cinematicNeutral=1`.

## Files and limitations

Changed `cinematic-animation.ts`, `cinematic-shot-plan.ts`, `cinematic-scene.ts`, `cinematic-afterimages.ts`, `cinematic-timing.ts`, `scripts/h28-rig-diagnostics.mjs`, and the architecture/task/decision documents; added `scripts/h29-camera-cut-check.mjs` and this report. No dependencies or asset/model changes. The close-up is visually similar in scale and left/right balance but not an exact MACACO replica; the owner's final art-direction judgment, real-GPU/trackpad behavior and other aspect ratios remain open. The provisional GLB must remain local and ignored until public rights are confirmed. Playwright/E2E is **DEFERRED until P11**. No production build, commit, push or deployment was performed.
