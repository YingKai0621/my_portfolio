# Wireframe specification

Desktop: persistent minimal header (monogram left, language switch right). The dock implementation is preserved but not rendered in P2 V3 because later anchors do not exist yet; re-evaluate when their sections are real. Mobile: the same minimal header and a separately composed poster, with safe-area spacing.

| Section | Desktop arrangement | Mobile |
|---|---|---|
| Hero #home (P2 V3) | poster composition: canvas-wide uppercase name balanced within the frame, empty reserved portrait layer, verified role/location lower left, GitHub/LinkedIn lower right, Isometric Cubes across the background; replay unobtrusive at upper right | name breaks into three lines, no placeholder portrait, role text and real links remain readable and touch-accessible; no blocking viewport |
| About #about | 6/6 story and Fey-inspired identity cards with portrait placeholder; philosophy highlight | stacked text then cards; tap or static reveal |
| Impact | 3–4-column metric cards with explicit context | 2 columns or 1 on narrow screens |
| Work #work | two featured cards, Apple-style rail with arrows and direct links | stacked or accessible horizontal rail with visible controls |
| Research #research | paper title/status, diagram of evaluation pipeline, result range with caveats | readable single column; diagram scroll or text alternative |
| Skills #skills | grouped backend/database/tools/languages, optional cloud/beam illustration | grouped text badges; no dependence on animation |
| Journey #journey | chronology and achievements, images badge when assets exist | vertical list with readable dates |
| Beyond | text and optional photo collage, playful accent | stacked, no placeholder masquerading as actual photo |
| Playground #lab | optional small genuine interactive demo; no fake product | touch-friendly or omit until ready |
| Contact #contact | prominent CTA, professional links, subdued Vortex backdrop | static or light fallback, links unobscured |

Case study: breadcrumb/back link, title/role/date, abstract screenshot or real asset, problem, responsibilities, architecture, selected trade-offs, technical outcomes, stack, repository link if verified. Do not repeat raw CV bullets as sole content. For diagrams, distinguish conceptual architecture from verified implementation. On all routes retain language navigation.

Review deliverables: browser screenshots at 1440x900, 390x844, and at least one intermediate size; both languages for critical sections. This is a textual wireframe, not a high-fidelity approved design.
