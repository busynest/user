import { onAuthStateChanged } from 'firebase/auth';
import { auth, isReady, onReady } from '../firebase/authentication';
import { toPwaUser } from '../events/emit';
export function getCurrentUser() {
    if (!isReady())
        return null;
    return toPwaUser(auth.currentUser);
}
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