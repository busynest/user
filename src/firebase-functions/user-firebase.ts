// Module Imports
import { store }               from '../store';
import { setAuthX, toggleSign }            from '../settings/user-redux';

// Firebase Functions
import {
  Auth,
  GoogleAuthProvider,
  User,
  createUserWithEmailAndPassword,
  getAuth,
  getRedirectResult,
  onAuthStateChanged,
  signInAnonymously,
  signInWithEmailAndPassword,
  signInWithRedirect,
  signOut
} from 'firebase/auth';

import {
  getFirestore,
  Firestore,
  doc,
  deleteDoc
} from "firebase/firestore";

import { getStorage, FirebaseStorage } from "@firebase/storage";

import { FirebaseApp, initializeApp } from 'firebase/app';

import {
  Analytics,
  getAnalytics,
  logEvent
} from "firebase/analytics";

import {
  isSupported
} from "firebase/messaging";   // MESSAGE
import { accAnon, accEmail, accImage, accName, accPhone, accUser } from '../settings/account-redux';

// Representational State Transfer - Application Programming Interface

// Module Exports

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
}

/*
// Global NamesSpace Process #1
declare global {
  interface Window {
    connect: typeof admin;
}
*/

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

// Memory Reference to Services - Object Type
export const application    : FirebaseApp       = initializeApp(admin); // Initialize Application
export const db             : Firestore         = getFirestore(application);  // Initialize Database
export const storage        : FirebaseStorage   = getStorage(); // Reference:   Represents a reference to a file or directory in Storage, returned by ref(). // UploadTask:  Represents an ongoing upload operation, returned by upload methods. // ListResult:  Represents the result of listing files in a directory.
export const auth           : Auth              = getAuth();
export const user           : User | null       = auth.currentUser;

// ANALYTICS -----------------------------------------------------

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

// ANALYTICS ----------------------------------------------------- END

// Distribute Information

// Firebase State Change Function
export const authChange = () => {

  return onAuthStateChanged( auth, () => (user: User) => {
    
      // Account Login
      if (user) {

        // Existing Redux Profile Object
        // const profile = store.getState().account;

        // Login Indicator
        store.dispatch( setAuthX(true) );

        // Close Drawer State
        store.dispatch( toggleSign() );

        // Redux - Firebase User Information
        store.dispatch( accUser   ( user.uid ) );          // Update User ID.
        store.dispatch( accName   ( user.displayName ) );  // Update Name   
        store.dispatch( accEmail  ( user.email ) );        // Update Email
        store.dispatch( accImage  ( user.photoURL ) );     // state.account.image : Contractor Face Photo URL
        store.dispatch( accAnon   ( user.isAnonymous ) );  // Anonymous state
        store.dispatch( accPhone  ( user.phoneNumber ) );  // Update Phone Number

        // Redux - Firebase Database Information

        // Dispatch Profile Object Information

      }

      // Account Log out
      else {

        // Login Indicator
        store.dispatch( setAuthX(false) )

        // Dispatch Information

      }

    });

  };

// Exact Name Reference - Firebase Action 
export const logOut             = () => { return signOut(auth); };
export const logAccount         = async () => { logEvent(analytics, 'create_account'); }
export const logAccountDelete   = async () => { logEvent(analytics, 'delete_account'); }

// Delete Declaration
export const deleteUser     = () => { return user.delete() }; /* .then( () => { }).catch( () => { }) */
export const deleteDocument = async (collect:string, item:string) => {
  
  await deleteDoc(doc(db, collect, item));

};

// Module Declaration Exact NameSpace Reference - Firebase Function
export const signUp = (email:any, password:any) => {

  createUserWithEmailAndPassword(auth, email.value, password.value)
  .then( () => { /*logAccount();*/ } )
  // .then( this.gtag_report_conversion(window.location) ); // Conversion Analytics
  .catch( (error:any) => { console.log( "error: ", error ); });

}

// Module Declaration Exact NameSpace Reference - Firebase Function
export const signIn = (email:any, password:any) => {

  signInWithEmailAndPassword(auth, email.value, password.value)
  .catch( (error:any) => { console.log( "error: ", error ); });

}

// Module Declaration Exact NameSpace Reference - Asynchronous Firebase Function
export const anon_SignIn = async () => {

  signInAnonymously(auth)
  .then(() => { })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
  });

}

// Module Declaration Exact NameSpace Reference - Asynchronous Firebase Function
export const google_SignIn = async () => {

  const provider:any = new GoogleAuthProvider();
  provider.addScope('profile');
  provider.addScope('email');

  signInWithRedirect(auth, provider);

  getRedirectResult(auth)
    .then( (result: any) => {
    if (result.credential) { /*Access Token to access Google API */
    const token = result.credential.accessToken; console.log("Google Token", token); }
    // The signed-in user info.
    // const firebaseUser = result.firebaseUser;
  }).catch( (error:any) => { console.log('Sign in error: ', error); } );

  // GoogleCredential credential = new GoogleCredential().setAccessToken(accessToken);

};







/*
// Exact Name Short-circuit Evaluation
// Firebase Object Reference
// Logical AND / OR - Function
export const firebaseUser       = () => { return user || "demo"; }; // User Reference or null
export const firebaseID         = () => { return user.uid  || "demo" ; };
export const profileURL         = () => { return user.photoURL || '/images/manifest/icon-48x48.png'; }; 
export const userName           = () => { return user.displayName || ''; };
export const userEmail          = () => { return user.email || ''; };
export const anonUser           = () => { return user.isAnonymous || ''; };
*/










// window.onerror = function(message, file, line, col, error){ console.log(arguments); }


// by destructuring assignment
/*
// export const runList      = () => { firebase.auth().onAuthStateChanged( (firebaseUser) => { if (firebaseUser) { store.dispatch(setList(firebaseUser)); } else { store.dispatch(setList(firebaseUser)); } }); };
export const runFirebase  = () => { onAuthStateChanged( auth, ) => {
  (firebaseUser: boolean) => {
                                    if (firebaseUser) { store.dispatch(setAuth(true)); store.dispatch(setUser(firebaseUser)); }
                                    else { store.dispatch(setAuth(false)); store.dispatch(setUser(firebaseUser)); }
                                  }); };
*/         
// export const storageRef   = () => { return firebase.storage.ref(); }




/*

// MESSAGE TOKEN
getIdToken(messaging, { vapidKey: 'BAz2eUmJrgElexalB5GmQOXLxZ7yJC2Jp69fsUfnYM73hfGIhWkRxPi5PgRXr5oEWJ0yvJlQ7GVFGYP3AiIigl4' })
.then( (currentToken:any) => {

  if (currentToken)  {
    let created : any = currentToken;
    store.dispatch(messageId(created));
    let docSnap : any = doc( auth, 'users', firebaseID() )
     // console.log('Current Token: ', currentToken);
     // logEvent(analytics, 'active_msg_token');

  } else {
    console.log('No Instance ID token available.');
    // logEvent(analytics, 'no_msg_token');
  }

}).catch( (err:Error) => { console.log('An error occurred while retrieving token. ', err); });





export const saveMessage  = (messageText:string) => {
  return firebase.firestore().collection('feedback')
  .add({
    name: userName(),
    text: messageText,
    profilePicUrl: profileURL(),
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  }).catch( (error) => { console.error('Error writing new message to Firebase Database', error); });

};
export const loadMessages = () => {
    // Create the query to load the last 12 messages and listen for new ones.
    const query = firebase.firestore().collection('messages').orderBy('timestamp', 'desc').limit(12);
    // Start listening to the query.
    query.onSnapshot( (snapshot) => {
      snapshot.docChanges().forEach( (change) => {
        if (change.type === 'removed') {
          // deleteMessage(change.doc.id);
        } else {
          var message = change.doc.data();
          console.log(change.doc.id, message.timestamp, message.name, message.text, message.profileURL, message.imageUrl);
        }
      });
    });
};

export const saveImage = () => {
  // 1 - We add a message with a loading icon that will get updated with the shared image.
  firebase.firestore().collection('messages').add({
    name: userName(),
    imageUrl: LOADING_IMAGE_URL,
    profilePicUrl: profileURL(),
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  }).then( (messageRef:string) => {
    // 2 - Upload the image to Cloud Storage.
    const filePath = firebase.auth().currentUser.uid + '/' + messageRef.id + '/' + file.name;
    return firebase.storage().ref(filePath).put(file).then( (fileSnapshot) => {
      // 3 - Generate a public URL for the file.
      return fileSnapshot.ref.getDownloadURL().then((url) => {
        // 4 - Update the chat message placeholder with the image’s URL.
        return messageRef.update({
          imageUrl: url,
          storageUri: fileSnapshot.metadata.fullPath
        });
      });
    });
  }).catch( (error) => { console.error('There was an error uploading a file to Cloud Storage:', error); });
};


*/













/*

applyActionCode(auth, oobCode)	// Applies a verification code sent to the user by email or other out-of-band mechanism.
beforeAuthStateChanged(auth, callback, onAbort)	// Adds a blocking callback that runs before an auth state change sets a new user.
checkActionCode(auth, oobCode)	// Checks a verification code sent to the user by email or other out-of-band mechanism.
confirmPasswordReset(auth, oobCode, newPassword)	// Completes the password reset process, given a confirmation code and new password.
connectAuthEmulator(auth, url, options)	// Changes the Auth instance to communicate with the Firebase Auth Emulator, instead of production Firebase Auth services.
createUserWithEmailAndPassword(auth, email, password)	// Creates a new user account associated with the specified email address and password.
fetchSignInMethodsForEmail(auth, email)	// Gets the list of possible sign in methods for the given email address. This method returns an empty list when Email Enumeration Protection is enabled, irrespective of the number of authentication methods available for the given email.
getMultiFactorResolver(auth, error)	// Provides a MultiFactorResolver suitable for completion of a multi-factor flow.
getRedirectResult(auth, resolver)	// Returns a UserCredential from the redirect-based sign-in flow.
initializeRecaptchaConfig(auth)	// Loads the reCAPTCHA configuration into the Auth instance.
isSignInWithEmailLink(auth, emailLink)	// Checks if an incoming link is a sign-in with email link suitable for signInWithEmailLink().
onAuthStateChanged(auth, nextOrObserver, error, completed)	// Adds an observer for changes to the user's sign-in state.
onIdTokenChanged(auth, nextOrObserver, error, completed)	// Adds an observer for changes to the signed-in user's ID token.
revokeAccessToken(auth, token)	// Revokes the given access token. Currently only supports Apple OAuth access tokens.
sendPasswordResetEmail(auth, email, actionCodeSettings)	// Sends a password reset email to the given email address. This method does not throw an error when there's no user account with the given email address and Email Enumeration Protection is enabled.
sendSignInLinkToEmail(auth, email, actionCodeSettings)	// Sends a sign-in email link to the user with the specified email.
setPersistence(auth, persistence)	// Changes the type of persistence on the Auth instance for the currently saved Auth session and applies this type of persistence for future sign-in requests, including sign-in with redirect requests.
signInAnonymously(auth)	Asynchronously // signs in as an anonymous user.
signInWithCredential(auth, credential)	// Asynchronously signs in with the given credentials.
signInWithCustomToken(auth, customToken)	// Asynchronously signs in using a custom token.
signInWithEmailAndPassword(auth, email, password)	// Asynchronously signs in using an email and password.
signInWithEmailLink(auth, email, emailLink)	// Asynchronously signs in using an email and sign-in email link.
signInWithPhoneNumber(auth, phoneNumber, appVerifier)	// Asynchronously signs in using a phone number.
signInWithPopup(auth, provider, resolver)	// Authenticates a Firebase client using a popup-based OAuth authentication flow.
signInWithRedirect(auth, provider, resolver)	// Authenticates a Firebase client using a full-page redirect flow.
signOut(auth)	//  Signs out the current user.
updateCurrentUser(auth, user)	// Asynchronously sets the provided user as Auth.currentUser on the Auth instance.
useDeviceLanguage(auth)	// Sets the current language to the default device/browser preference.
validatePassword(auth, password)	// Validates the password against the password policy configured for the project or tenant.
verifyPasswordResetCode(auth, code)	// Checks a password reset code sent to the user by email or other out-of-band mechanism.

*/