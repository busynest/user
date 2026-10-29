import { readFileSync, writeFileSync } from 'node:fs';

function restore(path, line, mark) {
  const text = readFileSync(path, 'utf8');
  if (text.includes('@deprecated')) return;
  if (!text.includes(line)) return;
  writeFileSync(path, text.replace(line, mark + line));
}

const userMark = '/** @deprecated Optional - load-time snapshot. Required - read auth.currentUser at call time. */\n';
const emailMark = '/** @deprecated Optional - window event userEmailChanged. Required - listen for pwa-email-changed. */\n';

restore('base/firebase/authentication.d.ts', 'export declare let user: User | null;', userMark);
restore('base/firebase/authentication.d.ts', 'export declare const user: User | null;', userMark);
restore('base/deprecated/email-changed.d.ts', 'export declare const userEmailChanged = "userEmailChanged";', emailMark);
restore('base/deprecated/email-changed.d.ts', 'export declare const userEmailChanged: string;', emailMark);
