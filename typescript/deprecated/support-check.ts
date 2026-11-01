/*
 * Planned removal: 4.0.0. Date: 2026-11-01.
 Optional - retired. These logs used to run on every import of firebase/interface.ts. */

export function logClientSupport() {

  if ('serviceWorker' in navigator) { console.log('Service Worker is supported'); }
  else { console.log('Service Worker is not supported'); }

  if ('PushManager' in window) { console.log('Push API is supported'); }
  else { console.log('Push API is not supported'); }

}
