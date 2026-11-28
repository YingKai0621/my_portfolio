# Design references — P6 onward

These references guide the experience, not a component shopping list. Publicly accessible behavior may inspire original implementation; no proprietary source, imagery or paid code is copied.

| Reference | Intended use | Inspection status (P6) |
|---|---|---|
| https://www.awwwards.com/websites/ | Creative art direction, storytelling and web experiences | The page timed out in the available browser tool; intended purpose recorded, no interaction claim. |
| https://www.poulo.site/ | Creative development and small, intentional interactions | Public page text was accessible; detailed live interaction was not verifiable in the available tool. |
| https://www.enigmascult.com/ | Mystery Box's cinematic, scroll-driven zipper reveal as motion inspiration | Public page text was accessible; the browser tool did not expose live animation frames. P6 implements an original mechanical interpretation of the owner-described sequence, not a claim of pixel-perfect reproduction. |
| https://hungpham.online/ | Bold typography and editorial composition | Unavailable in the browser tool; no visual or behavior claim. |
| https://ui.aceternity.com/ | Interactive component ideas | Public component catalog accessible; P6 zipper is original, not a registry component. |
| https://magicui.design/ | Motion component ideas | Public catalog accessible; no Magic UI component needed in P6. |
| https://gsap.com/ | Advanced timeline and scroll implementation | Official ScrollTrigger and React/installation documentation consulted for pin, scrub, responsive recalculation and cleanup. |

P6 art direction: a mechanical unlock creates a new-chapter threshold, followed by a readable editorial photo journal. Approved typography and Black Basalt/Bone/Glacier Blue remain fixed. Live Enigmascult and Awwwards animation frames were not available in the browser tool during this refinement; the zipper artwork and timing are original interpretations of the owner-specified behavior, not a copied source or a claim of exact fidelity.

### P6 provisional photography

The three images below are licensed under the [Unsplash License](https://unsplash.com/license), retain natural color, and are **stock illustrations of themes**, not photographs of Duy, FPT University, SEAL Hackathon, NASA Space Apps, or the research project. The UI discloses this in English and Vietnamese. Replace these exact local files with approved authentic assets when supplied; do not use them as evidence of a personal event.

| Local file | Theme | Photographer and source |
|---|---|---|
| `public/images/placeholders/journey-education-photo.jpg` | Education / lecture space | [Changbok Ko, Unsplash](https://unsplash.com/photos/empty-university-lecture-hall-desks-F8t2VGnI47I) |
| `public/images/placeholders/journey-teamwork-overhead.jpg` | Teamwork / collaboration | [Marvin Meyer, Unsplash](https://unsplash.com/photos/people-sitting-down-near-table-with-assorted-laptop-computers-SYTO3xs06fU) |
| `public/images/placeholders/journey-research-photo.jpg` | Research / study workspace | [Yen Vu, Unsplash](https://unsplash.com/photos/desk-with-open-book-laptop-and-study-materials-HNjWq8WPyoY) |

Previous abstract SVGs remain in `public/images/placeholders` for recoverability but are no longer rendered in P6.

### P7 — PROJECT GLACIER

The owner rejected the earlier FORM IN MOTION sculpture and restored the mecha direction. [Studio MACACO](https://studiomacaco.ch/en/) is the primary **cinematic quality and interaction reference**, not a source of copied JavaScript, shader code, website textures or layout. The [public GLB URL](https://studiomacaco.ch/intro/Mecha_Full.glb) supplies a provisional character for local development only; URL accessibility is not a reuse license. The owner reports an automated email welcoming non-profit use, but the actual terms and whether they cover modifications, redistribution and a public career portfolio have not been independently verified. `docs/P7_ASSET_PROVENANCE.md` records the exact file and restrictions. The implementation uses original camera choreography, lighting, scroll orchestration and shader code; it must not be deployed or committed with that GLB until permission is confirmed. The character can be replaced independently of the scene architecture.

### H2.1 — MACACO video review for Glacial Awakening

The requested `docs/references/macaco/` directory was absent on 2026-11-27. The separately supplied MP4 in the owner's Videos folder **was accessible and decoded** with FFmpeg: H.264, 1280×720, 13.604 seconds. Nine representative frames were extracted at 1.5-second intervals to a temporary directory for visual inspection; they are not copied into the repository. The recording is a filmed browser display, so precise color, frame timing and shader implementation cannot be inferred from it.

- **Opening (approximately 0–1.5 s):** a helmet/upper-torso three-quarter crop fills much of the frame; warm directional light picks out metal planes while dark regions preserve silhouette. Navigation is sparse, background texture is subdued, and character scale—not interface chrome—creates the impact. H2.1 interprets this as a cool-silver/graphite close-up with the owner's name in the foreground and a large outline name layer behind the model.
- **Later moments retained for H2.2/H2.3:** the recording shifts to iridescent/holographic armor and a brighter composition, then to a smaller full-body character against oversized outline lettering and subsequent editorial sections. The strongest transitions alter camera distance, material response, lighting and typography together. The sampled frames do not establish exact scroll positions or easing curves; these remain owner-review questions for future stages.
- **Not copied:** Studio MACACO's yellow branding, HUD text, proprietary code/shaders, page artwork or project assets. The H2.1 background grain/halftone, typography, lighting and material grade are original to Glacial Precision.

### H2.2/H2.3 — unified opening review

The same accessible 13.604-second owner-supplied screen recording and the prior `docs/P7_TECHNICAL_DISCOVERY.md` were reviewed again. The sampled contact sheet is in a temporary local review directory, not in this repository; `docs/references/macaco/` is still absent. The recording shows a close-up armored character, a later bright iridescent treatment, a smaller full-body pose framed by huge outline type, then a handoff into studio information. It does **not** reveal exact scroll coordinates, source code, model authorship or permission. The live public site supplies the studio's own editorial content, but the video is the primary visual evidence for this pass.

H2.2/H2.3 interprets those observable relationships with original Glacial Precision art direction: a held helmet composition, a power-on move to medium scale, a build clip across wider angled shots and cold-spectrum material/dither interval, a descent pose moved left of the owner's actual About introduction, and a Bone transition into the unchanged About section. This is not a copied MACACO shot list, HUD, shader, texture or page layout. The five chapter boundaries, local-stage scroll span and material values are original implementation choices pending owner visual review. The provisional GLB remains local-only under `docs/P7_ASSET_PROVENANCE.md`; it must not be committed or distributed without explicit rights confirmation. The old P2/H2.1 source remains recoverable.

### H2.4 — comparative visual and pacing review

The owner-supplied MACACO recording was compared with `C:\Users\taola\Videos\Recording 2026-11-27 221851.mp4` (5.77 seconds, 1990×1384), a screen recording of the current local portfolio. FFmpeg contact sheets from both recordings were inspected. The current recording showed predominantly pale white armor, plain dark backgrounds, and rapid shifts between a close-up and smaller full-body poses; the MACACO recording showed much stronger dark-to-spectral material contrast, environmental changes and editorial framing. The recording does not establish an exact interaction timeline, and the public site text alone does not expose the live WebGL motion; H2.4's shot, light, shader, architecture and timing are independent original interpretations. Neither recording nor extracted frames were added to the repository.

H2.4's local Chrome/CDP still review samples 0/20/40/60/80/100% of the 6.2-viewport span. The 0% helmet and name, 20% awakening, 40% controlled handoff into Transformation, 60% iridescent upper body, 80% procedural architectural descent and 100% Bone handoff were observed without console errors in clean-profile Chrome. A 0.48-second scrub experiment lagged several chapters under software WebGL, so the stage reverted to direct scroll-derived progress. A separate fast reverse-scroll probe initially left a stale Digital World panel at the top; sampling absolute scroll position in a passive listener corrected the final probe to the Identity panel. The Skip link landed at `#about` with `aboutTop = 0`, and the post-pin About boundary moved in normal flow. Mobile VI at 390px showed no page-level horizontal overflow; reduced-motion VI did not load the GLB. Real-device frame pacing and owner aesthetic approval are still open. The procedural architecture is built from original scene geometry, not MACACO's environment. The model license/release restriction remains in `docs/P7_ASSET_PROVENANCE.md`.

### H2.6 — complete reference-driven Hero/About review

The actual files were located at `docs/reference/Screen Recording 2026-11-27 232138.mp4` (MACACO, 35.3 s) and `C:/Users/taola/Videos/Screen Recordings/Screen Recording 2026-11-28 000545.mp4` (latest local H2.5, 9.2 s), rather than under the suggested `docs/references/` path. Both were decoded to temporary contact sheets; the MACACO landing interval was sampled more densely. The shot breakdown, observed/unknown distinction, original timing map and local visual-review limits are in `docs/H2_6_CINEMATIC_STORYBOARD.md`. The main reference lesson is the **character remaining in the same environment during the introduction after impact**. Our H2.6 uses original code, copy, shader, architecture and Glacial Precision grading; it does not reuse MACACO's graphic assets, proprietary source or exact studio layout. Public character rights remain unresolved under `docs/P7_ASSET_PROVENANCE.md`.
