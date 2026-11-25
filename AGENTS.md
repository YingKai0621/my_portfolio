# AGENTS.md — LKD Portfolio

## Mission
Build Luong Khuong Duy's bilingual personal portfolio: an engineering-first, cinematic, carefully crafted website for internship applications and personal branding. Design thesis: **Quiet Precision. Bold Curiosity.** Treat the supplied documents as a proposed v1 baseline, not as proof of owner approval of every detail.

## Read before working
- `docs/PRD.md`, `docs/CREATIVE_DIRECTION.md`, `docs/DESIGN_SYSTEM.md`, `docs/WIREFRAME.md`
- `docs/CONTENT.md`, `docs/COMPONENT_MAP.md`, `docs/MOTION_SPEC.md`
- `docs/ARCHITECTURE.md`, `docs/TASKS.md`, `docs/DECISIONS.md`
- `setup/MCP.md` for registry setup; `prompts/00-kickoff.md` for initial task.

## Working agreement
- Work only on the requested phase; first inspect repo, current status, dependencies and relevant docs. Initial kickoff is read-only planning; no code or installs until authorized.
- Preserve existing files and user changes. Do not reset, force push, deploy, buy licenses, expose secrets, or overwrite unrelated configuration. The owner has given a standing request to commit completed, verified project changes as recoverable checkpoints. Do not commit read-only work, unfinished changes, or changes when the current request says not to commit. Push or publish only when explicitly requested for that turn.
- When specifications conflict: owner instructions > factual content in CONTENT > approved decisions > phase requirements > visual proposals. Surface material conflicts; log accepted changes in DECISIONS. Do not silently replace selected components.
- Use actual official registry code where suitable; inspect source, licenses, dependencies, responsive behavior before installation. Labs may be unavailable; propose a lawful independently built alternative or defer. Do not bypass paid access.
- Prefer maintainable React/TypeScript, semantic HTML, server components by default, client islands for motion; share locale-independent project data. Avoid unnecessary dependencies or duplicate animation engines.
- No fake achievements, testimonials, work history, screenshots, repository links or metrics. Mock assets must be labeled or plainly abstract; never present stock/generated portraits as the owner. Keep phone private; confirm public contact and CV sanitization before launch.
- Implement English and Vietnamese together; preserve accents, translate UI strings and metadata; no hardcoded user-facing strings in shared UI. Provide reduced motion, keyboard, touch and static fallbacks.
- Make typography, spacing, and content hierarchy beautiful even with animations disabled. No full-page blocking intro; never hide essential content behind motion or hover. Test desktop and mobile.
- For each implemented phase: run TypeScript type checking and ESLint; run production builds when necessary. Prioritize implementation, visual quality, and manual browser verification; fix blocking errors before proceeding. State actual results and untested items, list changed files and remaining risks. Do not claim checks passed without running them. Update phase status only when evidence exists; pause at review gate.
- Defer Playwright installation, browser downloads, configuration, and automated E2E tests until P11. Do not install or execute Playwright during P0–P10. Report its gate as DEFERRED, not FAILED, before P11. Manual browser checks remain expected where practical.

## Owner-approved palette (v1.1)
Use Black Basalt #0B1013, Bone #E8F3F6 and Glacier Blue #1BA6CD as the fixed core palette. Follow docs/DESIGN_SYSTEM.md for supporting tokens; override imported component demo colors. Do not revert to the previous Muted Amethyst palette.
