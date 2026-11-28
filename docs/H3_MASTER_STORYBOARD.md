# H3.0 — Glacial Awakening Master Storyboard

Status: **H3.0-R1 final planning revision complete; implementation blocked pending final owner approval**

Scope: unified P2 Hero + P3 About cinematic opening only

Reference reviewed: Studio MACACO screen recording, `00:00.000–00:26.100`

Evidence convention: **Verified** means visible in the recording or confirmed in the local repository. **Inference** means a technically plausible explanation that cannot be proven from the recording. **Recommendation** is the proposed portfolio adaptation and is not implemented or approved yet.

This document supersedes earlier H2.9 implementation direction as a planning baseline. It does not retroactively rewrite the historical H2.x decisions. No MACACO source code, shader, artwork, model, typography, or branding has been copied.

### H3.0-R1 locked findings

The independent review accepted the existing reference analysis and 14-shot narrative in principle. R1 preserves the frame `286→287` hard cut, camera-edit interpretation, removal of the artificial 150-degree body turn, H2.8A quaternion restoration, verified clips/rig limits, proposed Acid Green × Electric Violet palette, industrial stripe opening, progressive HUD, architectural transition, landing sequence, distributed Explorer/Engineer/Builder narrative, and unified Hero/About structure. These questions are not reopened without new evidence.

## 1. Verified reference video metadata

**Verified with FFprobe**

- Local source: `docs/reference/Screen Recording 2026-11-27 232138.mp4`.
- Container family: QuickTime / MP4.
- Video codec: H.264.
- Native dimensions: `2558 × 1416`.
- Pixel format: `yuv420p`.
- Frame rate: `30/1 fps`, both reported and average.
- Duration: `35.300000 s`.
- Decoded frame count: `1,059` frames.
- File size: `67,717,963` bytes.
- The initial H3.0 analysis covered frame `0` through approximately frame `705`. H3.0-R1 extends focused review through approximately frame `783`, corresponding to `00:26.1`, where the subsequent Featured Projects section is clearly established.

Recording timestamps describe the captured website, not its internal scroll position. They must not be copied directly into normalized portfolio progress.

## 2. Complete timestamped reference shot breakdown

### R01 — Opening identity

- **Range:** `00:00.000–00:00.400`, frames `0–11`.
- **Verified character:** a very large helmet and upper torso dominate the composition at a dramatic three-quarter angle. The armor is dark, with bright yellow illumination and metallic highlights. The opening pose is already established at frame 0.
- **Verified head, hand, body:** helmet and shoulders are visible; no meaningful hand performance is present in this short interval. The pose changes only subtly.
- **Verified camera:** tight upper-body framing with the character crossing the central area. The recording does not expose camera coordinates.
- **Verified graphics and type:** a bold yellow-and-black diagonal stripe band spans behind the robot. Studio identity and a scroll prompt occupy the foreground. Fine interface marks frame the viewport.
- **Verified background and light:** black/yellow industrial atmosphere, controlled highlights, deep shadow, and restrained haze.
- **Entry / exit:** it begins fully composed. By approximately frame 12, the dominant identity and stripe treatment are receding into the activation shot.
- **Inference:** the stripe band may be a 2D or shader layer positioned behind the character. The recording alone cannot establish its rendering method.

### R02 — Awakening and technical interface

- **Range:** approximately `00:00.400–00:03.300`, frames `12–99`.
- **Verified character:** helmet, shoulders, and chest remain large. Movement is deliberate rather than a fast action.
- **Verified head, hand, body:** the head and upper body alter their relationship slowly. No clear hand-led action is visible.
- **Verified camera:** close framing explores the helmet and armor with gradual changes in scale and placement.
- **Verified materials:** dark metal with illuminated yellow details; bright areas remain localized instead of tinting the entire body.
- **Verified graphics:** technical framing, tick marks, small data-like labels, and waveform/interface motifs remain around the character. Elements do not read as one single dashboard panel.
- **Verified environment:** smoky black-and-yellow depth; graphic and rendered layers coexist.
- **Entry / exit:** the identity composition clears progressively. The shot flows into a camera/root movement that begins revealing more of the body.
- **Inference:** some perceived motion may come from camera movement, character animation, or both. Bone transforms cannot be recovered from the recording.

### R03 — Ascension and reframing

- **Range:** approximately `00:03.300–00:05.500`, frames `100–164`.
- **Verified character:** the framing travels from the upper body toward a larger body reveal. Lower-body regions enter the frame and the robot becomes elevated.
- **Verified head, hand, body:** the overall pose is controlled; no isolated finger action is readable at this scale.
- **Verified camera:** pronounced pull-back/reframing, with the character moving through the viewport rather than remaining a fixed product-viewer subject.
- **Verified material change:** normal dark metal develops into a brighter spectral/holographic appearance.
- **Verified graphics:** opening HUD and stripe dominance recede rather than persisting across the full experience.
- **Entry / exit:** multiple strong visual changes are visible around `04.433`, `04.667`, `05.167`, `05.300`, and `05.467`. The result is a full-body spectral performance.
- **Inference:** these changes may combine root translation, camera travel, material blending, and graphic-layer exits. The exact track ownership is unknown.

### R04 — Holographic full-body performance

- **Range:** approximately `00:05.500–00:09.533`, frames `165–286`.
- **Verified character:** a full-body robot is elevated and held prominently, generally centered or slightly offset. The body remains readable as a mechanical form.
- **Verified head, hand, body:** the pose evolves slowly. Head/body performance has visual breathing room; no abrupt manual 180-degree turn is visible.
- **Verified camera:** a composed full-body view rather than constant zooming. The character is allowed to hold a strong silhouette.
- **Verified material:** vivid iridescent reflections, bright white/spectral edges, differentiated panels, and deep black joints. It does not look like uniformly colored plastic.
- **Verified background:** organic spectral regions with substantial black negative space and visible screen-space/dither-like breakup. The shapes are not merely large soft gradient blobs.
- **Verified typography:** broad editorial words cross the composition while leaving the character legible.
- **Verified effects:** atmospheric/spectral motion passes through the scene without reading as a few identical glowing wires wrapped around the robot.
- **Entry / exit:** the shot resolves at frame 286. Frame 287 is a different camera composition with no intermediate orbit.
- **Inference:** the spectral breakup could use procedural noise, ordered dithering, compositing, or a combination; the exact shader is not observable.

### R05 — Cinematic hard cut

- **Range:** the boundary between frame `286` (`00:09.533`) and frame `287` (`00:09.567`).
- **Verified:** frame 286 is the full-body spectral composition. Frame 287 is already the extreme close-up. There is no recorded intermediate body rotation or camera orbit.
- **Verified continuity:** character identity and spectral material family persist across the cut, while framing changes immediately.
- **Inference:** it is visually a camera edit. Whether the original uses a camera switch, a cut between scene instances, or an equivalent render-state change is not provable.

### R06 — Extreme close-up

- **Range:** approximately `00:09.567–00:12.500`, frames `287–374`.
- **Verified character:** helmet, chest, and shoulder mass fill roughly the left side and central area. A shoulder projection extends toward the middle/right. The character feels monumental.
- **Verified head, hand, body:** the upper-body pose continues with subtle change. No dominant hand gesture begins immediately after the cut.
- **Verified camera:** restrained drift within an asymmetric close-up. The right side preserves purposeful negative space.
- **Verified material and light:** bright iridescent metal and dark mechanical separations remain readable at close range.
- **Verified typography:** the strongest part of this shot is not covered by a new dominant headline.
- **Entry / exit:** the cut is instantaneous; the close-up is then held before the gesture/environmental phase develops.
- **Inference:** the close shot may reuse the same animation time as the previous full-body shot. The recording cannot confirm mixer continuity.

### R07 — Gesture and material settling

- **Range:** approximately `00:12.500–00:15.333`, frames `375–460`.
- **Verified character:** the asymmetric close-up persists. An open hand becomes visible around the upper/side region and participates in the composition.
- **Verified head and body:** the helmet and torso remain deliberate rather than rapidly oscillating. Armor begins moving from highly spectral toward a darker metallic response.
- **Verified hand:** an open-hand presentation is visible. The sampled recording does **not** prove a complete fist-closing action, so that requested portfolio action is a new adaptation, not a copied reference behavior.
- **Verified camera:** the close composition remains stable enough to read the gesture.
- **Verified graphics and environment:** architectural illumination and headline treatment grow progressively rather than activating all at once.
- **Entry / exit:** scene architecture becomes increasingly dominant by frames `459–462`.
- **Inference:** hand movement could come from a source clip or additive finger control. The recording does not expose its rig.

### R08 — Environmental activation

- **Range:** overlaps approximately `00:13.000–00:15.367`, within frames `390–461`.
- **Verified:** luminous blocks/pillars and environmental surfaces appear in stages while the robot remains important. Light increasingly affects the surrounding spatial composition.
- **Verified graphics:** the environment is not a random field of equally weighted rectangles; objects differ in scale, depth, and occlusion.
- **Entry / exit:** the visual system grows out of the gesture phase and culminates in an architectural transition at approximately frame 462.
- **Inference:** character gesture and environment timing appear narratively connected, but the recording cannot establish whether the gesture directly drives object animation in code.

### R09 — Foreground architectural transition

- **Range:** approximately `00:15.367–00:17.200`, frames `462–516`.
- **Verified camera/environment:** large luminous architecture becomes the subject. Around `00:16.667–00:17.200`, a bright foreground pillar/object occupies most or all of the frame and then reveals a new spatial composition.
- **Verified character:** the robot can leave the viewport temporarily. The camera is not forced to track it continuously.
- **Verified transition:** major frame changes occur at `15.367/15.400`, `16.667`, and repeatedly around `16.767–17.200`.
- **Inference:** the observed result is consistent with coordinated camera movement plus foreground occlusion, possibly concealing a camera edit. It cannot be labeled definitively as continuous or cut from pixels alone.

### R10 — Landing platform reveal

- **Range:** approximately `00:17.067–00:17.367`, frames `512–521`.
- **Verified environment:** a wide architectural platform is established before the robot arrives. Vertical luminous structures create foreground/background depth.
- **Verified character:** initially absent or outside the dominant viewport area.
- **Verified camera:** wider, spatial, and anticipatory. It provides a destination for the following descent.
- **Entry / exit:** the bright occlusion clears into the platform; the robot begins entering from above at frame 522.
- **Inference:** exact world scale, platform topology, and camera lens are unavailable.

### R11 — Descent

- **Range:** approximately `00:17.400–00:18.233`, frames `522–547`.
- **Verified character:** the robot enters from the top and moves decisively downward toward the platform. Representative positions are visible at frames 522, 528, 534, 540, and 546.
- **Verified body:** the pose prepares for a low contact. It does not casually float into place or teleport directly to landing.
- **Verified camera:** the landing destination remains stable enough for the trajectory to read.
- **Verified effects:** a strong yellow/acid silhouette trail follows prior positions with meaningful vertical separation.
- **Entry / exit:** first visible entry at frame 522; contact transition begins around frames 547–548.
- **Inference:** the trail may use delayed skinned meshes, stored poses, render-to-texture history, or a hybrid. Exact implementation is unknown.

### R12 — Landing impact

- **Range:** approximately `00:18.233–00:18.533`, frames `547–556`, with a major change at frame `548` (`00:18.267`).
- **Verified character:** a powerful low landing pose anchors to the platform.
- **Verified effects:** the previous-position trail remains briefly, then begins dissolving. Light and environmental response emphasize contact.
- **Verified composition:** the impact is short and decisive compared with earlier slow performance.
- **Inference:** any camera impulse, contact shadow modulation, or light impulse must be inferred visually; the precise values and synchronization mechanism are not public.

### R13 — Recovery and introduction

- **Range:** approximately `00:18.533–00:23.367`, frames `556–701`.
- **Verified character:** it begins crouched, recovers gradually, reaches a standing/settled state around roughly `20–20.5 s`, then holds in the architectural environment.
- **Verified effects:** acid/yellow afterimages dissolve while atmosphere and environmental light remain active.
- **Verified camera:** settles into an editorial introduction composition rather than immediately abandoning the character.
- **Verified typography:** large studio identity and descriptive copy integrate into the same scene. Character and type share the composition with intentional negative space.
- **Entry / exit:** introduction appears as the impact resolves. At frame 702 (`00:23.400`), a bright yellow transition begins.
- **Inference:** the typography may be DOM, WebGL, or composited layers. The recording alone cannot identify it.

### R14 — Pixel transition and subsequent-section reveal

- **Range reviewed:** approximately `00:23.000–00:26.100`, frames `690–783`.
- **Verified final hold, `23.000–23.333`:** the robot, outlined studio identity, supporting introduction, header, and navigation remain established. The outgoing composition is still readable before coverage begins.
- **Verified first coverage, approximately `23.400–23.567`:** large yellow pixel clusters enter across the lower and side regions. The clusters cover the previous composition unevenly; they do not begin as a uniform opacity fade. Portions of the robot and copy remain visible between the blocks.
- **Verified full takeover, approximately `23.600–24.300`:** the viewport becomes an accent-color field containing mixed-size dark squares and a finer dither lattice. Pixel density and local contrast change progressively while the previous robot composition disappears.
- **Verified next-section establishment, approximately `24.400–25.700`:** an `ACTIONS` section appears on the accent field. Large editorial labels, imagery, black panels, small markers, and persistent pixel textures build into the new layout. The full-screen transition therefore resolves into real section content rather than an empty color interstitial.
- **Verified following reveal, approximately `25.800–26.100`:** a darker pixel/dither field covers the action layout and reveals `FEATURED PROJECTS` on a dark background. This second change demonstrates a related transition language with different density and polarity, not one identical overlay pasted between sections.
- **Verified continuity:** the top studio header and navigation remain visible and spatially stable through the accent takeover, the action layout, and the later dark reveal.
- **Observed visual mechanism only:** large blocks lead, smaller dither patterns fill and reorganize coverage, then content is revealed through changing pixel density. The recording does not prove whether the original uses a fragment shader, canvas, DOM grid, masks, textures, or multiple composited systems.
- **Portfolio recommendation:** adapt the observable sequence independently with Acid Green, preserve portfolio navigation continuity, and reveal the existing P4 composition without recoloring it.

## 3. Extracted frame evidence

All evidence is saved under the ignored local directory `artifacts/h3-master-storyboard/`. It is review material only and must not be committed. The source recording is also ignored.

General review contact sheets:

- [`00:00–00:06`](../artifacts/h3-master-storyboard/contact-sheets/general-00-06.jpg)
- [`00:06–00:12`](../artifacts/h3-master-storyboard/contact-sheets/general-06-12.jpg)
- [`00:12–00:18`](../artifacts/h3-master-storyboard/contact-sheets/general-12-18.jpg)
- [`00:18–00:23.5`](../artifacts/h3-master-storyboard/contact-sheets/general-18-235.jpg)
- [`Opening at 4 fps`](../artifacts/h3-master-storyboard/contact-sheets/opening-000-056.jpg)
- [`Holographic performance at 4 fps`](../artifacts/h3-master-storyboard/contact-sheets/holographic-055-096.jpg)
- [`Close-up and gesture at 4 fps`](../artifacts/h3-master-storyboard/contact-sheets/closeup-gesture-095-155.jpg)
- [`Recovery at 4 fps`](../artifacts/h3-master-storyboard/contact-sheets/recovery-185-235.jpg)
- [`Extended exit, 23.0–26.2 at 5 fps`](../artifacts/h3-master-storyboard/contact-sheets/exit-230-262.jpg)
- [`Extended exit, timestamped 10 fps`](../artifacts/h3-master-storyboard/contact-sheets/exit-timestamped-10fps-230-262.jpg)

Native-frame transition evidence:

- [`Hard cut, frames 282–294`](../artifacts/h3-master-storyboard/contact-sheets/hard-cut-native-282-294.jpg): frame 286 is full-body; frame 287 is close-up.
- [`Architecture, frames 462–528`](../artifacts/h3-master-storyboard/contact-sheets/architecture-154-177.jpg): large foreground occlusion and platform reveal.
- [`Descent, frames 522–579`](../artifacts/h3-master-storyboard/contact-sheets/descent-173-194.jpg): top entry, descent, impact, and early recovery.
- [`Opening native frames 0–30`](../artifacts/h3-master-storyboard/contact-sheets/opening-native-000-030.jpg): initial identity-to-awakening continuity.
- [`Exit native sequence, 23.0–24.5`](../artifacts/h3-master-storyboard/contact-sheets/exit-native-230-245.jpg): outgoing introduction, large-block coverage, and full accent takeover.
- [`Exit native sequence, 24.5–26.2`](../artifacts/h3-master-storyboard/contact-sheets/exit-native-245-262.jpg): subsequent content build and dark-pixel reveal into Featured Projects.

The evidence supports visual comparison only. It does not grant reuse rights for MACACO assets and does not reveal proprietary implementation.

## 4. Proposed portfolio storyboard

### Act I — Identity and awakening

#### S01 — Opening identity

- Immediately establish a helmet/upper-body composition with dark graphite metal, acid visor/channels, violet rim, and white specular detail.
- Place Luong Khuong Duy's approved name and career direction in deliberate negative space.
- Add an original full-width acid/black industrial stripe band behind the model, never above it.
- Keep `Scroll to explore` discoverable without turning the scene into a blocking intro.
- Hold a subtle, deterministic idle pose before the first scroll input.

#### S02 — Awakening and HUD

- Begin from exactly the opening pose/camera state; no reset at first scroll.
- Use slow head and shoulder activation with staged interface elements.
- Exit identity before HUD density peaks.
- Maintain character readability; the interface is supporting information, not a dashboard.

#### S03 — Ascension

- Reframe from close upper body to elevated full body with meaningful root/camera travel.
- Progress normal armor into the spectral material.
- Remove stripes and startup HUD naturally before the full-body shot settles.

### Act II — Exploration

#### S04 — Holographic full body

- Hold a monumental full-body silhouette with deep black joints and rich spectral reflections.
- Use an original dithered spectral field with true black negative space.
- Introduce `EXPLORER.` and localized supporting copy only after the pose establishes; clear it before the cut.

#### S05 — Hard cut

- At one approved normalized boundary, switch immediately from full-body composition to the close-up.
- Keep animation, material time, root state, and lighting phase continuous.
- Do not rotate the character 150/180 degrees to manufacture a rear view.

#### S06 — Extreme close-up

- Hold the close-up long enough to read helmet, chest, shoulder layering, metal reflections, and scale.
- Keep the strongest close-up interval text-free.

### Act III — Engineering and creation

#### S07 — Character gesture

- Sequence: gentle look down → open-hand presentation → head lift → gradual finger closure.
- Use only motions that survive rig diagnostics without neck/spine collapse.
- Introduce `ENGINEER.` after the hand is readable; remove it before `BUILDER.` becomes dominant.

#### S08 — Environmental activation

- Tie progressively rising architecture and illumination to the gesture's progression.
- Stagger large structural masses first, secondary panels second, and light details last.
- Introduce `BUILDER.` in protected negative space and clear it before the pillar transition.

### Act IV — Architectural transition and climax

#### S09 — Foreground pillar transition

- Let the camera leave the robot and travel into genuine 3D architecture.
- Bring a substantial pillar across 65–100% of the viewport at peak occlusion.
- H3.1.10 must compare a continuous move with an occlusion-hidden cut; no technique is selected before that focused neutral-previz gate.

#### S10 — Landing platform reveal

- Reveal the destination before the character arrives.
- Establish strong depth, asymmetry, dark structure, vertical lights, and a credible landing surface.

#### S11 — Descent

- Use the verified descent clip as the base performance.
- Align root trajectory and platform height without hiding mistakes through framing.
- Emit 4–6 recognizable acid-green previous-pose silhouettes along the actual path.

#### S12 — Impact

- Synchronize contact pose, ground correction, local light impulse, contact shadow, brief deterministic camera impulse, and afterimage dissolution.
- Preserve a short landing hold before recovery.

### Act V — Human behind the machine

#### S13 — Recovery and introduction

- Recover from crouch into a grounded hold while architecture remains active.
- Introduce an original oversized outline wordmark, `LUONG KHUONG DUY`, as the personal identity layer of the final composition.
- Preserve `BEHIND THE CODE.`, approved personal copy, and approved achievements as a coherent editorial conclusion beneath or alongside that identity layer.
- Keep the robot in the composition without repeating Explorer/Engineer/Builder.
- Prefer one wide desktop line for the wordmark when proportions remain legible. Use an approved responsive line break or scaled composition on narrower viewports.
- Layer the transparent-interior, Acid Green outline lettering with the robot and architecture without covering the helmet, face/visor, essential copy, or interactive navigation.
- The treatment must be original. It may extend the approved display type system, but it must not imitate MACACO's logo or custom lettering.

#### S14 — Pixel Dither Exit and Section Reveal

- Keep the final About composition established before transition coverage begins.
- Introduce large Acid Green pixel clusters that progressively cover the robot, wordmark, architecture, and supporting copy.
- Develop finer dither patterns between and after the large clusters until Acid Green takes over the viewport.
- Release the cinematic stage only while coverage safely conceals the handoff; do not expose a blank frame or pin jump.
- Reverse or dissolve the pixel field to reveal the existing P4 Selected Works composition.
- Preserve P4's Black Basalt/Bone/Glacier Blue design; Acid Green belongs to the transition and must not recolor P4.
- Keep the transition scroll-driven and reversible. It must not be a static pixel image pretending to animate, a generic opacity fade, or an additional WebGL context.
- On mobile, use a shorter, lower-density version. Under reduced motion, retain content and navigation, skip animated density changes, and use one non-flashing color bridge into P4.

## 5. Camera composition specifications

These are screen-space targets for the relevant individual H3.1 neutral-previz gates, not final Three.js coordinates.

- **S01:** helmet and upper body occupy approximately 45–60% of viewport width. Use a three-quarter, subtly low camera. Identity remains readable without covering the face/visor.
- **S02:** keep the opening axis recognizable. Camera motion should be small and mechanical-detail-oriented; avoid an early dramatic orbit.
- **S03:** pull down/out and change elevation enough to expose the body. The move must explain the transition from intimate activation to elevated performance.
- **S04:** full body occupies approximately 70–90% of viewport height, generally center-left, with clear negative space for `EXPLORER.`
- **S05:** cut immediately. No interpolated camera frames at the edit boundary.
- **S06:** character occupies approximately the left 55–62%; helmet sits upper-left, chest remains readable, shoulder reaches toward center, and the right 38–45% remains purposeful negative space.
- **S07:** preserve the asymmetry but open the frame enough to show the entire active hand. No forearm or shoulder may become an accidental opaque wall across the chest.
- **S08:** widen progressively as architecture rises. Camera and structures must reveal depth, not a flat array of panels.
- **S09:** prioritize the pillar and camera path; the robot may leave frame. Peak foreground occlusion must be sufficient to motivate an optional hidden edit.
- **S10:** use a wide environmental composition with a visible destination, foreground layer, middle platform, and background luminous structures.
- **S11:** hold the platform contact point spatially stable while the robot enters from above.
- **S12:** use a restrained low-angle impact composition. Any shake changes the Three.js camera only, never browser layout.
- **S13:** place robot and architecture toward the right/secondary region and reserve a readable editorial field for the outline wordmark, introduction, and achievements. Camera framing must account for the wordmark as a viewport-scale layer rather than adding it after composition approval.
- **S14:** hold the approved S13 camera while pixel coverage grows. Release or change render ownership only under sufficient coverage; the ending camera state and pin geometry must not snap when P4 takes over.

Each individual H3.1 task must approve its own start/action/end evidence before any later material, HUD, or motion-graphics task may alter that shot.

## 6. Character animation specifications

### Verified local rig and clips

- The provisional character contains 71 joints, 8 materials, and 12 embedded WebP textures.
- Available clips are exactly:
  - `power_on`: `2.6667 s`, 65 channels, including 15 right-finger rotation tracks.
  - `build`: `7.3333 s`, 62 channels, including 15 right-finger rotation tracks.
  - `descent`: `4.4000 s`, 65 channels, including 15 right-finger rotation tracks.
  - `idle`: `1.8333 s`, 62 channels, including 12 right-finger rotation tracks.
- All four clips contain hips translation/rotation and tracks for `Spine_1`, `Spine_2`, shoulders, neck, and head.
- There is no verified dedicated turn, fist, jump, or landing clip.

### Required performance behavior

- Preserve H2.8A's animation-only quaternion base restoration: restore the previously sampled base, sample the mixer, capture the new animation-only base, then apply each additive correction once.
- Keep animation deterministic under forward, reverse, and rapid scroll direction changes.
- Treat source clip motion as primary. Additive corrections must remain small, anatomically plausible, and joint-specific.
- Do not manually rotate the full character to fabricate the hard cut.
- Do not add broad torso/spine offsets unless a dedicated H3.2 diagnostic proves they are necessary. The current local H2.9.1 state has removed the previous manual spine offset.
- The requested finger closure must be reviewed against the real source finger tracks. Current local logic synthesizes closure mainly through local-Z flexion; it is not a verified authored fist clip.
- Head/neck motion must be bounded and reviewed from uncropped diagnostic cameras. Camera cropping is not an acceptable fix for a folded helmet or collapsed neck.
- Descent must use the compatible source clip plus validated root placement; it must not be replaced by a purely translated static pose.

Current diagnostics are deterministic at progress `0.24`, `0.28`, `0.35`, `0.38`, `0.40`, `0.4399`, `0.44`, `0.4401`, `0.45`, and `0.55`, with repeated/reverse angular deltas no greater than approximately `0.000003°`. This validates repeatability, not artistic correctness.

## 7. Hard-cut and architectural-transition specifications

### Hard cut

**Verified reference requirement**

- Reference edit occurs from frame 286 to 287, approximately `00:09.533→00:09.567`.
- It changes framing in one native frame.
- It is not an artificial body rotation or continuous orbital product view.

**Portfolio specification**

- Use one camera-state edit at the approved S05 boundary.
- Immediately before the cut: full-body elevated pose, spectral material, `EXPLORER.` already clear or exiting, stable silhouette.
- Immediately after the cut: helmet/chest/shoulder close-up on the left, readable armor, intentional right negative space, no dominant headline.
- Preserve mixer time, character root orientation, material progress, environmental phase, exposure, and color response across the cut.
- Do not allow a near-camera shoulder/forearm to become a featureless foreground cylinder.
- H3.1.7 approval requires paired before/after screenshots, plus a one-frame-step capture proving no interpolated orbit.

### Architectural transition

**Verified reference result**

- Large architecture takes visual control and heavily occludes the viewport before a different platform composition is visible.
- Pixels alone do not prove continuous movement versus a hidden cut.

**Portfolio specification**

- Create a real 3D pillar with depth, surface response, scale cues, and parallax.
- Test two neutral-previz options: a continuous path, and a camera edit at maximum pillar occlusion.
- Select the option with the most coherent direction, stable depth, and least visible interpolation artifact.
- Reject flat DOM wipes, generic black fades, or a camera that keeps the robot centered throughout.
- Platform reveal must complete before descent begins.

## 8. Acid Green × Electric Violet art direction

This palette is proposed for the cinematic opening only.

- **Deep Black `#080A08`:** atmosphere, deepest environmental planes, and negative space.
- **Graphite Armor `#282C2B`:** dominant normal-state armor base.
- **Acid Green `#B6FF00`:** primary activation color for visor, selected channels, startup interface, stripe band, and impact trail.
- **Electric Violet `#963CFF`:** secondary rim, environmental reflection, selected architecture, and holographic spectral contrast.
- **Specular White `#F2F5EF`:** metal highlights, high-energy spectral edges, and essential readable accents.

Rules:

- Acid green must dominate the accent hierarchy without covering every armor panel.
- Violet supports separation and depth; it must not become a 50/50 gradient wash.
- Joints remain deep black. Graphite armor preserves panel-level distinction.
- Normal-state scenes must feel industrial and metallic. Holographic scenes may add pink, violet, green, white, and selective cyan reflections.
- Do not apply this palette to P4–P6 until a separate global design decision is approved.
- Do not reproduce MACACO's yellow branding. The acid/graphite visual system and LKD identity must be original.

## 9. Robot material and lighting direction

### Normal metallic state

- Retain existing base color, normal, metalness, and roughness texture information wherever the provisional asset supports it.
- Grade armor toward graphite rather than replacing maps with a flat green material.
- Restrict acid emissive response to visor, existing channel-like regions, or explicitly approved masks.
- Use controlled white key/specular light to reveal panels and a violet rim to separate dark edges from the background.
- Keep ambient contribution low enough for deep joints and cavities to remain black.

### Holographic state

- Blend toward multi-hued reflective/spectral behavior while keeping recognizable armor topology.
- Use view angle, surface normal, lighting, and dither/noise masks to vary the result; do not apply one uniform rainbow overlay.
- Preserve white highlight peaks and black mechanical regions.
- Ensure the S05 cut does not cause an exposure or material-state discontinuity.

### Environment and post-processing

- Use dark atmospheric depth with localized spectral regions and luminance-dependent breakup.
- Reject the current visual tendency toward broad cyan/purple soft blobs.
- Bloom must remain selective. Large surfaces must not wash out armor edges or typography.
- Exposure, tone mapping, and bloom thresholds require shot-by-shot capture review, especially S04, S06, S09, and S12.

## 10. Industrial stripe composition

- Use an original diagonal band spanning the full viewport width behind the robot.
- Target an initial visual height of approximately `20–28vh`; exact height is an H3.3B review decision.
- Build from alternating Deep Black and Acid Green diagonal fields with bold, consistent rhythm.
- The character must occlude the band correctly. Identity copy remains in front only where contrast is sufficient.
- Allow restrained horizontal parallax tied to scroll progress; do not run an unrelated perpetual conveyor animation.
- Begin visible at page load, reduce prominence through S02, and clear naturally during S03.
- Do not reuse the band as a persistent site-wide motif.
- Provide a static equivalent under reduced motion.

## 11. Technical HUD choreography

The HUD is a fictional robot interface, not evidence of measured skill.

Proposed activation sequence:

1. **Startup frame:** sparse viewport brackets and `UNIT // LKD-01` accompany the opening identity.
2. **Initial response:** `SYSTEM INITIALIZATION` and a small signal waveform enter after the user begins scrolling.
3. **Mechanical activation:** `CORE STATUS` and restrained crosshairs align with head/shoulder movement.
4. **Module state:** `ENGINEERING MODULES` appears without percentages or fake proficiency scores.
5. **Confirmation:** `ACTIVATION STATUS` and `SYSTEM READY` resolve before ascension.
6. **Exit:** HUD groups clear in layers during S03; no dense interface remains over S04.

Rules:

- Acid green is primary; violet is a selective state/detail color.
- Stagger by narrative meaning, not random per-character animation.
- Keep small technical type above minimum readable size and translate all meaningful strings in EN/VI.
- Avoid dense dashboard cards, fabricated metrics, and constant scanline noise over essential copy.
- HUD must remain decorative/supporting for accessibility. The user's real name, role, navigation, and content remain available in semantic DOM.

## 11A. Supporting Graphic Design and Motion Graphics

The robot is one performer inside a designed cinematic system, not an isolated Three.js product viewer. Supporting graphics use one coherent language: squared pixel modules, four-point stars, precise line intersections, cropped technical frames, sparse crosshairs, directional bars, outlined typography, and dithered coverage. Scale, density, and color respond to narrative state; the system must not scatter every motif into every shot.

Layering convention:

- **Background graphics** establish scale and rhythm behind the model without flattening its silhouette.
- **World-space graphics** may share parallax or occlusion with architecture when spatial attachment is meaningful.
- **Character-adjacent graphics** align to screen-space landmarks but never pretend to be measured biometric or skill data.
- **Foreground graphics** are sparse and reserved for framing, transitions, or depth. They cannot block the face, active hand, landing contact, essential copy, or focus indicators.
- Camera movement changes graphic parallax and cropping intentionally. Screen-space interface elements do not drift as if incorrectly parented to the 3D camera.

### S01 — Opening identity graphics

- **Elements:** full-width acid/black stripe band, original square pixel clusters, technical corner frames, personal identity wordmark, and `Scroll to explore` affordance.
- **Placement and hierarchy:** robot first; name/career direction second; stripe band as a strong background field; small pixels and frames tertiary. Reserve identity and HUD zones during neutral composition approval.
- **Behavior:** the composition is complete on first meaningful paint. Stripe parallax and tiny pixel movement remain restrained. The scroll affordance communicates direction without perpetual distracting motion.
- **Entry / active / exit:** no theatrical entrance is required on load. Identity begins leaving only after first scroll continuity is established; stripe and framing reduce progressively through S02–S03.
- **Character/camera relationship:** band sits behind the robot; frames use the approved camera silhouette and must be revised if framing changes.

### S02 — Awakening graphics

- **Elements:** `SYSTEM INITIALIZATION`, `UNIT // LKD-01`, core/activation states, signal waveform, crosshairs, graphical markers, decorative progress tracks, and engineering-module labels.
- **Placement and hierarchy:** distribute sparse groups around helmet and shoulders; keep one high-priority activation state and several low-contrast support marks. Never surround the robot with a uniform dashboard grid.
- **Behavior:** groups activate sequentially in response to head/shoulder milestones. Waveforms and progress graphics are fictional interface animation, not competency measurement.
- **Entry / active / exit:** startup frame persists from S01; modules enter in small cohorts, resolve at `SYSTEM READY`, then clear in layers during S03.
- **Character/camera relationship:** crosshairs may follow approved screen-space landmarks with damped movement; camera travel must not cause uncontrolled label collision.

### S03 — Ascension graphics

- **Elements:** directional bars, upward-travel markers, energy accumulation, scan-like bands, controlled pixel breakup, and fragments of the outgoing HUD.
- **Placement and hierarchy:** vertical/directional graphics reinforce the body reveal without drawing a literal elevator shaft. Keep the lower-body path readable.
- **Behavior:** energy and scan density build with ascension; graphic fragments separate or dither as the normal material transitions.
- **Entry / active / exit:** inherit selected S02 elements, transform them into motion-direction cues, then fully clear before S04 establishes.
- **Character/camera relationship:** motion graphics follow the direction of camera/root travel but remain visually distinct from the robot's actual trajectory.

### S04 — Holographic performance graphics

- **Elements:** original four-point stars, technical line intersections, pixel-inspired symbols, spectral planes, controlled kinetic `EXPLORER.` typography, and sparse foreground markers.
- **Placement and hierarchy:** full-body character remains primary; `EXPLORER.` occupies approved negative space; stars and line intersections create depth across background and limited foreground layers.
- **Behavior:** spectral layers change density and parallax slowly; stars may rotate or pulse subtly but must not flash. Typography moves as one directed composition rather than random character effects.
- **Entry / active / exit:** motifs emerge after the full body settles, remain through the narrative hold, and clear before the hard cut.
- **Character/camera relationship:** foreground marks can pass outside the silhouette to imply depth but may not cross helmet, joints, or essential reflective detail at the cut boundary.

### S05 — Hard-cut graphics

- **Elements:** only a small set of persistent visual anchors, such as one star, framing line, or spectral field, when continuity benefits.
- **Placement and hierarchy:** camera edit and character composition dominate. No headline crosses the cut.
- **Behavior:** retained anchors either cut coherently with the camera or remain screen-space stable by design; accidental interpolated graphic motion is rejected.
- **Entry / active / exit:** outgoing S04 headline is already gone. Supporting anchors may survive one frame and then settle into the S06 frame.
- **Character/camera relationship:** graphics must prove the edit is intentional, not conceal a mismatched pose or material discontinuity.

### S06 — Extreme close-up graphics

- **Elements:** restrained technical crop marks, small pixel symbols, subtle animated line details, one or two scale-reference markers, and low-density spectral atmosphere.
- **Placement and hierarchy:** helmet, chest, shoulder, and metal response remain primary. Supporting marks occupy right-side negative space and outer edges.
- **Behavior:** lines drift or extend slowly; symbols respond minimally to camera drift. Text-free means no dominant headline, not an empty graphic system.
- **Entry / active / exit:** marks settle quickly after the cut, remain quiet during the material hold, then reorganize around the active hand in S07.
- **Character/camera relationship:** no overlay may disguise the current foreground-shoulder composition problem; H3.1.7 fixes the camera first.

### S07 — Gesture graphics

- **Elements:** hand-adjacent procedural symbols, joint/arc traces, sparse directional lines, and `ENGINEER.` typography.
- **Placement and hierarchy:** open hand and face remain first; `ENGINEER.` uses protected negative space; procedural marks describe the gesture path without resembling a medical scan.
- **Behavior:** symbols gather with hand presentation, shift with head lift, and contract as fingers close.
- **Entry / active / exit:** inherit selected S06 lines, activate around the open hand, then clear `ENGINEER.` before S08's `BUILDER.` becomes dominant.
- **Character/camera relationship:** graphic response is derived from approved screen-space hand landmarks and stays stable under the close-up camera.

### S08 — Environmental activation graphics

- **Elements:** original construction symbols, connection lines, staged illumination markers, architectural labels, pixel seeds, and `BUILDER.` typography.
- **Placement and hierarchy:** rising 3D architecture is primary with the robot; symbols explain activation zones; `BUILDER.` occupies a separate approved field.
- **Behavior:** large structures respond first, connection/label systems second, fine pixels and light details last. Nothing activates simultaneously.
- **Entry / active / exit:** build from the closing hand; hold only long enough to read the created world; clear dominant type before S09.
- **Character/camera relationship:** 2D graphics and 3D structures share deliberate alignment, while real occlusion remains owned by geometry rather than flat rectangles.

### S09 — Foreground pillar graphics

- **Elements:** sparse architectural registration marks, directional line fragments, and pixel breakup localized to the foreground pillar edge.
- **Placement and hierarchy:** the real 3D pillar and camera direction dominate. Graphics support depth and edge motion rather than filling the occluded screen.
- **Behavior:** marks accelerate with the camera/pillar relationship and compress at maximum occlusion.
- **Entry / active / exit:** inherit only minimal S08 construction language; disappear under peak occlusion; reveal a quieter S10 environment.
- **Character/camera relationship:** the robot may leave frame. Graphic layers must not falsely imply it remains centered behind the pillar.

### S10 — Platform reveal graphics

- **Elements:** architectural coordinate marks, restrained landing-zone indicators, vertical light labels, and distant pixel constellations.
- **Placement and hierarchy:** platform and depth are primary; indicators clarify destination but must not turn the platform into a game HUD.
- **Behavior:** distant marks establish first, landing zone resolves second, then holds in anticipation.
- **Entry / active / exit:** emerge as pillar occlusion clears; remain stable through the start of descent; reduce before impact.
- **Character/camera relationship:** graphics are aligned to the approved platform perspective and contact point.

### S11 — Descent graphics

- **Elements:** multiple acid-green dithered pose afterimages, sparse downward velocity marks, and localized breakup particles.
- **Placement and hierarchy:** descending character is primary; 4–6 prior poses follow the real vertical path with decreasing opacity and density.
- **Behavior:** samples preserve recognizable pose history and meaningful separation. No headline, global scan, or unrelated symbol field competes with descent.
- **Entry / active / exit:** trail begins after the character enters from above and collapses toward the impact point; older poses dissolve first.
- **Character/camera relationship:** afterimages occupy world-consistent positions and remain aligned under the stable landing camera.

### S12 — Impact graphics

- **Elements:** localized block/dither burst, short radial or planar registration response, contact-line illumination, and afterimage dissolution.
- **Placement and hierarchy:** contact pose and platform are primary; response remains concentrated around the impact region.
- **Behavior:** one strong deterministic impulse followed by rapid decay. No repeated full-screen flash and no browser-layout shake.
- **Entry / active / exit:** begins on the verified contact frame, peaks briefly, decays into architectural motion before S13 copy enters.
- **Character/camera relationship:** graphic impulse uses the actual projected contact point and respects reduced-motion limits.

### S13 — Recovery and personal identity graphics

- **Elements:** oversized outline `LUONG KHUONG DUY`, `BEHIND THE CODE.`, approved introduction and achievements, supporting technical lines, sparse four-point stars/pixels, and ongoing architectural light movement.
- **Placement and hierarchy:** viewport-scale personal wordmark establishes identity; robot/recovery remains the visual anchor; `BEHIND THE CODE.` leads readable editorial content; supporting marks remain tertiary.
- **Wordmark specification:** wide bold industrial/futuristic forms, forward-leaning character where appropriate, Acid Green outline, transparent interior, preferably one desktop line. Narrow layouts use an approved break or scale change, never illegible compression.
- **Behavior:** outline may reveal through controlled line drawing or dithered assembly after recovery begins, then becomes stable for reading. It must not shimmer continuously.
- **Entry / active / exit:** wordmark appears after impact energy decays, introduction follows, achievements enter only after the composition settles; all remain readable before S14 coverage begins.
- **Character/camera relationship:** wordmark may layer behind and selectively in front of architecture, but never obstruct the face/visor or essential copy. Occlusion order must be art-directed, not incidental z-order.

### S14 — Pixel Dither Exit and Section Reveal graphics

- **Elements:** large Acid Green pixel clusters, progressively finer dither fields, controlled negative-space holes, and the stable site header/navigation.
- **Placement and hierarchy:** large blocks begin away from essential S13 reading zones, then cover the full cinematic field. P4 becomes the only dominant content after reveal.
- **Behavior:** coverage is driven by scroll progress and is reversible. Block scale decreases while density increases; takeover reaches a stable Acid Green bridge, then polarity/density changes reveal P4.
- **Entry / active / exit:** start only after S13 has a completed reading hold; cover before unpin/release; dissolve into actual P4 content with no blank frame.
- **Character/camera relationship:** the S13 camera remains stable under coverage. The transition masks scene ownership rather than compensating for a camera snap.
- **Responsive/reduced motion:** mobile uses fewer, larger clusters and a shorter travel. Reduced motion removes animated density and uses a single non-flashing accent bridge with immediate readable P4 content.

### Reusable section-transition language

- Define a shared design vocabulary—block scale, dither density, coverage direction, accent color, reveal target, and reduced-motion state—without forcing one identical transition implementation everywhere.
- S14 is the first proposed full-screen pixel transition. Other sections may reuse only selected motifs at different scale or polarity.
- Preserve the existing P6 zipper as its own authored interaction; do not replace it with the S14 pixel system.
- Keep a single scroll progress owner and avoid unnecessary additional WebGL contexts. The exact CSS, canvas, texture, or existing-renderer technique remains an implementation decision after visual approval.
- Avoid repeated full-screen flashing. Header, navigation, focus visibility, semantic content, direct anchors, reverse scrolling, and Skip Introduction must remain functional throughout.

## 12. Opening idle-to-scroll continuity specification

### Current verified state

- The current `p=0` character samples the idle clip at a fixed time near `0.48`; there is no continuing subtle idle clock before scrolling.
- Camera movement begins around normalized progress `0.065`, while identity exit starts around `0.0475` and activation starts around `0.0625`. This creates a small fixed/dead interval followed by several changes close together.
- The WebGL scene is scheduled from `requestIdleCallback` in development, loads the GLB and supporting render systems asynchronously, then draws at the latest stored progress.
- Canvas readiness currently has no effective soft reveal because a later `.cinematic-render canvas { transition: none; }` rule overrides an earlier transition declaration.
- The controller forwards the latest `progressRef` when the scene becomes ready; no explicit reset to progress 0 was found.
- Progress callbacks have equality guards, so the primary update path and passive sampler do not automatically imply duplicate animation application.

### Cause classification

- **Verified state discontinuity risk:** the opening pose is frozen and the first meaningful tracks begin within a narrow interval, so first input can feel like activation from a still frame rather than continuation of idle motion.
- **Plausible performance hitch:** GLB decode, shader compilation, texture upload, EffectComposer/Bloom setup, CanvasTexture creation, and cloned afterimage rigs may overlap the user's first scroll. This is not yet backed by frame-time instrumentation.
- **Not reproduced:** no proof was found of a ScrollTrigger progress reset. A refresh/layout shift remains possible but unverified.

### Required future behavior

- Render the fully composed opening only after the minimum visual state is ready, while keeping semantic content and skip navigation immediately available.
- Define one continuous base pose at progress 0 and blend the first activation from that same base.
- If subtle idle is retained, it must be deterministic or frozen/reconciled at first scroll so the scroll timeline does not snap to a different pose.
- Start identity exit, camera motion, and mechanical activation with intentionally offset envelopes rather than one simultaneous threshold.
- Instrument first render, asset-ready time, shader warm-up, long tasks, first-input frame intervals, and ScrollTrigger readiness during H3.1.1–H3.1.3, not only during final polish.
- Do not hide a pose/camera discontinuity by adding excessive scrub latency. Input must remain responsive while character motion retains deliberate pacing.
- Do not run an independent idle state and a conflicting scroll state. The approved opening pose is the shared handoff state, with one explicitly defined ownership transition.
- Preserve reverse scrolling, anchor navigation, browser restoration, Skip Introduction, and the reduced-motion static state.

### Mandatory early review gates

- **H3.1.1 Initial static composition:** approve camera, robot pose/scale, first meaningful paint, and reserved graphic regions without animation.
- **H3.1.2 Idle behavior:** review only the subtle idle against the approved static composition, including whether a continuing idle clock is needed at all.
- **H3.1.3 First scroll input:** capture readiness markers and frame-time evidence; verify that the first scroll-driven sample begins from the visible idle pose with no camera, pose, canvas, or material reset.
- **H3.1.4 Awakening transition:** approve the first meaningful camera/pose development separately after the handoff itself is stable.

## 13. Proposed scroll-distance budget

The current desktop baseline is `CINEMATIC_TRAVEL = 28` **viewport heights**, equivalent to `2800vh` when expressed as a CSS scroll-distance length. Recommendation: retain 28 viewport heights for the first H3 previz and reallocate them meaningfully instead of blindly extending the section.

- **S01 Opening identity:** `0.000–0.035` = `0.98 viewport heights` (`98vh`). Immediate established pose; short hold with subtle idle.
- **S02 Awakening / HUD:** `0.035–0.120` = `2.38 viewport heights` (`238vh`). Progressive head/shoulder and interface activation.
- **S03 Ascension:** `0.120–0.200` = `2.24 viewport heights` (`224vh`). Root/camera travel and material ramp.
- **S04 Holographic full body:** `0.200–0.350` = `4.20 viewport heights` (`420vh`). Establish, head lift, `EXPLORER.`, breathing hold, text exit.
- **S05 Hard cut:** exact boundary at `0.350`; zero interpolated duration.
- **S06 Extreme close-up:** `0.350–0.460` = `3.08 viewport heights` (`308vh`). Text-free material/detail hold with restrained drift.
- **S07 Gesture / Engineer:** `0.460–0.580` = `3.36 viewport heights` (`336vh`). Look down, open hand, head lift, finger closure, `ENGINEER.`
- **S08 Environment / Builder:** `0.580–0.670` = `2.52 viewport heights` (`252vh`). Progressive construction and `BUILDER.`
- **S09 Pillar transition:** `0.670–0.730` = `1.68 viewport heights` (`168vh`). Camera direction change and full foreground occlusion.
- **S10 Platform reveal:** `0.730–0.780` = `1.40 viewport heights` (`140vh`). Establish architecture and anticipation.
- **S11 Descent:** `0.780–0.820` = `1.12 viewport heights` (`112vh`). Fast, decisive top-entry movement.
- **S12 Impact:** `0.820–0.855` = `0.98 viewport heights` (`98vh`). Contact impulse and short low-pose hold.
- **S13 Recovery / About:** `0.855–0.965` = `3.08 viewport heights` (`308vh`). Recovery, outline wordmark, introduction, achievements, settled composition.
- **S14 Pixel Dither Exit:** `0.965–1.000` = `0.98 viewport heights` (`98vh`). Large-block coverage, fine dither takeover, protected release, and P4 reveal.

Recommended internal action landmarks:

- S04 typography must be gone before `0.350`.
- S07 open hand should become readable by roughly `0.500`; head lift and closure can overlap only after the pose is clear.
- `ENGINEER.` should exit before `BUILDER.` reaches dominant opacity.
- Maximum S09 occlusion is a candidate hidden-edit point near `0.705`, subject to the H3.1.10 comparison.
- S10 must establish the platform before S11 first shows the descending robot.
- S12 has no dominant typography.
- S13 recovery precedes dense copy; the character must settle before achievements become the main reading task.

This is a proposed edit map, not an implementation authorization or permanently approved timing. Each H3.1 task may revise its own boundary after rendered review while keeping the working total near 28 viewport heights (`2800vh`) unless evidence supports a different total.

## 14. Narrative and typography allocation

- **S01:** approved name and career direction; restrained `Scroll to explore`.
- **S02:** fictional system/HUD labels only; no skill percentages.
- **S03:** text recedes to prioritize the transition.
- **S04:** `EXPLORER.` and natural EN/VI supporting line about discovering new technologies.
- **S05–S06:** text-free during the hard cut and strongest material close-up.
- **S07:** `ENGINEER.` with the approved calm, focused, detail-oriented idea.
- **S08:** `BUILDER.` with the approved creating-useful-software idea.
- **S09–S12:** text-free through architecture, descent, and impact.
- **S13:** oversized outline `LUONG KHUONG DUY` personal wordmark, `BEHIND THE CODE.`, approved personal introduction, and only verified achievements/content. Do not repeat the three traits. The wordmark is identity-scale graphic typography; `BEHIND THE CODE.` remains the editorial content heading.
- **S14:** no new headline. Pixel coverage transitions the visual hierarchy from the completed About composition to the existing `SELECTED WORKS.` heading.

Typography rules:

- Preserve the approved portfolio display and body families; do not imitate MACACO's proprietary identity.
- Treat the S13 outline wordmark as a separately approved extension of the type system: wide, bold, industrial/futuristic, optionally forward-leaning, Acid Green outline, transparent interior, preferably one desktop line, with a deliberate responsive alternative.
- One dominant headline at a time. Outgoing and incoming headings must have non-overlapping dominant windows.
- Use negative space selected in the relevant individual H3.1 gate, not last-minute overlays over the robot.
- Keep all user-facing strings localized in EN/VI and semantic DOM. WebGL type may be decorative duplication only when hidden appropriately from assistive technology.
- Important camera edits, material study, architectural occlusion, descent, and impact remain free of large text.

## 15. Current source-code audit

### Repository state at audit

- Branch: `main`.
- HEAD: `faa4e5b422f0b4d7a218590c21a6d627a4c34115`.
- Pre-existing modified files:
  - `docs/ARCHITECTURE.md`
  - `docs/DECISIONS.md`
  - `docs/TASKS.md`
  - `scripts/h28-rig-diagnostics.mjs`
  - `src/lib/glacier/cinematic-afterimages.ts`
  - `src/lib/glacier/cinematic-animation.ts`
  - `src/lib/glacier/cinematic-scene.ts`
  - `src/lib/glacier/cinematic-shot-plan.ts`
  - `src/lib/glacier/cinematic-timing.ts`
- Pre-existing untracked files:
  - `docs/H2_9_1_HARD_CUT_REVIEW.md`
  - `scripts/h29-camera-cut-check.mjs`
- Those changes belong to the existing H2.9.1 work and were not modified or discarded by H3.0.

### Reusable infrastructure

- A single Three.js renderer and camera with ACES tone mapping.
- A single absolute normalized cinematic progress coordinate.
- GSAP ScrollTrigger pinning with direct scrub and reversible progress.
- Modular camera/shot-plan, skeletal animation, materials, backdrop, aura, environment, afterimages, and WebGL type systems.
- On-demand render scheduling, visibility pause, disposal, fixed desktop/mobile DPR caps, mobile unpinned behavior, reduced-motion fallback, Skip Introduction, and anchor navigation.
- H2.8A's animation-only quaternion restoration and deterministic diagnostics.
- EffectComposer/Bloom and replaceable character-loading boundary.

### Current choreography and timing problems

- `CINEMATIC_TRAVEL` is 28; the current scene windows do not implement the requested 14-shot narrative.
- The working-tree H2.9 hard cut is currently at normalized `0.44`, with pre-cut camera approximately `(1.7, 2.8, 8.6)`, target `(0, 2.9, 0)`, FOV `33`, and post-cut camera approximately `(-2.4, 4.5, 1.6)`, target `(1, 4.35, 0)`, FOV `34`.
- The cut's code semantics are immediate, but current captured composition is wrong: the close camera allows a large foreground shoulder/arm mass to obscure chest detail, helmet placement is not reference-faithful, and negative space lacks graphic intention.
- Current DOM timing disables the earlier close-up Explorer and digital-world chapters by assigning windows beyond progress 1, while late performance content groups Explorer/Engineer/Builder together. About timing precedes that late trait group. This conflicts with the approved narrative order.
- Current animation root yaw is forced to zero; the earlier 150-degree manual yaw is absent from the local working state. No new body turn should be reintroduced.
- Current main and afterimage rigs also hold zero manual root yaw. Camera editing, not a character spin, must provide S05.
- Current hand closure is synthesized from sampled finger poses/local-axis flexion; it needs a dedicated visual gate before it can be treated as an approved fist.

### Current visual differences from the reference and new direction

- Materials, background, aura, and lights are cyan/purple/pink dominant, not graphite/acid/violet.
- The backdrop reads as soft full-screen color blobs rather than controlled spectral regions with deep black structure.
- Three long additive aura ribbons appear to wrap around the robot; they do not match the desired spatial energy behavior.
- Environment geometry is largely box-based and lacks a substantial foreground transition pillar and credible landing architecture.
- Two afterimage rigs use very small normalized delays and low-opacity cyan/violet treatment, yielding near-stacked ghosts rather than a strong vertically separated descent history.
- WebGL type currently enables only two early windows and duplicates portions of DOM storytelling; the remaining type states are disabled. Narrative ownership needs consolidation in H3.6.

### Performance risks requiring measurement

- First-load GLB Meshopt/WebP decoding, texture upload, shader compilation, EffectComposer/Bloom initialization, and large CanvasTexture creation.
- Two cloned skinned afterimage rigs/mixers allocated up front.
- Multiple clip samples per rendered progress update.
- Aura geometry rewriting many vertices each draw.
- Full-screen procedural shader and post-processing at up to desktop DPR `1.6`.
- Per-progress DOM transform/opacity writes.

These are potential bottlenecks, not measured failures. Evidence collection begins in H3.1.3 and repeats when later tasks add runtime cost; H3.8 consolidates the final performance review.

### Next.js development indicator

- The previously supplied red issue is a React hydration attribute mismatch caused by a browser extension injecting `cz-shortcut-listen="true"` into `<html>` or `<body>` before hydration. The attribute is associated with the ColorZilla browser extension and is not emitted by the repository layout.
- In a clean current browser profile at `/en?cinematicDebug=1`, the page returned HTTP 200, HMR connected, no `cz-shortcut-listen` attribute was present, and no Next.js issue portal appeared.
- A separate `/favicon.ico` 404 appeared in the network console; it is not the reported hydration mismatch.
- Therefore the red hydration issue was not reproducible without the extension. No source suppression or hidden development indicator is recommended.

## 16. Actual animation rig constraints

- The available rig supports head, neck, two spine joints, shoulders, hips/root motion, and individual right-hand finger tracks, but its authored ranges are constrained by four general-purpose clips.
- There is no evidence of a purpose-built rear-view turn or closed-fist performance. Both must be assembled conservatively from existing motion/additive control or deferred if deformation cannot be avoided.
- Source clips themselves animate hips orientation/translation and upper-body bones. Any additive edit must be applied relative to the sampled source base, never accumulated frame over frame.
- The current H2.8A architecture is the required safety boundary. Removing it would reintroduce scroll-direction-dependent deformation.
- Head/neck correction must not force visual orientation against a strongly moving spine/hips base. H3.2 must inspect world-space head, neck, chest, and shoulder transforms at every action landmark.
- Finger flex axes differ by joint/model conventions. A visually plausible open-to-fist sequence needs per-finger inspection from multiple cameras, not one global Euler formula.
- The descent clip is the only verified authored basis for the final drop. Platform height and root offset must be solved around its contact frame.
- The third-party character asset remains provisional and local-only under documented permission limits. It is ignored by Git, must not be committed or redistributed, and no unrestricted reuse right is implied. Choreography, cameras, lighting, materials, scroll mapping, and effects must remain replaceable independently of the GLB.

## 17. Incremental implementation roadmap

Operating rule: **one small task, one rendered visual review, one owner approval gate**. Each task preserves all previously approved work, defines narrow acceptance criteria before implementation, records actual rendered evidence, and stops without automatically starting the next task.

### H3.0 — Master Storyboard

- Finalize reference evidence, narrative, shot order, supporting graphics, timing vocabulary, asset constraints, and task gates.
- **Gate:** owner and independent reviewer approve this document before H3.1.1.

### H3.1 — Individual neutral previsualization tasks

Use neutral material, simple lighting, and composition guides. Do not introduce advanced stripes, HUD, holographic shaders, aura, or final motion graphics during neutral blocking.

#### H3.1.1 — Opening static composition

- S01 only: camera framing, robot scale, initial pose, screen-space placement, reserved identity/stripe/HUD regions.
- No animated sequence.
- **Evidence / gate:** desktop and mobile static renders with composition guides; approve first viewport only.

#### H3.1.2 — Opening idle behavior

- Add only subtle idle behavior while preserving approved S01 framing.
- **Evidence / gate:** short forward capture plus pose-delta evidence; approve idle amplitude and stability.

#### H3.1.3 — First scroll continuity

- Implement only the idle-to-scroll ownership handoff.
- Measure asset readiness, first-input frame intervals, and any long task or shader warm-up around the handoff.
- **Evidence / gate:** opening, first input, forward/reverse captures, and timing log; approve no reset, jump, blank frame, or excessive scrub latency.

#### H3.1.4 — Awakening camera and pose

- S02 only, under neutral treatment.
- **Evidence / gate:** start/mid/end renders; approve camera path and pose progression.

#### H3.1.5 — Ascension blocking

- S03 only: root path, body reveal, and camera framing.
- **Evidence / gate:** trajectory overlay and start/mid/end renders; approve spatial movement without final material effects.

#### H3.1.6 — Holographic full-body composition

- S04 framing and pose only; no advanced holographic material yet.
- **Evidence / gate:** full-body scale and negative-space renders; approve hold composition and Explorer region.

#### H3.1.7 — Hard cut and close-up

- S05 and S06 only. Preserve the verified frame-edit semantics and correct the destination composition.
- **Evidence / gate:** exact before/after frames, one-frame step capture, and close-up hold; approve no orbit/body turn and no foreground armor obstruction.

#### H3.1.8 — Gesture blocking

- S07 only: neutral look-down, open-hand, head-lift, and provisional closure poses.
- **Evidence / gate:** multi-angle rig captures; approve only deformation-safe poses.

#### H3.1.9 — Environmental activation blocking

- S08 only: neutral structure timing and camera relationship; no final architecture/material treatment.
- **Evidence / gate:** staged activation frames; approve hierarchy and Builder negative space.

#### H3.1.10 — Foreground pillar transition

- S09 only: compare a continuous move with an edit hidden at maximum 3D occlusion.
- **Evidence / gate:** both rendered options and frame-step evidence; select one transition method.

#### H3.1.11 — Landing platform reveal

- S10 only: platform scale, perspective, depth layers, and landing destination.
- **Evidence / gate:** wide composition renders without descending robot; approve anticipation and contact point.

#### H3.1.12 — Descent trajectory

- S11 only: source-clip-compatible root path and timing, without final afterimage styling.
- **Evidence / gate:** trajectory and contact-preparation captures; approve decisive top entry.

#### H3.1.13 — Impact composition

- S12 only: contact pose, ground alignment, low hold, and camera composition; no final shake/effect polish.
- **Evidence / gate:** pre-contact/contact/post-contact frames; approve exact landing geometry.

#### H3.1.14 — Recovery and About composition

- S13 only: recovery framing plus reserved zones for outline wordmark, Behind the Code, introduction, and achievements.
- **Evidence / gate:** desktop/mobile editorial layout renders; approve character/type/architecture balance before typography implementation.

#### H3.1.15 — Pixel transition blocking

- S14 only: neutral large-block coverage, fine-density phase, safe release point, and P4 reveal ownership; no final shader styling.
- **Evidence / gate:** forward/reverse frame sequence, mobile alternative, reduced-motion state, and pin-release capture.

### H3.2 — Character performance and camera editing

- Convert approved neutral poses into final deterministic performance one action or shot at a time: awakening, ascension, S04 hold/head lift, S05 cut, S06 drift, S07 head/hand/fingers, descent, landing, and recovery.
- Run H2.8A forward/reverse rig checks after each skeletal change.
- **Gate per task:** no neck/spine collapse, no arbitrary body turn, approved joint world transforms, and rendered evidence matching its H3.1 composition.

### H3.3A — Acid Green × Electric Violet material direction

- Implement graphite/acid/violet normal armor first on approved shots.
- **Gate per material task:** metallic panel separation, localized acid, violet secondary, black joints, stable exposure, no green plastic or washout.

### H3.3B — Industrial stripes, opening identity and HUD

- Separate tasks for stripe band, identity composition, HUD groups, and their opening-to-scroll choreography.
- Repeat early readiness/frame-time checks after the real graphic load is present.
- **Gate per task:** immediate readable identity, intentional layer order, progressive fictional interface, and unchanged approved S01–S03 camera/pose work.

### H3.3C — Holographic materials, aura and background

- Separate tasks for spectral armor, dithered background, and spatial energy behavior.
- **Gate per task:** deep black structure, controlled spectrum, readable armor, no soft-blob field or uniform wrapping wires.

### H3.3D — Supporting motion graphics

- Add the approved scene-specific graphic language in narrow shot groups; never insert every motif into every shot.
- **Gate per shot:** placement, hierarchy, entry/active/exit behavior, camera relationship, and foreground/background layering match Section 11A without hiding animation defects.

### H3.4 — Architectural environment and pillar transition

- Separate tasks for rising structures, light pillars, final foreground pillar treatment, and landing platform treatment.
- **Gate per task:** convincing scale/depth, progressive activation, real 3D occlusion, and preservation of approved camera blocking.

### H3.5 — Descent, afterimages, landing and impact

- Separate tasks for descent refinement, pose-history sampling, acid dither treatment, contact response, deterministic camera impulse, and impact recovery.
- **Gate per task:** clear trajectory, 4–6 separated recognizable poses, exact ground contact, no layout shake or repeated full-screen flash, accessible reduced-motion state.

### H3.6 — Narrative, typography and oversized personal wordmark

- Separate tasks for Explorer, Engineer, Builder, `LUONG KHUONG DUY`, `BEHIND THE CODE.`, introduction, achievements, and EN/VI responsive behavior.
- The outline wordmark receives its own visual approval before being integrated with body copy.
- **Gate per task:** one dominant message, approved negative space, no collision with character/architecture, no repeated traits in final About, semantic content intact.

### H3.7 — Pixel Dither and section transitions

- Build S14 from approved neutral blocking: large blocks, fine dither, Acid Green takeover, safe cinematic release, and P4 reveal.
- Define reusable transition parameters without automatically applying this full-screen treatment elsewhere. Preserve the P6 zipper.
- **Gate:** reversible scroll-linked coverage, no blank frame/pin jump/flash, stable navigation, mobile and reduced-motion alternatives, unchanged P4 colors/content.

### H3.8 — Final performance and visual polish

- Consolidate measured frame pacing, long-task/shader readiness, reverse scrolling, rapid direction changes, browser restoration, mobile behavior, reduced motion, and final P4 handoff.
- Performance evidence is also collected earlier whenever a task introduces a material runtime cost; H3.8 is consolidation, not the first measurement point.
- **Gate:** stable progress ownership, acceptable measured frame timing, no reset or discontinuity, reliable navigation, and approved visual continuity across the complete experience.

## 18. Shot-specific visual acceptance criteria

- **S01:** page opens on a complete, readable identity composition; robot scale feels powerful; stripe band is behind the model; no blank/loading flash over essential content.
- **S02:** activation is progressive, the first scroll continues from the opening pose, and interface labels remain supporting rather than clutter.
- **S03:** full body is revealed through meaningful camera/root movement; stripe/HUD exit cleanly; material transition does not pop.
- **S04:** full-body silhouette, reflective panel detail, black joints, dithered spectral environment, and `EXPLORER.` are simultaneously legible; pose has breathing room.
- **S05:** one-frame camera edit; no manual character turn; before/after poses and materials are continuous; post-cut composition matches approved screenshot.
- **S06:** helmet, chest, and shoulder remain readable; no accidental foreground armor wall; close-up holds without unnecessary headline.
- **S07:** downward look, open hand, head lift, and closure are mechanically plausible; no helmet/chest collision; `ENGINEER.` has protected reading space.
- **S08:** construction occurs in stages and responds narratively to the gesture; `BUILDER.` does not overlap the outgoing heading; environment has depth.
- **S09:** large 3D pillar convincingly motivates the transition; robot may leave frame; no flat wipe or black fade is visible.
- **S10:** platform is substantial, spatial, and visible before the robot; lighting supports rather than erases geometry.
- **S11:** robot enters from above using compatible skeletal motion; trajectory is decisive; 4–6 recognizable previous poses follow with real vertical separation.
- **S12:** exact contact alignment; short deterministic camera/light impulse; afterimages dissolve; reduced-motion variant removes intense shake; landing pose is held.
- **S13:** recovery reads before dense copy; robot and architecture share an intentional composition with the original Acid Green outline `LUONG KHUONG DUY` wordmark, `BEHIND THE CODE.`, introduction, and achievements. The wordmark is separately approved, remains legible responsively, and never blocks the face/visor or essential content. No repeated trait slide.
- **S14:** large blocks visibly precede finer dither; Acid Green reaches controlled full coverage before cinematic release; P4 is revealed through reversible density/coverage change. No generic fade, static-pattern shortcut, blank frame, repeated flash, velocity discontinuity, or layout jump. Header/navigation remain stable and P4 colors/content remain unchanged.

Global acceptance:

- EN/VI, keyboard navigation, touch/mobile alternative, Skip Introduction, anchor navigation, reduced motion, reverse scroll, and browser restoration remain functional.
- Essential content is semantic and visible without WebGL/motion.
- Supporting graphics form one coherent visual language, have approved scene-specific layer order, and never conceal an animation, camera, or rig defect.
- Reduced motion keeps the completed readable state and bypasses animated dither density without leaving content hidden.
- No unverified personal facts, statistics, or achievements are introduced.
- The provisional third-party character remains local-only under documented permission constraints. No unrestricted reuse or redistribution right is implied, and the asset is not committed.

## 19. Outstanding decisions requiring owner approval

1. Approve or revise the proposed 14-shot narrative order before H3.1.1.
2. Approve the cinematic-only Acid Green × Electric Violet palette; confirm that P4–P6 remain unchanged.
3. Approve the proposed 28-viewport-height (`2800vh`) working allocation and the provisional S05 hard-cut boundary at normalized `0.350`; all shot timings remain subject to individual rendered review.
4. Select the S09 transition after H3.1.10 compares continuous movement with an occlusion-hidden cut.
5. Approve opening identity wording and the precise amount of career-direction copy.
6. Approve the original stripe band's width, angle, density, and initial height after neutral mockups.
7. Approve which fictional HUD labels are appropriate in both English and Vietnamese.
8. Decide whether a subtle pre-scroll idle clock is desirable or whether a composed static opening pose is preferable; either option must transition deterministically.
9. Approve S04/S06 screen-space compositions before any advanced materials are tuned.
10. Accept, simplify, or defer the requested full fist closure after H3.2 multi-angle rig review.
11. Approve afterimage count and separation after descent blocking; current recommendation is 4–6 poses.
12. Approve the supporting graphic language and scene-by-scene density before H3.3D; specifically confirm that close-up supporting graphics remain restrained.
13. Approve the outline `LUONG KHUONG DUY` wordmark direction, desktop line treatment, and responsive alternative in a separate H3.6 visual gate.
14. Confirm the exact approved personal introduction and which verified achievements belong in S13.
15. Approve the S14 large-block → fine-dither → Acid Green takeover → P4 reveal sequence and its mobile/reduced-motion alternatives.
16. Confirm the provisional character asset remains authorized for local implementation under existing documented limits; no unrestricted reuse or redistribution permission is assumed.
17. Approve H3.0-R1 in writing before any source, camera, animation, timing, color, shader, HUD, stripe, motion-graphics, or environment implementation begins.

### Review gate

H3.0-R1 stops here. H3.1.1 is blocked until the owner and independent reviewer give final approval to this revised storyboard. No application source, dependencies, camera keyframes, animation tracks, shaders, effects, scroll timing, or P4–P6 content were changed as part of this planning task.

### Modern Web Guidance

- **`scrollytelling`**: I kept S14 tied to the existing reversible scroll progress and specified a visible reduced-motion state instead of a time-driven transition ("DO respect user preferences").
- **`motion`**: I required the reduced-motion path to reveal readable P4 content without animated dither density or hidden end states ("Keep the final state").
