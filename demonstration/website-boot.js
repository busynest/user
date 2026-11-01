import { connectAuthEmulator } from 'firebase/auth';
import { connectFirestoreEmulator } from 'firebase/firestore';
import { connectStorageEmulator } from 'firebase/storage';
import { auth, db, storage } from '../base/firebase/authentication.js';

connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true });
connectFirestoreEmulator(db, '127.0.0.1', 8181);
connectStorageEmulator(storage, '127.0.0.1', 9199);

window.__events = [];
for (const name of [
  'pwa-auth-changed', 'pwa-login', 'pwa-logout', 'pwa-signup',
  'pwa-verification-sent', 'pwa-auth-error', 'pwa-reset-sent',
  'pwa-profile-updated', 'pwa-settings'
]) {
  window.addEventListener(name, (event) => {
    const detail = event instanceof CustomEvent ? event.detail : undefined;
    window.__events.push({ name, detail });
  });
}

await import('../base/export/pwa-auth.js');
await import('./website-check.js');
