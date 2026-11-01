import { pwaAuthError } from '../events/names.js';
import { emitWindow, toAuthError } from '../events/emit.js';
import { initialize, isReady } from './authentication.js';
import type { FirebaseOptions } from 'firebase/app';

/** Optional - firebase-config JSON on a host element, used when the app is not up yet. */
export function applyFirebaseConfig(host: HTMLElement): void {

  if (isReady()) return;

  const raw = host.getAttribute('firebase-config');
  if (!raw) return;

  try {
    initialize({ config: JSON.parse(raw) as FirebaseOptions });
  } catch (error) {
    emitWindow(pwaAuthError, toAuthError(error));
  }

}
