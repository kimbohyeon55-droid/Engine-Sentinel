# Executed validation

Review date: 2026-10-18. These checks validate the publication package; they do not retrain models.

| Check | Result | Scope |
|---|---|---|
| Dependency install | PASS | npm install; lockfile created |
| TypeScript | PASS | npm run typecheck, TypeScript 7.0.2 |
| Production build | PASS | Vite 8.3.4; relative assets and static reports |
| Aggregate integrity | PASS | Confusion arithmetic; V3.8 run table/summary; V3.16/V3.18 run means |
| Report equality | PASS | Canonical JSON versus both metric tables |
| Browser | PASS | Chrome, 18 section/viewport combinations |
| Responsive | PASS | 1440×1050, 820×1180, 390×844; no page-level horizontal overflow |
| Accessibility | PASS | axe WCAG 2 A/AA + 2.1 AA tags, no detected violations; skip link and native controls |
| Runtime | PASS | No browser page/console errors; no external network requests |
| Links | PASS | Local Markdown links; built report and publication-scope HTTP responses |
| Dependency advisories | PASS | npm audit: zero known vulnerabilities at inspection time |
| Secret/prohibited-file scan | PASS | Common credential patterns, absolute user paths, forbidden extensions and size checks |
| Git history | No history to migrate | Parent repository has zero commits, no tracked files; candidate has no .git directory |
| Original preservation | PASS within stated scope | 1340 file paths, sizes and modification times identical; no raw dataset read for hashing |
| Visual review | PASS | Desktop and mobile screenshots reviewed; no clipping of content |

Initial TypeScript CSS typing, favicon, link styling, chart semantics and mobile table focus issues were fixed and checks rerun. Browser-tool setup errors were fixed before the passing run. Automated accessibility and secret scans are bounded checks, not certification. Remote repository history could not be inspected because the target name did not resolve under available authentication. No Git history is inherited by this candidate.

Local screenshots and detailed browser logs are excluded from upload. `npm run test:browser` requires installed Google Chrome, launches a local preview server, and writes ignored `.local/` outputs. No model training was rerun. Original preservation uses metadata inventory, not whole-dataset byte hashing; source aggregate hashes are recorded separately.
