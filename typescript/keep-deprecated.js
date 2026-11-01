import { readFileSync, writeFileSync } from 'node:fs';

function restore(path, line, mark) {
  const text = readFileSync(path, 'utf8');
  if (text.includes('@deprecated')) return;
  if (!text.includes(line)) return;
  writeFileSync(path, text.replace(line, mark + line));
}

const userMark = '/** @deprecated Use getCurrentUser(). Removed in 4.0.0. This is only a snapshot from startup. */\n';
const emailMark = '/** @deprecated Listen for pwa-email-changed. Removed in 4.0.0. */\n';
const toggleMark = '/** @deprecated Use closeDrawer(). Removed in 4.0.0. This only closes the drawer. */\n';

restore('base/firebase/authentication.d.ts', 'export declare let user: User | null;', userMark);
restore('base/firebase/authentication.d.ts', 'export declare const user: User | null;', userMark);
restore('base/events/legacy-email.d.ts', 'export declare const userEmailChanged = "userEmailChanged";', emailMark);
restore('base/events/legacy-email.d.ts', 'export declare const userEmailChanged: string;', emailMark);
restore('base/firebase/interface.d.ts', 'export declare const pwaDrawerToggle: () => void;', toggleMark);
