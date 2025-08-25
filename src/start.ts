
// Representational State Transfer - Application Programming Interface
// Module Imports ---------------- ---------------- ----------------

// Redux
import { store } from './store';
import { closeSign, nameAuth, userAuth } from './redux/frontend';
import { accID, accAnon, accEmail, accImage, accName, accPhone } from './redux/backend';

// Firebase App 
import { FirebaseApp, initializeApp } from 'firebase/app';

// Firebase Auth
import { Auth, User, getAuth, onAuthStateChanged, sendEmailVerification, signOut } from 'firebase/auth';

// Firebase Firestore
import { getFirestore, Firestore, doc, deleteDoc } from "firebase/firestore";

// Firebase Storage
import { getStorage, FirebaseStorage } from "@firebase/storage";

//Firebase Analytics
import { Analytics, getAnalytics, logEvent } from "firebase/analytics";

// Firebse Messaginmg
import { isSupported } from "firebase/messaging";

// Module Exports ---------------- ---------------- ----------------

// Memory Reference to Services - Object Type
export const application    : FirebaseApp       = initializeApp(connect); // Initialize Application
export const db             : Firestore         = getFirestore(application);  // Initialize Database
export const storage        : FirebaseStorage   = getStorage(application); // Reference:   Represents a reference to a file or directory in Storage, returned by ref(). // UploadTask:  Represents an ongoing upload operation, returned by upload methods. // ListResult:  Represents the result of listing files in a directory.
export const auth           : Auth              = getAuth(application);
export const user           : User | null       = auth.currentUser;

// LANGUAGE
getAuth().useDeviceLanguage();

// START ANALYTICS ----------------

// const analytics : Analytics = getAnalytics();
let analytics: Analytics;

(async () => {
  if (await isSupported()) {
    console.log('Firebase Analytics Supported');
    // Initialize Firebase Analytics
    analytics = getAnalytics(application);
    // Additional analytics setup code here
  } else {
    console.log("Firebase Analytics is not supported in this environment.");
  }
})();

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

    // Flag to track if an email change is pending verification
    let pendingEmailVerification = false;

    // Listen for the custom email change event
    window.addEventListener("userEmailChanged", (event) => {
      console.log("Custom event received: Email changed to", event.detail.email);
      pendingEmailVerification = true; // Set flag to trigger verification
    });


// Firebase State Change Function
onAuthStateChanged(auth, (user) => {

  // Account Login
  if (user) {
    console.log('user 2: ', user);

    // Login Indicator
    store.dispatch( userAuth(true) );

    // Close Drawer State
    store.dispatch( closeSign() );

    // Backend Data Redux - Firebase User Information - account redux
    store.dispatch( accID     ( user.uid ) );
    store.dispatch( accAnon   ( user.isAnonymous ) );
    
    store.dispatch( accName   ( user.displayName || 'John Doe' ) );
    store.dispatch( accEmail  ( user.email || 'Nothing' ) );
    store.dispatch( accImage  ( user.photoURL || 'images/empty.jpg' ) );
    store.dispatch( accPhone  ( user.phoneNumber || '(000) 000-0000' ) );

    // Frontend Data Redux - Firebase User Information - user redux
    store.dispatch( nameAuth   ( user.displayName || 'John Doe' ) );

    // Email Change Listener - Custom Event
    if (pendingEmailVerification && !user.emailVerified) {
      // Send verification email for the updated email
      sendEmailVerification(user)
        .then(() => {
          console.log("Verification email sent to:", user.email);
          pendingEmailVerification = false; // Reset flag after sending
        })
        .catch((error) => {
          console.error("Error sending verification email:", error.message);
          pendingEmailVerification = false; // Reset flag on error
        });
    } else if (user.emailVerified) {
      console.log("User's email is already verified:", user.email);
    } else {
      console.log("User signed in, no email verification pending:", user.email);
    }
    
    // Existing Redux Profile Object
    // const profile = store.getState().account;

    // Redux - Firebase Database Information
    // Dispatch Profile Object Information

  }

  // Account Log out
  else {
    console.log('logged out');

    // Login Indicator
    store.dispatch( userAuth  ( false ) );
       // Backend Data Redux - Firebase User Information - account redux
    store.dispatch( accID     ( '' ) );
    store.dispatch( accAnon   ( false ) );
    
    store.dispatch( accName   ( 'John Doe' ) );
    store.dispatch( accEmail  ( 'Nothing' ) );
    store.dispatch( accImage  ( 'images/empty.jpg' ) );
    store.dispatch( accPhone  ( '(000) 000-0000' ) );

    // Frontend Data Redux - Firebase User Information - user redux
    store.dispatch( nameAuth   ( 'John Doe' ) );

    // Dispatch Information

  }

});

// End Distribute Informatiom ---------------- ----------------

// Exact Name Reference - Firebase Action 
export const logOut             = async () => { return signOut(auth); };
export const logAccount         = async () => { logEvent(analytics, 'create_account'); };
export const logAccountDelete   = async () => { logEvent(analytics, 'delete_account'); };
export const deleteDocument     = async (collect:string, item:string) => {
  
  await deleteDoc(doc(db, collect, item));

};





/*
// Object Initializer Notation
export interface fire {
  apiKey:                 string,
  authDomain:             string,
  databaseURL:            string,
  projectId:              string,
  storageBucket:          string,
  messagingSenderId:      string,
  appId:                  string,
  measurementId:          string
};


// Initialize Firebase Data
const admin: fire = {
  appId:                connect.appId,
  apiKey:               connect.apiKey,
  authDomain:           connect.authDomain,
  databaseURL:          connect.databaseURL,
  projectId:            connect.projectId,
  storageBucket:        connect.storageBucket,
  messagingSenderId:    connect.messagingSenderId,
  measurementId:        connect.measurementId
};
*/