# H3.1.1-R4 — Background & Atmospheric Art Direction Review

Status: **H3.1.1-R4.1 isolated S01 visual review gate**

Scope: development-only S01 background exploration. The production `/en` experience, cinematic timeline, camera, target, FOV, authored pose, character root, robot scale and placement, identity layout, lighting and all later shots remain unchanged.

## R4.1 correction summary

The owner selected R4 Variant B as the direction to refine, not as an approved final background. R4.1 corrects the shader output pipeline first, then provides two denser art-direction profiles while preserving the selected spectral robot and the entire locked S01 composition.

### Verified color-pipeline finding

- Installed Three.js version: `0.187.0`.
- The renderer uses `SRGBColorSpace`; the atmosphere is a custom `ShaderMaterial` with `toneMapped: false`.
- Three.js `Color` uniforms are held in the working linear color space. The R4 fragment shader previously assigned those values directly to `gl_FragColor`.
- Three injects the color-space helper definitions into non-raw shader materials, but a custom fragment shader still has to execute `#include <colorspace_fragment>` after setting `gl_FragColor`.
- The missing output conversion made the R4 atmosphere materially darker and less legible than its configured palette implied.

R4.1 now executes the standard Three.js color-space fragment step. It does **not** alter renderer exposure, tone mapping, character materials, scene lighting or any global color setting. The capture `artifacts/h3-1-1-r4-1/color-space-corrected-only-1920x1080.png` records the old R4 B field immediately after this pipeline correction and before any R4.1 density/art-direction adjustment.

### Reference reinspection

The `00:00–00:03` local MACACO opening evidence was re-compared with R4 B. The relevant observable principles are:

- the halftone is legible across several upper, side and lower regions rather than one isolated lower-left patch;
- its clusters vary in density and contain broad irregular gaps;
- brighter areas still preserve a near-black foundation and negative space around the primary subject;
- yellow/olive tonal mass, not isolated bright particles, creates depth in the reference;
- supporting color remains subordinate to the dominant field.

R4.1 independently maps those principles to near-black, dark green, Acid Green and restrained Electric Violet. No reference shader, texture or asset was reused.

### R4.1 profiles

#### B1 — Corrected Rich Atmosphere

- wider multi-field coverage with clearly separated organic regions;
- restrained diffuse energy and visible CSS-pixel halftone clusters;
- broad black breathing room around the character and lower identity lockup;
- reduced micro-speck frequency so the result does not read as a starfield.

Preview:

`http://localhost:3000/en?cinematicS01=1&s01Background=corrected`

Background-only:

`http://localhost:3000/en?cinematicS01=1&s01Background=corrected&s01BackgroundOnly=1`

#### B2 — High-density Digital Atmosphere

- the same deterministic distribution and palette as B1;
- lower organic thresholds, finer halftone cells and stronger clustered coverage;
- denser upper, middle and side fields while preserving a dark central silhouette region;
- no bloom, large particles, neon blobs or autonomous animation.

Preview:

`http://localhost:3000/en?cinematicS01=1&s01Background=dense`

Background-only:

`http://localhost:3000/en?cinematicS01=1&s01Background=dense&s01BackgroundOnly=1`

### Preview isolation correction

The background-only state is now accepted only when `cinematicS01` activates the isolated preview and a recognized atmosphere profile is present. An invalid production-style URL such as `/en?s01Background=dense&s01BackgroundOnly=1` can no longer hide the character or add preview-only document classes. This is enforced both in the React query parser and again inside the Three scene controller.

### Future industrial-stripe layer strategy

No stripe is implemented in R4.1. The atmosphere plane is opaque and renders at `renderOrder: -120`, so the reliable future composition is a separate Three.js stripe plane/group in the same WebGL scene, ordered after the atmosphere and before the character, with depth writes disabled. That places the stripe visually **in front of the atmosphere but behind the robot** without turning the atmosphere transparent or coupling stripe geometry to the shader.

## 1. Locked robot material

The robot look is locked to the existing **R2 Variant C — Spectral Metallic** preset:

- Runtime preset: `spectral` in `src/lib/glacier/cinematic-s01-look.ts`.
- Original R2 evidence: `artifacts/h3-1-1-r2/variant-c-spectral-1920x1080.png`.
- Original R2 preview: `http://localhost:3000/en?cinematicS01=1&s01Material=spectral`.

This is the dark graphite/black metallic treatment with Acid Green emissive channels and controlled Electric Violet spectral separation. R4 does not apply the R3 green-body presets, recolor materials, change lighting, or alter the GLB.

The R4 browser captures confirm the approved static composition remains:

- camera position: `1.9290, 2.6608, 2.0673`
- camera target: `-0.2410, 2.8808, -0.6627`
- FOV: `31.00°`
- character root rotation: `0.0000, 0.0000, 0.0000`
- authored idle sample: `0.48 s`

## 2. Reference evidence inspected

The local Studio MACACO recording `docs/reference/Screen Recording 2026-11-27 232138.mp4` was re-inspected through the already decoded opening frames from `00:00` through `00:03`:

- `artifacts/h3-1-1-r2/reference/macaco-0000.png`
- `artifacts/h3-1-1-r2/reference/macaco-0050.png`
- `artifacts/h3-1-1-r2/reference/macaco-0150.png`
- `artifacts/h3-1-1-r2/reference/macaco-0250.png`
- `artifacts/h3-1-1-r2/reference/macaco-0300.png`
- `artifacts/h3-1-1-r2/reference/macaco-0000-0300-contact.png`

Observable background principles, independently reimplemented rather than copied:

- a near-black foundation carries the majority of the frame;
- large, irregular tonal fields drive visual rhythm rather than a uniform gradient;
- fine screen-space dots become denser only where the field is brighter;
- clusters contain missing cells and broad negative-space gaps, avoiding a regular wallpaper pattern;
- sparse bright micro-marks support scale without becoming a conventional particle field;
- brighter energy remains behind the subject and does not wash across the character or typography.

No reference assets, shaders, source code, UI graphics or branding were reused.

## 3. Implementation strategy

R4 extends the existing Three.js scene with one static full-screen shader plane behind the robot:

1. **Foundation:** opaque `#080A08` near-black base.
2. **Organic field:** deterministic multi-octave value noise with a second warped field for non-repeating lobes.
3. **Palette mapping:** controlled progression through `#202B0D`, `#587A10` and localized `#B6FF00`; `#963CFF` appears only in secondary regions.
4. **Halftone:** CSS-pixel-sized screen-space cells whose radius and visibility are driven by the organic field luminance. Per-cell hashing removes regular cells and creates irregular clusters.
5. **Micro-specks:** sparse deterministic square marks generated inside the same fragment shader and draw call.
6. **Negative space:** localized masks reduce energy behind the central character, lower identity lockup and future industrial stripe region. No stripe artwork is implemented in R4.

The atmosphere plane renders before the character (`renderOrder: -120`) with depth writes disabled. It therefore remains physically behind the robot instead of applying noise, tint or blend effects over the model and foreground text.

## 4. Variants

### Variant A — Restrained Industrial Atmosphere

- localized halftone clusters;
- low-density deterministic specks;
- restrained green field with very limited violet;
- largest amount of uninterrupted near-black negative space.

Preview:

`http://localhost:3000/en?cinematicS01=1&s01Background=restrained`

### Variant B — Rich Digital Atmosphere

- broader overlapping organic fields;
- smaller, denser luminance-driven halftone cells;
- more visible green energy and controlled violet secondary regions;
- increased micro-speck density without continuous movement.

Preview:

`http://localhost:3000/en?cinematicS01=1&s01Background=rich`

Both R4 preview values force the selected `spectral` material at runtime. The shader can be disabled completely for a direct baseline comparison:

`http://localhost:3000/en?cinematicS01=1&s01Material=spectral&s01Background=off`

Background-only diagnostic:

`http://localhost:3000/en?cinematicS01=1&s01Background=rich&s01BackgroundOnly=1`

All query controls are development-only.

## 5. Browser-rendered evidence

Desktop captures use a consistent `1920 × 1080` viewport:

- baseline plain selected robot: `artifacts/h3-1-1-r4/baseline-spectral-plain-1920x1080.png`
- Variant A: `artifacts/h3-1-1-r4/variant-a-restrained-1920x1080.png`
- Variant B: `artifacts/h3-1-1-r4/variant-b-rich-1920x1080.png`
- background-only diagnostic: `artifacts/h3-1-1-r4/background-only-rich-1920x1080.png`
- comparison sheet: `artifacts/h3-1-1-r4/background-comparison-sheet-1920x1080.png`
- production-route sanity capture: `artifacts/h3-1-1-r4/production-route-sanity-1920x1080.png`

Responsive evidence:

- rich atmosphere at `390 × 844`: `artifacts/h3-1-1-r4/mobile-rich-390x844.png`

R4.1 evidence is stored under the ignored `artifacts/h3-1-1-r4-1/` review directory:

- original R4 B: `original-r4-variant-b-1920x1080.png`
- color-space correction before artistic changes: `color-space-corrected-only-1920x1080.png`
- B1 with robot: `b1-corrected-rich-atmosphere-1920x1080.png`
- B2 with robot: `b2-high-density-digital-atmosphere-1920x1080.png`
- B1 background-only: `b1-background-only-1920x1080.png`
- B2 background-only: `b2-background-only-1920x1080.png`
- B1 mobile at `390 × 844`: `b1-mobile-390x844.png`
- four-way comparison: `r4-1-comparison-sheet-1920x1080.png`
- invalid-query production sanity: `invalid-preview-query-production-sanity-1920x1080.png`

Every R4.1 desktop capture retained the locked camera position `1.9290, 2.6608, 2.0673`, target `-0.2410, 2.8808, -0.6627`, `31°` FOV and zero root rotation. The mobile capture reported no horizontal overflow.

The desktop captures reported NVIDIA GeForce RTX 3060 Laptop GPU through ANGLE D3D11. No horizontal overflow occurred in the mobile capture.

## 6. Performance and lifecycle

- Reuses the existing renderer and WebGL context; no additional canvas or context is created.
- Adds one plane, one shader material and one draw call only in the isolated S01 atmosphere preview.
- Uses no DOM particle collection, external texture, package or animation loop.
- Has no time uniform. The image is deterministic and renders only when the existing scene schedules a frame for load, visibility, progress or resize.
- Halftone cell size is normalized to CSS pixels, avoiding DPR-dependent density changes and reducing high-DPI moiré risk.
- Resize updates only resolution and pixel-ratio uniforms.
- Scene disposal removes the mesh and releases geometry and material resources.
- The `off` mode creates no atmosphere shader resources.

## 7. Files changed for R4

- `src/lib/glacier/cinematic-s01-atmosphere.ts`
- `src/lib/glacier/cinematic-scene.ts`
- `src/components/sections/glacial-cinematic-stage.tsx`
- `src/app/globals.css`
- `docs/H3_1_1_R4_BACKGROUND_ATMOSPHERE_REVIEW.md`

Generated evidence is stored under `artifacts/h3-1-1-r4/` and is outside the production bundle.

R4.1 modifies only:

- `src/lib/glacier/cinematic-s01-atmosphere.ts`
- `src/lib/glacier/cinematic-scene.ts`
- `src/components/sections/glacial-cinematic-stage.tsx`
- `docs/H3_1_1_R4_BACKGROUND_ATMOSPHERE_REVIEW.md`

R4.1 evidence is stored under ignored `artifacts/h3-1-1-r4-1/`; it is not committed or shipped.

## 8. Validation

- TypeScript: passed with `npm.cmd run typecheck`.
- ESLint: passed with `npm.cmd run lint`.
- Browser render: passed for baseline, A, B, background-only, mobile and production-route sanity captures; every canvas reported ready.
- Runtime: no scene exception or WebGL warning was captured. The existing unrelated `/favicon.ico` 404 remains visible in the clean-browser capture log.
- Production `/en`: the sanity capture had no S01 preview class or S01 dataset. R4 controls remain development-query-only.
- Playwright: **DEFERRED** to P11 per the approved project workflow; not installed or executed.
- Production build: not run; prohibited and unnecessary for this isolated review pass.

R4.1 validation:

- TypeScript: passed with `npm.cmd run typecheck`.
- ESLint: passed with `npm.cmd run lint`.
- Browser render: passed for B1, B2, both background-only views, B1 mobile and the invalid-query production sanity check; every canvas reported ready.
- Runtime: no React exception, shader compilation error or WebGL warning was captured in an extension-disabled browser profile.
- Playwright: **DEFERRED** to P11; not installed or executed.
- Production build: not run; prohibited and unnecessary for this isolated review pass.

### Next.js development indicator investigation

The reported red indicator is a React hydration mismatch whose diff contains the external attribute `cz-shortcut-listen="true"` on the document element/body before React hydrates. That attribute is not rendered by this repository; it is injected into the DOM by a browser extension. A clean, extension-disabled Chrome profile reports:

- no `cz-shortcut-listen` attribute on `<html>` or `<body>`;
- no hydration exception or warning;
- an empty Next.js issue portal.

The clean profile still reports the unrelated existing network `404` for `/favicon.ico`; that request is not the hydration mismatch shown by the red indicator. R4.1 does not add `suppressHydrationWarning`, hide the indicator or otherwise mask the external DOM mutation.

## 9. Limitations and review questions

- Evidence covers one desktop GPU and a simulated mobile viewport, not a physical mobile device.
- Static screenshots can verify density, composition and contrast but not temporal stability under browser resizing; the shader is intentionally static and has no autonomous animation.
- The provisional robot asset remains subject to the permission constraints recorded in `docs/P7_ASSET_PROVENANCE.md`.
- R4 selects no background variant on behalf of the owner. A and B remain isolated review choices.

## Review gate

Choose **B1 — Corrected Rich Atmosphere**, **B2 — High-density Digital Atmosphere**, or request another focused density/color correction. Do not proceed to stripes, HUD graphics, additional particles, typography redesign, animation, or later H3 shots until this S01 background direction is approved.
