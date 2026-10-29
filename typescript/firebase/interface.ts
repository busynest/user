// Representational State Transfer - Application Programming Interface



// Module Imports ---------------- ---------------- ----------------



// Redux
import { store } from '../store';
import { closeSign, iconAuth, nameAuth, userAuth } from '../redux/frontend';
import { accID, accEmail, accImage, accName } from '../redux/backend';

// Firebase Auth
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

// Firebase Firestore
import { doc, deleteDoc } from "firebase/firestore";

// Firebase Analytics
import { Analytics, getAnalytics, isSupported, logEvent } from "firebase/analytics";

// Firebase Storage
import { deleteObject, listAll, ref } from "firebase/storage";

// Start Authentication
import { application, auth, db, isReady, onReady, storage } from './authentication'

import { pwaAuthChanged, pwaAuthError, pwaLogout } from '../events/names';
import { emitWindow, toAuthError, toPwaUser } from '../events/emit';



// START ANALYTICS ----------------



// Required - analytics, only when this browser supports it
let analytics: Analytics | undefined;

let analyticsReady: Promise<void> = Promise.resolve();



// END ANALYTICS ----------------



// Start Support Checks



// Check for Service Worker support
if ('serviceWorker' in navigator) { console.log('Service Worker is supported'); }
else { console.log('Service Worker is not supported'); }

// Check for Push API support
if ('PushManager' in window) { console.log('Push API is supported'); }
else { console.log('Push API is not supported'); }



// End Support Checks



// Start Distribute Information ---------------- ----------------



export const pwaDrawerToggle = () => {
    // Close Drawer State
    store.dispatch( closeSign() );
}


// Required - redux, analytics, and pwa-auth-changed once the app exists
onReady(() => {

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
    store.dispatch( userAuth(true) );

    // Close Drawer State
    store.dispatch( closeSign() );

    // Backend Data Redux - Firebase User Information - account redux
    store.dispatch( accID     ( user.uid ) );
    store.dispatch( accName   ( user.displayName || 'John Doe' ) );
    store.dispatch( accEmail  ( user.email || '' ) );
    store.dispatch( accImage  ( user.photoURL || '' ) );

    // store.dispatch( accPhone  ( user.phoneNumber || '(000) 000-0000' ) );
    // store.dispatch( accAnon   ( user.isAnonymous ) );

    // Frontend Data Redux - Firebase User Information - user redux
    store.dispatch( nameAuth   ( user.displayName || 'John Doe' ) );
    store.dispatch( iconAuth   ( user.photoURL || '' ) );

    // Existing Redux Profile Object
    // const profile = store.getState().account;

    // Redux - Firebase Database Information
    // Dispatch Profile Object Information

  }

  // Account Log out
  else {
    // console.log('logged out');

    // Login Indicator
    store.dispatch( userAuth  ( false ) );

    // Backend Data Redux - Firebase User Information - account redux
    store.dispatch( accID     ( '' ) );
    store.dispatch( accName   ( 'John Doe' ) );
    store.dispatch( accEmail  ( '' ) );
    store.dispatch( accImage  ( '' ) );

    //  store.dispatch( accAnon   ( false ) );
    // store.dispatch( accPhone  ( '(000) 000-0000' ) );

    // Frontend Data Redux - Firebase User Information - user redux
    store.dispatch( nameAuth   ( 'John Doe' ) );
    store.dispatch( iconAuth   ( '' ) );

    // Dispatch Information

  }

  });

});



// End Distribute Informatiom ---------------- ----------------



// Module Exports ---------------- Exact Name Reference ---------------- Firebase Action 



export const logOut             = async () => {
  if (!isReady()) {
    const detail = { code: 'pwa/not-ready', message: 'Sign-in is not ready yet.' };
    emitWindow(pwaAuthError, detail);
    throw new Error(detail.message);
  }
  try {
    await signOut(auth);
    emitWindow(pwaLogout, { user: null });
  } catch (error) {
    emitWindow(pwaAuthError, toAuthError(error));
    throw error;
  }
};

export const logAccount         = async () => {
  await analyticsReady;
  if (!analytics) { return; }
  logEvent(analytics, 'create_account');
};

export const logAccountDelete   = async () => {
  await analyticsReady;
  if (!analytics) { return; }
  logEvent(analytics, 'delete_account');
};

// Required - delete this user's files under pwa-auth/{uid}
export const deleteUserFiles    = async (uid: string) => {

  const folder = ref(storage, 'pwa-auth/' + uid);
  const listed = await listAll(folder);

  await Promise.all(listed.items.map((item) => deleteObject(item)));

  for (const prefix of listed.prefixes) {
    const nested = await listAll(prefix);
    await Promise.all(nested.items.map((item) => deleteObject(item)));
  }

};

export const deleteDocument     = async (collect:string, item:string) => {

  await deleteDoc(doc(db, collect, item));

};