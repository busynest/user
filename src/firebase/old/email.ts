 // import { createUserWithEmailAndPassword, sendEmailVerification, updateEmail } from "firebase/auth";
 // import { auth, logAccount, user } from "./initialize";
/*
// Create New Account using Email and Password
export const createEmailAccount = async (email:any, password:any) => {
    
  await createUserWithEmailAndPassword(auth, email, password)
  
  .then((userCredential) => {
    console.log("User created: ", userCredential.user);
    // User created
    const user = userCredential.user;
    // Send email verification
    sendEmailVerification(user)
      .then(() => {
        // Email verification sent
        console.log("Verification email sent.");
      });
    
  }).then( () => { logAccount(); }  );

}


 // Verify Email
export const verifyEmail = async (getState:any) => {
  
  if ( getState().account!.email  === 'introduction' ) {  }

  await sendEmailVerification(auth, user)
    .then   ( (userCredential) => { console.log(userCredential, "Email Verification successful!");})
    .catch  ( (error: object) => { alertEmail(error); console.error('Error writing new message to Firebase Database', error); });

}


  // Update email
export const alertEmail = async (error:any) => { console.log( 'Problem: ' + error );/* if (this._user) { this.updateEmail(); } else { alert('Please Login'); }  }
export const updateEmailAddress = async (email:any) => {

  // Reference the current user
  // const user:any = firebase.auth().currentUser;

  updateEmail  ( user, email.value )
    .then         ( () => { console.log("Email update successful!" ); })
    .catch        ( (error: object) => {alertEmail(error); console.error('Error writing new message to Firebase Database', error); });
  
  // To Do Redux + Database updae

  sendEmailVerification(user)
    .then   ( () => { console.log("Email Verification successful!");})
    .catch  ( (error: object) => { alertEmail(error); console.error('Error writing new message to Firebase Database', error); });
}

*/



























// Duplicate

/*
// Save Email
export const saveEmail = async () => {
  if ( user ) {

    let contactMail :any = this.shadowRoot?.querySelector('contact-email');
    let document    :any = doc( db, 'users', user.uid );
    
    await updateEmail( auth.currentUser, contactMail.email ).then(() => updateDoc( document, { "contractorEmail":contactMail.email } ).catch(e=>console.log(e)) ).catch((error:Error) => { console.log(error); });
    store.dispatch( businessEmail(contactMail.email) ); // Redux Account Update
    console.log('good');

    emailVerification();
    alert('Email Updated');
  }
}

// Email Verification  
export const emailVerification = () =>{

  // const auth : any = getAuth();
  console.log( 'auth.currentUser: ', user);

  // Todo: Find Soruce of Dependency
  sendEmailVerification(user)
    .then(() => { console.log('success')
      // Email verification sent!
    }).catch( e => console.log(e) );

}
*/





/*
    // Handle email address change revocations
    _handleRecoverEmail(auth, actionCode, lang) {
      // Localize the UI to the selected language as determined by the lang parameter.
      const restoredEmail = null;
      // Confirm the action code is valid.
      auth.checkActionCode(actionCode)
        // Get the restored email address.
        .then( (info) => { restoredEmail = info['data']['email'];
        // Revert to the old email.
        return auth.applyActionCode(actionCode);
      }).then( () => {
        // Account email reverted to restoredEmail
        // TODO: Display a confirmation message to the user.
        // You might also want to give the user the option to reset their password
        auth.sendPasswordResetEmail(restoredEmail).then( () => {
          // Password reset confirmation sent. Ask user to check their email.
        }).catch( (error) => {
          // Error encountered while sending password reset code.
        });
      }).catch( (error) => {
        // Invalid code.
      });
    }
  
  */