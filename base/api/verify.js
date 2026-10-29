import { onAuthStateChanged, sendEmailVerification } from 'firebase/auth';
import { auth, emailActionCodeSettings, isReady, onReady } from '../firebase/authentication';
import { pwaAuthError, pwaEmailVerified, pwaVerificationSent } from '../events/names';
import { emitWindow, toAuthError, toPwaUser } from '../events/emit';
import store from '../store';
import { accVerified } from '../redux/backend';
let trackedUid = '';
let trackedVerified = false;
let watching = false;
function remember(user) {
    if (!user) {
        trackedUid = '';
        trackedVerified = false;
        return false;
    }
    const verified = user.emailVerified === true;
    if (user.uid !== trackedUid) {
        trackedUid = user.uid;
        trackedVerified = verified;
        return false;
    }
    if (!trackedVerified && verified) {
        trackedVerified = true;
        return true;
    }
    trackedVerified = verified;
    return false;
}
function announce(user) {
    store.dispatch(accVerified(true));
    const person = toPwaUser({ ...user, emailVerified: true });
    if (person)
        emitWindow(pwaEmailVerified, { user: person });
}
export async function refreshEmailVerified(reportError) {
    if (!isReady())
        return false;
    const current = auth.currentUser;
    if (!current) {
        remember(null);
        return false;
    }
    try {
        await current.reload();
    }
    catch (error) {
        if (reportError)
            emitWindow(pwaAuthError, toAuthError(error));
        return current.emailVerified === true;
    }
    store.dispatch(accVerified(current.emailVerified === true));
    if (remember(current))
        announce(current);
    return current.emailVerified === true;
}
function onFocus() {
    void refreshEmailVerified(false);
}
function onVisible() {
    if (document.visibilityState === 'visible')
        void refreshEmailVerified(false);
}
function watchEmailVerified() {
    if (watching)
        return;
    watching = true;
    onReady(() => {
        onAuthStateChanged(auth, (user) => {
            if (user && remember(user))
                announce(user);
            if (!user)
                remember(null);
        });
        if (typeof window === 'undefined')
            return;
        window.addEventListener('focus', onFocus);
        document.addEventListener('visibilitychange', onVisible);
    });
}
watchEmailVerified();
function fail(code, message) {
    const detail = { code, message };
    emitWindow(pwaAuthError, detail);
    throw Object.assign(new Error(message), detail);
}
export async function sendVerification() {
    if (!isReady())
        fail('pwa/not-ready', 'Sign-in is not ready yet.');
    const current = auth.currentUser;
    if (!current)
        fail('pwa/signed-out', 'Sign in first.');
    if (!current.email)
        fail('pwa/missing-email', 'Enter an email address.');
    if (current.emailVerified)
        return false;
    const settings = emailActionCodeSettings();
    try {
        if (settings)
            await sendEmailVerification(current, settings);
        else
            await sendEmailVerification(current);
    }
    catch (error) {
        emitWindow(pwaAuthError, toAuthError(error));
        throw error;
    }
    emitWindow(pwaVerificationSent, { email: current.email });
    return true;
}
export async function isEmailVerified() {
    return refreshEmailVerified(true);
}
//# sourceMappingURL=verify.js.map