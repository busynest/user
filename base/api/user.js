import { onAuthStateChanged } from 'firebase/auth';
import { auth, isReady, onReady } from '../firebase/authentication.js';
import { toPwaUser } from '../events/emit.js';
/** Required - uid, displayName, email, photoURL, emailVerified. Null when signed out or not ready. */
export function getCurrentUser() {
    if (!isReady())
        return null;
    return toPwaUser(auth.currentUser);
}
/** Required - subscribe to the auth user. The return value unsubscribes. */
export function onUserChanged(callback) {
    let stop;
    let dropped = false;
    onReady(() => {
        if (dropped)
            return;
        stop = onAuthStateChanged(auth, (next) => {
            callback(toPwaUser(next));
        });
    });
    return () => {
        dropped = true;
        if (stop)
            stop();
    };
}
//# sourceMappingURL=user.js.map