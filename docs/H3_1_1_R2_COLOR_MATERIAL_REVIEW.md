# H3.1.1-R2 — Robot Color & Material Review

Status: **visual review gate — no variant selected**

Scope: development-only isolated S01 preview. The production cinematic timeline, approved S01 pose, camera, framing, scale, placement, identity layout and composition guides are unchanged.

## 1. Reference evidence inspected

The local Studio MACACO recording `docs/reference/Screen Recording 2026-11-27 232138.mp4` was decoded directly. This review inspected the opening at `00:00.000`, `00:00.500`, `00:01.500`, `00:02.500` and `00:03.000` plus a six-frame contact sheet spanning the same interval.

Saved reference evidence:

- `artifacts/h3-1-1-r2/reference/macaco-0000.png`
- `artifacts/h3-1-1-r2/reference/macaco-0050.png`
- `artifacts/h3-1-1-r2/reference/macaco-0150.png`
- `artifacts/h3-1-1-r2/reference/macaco-0250.png`
- `artifacts/h3-1-1-r2/reference/macaco-0300.png`
- `artifacts/h3-1-1-r2/reference/macaco-0000-0300-contact.png`

Observed principles carried into the original S01 look exploration: bright energy remains localized; black joints separate armor masses; white specular bands describe helmet and shoulder planes; directional light leaves purposeful deep shadow; and a colored rim preserves the silhouette. No reference shader, source code, artwork or branding was copied.

## 2. Actual GLB material inventory

The provisional `mecha-full.glb` contains one skinned mesh, `MechaShape`, divided into 11 primitives and eight material slots:

- `MAT_Emissive_Limbs`: assigned to primitives 0, 2 and 10; no base-color or metallic/roughness texture; `metallicFactor: 0` in the source.
- `AI_Black_A`: assigned to primitives 1 and 8; base-color texture 0 and metallic/roughness texture 1.
- `AI_Gold`: assigned to primitive 3; base-color texture 2 and metallic/roughness texture 3.
- `AI_Black_C`: assigned to primitive 4; base-color texture 4 and metallic/roughness texture 5.
- `AI_White_C`: assigned to primitive 5; uniform source base-color factor approximately `0.772`; metallic/roughness texture 6.
- `AI_Black_B`: assigned to primitive 6; base-color texture 7 and metallic/roughness texture 8.
- `AI_White_B`: assigned to primitive 7; uniform source base-color factor approximately `0.772`; metallic/roughness texture 9.
- `AI_White_A`: assigned to primitive 9; base-color texture 10 and metallic/roughness texture 11.

The 12 embedded images are WebP. They comprise five base-color maps and seven metallic/roughness maps. The GLB declares no normal maps and no emissive textures. Geometry normals therefore carry the small-scale surface response not encoded in the color/metallic maps.

## 3. Reversible override strategy

- The GLB is not modified. A new S01-only look controller applies runtime values to the materials freshly loaded for that preview scene.
- Existing base-color and metallic/roughness maps stay attached. Per-slot color, metalness, roughness, environment intensity and selective emissive values provide the comparison.
- `AI_White_A/B/C` retain different responses so armor plates do not collapse into one uniform surface.
- `AI_Black_A/B/C` stay deep and non-emissive to preserve mechanical separation.
- `AI_Gold` and `MAT_Emissive_Limbs` carry Acid Green. Because the asset exposes material-level rather than named body-region assignments, these slots are the safe reversible accent boundary.
- The production material shader is untouched. The normal `/en` route does not receive the S01 look controller.
- The preview owns its loaded materials and environment texture; the existing character and lighting disposal paths release them with the renderer.

## 4. Lighting strategy

All R2 variants use the same neutral S01 background and the same renderer. Their lighting uses broad PMREM reflection panels plus directional lights:

- Specular White key light defines helmet and shoulder planes.
- Acid Green fill and a narrow green reflection panel provide controlled energy spill.
- Electric Violet rim light separates selected dark edges from the background.
- Ambient light remains low so black joints stay distinct.
- No bloom, fog, holographic shader, dither or additional post-processing is active in these previews.

ACES exposure and emissive strength were tuned from actual NVIDIA RTX 3060 browser renders. The first pass clipped the visor toward white and buried graphite in the source maps; the final values reduce emissive energy and compensate for map multiplication without flattening the materials.

## 5. Variants

### Existing cyan baseline

A fixed S01-framing record of the pre-R2 cold cyan pigment family. It is included only for comparison and is not a fourth proposal.

### Variant A — Balanced Industrial

The most even relationship between readable graphite plates, Acid Green energy and restrained violet separation. Roughness differences remain visible without making every plate glossy.

### Variant B — High Contrast

Deeper mechanical blacks, lower fill, a stronger white key and brighter Acid Green energy. It produces the hardest illuminated-to-shadow transition of the three proposals.

### Variant C — Spectral Metallic

Higher environment response, a stronger violet rim and richer secondary reflection while keeping Acid Green as the dominant energy color. This remains a normal metallic state; it is not the later holographic transformation.

No final variant has been selected on behalf of the owner.

## 6. Development-only preview URLs

- Cyan comparison: `http://localhost:3000/en?cinematicS01=1&s01Material=cyan`
- Variant A: `http://localhost:3000/en?cinematicS01=1&s01Material=balanced`
- Variant B: `http://localhost:3000/en?cinematicS01=1&s01Material=contrast`
- Variant C: `http://localhost:3000/en?cinematicS01=1&s01Material=spectral`
- R1 neutral fallback remains: `http://localhost:3000/en?cinematicS01=1`
- Composition guides remain available by appending `&s01Guides=1`.

These query parameters are read only in development. They reuse one renderer and one preview scene; no parallel WebGL canvases are created.

## 7. Browser-rendered evidence

All four main renders use `1920 × 1080`, the approved S01 camera and the authored idle sample at `0.48 s`:

- `artifacts/h3-1-1-r2/cyan-baseline-1920x1080.png`
- `artifacts/h3-1-1-r2/variant-a-balanced-1920x1080.png`
- `artifacts/h3-1-1-r2/variant-b-contrast-1920x1080.png`
- `artifacts/h3-1-1-r2/variant-c-spectral-1920x1080.png`
- `artifacts/h3-1-1-r2/helmet-shoulder-detail-spectral-1400x1064.png`
- `artifacts/h3-1-1-r2/material-comparison-sheet-1920x1080.png`
- Production-route sanity capture: `artifacts/h3-1-1-r2/production-hero-sanity-1920x1080.png`

Runtime evidence was identical for the four comparison renders:

- camera position: `1.9290, 2.6608, 2.0673`
- camera target: `-0.2410, 2.8808, -0.6627`
- FOV: `31.00°`
- character root rotation: `0.0000, 0.0000, 0.0000`
- renderer: NVIDIA GeForce RTX 3060 Laptop GPU through ANGLE D3D11

## 8. Files changed for R2

- `src/lib/glacier/cinematic-s01-look.ts`
- `src/lib/glacier/hero-lighting.ts`
- `src/lib/glacier/cinematic-scene.ts`
- `src/components/sections/glacial-cinematic-stage.tsx`
- `docs/H3_1_1_R2_COLOR_MATERIAL_REVIEW.md`

The artifact folder contains generated local visual evidence and remains outside the production bundle.

## 9. Validation

- TypeScript: passed with `npm.cmd run typecheck`.
- ESLint: passed with `npm.cmd run lint`.
- Browser render: passed for cyan, A, B and C at `1920 × 1080`; all canvases reported ready.
- Production `/en` sanity render: passed; no S01 dataset or preview class was present.
- Browser console: no runtime exception or warning from the preview. The existing missing `/favicon.ico` request remains unrelated to R2.
- Playwright: **DEFERRED** to P11 per project workflow; not installed or executed.
- Production build: not run; unnecessary for this isolated development-only visual review.

## 10. Remaining limitations

- The GLB has no named shoulder/visor sub-meshes. `AI_Gold` and `MAT_Emissive_Limbs` are shared material boundaries, so independently art-directing one shoulder plate or one eye would require an authorized source-asset revision or a verified mesh-level mask. R2 does not destructively split the model.
- Five source base-color maps multiply runtime tint, so the literal material color is not the final display color. Values were judged from the required rendered evidence rather than hex values alone.
- No normal maps are available; fine panel definition depends on geometry normals, metallic/roughness maps, and reflection placement.
- The evidence covers one desktop GPU and framing. Mobile material evaluation and real-device performance are outside this isolated S01 color gate.
- The provisional asset remains subject to the permission restrictions in `docs/P7_ASSET_PROVENANCE.md` and must not be committed or publicly deployed without confirmed rights.

## Review gate

The approved H3.1.1-R1 S01 composition remains unchanged. The normal production-facing Hero remains on the existing production material, lighting and timeline paths. Review and select or revise A, B or C before any opening graphics, idle animation or later H3 shot work proceeds.
