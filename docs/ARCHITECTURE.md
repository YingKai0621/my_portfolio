# Technical architecture

Proposed stack: Next.js App Router, React 19-compatible version, TypeScript strict, Tailwind CSS v4, Motion (`motion/react`), shadcn/ui, Aceternity and Magic UI registries, next-intl, npm, Git, optional Vercel deployment. Playwright is reserved for P11, not installed or configured in P0–P10. Verify installed Node version and current framework requirements before initializing. Choose mutually compatible stable versions, lock dependencies, report exact versions; do not blindly upgrade existing projects.

```text
src/
  app/[locale]/
    layout.tsx
    page.tsx
    projects/[slug]/page.tsx
    research/page.tsx       # optional if dedicated route approved
  components/
    ui/                    # inspected registry components
    sections/
    navigation/
    motion/
    custom/
  content/                 # typed facts, project slugs, stats, links
  i18n/                    # locale config, request, navigation
  lib/
messages/en.json
messages/vi.json
public/images/{profile,projects,achievements,placeholders}/
public/cv/                 # sanitized PDF only when approved
tests/e2e/                # create/configure in P11 only
docs/
```

Use actual supported next-intl routing setup for chosen Next.js version (middleware/proxy naming may vary). Locales en and vi, English default proposed. Prefer locale prefixes `/en`, `/vi` for deterministic sharing/SEO; root redirects to chosen locale or English using supported routing. Maintain translated metadata, canonical and alternates/hreflang; shared stable project slugs. Set HTML lang accurately; use Intl for numbers/dates. Avoid hydration mismatch from browser-only effects. Validate translated long strings and Vietnamese accents.

Keep facts and metrics typed and independent of presentation; translations keyed by stable IDs. Components receive data/locale rather than import duplicate CV text. Use server-rendered content and narrowly scoped client components. Dynamic import heavy effects where beneficial, static placeholder with fixed dimensions. No global client-only wrapper just for animation. Use local mock assets or SVG shapes, not random remote photos. Use Next image optimization when appropriate; no unlicensed fonts or images.

P2 V3 Hero follows this boundary: the server-rendered `Hero` supplies localized text and verified external links; `.poster-portrait-layer` remains empty until an owner-approved transparent asset exists; `PosterReveal` is the small client island for the replayable entrance and animates `.poster-portrait-asset` only if one is present; `HeroCubes` retains the official Isometric registry component in a lazy-mounted environment layer. Floating Dock, Encrypted Text and Layout Text Flip stay available in source but are not rendered in this Hero.

Scripts for P0–P10: `dev`, `build`, `lint`, `typecheck` (names may adapt to verified scaffold). Run typecheck and lint at each phase completion; run build when necessary. Verify locales, dock, reduced motion, project routes, and mobile overflow manually where practical, recording viewport and observed results. In P11, install/configure Playwright and browsers, add `test:e2e`, and run automated checks; store any screenshots as review artifacts, not public assets. Before P11, report automated E2E as DEFERRED, not FAILED. No production deploy, external analytics, secrets or public CV until owner approval.

P0 setup details in setup/MCP.md. Source URLs and decisions recorded in docs/DECISIONS.md. Keep original docs intact when scaffolding into a nonempty directory; stage elsewhere and merge carefully if needed.
