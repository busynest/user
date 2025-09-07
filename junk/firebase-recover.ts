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



interface base3 {
}

interface base2 {
// isSignInWithEmailLink : any,
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

export const recoverEmail = (/*auth,*/ actionCode:any, lang:any) => {
  
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
    }).catch((error:FirebaseError) => {
      // Error encountered while sending password reset code.
    });
  }).catch((error:FirebaseError) => {
    // Invalid code.
  });
//},
}
