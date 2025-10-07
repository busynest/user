import {
  isSignInWithEmailLink,
  signInAnonymously,
  signInWithCredential,
  signInWithCustomToken,
  signInWithEmailAndPassword,
  signInWithEmailLink,
  signInWithPhoneNumber,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  updateCurrentUser,
  verifyPasswordResetCode,
  sendEmailVerification
} from "firebase/auth";

import { auth, user } from "../firebase/authentication";

interface baseVerify {
  verifyPasswordResetCode : any,
  emailVerification: any
}

interface baseLogin {
  signOut : any,
  isSignInWithEmailLink : any,
  signInWithEmailAndPassword : any,
  signInWithPopup : any,
  signInWithRedirect : any,
  signInAnonymously : any,
  signInWithCustomToken : any,
  signInWithEmailLink : any,
  signInWithPhoneNumber : any,
  signInWithCredential : any,
  updateCurrentUser : any
}

export const authVerify : baseVerify = {
  verifyPasswordResetCode: {
    description: "Verifies a password reset code sent to the user.",
    action: (code:any) => verifyPasswordResetCode(auth, code)
      .then(email => ({ email }))
      .catch(error => ({ error: error.code, message: error.message }))
  },

  // Email Verification
  emailVerification: {
    description: "Sends an email verification to the current user.",
    action: () => { if (user) { sendEmailVerification(user) 
      .then(() => ({ success: true }))
      .catch((error:any) => ({ error: error.code, message: error.message }))
    } }
  }

}
export const authLogin : baseLogin = {
  
  isSignInWithEmailLink: {
    description: "Checks if a link is a valid sign-in with email link.",
    action: (link:any) => isSignInWithEmailLink(auth, link)
  },

  signInWithEmailAndPassword: {
    description: "Signs in a user with email and password.",
    action: (email:string, password:string) => signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => ({ user: userCredential.user }))
      .catch(error => ({ error: error.code, message: error.message }))
  },
  signInWithPopup: {
    description: "Signs in a user via a popup with a federated provider (e.g., Google, Facebook).",
    action: (provider:any) => signInWithPopup(auth, provider)
      .then(result => ({ user: result.user }))
      .catch(error => ({ error: error.code, message: error.message }))
  },
  signInWithRedirect: {
    description: "Signs in a user via redirect with a federated provider.",
    action: (provider:any) => signInWithRedirect(auth, provider)
      .catch(error => ({ error: error.code, message: error.message }))
  },

  signInAnonymously: {
    description: "Signs in a user anonymously without credentials.",
    action: () => signInAnonymously(auth)
      .then(userCredential => ({ user: userCredential.user }))
      .catch(error => ({ error: error.code, message: error.message }))
  },
  signInWithCustomToken: {
    description: "Signs in a user with a custom token from an external auth system.",
    action: (token:any) => signInWithCustomToken(auth, token)
      .then(userCredential => ({ user: userCredential.user }))
      .catch(error => ({ error: error.code, message: error.message }))
  },
  signInWithEmailLink: {
    description: "Signs in a user with an email link.",
    action: (email:string, link:any) => signInWithEmailLink(auth, email, link)
      .then(userCredential => ({ user: userCredential.user }))
      .catch(error => ({ error: error.code, message: error.message }))
  },
  signInWithPhoneNumber: {
    description: "Signs in a user with a phone number and verification code.",
    action: (phoneNumber: any, appVerifier: any) => signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then(confirmationResult => ({ confirmationResult }))
      .catch(error => ({ error: error.code, message: error.message }))
  },
  signInWithCredential: {
    description: "Signs in a user with a credential object (e.g., from OAuth).",
    action: (credential:any) => signInWithCredential(auth, credential)
      .then(userCredential => ({ user: userCredential.user }))
      .catch(error => ({ error: error.code, message: error.message }))
  },

  // User Management
  updateCurrentUser: {
    description: "Updates the current user with a new User object.",
    action: () => updateCurrentUser(auth, user)
      .then(() => ({ success: true }))
      .catch(error => ({ error: error.code, message: error.message }))
  },

  // Sign-Out
  signOut: {
    description: "Signs out the current user.",
    action: () => signOut(auth)
      .then(() => ({ success: true }))
      .catch(error => ({ error: error.code, message: error.message }))
  }

}



























/*

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










  /*
    // setPersistence,
    // useDeviceLanguage,

    sendSignInLinkToEmail : any,
    setPersistence : any,
    useDeviceLanguage : any,
    validatePassword : any,
    handleRecoverEmail:any
  */

/*
  setPersistence: {
    description: "Sets the persistence mechanism for auth state.",
    example: (persistence:any) => setPersistence(auth, persistence)
      .then(() => ({ success: true }))
      .catch(error => ({ error: error.code, message: error.message }))
  },
  useDeviceLanguage: {
    description: "Sets the auth instance language to the device's language.",
    example: () => useDeviceLanguage(auth)
  },
  */






  /*
  useEmulator: {
    description: "Configures the auth instance to use the Firebase emulator.",
    example: (url) => useEmulator(auth, url)
  }
};

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
});*/