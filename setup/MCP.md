# Codex MCP setup (P0 only)

Aceternity and Magic UI document the shared shadcn MCP approach. See https://ui.aceternity.com/installation#ai-agents and https://magicui.design/docs/mcp. The following is a configuration proposal, not an installed server. Use a local Codex client with Node/npm available; cloud clients may need a different workflow.

1. Inspect Node/npm and existing project/config. Scaffold Next.js only after P0 approval; if folder is nonempty, scaffold in a temporary sibling and merge without overwriting docs. Initialize shadcn if absent (`npx shadcn@latest init`), respecting existing aliases and Tailwind setup.
2. Merge `registries.snippet.json` into generated `components.json`; do not replace the full file.
3. Verify current Codex MCP syntax (`codex mcp --help` / official docs) and installed server list. If supported, register shadcn with `codex mcp add shadcn -- npx shadcn@latest mcp` from local terminal. On Windows, if executable resolution fails, use verified npx.cmd or cmd wrapper based on the environment. Alternatively merge `codex.config.example.toml` into supported user/project configuration. Do not apply both approaches or overwrite existing config. Project-level config may require trust. Only execute approved commands and respect sandbox prompts.
4. Restart/reopen Codex if required; check `codex mcp list` (or UI equivalent), then ask agent to search both registries for Background Cubes Grid and Number Ticker. A listing alone does not prove discovery works. Record actual tool availability.
5. If MCP unavailable, use official shadcn registry CLI (`npx shadcn@latest add @aceternity/<verified-name>` and equivalent `@magicui/<verified-name>`), after confirming names and licensing. No need to block development on MCP.
6. Add only components needed by each phase. Inspect generated changes, dependencies and CSS; do not overwrite customized files. Record tested version/lockfile. No paid API key unless owner separately authorizes. Never commit credentials.

CLI examples are not executed by this kit. Verify current versions and syntax before applying. For Codex-related configuration reference see official docs; for component discovery use shadcn MCP or direct official sources.
