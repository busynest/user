import { pwaAuthError } from '../events/names';
import { emitWindow, toAuthError } from '../events/emit';
import { initialize, isReady } from './authentication';
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
