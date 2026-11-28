# Product requirements v1.0

## Goal and audience
A personal portfolio for a third-year Software Engineering student seeking Java backend internships, and for building a longer-term personal brand. Primary audience: technical recruiters, engineering hiring managers and peers. Secondary: collaborators and technology enthusiasts. Success: a visitor understands identity, specialization and how to view projects/contact within one screen or a short scroll; can inspect technically credible case studies; can use the site on mobile and in either language.

## Scope
- Homepage with the H2.2/H2.3 Glacial Awakening five-chapter Hero-to-About opening, the preserved P3 About content, Selected Works, unified P5 Technical Expertise with compact Research & Exploration, and P6 Journey; Contact follows in a later phase. The former P7 PROJECT GLACIER homepage section and roadmap are suspended while its provisional mecha is tested in this local-only opening. Earlier P2 poster, H2.1 single-viewport Hero and P7 scene code remain reversible fallbacks. The character is local-only until public-use rights are confirmed. Floating Dock anchors only where destinations exist.
- Dedicated project routes for Book Street and MoonCake. Research remains a concise homepage subsection until sufficient verified material and an approved destination justify a detail route. Link from project showcases without trapping the user in a modal.
- English default proposed; Vietnamese equivalent with explicit language switch and locale-specific URL. Preserve section anchor and project route when switching when possible.
- CV download only when sanitized asset is supplied; until then hide or mark unavailable in prototype. GitHub/LinkedIn links from CONTENT. Email contact only after owner confirms public use. No phone by default.
- Mock imagery: local, abstract, labeled where depicting a product; real content assets replace later without layout rewrite.
- Intro replay and playful Easter egg optional, never required for access. No backend, authentication, CMS, analytics, contact form or AI service needed in MVP.

## Acceptance
- At 390px and 1440px, no unintended horizontal scroll, obstructed CTA, clipped text or overlapping dock; verify 320px and tablet too.
- Keyboard navigation, visible focus, skip link, native links, dialog escape/return focus if used; meaningful alt text; WCAG 2.2 AA contrast target, reduced-motion fallback.
- Locale routes and switching work; no untranslated production UI. No misleading claims or dead links. Typecheck and lint pass at each completed phase, build when necessary; Playwright installation and automated smoke checks for both locales, navigation and project details are deferred until P11 under the owner-approved workflow.
- Aim for LCP <= 2.5s, CLS <= 0.1, INP <= 200ms under representative conditions; distinguish lab from field metrics. Test animations on modest mobile; defer heavy backgrounds, avoid layout shift and pause offscreen work. No guarantee until measured.
- Launch only after owner approval of visual quality, factual claims, privacy, images and links.
