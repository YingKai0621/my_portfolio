# H3.1.1-R4 — Background & Atmospheric Art Direction Review

Status: **isolated S01 visual review gate**

Scope: development-only S01 background exploration. The production `/en` experience, cinematic timeline, camera, target, FOV, authored pose, character root, robot scale and placement, identity layout, lighting and all later shots remain unchanged.

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

## 8. Validation

- TypeScript: passed with `npm.cmd run typecheck`.
- ESLint: passed with `npm.cmd run lint`.
- Browser render: passed for baseline, A, B, background-only, mobile and production-route sanity captures; every canvas reported ready.
- Runtime: no scene exception or WebGL warning was captured. The existing unrelated `/favicon.ico` 404 remains visible in the clean-browser capture log.
- Production `/en`: the sanity capture had no S01 preview class or S01 dataset. R4 controls remain development-query-only.
- Playwright: **DEFERRED** to P11 per the approved project workflow; not installed or executed.
- Production build: not run; prohibited and unnecessary for this isolated review pass.

## 9. Limitations and review questions

- Evidence covers one desktop GPU and a simulated mobile viewport, not a physical mobile device.
- Static screenshots can verify density, composition and contrast but not temporal stability under browser resizing; the shader is intentionally static and has no autonomous animation.
- The provisional robot asset remains subject to the permission constraints recorded in `docs/P7_ASSET_PROVENANCE.md`.
- R4 selects no background variant on behalf of the owner. A and B remain isolated review choices.

## Review gate

Choose Variant A, Variant B, or request a focused density/color adjustment. Do not proceed to stripes, HUD graphics, particles beyond the current static micro-specks, typography redesign, animation, or later H3 shots until this S01 background direction is approved.
