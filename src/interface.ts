import { applyActionCode, beforeAuthStateChanged, checkActionCode, confirmPasswordReset, createUserWithEmailAndPassword, fetchSignInMethodsForEmail, getRedirectResult, isSignInWithEmailLink, onAuthStateChanged, onIdTokenChanged, sendPasswordResetEmail, setPersistence, signInAnonymously, signInWithCredential, signInWithCustomToken, signInWithEmailAndPassword, signInWithEmailLink, signInWithPhoneNumber, signInWithPopup, signInWithRedirect, signOut, updateCurrentUser, useDeviceLanguage, UserCredential, verifyPasswordResetCode } from "firebase/auth";
import { auth } from "./start";
import { FirebaseError } from "firebase/app";

interface base {
  
applyActionCode : any,
beforeAuthStateChanged : any,
checkActionCode : any,
confirmPasswordReset : any,
connectAuthEmulator : any,
createUserWithEmailAndPassword : any,
fetchSignInMethodsForEmail : any,
getMultiFactorResolver : any,
getRedirectResult : any,
initializeRecaptchaConfig : any,
isSignInWithEmailLink : any,
onAuthStateChanged : any,
onIdTokenChanged : any,
revokeAccessToken : any,
sendPasswordResetEmail : any,
sendSignInLinkToEmail : any,
setPersistence : any,
signInAnonymously : any,
signInWithCredential : any,
signInWithCustomToken : any,
signInWithEmailAndPassword : any,
signInWithEmailLink : any,
signInWithPhoneNumber : any,
signInWithPopup : any,
signInWithRedirect : any,
signOut : any,
updateCurrentUser : any,
useDeviceLanguage : any,
validatePassword : any,
verifyPasswordResetCode : any,
handleRecoverEmail:any,
sendEmailVerification: any
}

/*

// Checks
applyActionCode(auth, oobCode)	// Applies a verification code sent to the user by email or other out-of-band mechanism.
checkActionCode(auth, oobCode)	// Checks a verification code sent to the user by email or other out-of-band mechanism.
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

// Sign in-out
isSignInWithEmailLink(auth, emailLink)	// Checks if an incoming link is a sign-in with email link suitable for signInWithEmailLink().
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

// Verify
updateCurrentUser(auth, user)	// Asynchronously sets the provided user as Auth.currentUser on the Auth instance.
useDeviceLanguage(auth)	// Sets the current language to the default device/browser preference.
validatePassword(auth, password)	// Validates the password against the password policy configured for the project or tenant.
verifyPasswordResetCode(auth, code)	// Checks a password reset code sent to the user by email or other out-of-band mechanism.

*/





// List of Firebase Authentication functions with descriptions
export const authFunctions : base = {

  // Applies a verification code
  applyActionCode: {
    description: "Applies an out-of-band verification code (e.g., email verification).",
    example: (oobCode:any) => applyActionCode(auth, oobCode)
      .then(() => ({ success: true }))
      .catch( (error:FirebaseError) => ({ error: error.code, message: error.message }))
  },

  // Checks a verification code
  checkActionCode: {
    description: "Checks the metadata of an out-of-band verification code.",
    example: (code:any) => checkActionCode(auth, code)
      .then( (info:any) => ({ info }))
      .catch((error:FirebaseError) => ({ error: error.code, message: error.message }))
  },

  // Adds a blocking call
  beforeAuthStateChanged: {
    description:'Adds a blocking callback that runs before an auth state change sets a new user.',
    code: (callback:any, onAbort:any) => beforeAuthStateChanged(auth, callback, onAbort)
  },

  confirmPasswordReset: {
    description: "Completes the password reset process with a code and new password.",
    example: (code:any, newPassword:string) => confirmPasswordReset(auth, code, newPassword)
      .then(() => ({ success: true }))
      .catch( (error:FirebaseError) => ({ error: error.code, message: error.message }))
  },

  connectAuthEmulator:{},

  // User Creation and Sign-In
  createUserWithEmailAndPassword: {
    description: "Creates a new user account with email and password, and signs them in.",
    example: (email:any, password:any) => createUserWithEmailAndPassword(auth, email, password)
      .then( (userCredential:UserCredential) => ({ user: userCredential.user }))
      .catch( (error:FirebaseError) => ({ error: error.code, message: error.message }))
  },

    // Utility
  fetchSignInMethodsForEmail: {
    description: "Gets the list of sign-in methods for a given email.",
    example: (email:string) => fetchSignInMethodsForEmail(auth, email)
      .then( (methods:any) => ({ methods }))
      .catch( (error:FirebaseError) => ({ error: error.code, message: error.message }))
  },

  getMultiFactorResolver:{},

  getRedirectResult: {
    description: "Retrieves the result of a redirect-based sign-in flow.",
    example: () => getRedirectResult(auth)
      .then( (result) => ({ user: result.user }))
      .catch( (error:FirebaseError) => ({ error: error.code, message: error.message }))
  },

  initializeRecaptchaConfig:{},

  isSignInWithEmailLink: {
    description: "Checks if a link is a valid sign-in with email link.",
    example: (link) => isSignInWithEmailLink(auth, link)
  },

  // Authentication State
  onAuthStateChanged: {
    description: "Listens for changes in the authentication state.",
    example: (callback) => onAuthStateChanged(auth, callback)
  },

  // Sign-Out
  signOut: {
    description: "Signs out the current user.",
    example: () => signOut(auth)
      .then(() => ({ success: true }))
      .catch(error => ({ error: error.code, message: error.message }))
  },


  onIdTokenChanged: {
    description: "Listens for changes in the ID token.",
    example: (callback) => onIdTokenChanged(auth, callback)
  },

  handleRecoverEmail(/*auth,*/ actionCode:any, lang:any) {
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
    }).catch((error:FirebaseError) => {
      // Error encountered while sending password reset code.
    });
  }).catch((error:FirebaseError) => {
    // Invalid code.
  });
},


  signInWithEmailAndPassword: {
    description: "Signs in a user with email and password.",
    example: (email:string, password:string) => signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => ({ user: userCredential.user }))
      .catch(error => ({ error: error.code, message: error.message }))
  },
  signInWithPopup: {
    description: "Signs in a user via a popup with a federated provider (e.g., Google, Facebook).",
    example: (provider) => signInWithPopup(auth, provider)
      .then(result => ({ user: result.user }))
      .catch(error => ({ error: error.code, message: error.message }))
  },
  signInWithRedirect: {
    description: "Signs in a user via redirect with a federated provider.",
    example: (provider) => signInWithRedirect(auth, provider)
      .catch(error => ({ error: error.code, message: error.message }))
  },

  signInAnonymously: {
    description: "Signs in a user anonymously without credentials.",
    example: () => signInAnonymously(auth)
      .then(userCredential => ({ user: userCredential.user }))
      .catch(error => ({ error: error.code, message: error.message }))
  },
  signInWithCustomToken: {
    description: "Signs in a user with a custom token from an external auth system.",
    example: (token) => signInWithCustomToken(auth, token)
      .then(userCredential => ({ user: userCredential.user }))
      .catch(error => ({ error: error.code, message: error.message }))
  },
  signInWithEmailLink: {
    description: "Signs in a user with an email link.",
    example: (email:string, link) => signInWithEmailLink(auth, email, link)
      .then(userCredential => ({ user: userCredential.user }))
      .catch(error => ({ error: error.code, message: error.message }))
  },
  signInWithPhoneNumber: {
    description: "Signs in a user with a phone number and verification code.",
    example: (phoneNumber, appVerifier) => signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then(confirmationResult => ({ confirmationResult }))
      .catch(error => ({ error: error.code, message: error.message }))
  },
  signInWithCredential: {
    description: "Signs in a user with a credential object (e.g., from OAuth).",
    example: (credential) => signInWithCredential(auth, credential)
      .then(userCredential => ({ user: userCredential.user }))
      .catch(error => ({ error: error.code, message: error.message }))
  },

  // User Management
  updateCurrentUser: {
    description: "Updates the current user with a new User object.",
    example: (user) => updateCurrentUser(auth, user)
      .then(() => ({ success: true }))
      .catch(error => ({ error: error.code, message: error.message }))
  },

  // Password Management
  sendPasswordResetEmail: {
    description: "Sends a password reset email to the user.",
    example: (email:string) => sendPasswordResetEmail(auth, email)
      .then(() => ({ success: true }))
      .catch(error => ({ error: error.code, message: error.message }))
  },

  verifyPasswordResetCode: {
    description: "Verifies a password reset code sent to the user.",
    example: (code) => verifyPasswordResetCode(auth, code)
      .then(email => ({ email }))
      .catch(error => ({ error: error.code, message: error.message }))
  },

  // Email Verification
  sendEmailVerification: {
    description: "Sends an email verification to the current user.",
    example: (user) => user.sendEmailVerification()
      .then(() => ({ success: true }))
      .catch(error => ({ error: error.code, message: error.message }))
  },







  setPersistence: {
    description: "Sets the persistence mechanism for auth state.",
    example: (persistence) => setPersistence(auth, persistence)
      .then(() => ({ success: true }))
      .catch(error => ({ error: error.code, message: error.message }))
  },
  useDeviceLanguage: {
    description: "Sets the auth instance language to the device's language.",
    example: () => useDeviceLanguage(auth)
  },/*
  useEmulator: {
    description: "Configures the auth instance to use the Firebase emulator.",
    example: (url) => useEmulator(auth, url)
  }
};*/

// Handle messages from the main script
self.onmessage = (event) => {
  const { action, data } = event.data;

  // Execute the requested authentication function
  if (action === 'executeAuthFunction' && authFunctions[data.functionName]) {
    authFunctions[data.functionName].example(...(data.args || []))
      .then(result => self.postMessage({ status: 'success', result }))
      .catch(error => self.postMessage({ status: 'error', error }));
  } else {
    self.postMessage({ status: 'error', error: 'Invalid function or request' });
  }
};

// Export the auth functions list for reference
self.postMessage({
  status: 'init',
  authFunctions: Object.keys(authFunctions).map(key => ({
    name: key,
    description: authFunctions[key].description
  }))
});