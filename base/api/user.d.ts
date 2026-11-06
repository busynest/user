import type { PwaUser } from '../events/types.js';
/** Required - uid, displayName, email, photoURL, emailVerified. Null when signed out or not ready. */
export declare function getCurrentUser(): PwaUser | null;
/** Required - subscribe to the auth user. The return value unsubscribes. */
export declare function onUserChanged(callback: (user: PwaUser | null) => void): () => void;
//# sourceMappingURL=user.d.ts.map