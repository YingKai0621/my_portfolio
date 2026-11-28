# H3.1.1-R3-GREEN-PUSH — Visual Review

Status: **visual review gate**

Scope: development-only S01 material and lighting exploration. Camera, target, FOV, character scale, authored pose at `0.48 s`, root rotation, identity placement, composition guides and the production cinematic timeline are unchanged.

## Reference check

The Studio MACACO reference was reinspected at `00:00–00:03` using the previously decoded local frames under `artifacts/h3-1-1-r2/reference/`. The defining color principle is large-area colored metallic armor, separated by black mechanical joints, rather than a neutral body carrying only emissive accent lines.

R3 therefore moves green into all three major `AI_White_A/B/C` armor slots while preserving the `AI_Black_A/B/C` mechanical slots. `AI_Gold` and `MAT_Emissive_Limbs` remain the energy-channel boundary. The source GLB and production shader remain untouched.

## Variants

### D — Acid Green / Graphite

- Saturated industrial green across helmet and body plates.
- Deep black joints, vivid Acid Green channels and restrained violet rim.
- Strong and mechanical; warmer and less polished than E.

Preview: `http://localhost:3000/en?cinematicS01=1&s01Material=acid`

### E — Metallic Emerald / Black

- Clearly emerald major armor with the highest metallic/environment response.
- Black mechanical separation, neon-green energy and small cool-white/cyan highlights.
- Cleanest premium read and the least visually playful of the three.

Preview: `http://localhost:3000/en?cinematicS01=1&s01Material=emerald`

### F — Toxic Lime / Gunmetal

- Aggressive lime-green body influence and the brightest surface read.
- Hot-lime energy with restrained magenta/violet rim.
- Maximum visual pop, but deliberately louder and more stylized than E.

Preview: `http://localhost:3000/en?cinematicS01=1&s01Material=toxic`

## Recommendation

**Variant E — Metallic Emerald / Black** best meets “green prominent + premium + not childish.” The green is unmistakable on the armor without depending on emissive channels, the black joint hierarchy remains clear, and the cool highlights make the metal feel cleaner than D or F. This is a review recommendation only; no final variant is selected without owner approval.

## Rendered evidence

- Comparison sheet, `1920 × 1080`: `artifacts/h3-1-1-r3-green-push/def-comparison-sheet-1920x1080.png`
- D full frame: `artifacts/h3-1-1-r3-green-push/variant-d-acid-1920x1080.png`
- E full frame: `artifacts/h3-1-1-r3-green-push/variant-e-emerald-1920x1080.png`
- F full frame: `artifacts/h3-1-1-r3-green-push/variant-f-toxic-1920x1080.png`
- D close-up: `artifacts/h3-1-1-r3-green-push/variant-d-helmet-shoulder-1400x1064.png`
- E close-up: `artifacts/h3-1-1-r3-green-push/variant-e-helmet-shoulder-1400x1064.png`
- F close-up: `artifacts/h3-1-1-r3-green-push/variant-f-helmet-shoulder-1400x1064.png`
- Production sanity capture: `artifacts/h3-1-1-r3-green-push/production-hero-sanity-1920x1080.png`

All three review captures reported the same approved runtime composition:

- camera position: `1.9290, 2.6608, 2.0673`
- target: `-0.2410, 2.8808, -0.6627`
- FOV: `31.00°`
- root rotation: `0.0000, 0.0000, 0.0000`

The browser used the NVIDIA GeForce RTX 3060 Laptop GPU through ANGLE D3D11. No preview runtime exception or warning occurred. The existing unrelated `/favicon.ico` 404 remains visible in network logging.

## Changed files

- `src/lib/glacier/cinematic-s01-look.ts`
- `src/lib/glacier/hero-lighting.ts`
- `src/components/sections/glacial-cinematic-stage.tsx`
- `docs/H3_1_1_R3_GREEN_PUSH_REVIEW.md`

## Validation

- TypeScript: passed with `npm.cmd run typecheck`.
- ESLint: passed with `npm.cmd run lint`.
- Playwright: **DEFERRED** to P11; not installed or executed.
- Production build: not run because this is a development-only isolated visual review.
- Commit/push/deploy: not performed.

## Review gate

The D/E/F images satisfy the R3 acceptance criterion: every proposal reads as a green robot at first glance, with green present on major helmet, shoulder and body armor panels. Stop here for owner selection or correction. Do not proceed to background, HUD, particles, typography redesign or later H3 shots.
