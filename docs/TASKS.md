# Roadmap and acceptance gates

At kit creation, all phases were NOT STARTED and P0 kickoff was planning only. P0 was subsequently approved and implemented; the workflow update below does not restart it. Owner approves each next phase before changes. The owner now requests a local commit after each completed, verified change as a recovery checkpoint; a current read-only/no-commit instruction overrides this standing request. Push only on explicit request for that turn. Document actual evidence, deferred checks and changes in DECISIONS.md.

Approved workflow update (2026-11-25): P0–P10 use TypeScript type checking and ESLint at phase completion, production builds when necessary, and manual browser/visual checks where practical. Fix blocking errors before proceeding. Playwright installation, browser downloads, configuration, and automated E2E tests are deferred until P11; report these checks as DEFERRED, not FAILED, before then. This update does not restart completed phase work.

| Phase | Implementation | Gate / acceptance |
|---|---|---|
| P0 | inspect environment, scaffold Next.js safely, setup Git if authorized, initialize shadcn, add both registries, configure/verify MCP or CLI fallback | dev/build/lint/typecheck run; exact versions, registry query or component lookup evidence; docs preserved; Playwright deferred under updated workflow |
| P1 | tokens, typography, base grid, i18n, metadata shell, placeholders, accessible primitives | /en and /vi routes, switcher, correct lang, no overflow; sample typography in both languages |
| P2 | Hero and navigation; V3 replaces the rejected original Hero with a personal poster while preserving the official Isometric Cubes, and hides the dock until destinations exist | owner manually reviews desktop/mobile, both locales, links, replay and reduced motion before P3; screenshots if existing tooling is available |
| P3 | Editorial About with three identity posters and “Experience & Achievements” capability pillars; C008 optional, C009 interaction adapted to owner content | owner reviews both locales, desktop/mobile composition, factual copy, keyboard/touch behavior; no general-introduction GPA, endpoint counts or number ticker |
| P4 | Work rail and two case-study routes, C006/C007 | correct role/data, no invented repos/screens, keyboard and mobile navigation |
| P5 | Research and Skills, optional icon/beam | accurate acceptance status and metric semantics; readable without animation |
| P6 | Timeline, achievements, C011 if assets available | dates and awards accurate; no fabricated certificate images |
| P7 | Beyond, optional genuine Playground, C004/C013 | small meaningful interaction or omit; accessible feedback |
| P8 | Contact and footer, C012 | verified links, no exposed private data; static fallback and clear CTA |
| P9 | optional C010 intro/replay, transition refinement | nonblocking, skip, original assets and permission; defer if unavailable |
| P10 | responsive polish, accessibility, i18n and performance audit | 320/390/768/1024/1440px reviews, keyboard/reduced-motion checks; no broken UI, document lab measurements |
| P11 | install/configure Playwright and required browsers; run automated E2E checks; final production build, SEO/social previews, link audit and deployment plan | verify locales, navigation, project routes, reduced motion and mobile behavior with automated tests; owner approves public copy/assets/privacy; deployment only on separate authorization |

## Review report template
- Phase and scope completed
- Design changes or deviations, reasons and owner approval status
- Files changed and dependencies added
- Commands executed and actual results; tests not run and why
- Mark Playwright/E2E as DEFERRED for P0–P10 under the approved workflow
- Screenshots/video paths, viewport, locale and observed issues
- Remaining risks and proposed next phase (do not begin it automatically)
