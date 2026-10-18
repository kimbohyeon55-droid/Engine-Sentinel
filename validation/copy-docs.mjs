import { cpSync } from 'node:fs';
for (const directory of ['reports','docs']) cpSync(directory, `dist/${directory}`, { recursive: true });
