import { connectAuthEmulator } from 'firebase/auth';
import { connectFirestoreEmulator } from 'firebase/firestore';
import { connectStorageEmulator } from 'firebase/storage';
import { auth, db, storage } from '../base/firebase/authentication.js';

connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true });
connectFirestoreEmulator(db, '127.0.0.1', 8181);
connectStorageEmulator(storage, '127.0.0.1', 9199);

const names = [
  'pwa-auth-changed',
  'pwa-login',
  'pwa-logout',
  'pwa-signup',
  'pwa-account-deleted',
  'pwa-profile-updated',
  'pwa-email-changed',
  'pwa-drawer-toggle',
  'pwa-auth-error',
  'userEmailChanged'
];

window.__events = [];
const log = document.querySelector('#event-log');
const waiting = log.querySelector('.quiet');

for (const name of names) {
  window.addEventListener(name, (event) => {
    const detail = event instanceof CustomEvent ? event.detail : undefined;
    window.__events.push({ name, detail });
    if (waiting) waiting.remove();
    const item = document.createElement('li');
    item.textContent = name + ' ' + JSON.stringify(detail);
    log.prepend(item);
  });
}

await import('../base/export/pwa-auth.js');
await import('./emulator-check.js');
