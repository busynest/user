import { readFileSync, writeFileSync } from 'node:fs';

const path = 'base/firebase/authentication.d.ts';
const mark = '/** @deprecated Optional - load-time snapshot. Required - read auth.currentUser at call time. */\n';
const line = 'export declare const user: User | null;';
const text = readFileSync(path, 'utf8');

if (!text.includes('@deprecated')) {
  writeFileSync(path, text.replace(line, mark + line));
}
