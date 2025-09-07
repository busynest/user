import {
  applyActionCode,
  beforeAuthStateChanged,
  checkActionCode,
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  getRedirectResult,
  onAuthStateChanged,
  onIdTokenChanged,
  sendPasswordResetEmail,
  UserCredential
} from "firebase/auth";

import { auth } from "./start";
import { FirebaseError } from "firebase/app";

interface base {
  applyActionCode : any, // applyActionCode(auth, oobCode)	// Applies a verification code sent to the user by email or other out-of-band mechanism.
  checkActionCode : any, // checkActionCode(auth, oobCode)	// Checks a verification code sent to the user by email or other out-of-band mechanism.
  beforeAuthStateChanged : any,
  confirmPasswordReset : any,
  sendPasswordResetEmail : any,
  connectAuthEmulator : any,
  createUserWithEmailAndPassword : any,
  fetchSignInMethodsForEmail : any,
  getMultiFactorResolver : any,
  getRedirectResult : any,
  initializeRecaptchaConfig : any,
  onAuthStateChanged : any,
  onIdTokenChanged : any,
  revokeAccessToken : any
}

// List of Firebase Authentication functions with descriptions
export const authFunctions : base = {

  // 1. Applies a verification code
  applyActionCode: {
    description: "Applies an out-of-band verification code (e.g., email verification).",
    action: (oobCode:any) => applyActionCode(auth, oobCode)
      .then(() => ({ success: true }))
      .catch( (error:FirebaseError) => ({ error: error.code, message: error.message }))
  },

  // 2. Checks a verification code
  checkActionCode: {
    description: "Checks the metadata of an out-of-band verification code.",
    action: (code:any) => checkActionCode(auth, code)
      .then( (info:any) => ({ info }))
      .catch((error:FirebaseError) => ({ error: error.code, message: error.message }))
  },

  // 3. Adds a blocking call
  beforeAuthStateChanged: {
    description:'Adds a blocking callback that runs before an auth state change sets a new user.',
    code: (callback:any, onAbort:any) => beforeAuthStateChanged(auth, callback, onAbort)
  },

  // 4. Confirm Password Reset
  confirmPasswordReset: {
    description: "Completes the password reset process with a code and new password.",
    action: (code:any, newPassword:string) => confirmPasswordReset(auth, code, newPassword)
      .then(() => ({ success: true }))
      .catch( (error:FirebaseError) => ({ error: error.code, message: error.message }))
  },

  // 5. Send Password Reset Email
  sendPasswordResetEmail: {
    description: "Sends a password reset email to the user.",
    action: (email:string) => sendPasswordResetEmail(auth, email)
      .then(() => ({ success: true }))
      .catch(error => ({ error: error.code, message: error.message }))
  },

  // 
  connectAuthEmulator:{},

  // 6. New User via Email and Password
  createUserWithEmailAndPassword: {
    description: "Creates a new user account with email and password, and signs them in.",
    action: (email:any, password:any) => createUserWithEmailAndPassword(auth, email, password)
      .then( (userCredential:UserCredential) => ({ user: userCredential.user }))
      .catch( (error:FirebaseError) => ({ error: error.code, message: error.message }))
  },

  // 7. Utility
  fetchSignInMethodsForEmail: {
    description: "Gets the list of sign-in methods for a given email.",
    action: (email:string) => fetchSignInMethodsForEmail(auth, email)
      .then( (methods:any) => ({ methods }))
      .catch( (error:FirebaseError) => ({ error: error.code, message: error.message }))
  },

  getMultiFactorResolver:{},

  // 8. Flow Based Redirect
  getRedirectResult: {
    description: "Retrieves the result of a redirect-based sign-in flow.",
    action: () => getRedirectResult(auth)
      .then( (result:any) => ({ user: result.user }))
      .catch( (error:FirebaseError) => ({ error: error.code, message: error.message }))
  },

  initializeRecaptchaConfig:{},

  // 9. Authentication State
  onAuthStateChanged: {
    description: "Listens for changes in the authentication state.",
    action: (callback:any) => onAuthStateChanged(auth, callback)
  },

  // 10. Listener for ID changes
  onIdTokenChanged: {
    description: "Listens for changes in the ID token.",
    action: (callback:any) => onIdTokenChanged(auth, callback)
  },

  revokeAccessToken: {}

};




export const recoverEmail = (/*auth,*/ actionCode:any, /*lang:any*/) => {
  
  //handleRecoverEmail(/*auth,*/ actionCode:any, lang:any) {
  // Localize the UI to the selected language as determined by the lang
  // parameter.
  let restoredEmail : any = null;
  // Confirm the action code is valid.
  checkActionCode(auth, actionCode).then((info) => {
    // Get the restored email address.
    restoredEmail = info['data']['email'];

    // Revert to the old email.
    return applyActionCode(auth, actionCode);
  }).then(() => {
    // Account email reverted to restoredEmail

    // TODO: Display a confirmation message to the user.

    // You might also want to give the user the option to reset their password
    // in case the account was compromised:
    sendPasswordResetEmail(auth, restoredEmail).then(() => {
      // Password reset confirmation sent. Ask user to check their email.
    }).catch((error:FirebaseError) => { console.log(error);
      // Error encountered while sending password reset code.
    });
  }).catch((error:FirebaseError) => { console.log(error);
    // Invalid code.
  });
//},
}



































/*

// Checks
beforeAuthStateChanged(auth, callback, onAbort)	// Adds a blocking callback that runs before an auth state change sets a new user.

// Reset
confirmPasswordReset(auth, oobCode, newPassword)	// Completes the password reset process, given a confirmation code and new password.
sendPasswordResetEmail(auth, email, actionCodeSettings)	// Sends a password reset email to the given email address. This method does not throw an error when there's no user account with the given email address and Email Enumeration Protection is enabled.

// More
connectAuthEmulator(auth, url, options)	// Changes the Auth instance to communicate with the Firebase Auth Emulator, instead of production Firebase Auth services.
createUserWithEmailAndPassword(auth, email, password)	// Creates a new user account associated with the specified email address and password.
fetchSignInMethodsForEmail(auth, email)	// Gets the list of possible sign in methods for the given email address. This method returns an empty list when Email Enumeration Protection is enabled, irrespective of the number of authentication methods available for the given email.
getMultiFactorResolver(auth, error)	// Provides a MultiFactorResolver suitable for completion of a multi-factor flow.

getRedirectResult(auth, resolver)	// Returns a UserCredential from the redirect-based sign-in flow.
initializeRecaptchaConfig(auth)	// Loads the reCAPTCHA configuration into the Auth instance.

// Change
onAuthStateChanged(auth, nextOrObserver, error, completed)	// Adds an observer for changes to the user's sign-in state.
onIdTokenChanged(auth, nextOrObserver, error, completed)	// Adds an observer for changes to the signed-in user's ID token.
revokeAccessToken(auth, token)	// Revokes the given access token. Currently only supports Apple OAuth access tokens.

*/