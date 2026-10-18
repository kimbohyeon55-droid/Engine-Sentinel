# Development workflow

Use Node.js 24 (tested) and `npm ci`. Run `npm run validate` and `npm run build`. Preview with `npm run dev` or `npm run preview` after building. Do not introduce private research inputs or connect the original API.

Canonical public metrics live in `src/data/evidence.json`; changes require rechecking the cited private aggregate source and regenerating consistent report values. Do not fabricate unavailable metrics or merge incompatible protocols.

Before upload: rerun validation, review the exact release allowlist and hashes, obtain owner publication approval, and create a fresh Git history from only this directory. Never stage the original workspace wholesale. No license or GitHub Pages deployment is implied.
