import { store } from '../store';
import { closeSign, iconAuth, nameAuth, userAuth } from '../redux/frontend';
import { accID, accEmail, accImage, accName } from '../redux/backend';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, deleteDoc } from "firebase/firestore";
import { getAnalytics, isSupported, logEvent } from "firebase/analytics";
import { deleteObject, listAll, ref } from "firebase/storage";
import { application, auth, db, storage } from './authentication';
getAuth().useDeviceLanguage();
let analytics;
const analyticsReady = (async () => {
    if (await isSupported()) {
        analytics = getAnalytics(application);
    }
})();
if ('serviceWorker' in navigator) {
    console.log('Service Worker is supported');
}
else {
    console.log('Service Worker is not supported');
}
if ('PushManager' in window) {
    console.log('Push API is supported');
}
else {
    console.log('Push API is not supported');
}
export const pwaDrawerToggle = () => {
    store.dispatch(closeSign());
};
onAuthStateChanged(auth, (user) => {
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
export const alertEmail = (error) => { console.log('Problem: ' + error); };
export const logOut = async () => { return signOut(auth); };
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