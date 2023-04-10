

import { store }                        from './store';
import { setAuth }             from './user-action';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, getRedirectResult, onAuthStateChanged, signInAnonymously, signInWithEmailAndPassword, signInWithRedirect, signOut }           from 'firebase/auth';
// import { doc } from 'firebase/firestore';

export const auth : any = getAuth();
export const authUser : any = auth.currentUser;
       
export const firebaseUser = () => { return auth.currentUser || "demo"; };
export const firebaseID   = () => { return auth.currentUser.uid  || "demo" ; };

export const authChange   = () => { return onAuthStateChanged( auth, () => (firebaseUser: boolean) => { if(firebaseUser) {store.dispatch( setAuth(true) )} else{store.dispatch( setAuth(false) )} });};
export const logOut       = () => { return signOut(auth); };

export const profileURL   = () => { return auth.currentUser.photoURL || '/images/manifest/icon-48x48.png'; }; 
export const userName     = () => { return auth.currentUser.displayName; };
export const userEmail    = () => { return auth.currentUser.email; };

export const deleteUser   = () => { return auth.currentUser.delete() }; /* .then( () => { }).catch( () => { }) */
// export const deleteDoc    = (collect:string, item:string) => { return doc(auth, collect, item).delete() };

export const signUp = (email:any, password:any) => {
  createUserWithEmailAndPassword(auth, email.value, password.value)
  .then( () => { /*logAccount();*/ } )
  // .then( this.gtag_report_conversion(window.location) );
  .catch( (error:any) => { console.log( "error: ", error ); });
}

export const signIn = (email:any, password:any) => {
  signInWithEmailAndPassword(auth, email.value, password.value)
  .catch( (error:any) => { console.log( "error: ", error ); });
}

// Short-circuit evaluation
// export const firebaseUser   = () => { return getAuth().currentUser || "demo" ; };
// export const anonUser       = () => { return getAuth().isAnonymous; };
// window.onerror = function(message, file, line, col, error){ console.log(arguments); }

export const anon_SignIn = async () => {

  signInAnonymously(auth)
  .then(() => { })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
  });

}

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