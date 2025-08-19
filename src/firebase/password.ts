import { sendPasswordResetEmail, updatePassword } from "firebase/auth";
import { user } from "./start";

// Update Password
export const updatePass = async (newPassword:any) =>{

  if (user) {

    // Update new password
    await updatePassword ( user, newPassword.value )
      .then           ( () => { console.log("Password successful!"); })
      .catch          ( (error: Error) => { console.log("Problem: "+ error.messge) }); //alertPassword(error); });

  } else { alert('Please Login'); }

}

// Reset Password Email
export const restPasswordcode = async () => {

  let x:any = document!.querySelector('.resetEmail')!
  let email = x.value;

  await sendPasswordResetEmail( email, email )
  .catch( (error:any) => { console.log(error); } );

}

  /*
let actionCodeSettings = {
  url: 'https://www.contractorscentre.com',
  handleCodeInApp: true
};

  _handleResetPassword(auth, actionCode, continueUrl, lang) {
      // Localize the UI to the selected language as determined by the lang parameter.
      // const accountEmail;
      // Verify the password reset code is valid.
      auth.verifyPasswordResetCode(actionCode).then( (email) => {
        const accountEmail = email;
        // TODO: Show the reset screen with the user's email and ask the user for the new password.
        // Save the new password.
        auth.confirmPasswordReset(actionCode, newPassword).then( (resp) => {
          // Password reset has been confirmed and new password updated.
  
          // TODO: Display a link back to the app, or sign-in the user directly
          // if the page belongs to the same domain as the app:
          // auth.signInWithEmailAndPassword(accountEmail, newPassword);
    
          // TODO: If a continue URL is available,
          // display a button which on click redirects the user back to the app
          // via continueUrl with additional state determined from that URL's parameters.
        }).catch( (error) => {
          // Error occurred during confirmation. The code might have expired or the password is too weak.
        });
      }).catch( (error) => {
        // Invalid or expired action code. Ask user to try to reset the password again.
      });
    }
*/