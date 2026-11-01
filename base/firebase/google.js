import { GoogleAuthProvider, getRedirectResult, signInWithPopup, signInWithRedirect } from 'firebase/auth';
import { auth, onReady } from './authentication.js';
import { toAuthError } from '../events/emit.js';
const quiet = new Set([
    'auth/popup-closed-by-user',
    'auth/cancelled-popup-request',
    'auth/user-cancelled'
]);
let notice = null;
let watching = false;
export function takeGoogleNotice() {
    const found = notice;
    notice = null;
    return found;
}
export function prefersGoogleRedirect(ua) {
    return /Android|iPhone|iPad|iPod/i.test(ua);
}
function provider() {
    return new GoogleAuthProvider();
}
function remember(error) {
    notice = toAuthError(error);
}
export async function signInWithGoogle(ua) {
    const agent = ua ?? (typeof navigator === 'undefined' ? '' : navigator.userAgent);
    if (prefersGoogleRedirect(agent)) {
        await signInWithRedirect(auth, provider());
        return 'redirect';
    }
    try {
        await signInWithPopup(auth, provider());
        return 'ok';
    }
    catch (error) {
        const code = toAuthError(error).code;
        if (quiet.has(code))
            return 'quiet';
        if (code === 'auth/popup-blocked') {
            await signInWithRedirect(auth, provider());
            return 'redirect';
        }
        throw error;
    }
}
export function watchGoogleRedirect() {
    if (watching)
        return;
    watching = true;
    onReady(() => {
        void getRedirectResult(auth).catch((error) => {
            remember(error);
        });
    });
}
//# sourceMappingURL=google.js.map