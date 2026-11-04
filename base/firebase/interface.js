// Representational State Transfer - Application Programming Interface
// Module Imports ---------------- ---------------- ----------------
// Redux
import { store } from '../store.js';
import { accEmail, accImage, accName, accVerified, closeSign, userAuth } from '../redux/session.js';
// Firebase Auth
import { EmailAuthProvider, getAuth, onAuthStateChanged, reauthenticateWithCredential, signOut } from 'firebase/auth';
// Firebase Firestore
import { doc, deleteDoc } from "firebase/firestore";
// Firebase Analytics
import { getAnalytics, isSupported, logEvent } from "firebase/analytics";
// Firebase Storage
import { deleteObject, listAll, ref } from "firebase/storage";
// Start Authentication
import { application, auth, db, isReady, onReady, storage } from './authentication.js';
import { pwaAuthChanged, pwaAuthError, pwaLogout } from '../events/names.js';
import { watchGoogleRedirect } from './google.js';
import { emitWindow, toAuthError, toPwaUser } from '../events/emit.js';
/** Required - the form reads this after reauthenticate returns false. */
let failed = null;
export function takeAuthFailure() {
    const found = failed;
    failed = null;
    return found;
}
function noteFailure(detail) {
    failed = detail;
    emitWindow(pwaAuthError, detail);
}
// START ANALYTICS ----------------
// Required - analytics, only when this browser supports it
let analytics;
let analyticsReady = Promise.resolve();
// END ANALYTICS ----------------
// Start Distribute Information ---------------- ----------------
export const pwaDrawerToggle = () => {
    // Close Drawer State
    store.dispatch(closeSign());
};
// Required - redux, analytics, and pwa-auth-changed once the app exists
onReady(() => {
    watchGoogleRedirect();
    getAuth(application).useDeviceLanguage();
    analyticsReady = (async () => {
        if (await isSupported()) {
            analytics = getAnalytics(application);
        }
    })();
    onAuthStateChanged(auth, (user) => {
        // Required - every auth state, including the first
        emitWindow(pwaAuthChanged, { user: toPwaUser(user) });
        // Account Login
        if (user) {
            // Login Indicator
            store.dispatch(userAuth(true));
            // Close Drawer State
            store.dispatch(closeSign());
            store.dispatch(accName(user.displayName ?? ''));
            store.dispatch(accEmail(user.email || ''));
            store.dispatch(accImage(user.photoURL || ''));
            store.dispatch(accVerified(user.emailVerified === true));
        }
        // Account Log out
        else {
            // console.log('logged out');
            // Login Indicator
            store.dispatch(userAuth(false));
            store.dispatch(accName(''));
            store.dispatch(accEmail(''));
            store.dispatch(accImage(''));
            store.dispatch(accVerified(false));
        }
    });
});
// End Distribute Informatiom ---------------- ----------------
// Module Exports ---------------- Exact Name Reference ---------------- Firebase Action 
// Required - recent login before email, password, or delete
export const reauthenticate = async (password) => {
    const current = auth.currentUser;
    if (!current || !current.email) {
        noteFailure({ code: 'pwa/signed-out', message: 'Sign in first.' });
        return false;
    }
    try {
        const credential = EmailAuthProvider.credential(current.email, password);
        await reauthenticateWithCredential(current, credential);
        return true;
    }
    catch (error) {
        noteFailure(toAuthError(error));
        return false;
    }
};
export const logOut = async () => {
    if (!isReady()) {
        const detail = { code: 'pwa/not-ready', message: 'Sign-in is not ready yet.' };
        emitWindow(pwaAuthError, detail);
        throw new Error(detail.message);
    }
    try {
        await signOut(auth);
        emitWindow(pwaLogout, { user: null });
    }
    catch (error) {
        emitWindow(pwaAuthError, toAuthError(error));
        throw error;
    }
};
export const logAccount = async () => {
    await analyticsReady;
    if (!analytics) {
        return;
    }
    logEvent(analytics, 'create_account');
};
export const logAccountDelete = async () => {
    await analyticsReady;
    if (!analytics) {
        return;
    }
    logEvent(analytics, 'delete_account');
};
// Required - delete this user's files under pwa-auth/{uid}
export const deleteUserFiles = async (uid) => {
    const folder = ref(storage, 'pwa-auth/' + uid);
    const listed = await listAll(folder);
    await Promise.all(listed.items.map((item) => deleteObject(item)));
    for (const prefix of listed.prefixes) {
        const nested = await listAll(prefix);
        await Promise.all(nested.items.map((item) => deleteObject(item)));
    }
};
export const deleteDocument = async (collect, item) => {
    await deleteDoc(doc(db, collect, item));
};
//# sourceMappingURL=interface.js.map