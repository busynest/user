import { store } from '../store';
import { closeSign, iconAuth, nameAuth, userAuth } from '../redux/frontend';
import { accID, accEmail, accImage, accName } from '../redux/backend';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, deleteDoc } from "firebase/firestore";
import { getAnalytics, isSupported, logEvent } from "firebase/analytics";
import { deleteObject, listAll, ref } from "firebase/storage";
import { application, auth, db, isReady, onReady, storage } from './authentication';
import { pwaAuthChanged, pwaAuthError, pwaLogout } from '../events/names';
import { emitWindow, toAuthError, toPwaUser } from '../events/emit';
let analytics;
let analyticsReady = Promise.resolve();
export const pwaDrawerToggle = () => {
    store.dispatch(closeSign());
};
onReady(() => {
    getAuth(application).useDeviceLanguage();
    analyticsReady = (async () => {
        if (await isSupported()) {
            analytics = getAnalytics(application);
        }
    })();
    onAuthStateChanged(auth, (user) => {
        emitWindow(pwaAuthChanged, { user: toPwaUser(user) });
        if (user) {
            store.dispatch(userAuth(true));
            store.dispatch(closeSign());
            store.dispatch(accID(user.uid));
            store.dispatch(accName(user.displayName || 'John Doe'));
            store.dispatch(accEmail(user.email || ''));
            store.dispatch(accImage(user.photoURL || ''));
            store.dispatch(nameAuth(user.displayName || 'John Doe'));
            store.dispatch(iconAuth(user.photoURL || ''));
        }
        else {
            store.dispatch(userAuth(false));
            store.dispatch(accID(''));
            store.dispatch(accName('John Doe'));
            store.dispatch(accEmail(''));
            store.dispatch(accImage(''));
            store.dispatch(nameAuth('John Doe'));
            store.dispatch(iconAuth(''));
        }
    });
});
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