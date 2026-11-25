# Design system — Glacial Precision (owner-selected core palette)

## Tokens
| Token | Value | Use |
|---|---|---|
| background / Black Basalt | #0B1013 | page, dark CTA foreground |
| surface | #121C22 | cards |
| elevated | #1B2A32 | menus/hover |
| text / Bone | #E8F3F6 | primary |
| muted | #A6B9C2 | secondary |
| accent / Glacier Blue | #1BA6CD | interactive/emphasis |
| accent-subtle | #146279 | decorative only, not small text |
| border | #30434D | decorative dividers; stronger contrast for functional control outlines |
| focus | #70D9F4 | focus ring |

Core palette comes from the owner's supplied reference image; supporting tokens are proposed derived colors. Keep these three core colors fixed unless the owner requests a change. Use Black Basalt text on Glacier Blue filled buttons (not Bone text on Glacier Blue). Use Bone for headings/body and Glacier Blue as the sole primary brand accent; lighter cyan is reserved for focus and restrained highlights. Verify all actual contrast pairings, including controls, hover and focus states; target WCAG AA. Dark-first MVP, no theme toggle required. Use restrained cyan light on dark geometry; no purple/lavender glow, no neon cyberpunk overload. Natural project photography may retain original colors. Suggested visual proportions: predominantly dark base and surfaces, restrained Bone typography and sparing Glacier Blue highlights; not a rigid pixel quota. All UI and motion colors should reference shared semantic CSS tokens, not hardcoded library demo colors.

## Typography
P2 V3 poster name: Be Vietnam Pro 900, selected for the existing bilingual font pipeline and heavy editorial form; the exact size is responsive and may exceed the earlier suggested hero scale to achieve the approved poster composition. Keep Space Grotesk for the broader display system, Be Vietnam Pro for body, and JetBrains Mono for metadata where appropriate. Use framework-optimized fonts and inspect real Vietnamese strings. Body 16–18px, line-height 1.55–1.7; small 14px; section heads clamp(32px, 5vw, 56px). Do not force translated text into a fixed-height box. Limit paragraphs to 60–72ch.

## Layout
Max content width 1200–1320px; 12 columns desktop, 6 tablet, 4 mobile. Container gutters 24px desktop minimum, 16px mobile. Spacing scale 4/8/12/16/24/32/48/64/96/128. Section padding 96–128px desktop, 56–80px mobile. Cards 16–24px radius, controls 10–14px or pill, minimal subtle shadows; prefer borders over glow. Button targets >=44px where feasible. Dock bottom offset includes safe-area and content bottom padding.

## Component states
Default, hover, focus-visible, active, disabled, loading/error if relevant. Hover effects are enhancement only. Links visibly identifiable. Keep icons consistent (Lucide). No endless animated gradient on text or all cards. Use one consistent label system: 01 / ABOUT, etc. Decorative labels localized where meaningful.
