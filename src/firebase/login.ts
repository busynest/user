import { createUserWithEmailAndPassword, EmailAuthProvider, sendEmailVerification, signInAnonymously, signInWithCredential } from "firebase/auth";
import { auth, logAccount } from "./start";

// Sign in using Email and Password
export const signIn = async (email:any, password:any) => {

  const authCredential = EmailAuthProvider.credential(email, password);

  await signInWithCredential(auth, authCredential).then((credentials)=>{console.log(credentials)}).catch((error)=>{console.log(error)});  

  // await signInWithEmailAndPassword(auth, email, password);
  // EmailAuthProvider.credential(email, password);

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


// Create New Account using Email and Password
export const signUp = async (email:any, password:any) => {
    
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


/*
// Module Declaration Exact NameSpace Reference - Asynchronous Firebase Function
export const google_SignIn = async () => {

  const provider:any = new GoogleAuthProvider();
  provider.addScope('profile');
  provider.addScope('email');

  signInWithRedirect(auth, provider);

  const credential = GoogleAuthProvider.credential(
    googleUser.getAuthResponse().id_token
  );
  const result = await signInWithCredential(auth, credential);

  getRedirectResult(auth)
    .then( (result: any) => {
    if (result.credential) { /*Access Token to access Google API 
    const token = result.credential.accessToken; console.log("Google Token", token); }
    // The signed-in user info.
    // const firebaseUser = result.firebaseUser;
  }).catch( (error:any) => { console.log('Sign in error: ', error); } );

  // GoogleCredential credential = new GoogleCredential().setAccessToken(accessToken);

};

*/