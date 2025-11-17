import { store } from '../store';
import { closeSign, iconAuth, nameAuth, userAuth } from '../redux/frontend';
import { accID, accEmail, accImage, accName } from '../redux/backend';
import { getAuth, onAuthStateChanged, sendEmailVerification, signOut } from 'firebase/auth';
import { doc, deleteDoc } from "firebase/firestore";
import { getAnalytics, logEvent } from "firebase/analytics";
import { isSupported } from "firebase/messaging";
import { application, auth, db } from './authentication';
getAuth().useDeviceLanguage();
let analytics;
(async () => {
    if (await isSupported()) {
        console.log('Firebase Analytics Supported');
        analytics = getAnalytics(application);
    }
    else {
        console.log("Firebase Analytics is not supported in this environment.");
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
let pendingEmailVerification = false;
window.addEventListener("userEmailChanged", () => {
    pendingEmailVerification = true;
});
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
        if (pendingEmailVerification && !user.emailVerified) {
            sendEmailVerification(user)
                .then(() => {
                console.log("Verification email sent to:");
                pendingEmailVerification = false;
            })
                .catch((error) => {
                console.error("Error sending verification email:", error.message);
                pendingEmailVerification = false;
            });
        }
        else if (user.emailVerified) {
            console.log("User's email is already verified:");
        }
        else {
            console.log("User signed in, no email verification pending:");
        }
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
export const logAccount = async () => { logEvent(analytics, 'create_account'); };
export const logAccountDelete = async () => { logEvent(analytics, 'delete_account'); };
export const deleteDocument = async (collect, item) => {
    await deleteDoc(doc(db, collect, item));
};
//# sourceMappingURL=interface.js.map