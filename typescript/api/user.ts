import { onAuthStateChanged } from 'firebase/auth';

import { auth, isReady, onReady } from '../firebase/authentication';
import { toPwaUser } from '../events/emit';
import type { PwaUser } from '../events/types';

/** Required - uid, displayName, email, photoURL. Null when signed out or not ready. */
export function getCurrentUser(): PwaUser | null {
  if (!isReady()) return null;
  return toPwaUser(auth.currentUser);
}

/** Required - subscribe to the auth user. The return value unsubscribes. */
export function onUserChanged(callback: (user: PwaUser | null) => void): () => void {

  let stop: (() => void) | undefined;
  let dropped = false;

  onReady(() => {
    if (dropped) return;
    stop = onAuthStateChanged(auth, (next) => {
      callback(toPwaUser(next));
    });
  });

  return () => {
    dropped = true;
    if (stop) stop();
  };

}
