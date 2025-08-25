
/*
import {

  messageId
} from '../settings/account-redux';


// Firebase Implemination for Messaging
// let created: string = ""; // Message Token

// Integration

/*
// MESSAGING -----------------------------------------------------

export let messaging : any;

// START GET TOKEN  -----------------------------------------------------
getToken(messaging, { vapidKey: 'BAz2eUmJrgElexalB5GmQOXLxZ7yJC2Jp69fsUfnYM73hfGIhWkRxPi5PgRXr5oEWJ0yvJlQ7GVFGYP3AiIigl4' })
  .then((currentToken) => {
    if (currentToken) {
      console.log('Token retrieved:', currentToken);
      created = currentToken;
      store.dispatch(messageId(created));
      // 
    } else {
      console.log('No registration token available. Request permission to generate one.');
      // Show permission UI
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // ...
  });

// Listen for messages when the app is in the foreground
onMessaee(messaging, (payload) => {
  console.log('Message received. ', payload);
  // setDoc( doc( db, 'contractors', payload.userID, 'messages', user.uid ), { messageToken: payload });
});

store.dispatch(messengerState(true));

// END GET TOKEN  -----------------------------------------------------

const checkFirebaseMessagingSupport = async () => {
  // Check for Service Worker support
  if ('serviceWorker' in navigator) {
    console.log('Service Worker is supported');
  } else {
    console.log('Service Worker is not supported');
    return false;
  }

  // Check for Push API support
  if ('PushManager' in window) {
    console.log('Push API is supported');
  } else {
    console.log('Push API is not supported');
    return false;
  }

  // Check if Firebase Messaging is supported
  try {
    const messagingSupported = await isSupported();
    if (messagingSupported) {
      // Initialize Firebase Messaging here if needed
      messaging = getMessaging(app);
      console.log('Firebase Messaging is supported');
      setTimeout(() => { setupNotifications(); }, 3000);
      return true;
    } else {
      console.log('Firebase Messaging is not supported');
      return false;
    }
  } catch (error) {
    console.error('Error checking Firebase Messaging support', error);
    return false;
  }
}

// Call the function to check for support
checkFirebaseMessagingSupport().then((isSupported) => {
  if (isSupported) {
    console.log('Firebase Messaging can be initialized');
  } else {
    console.log('Firebase Messaging cannot be initialized');
  }
});

// END MESSAGING ----------------------------------------------------- 

*/

/*
  // Sign in using Email and Password
  private async signIn(e: Event) {

    e.preventDefault();

    let email:any = this.shadowRoot!.querySelector('.existingEmail')!;
    console.log(email);
    let password:any = this.shadowRoot!.querySelector('.existingSignal')!;

    console.log('sign in button function');



    // await signInWithEmailAndPassword(auth, email, password);
    const authCredential = EmailAuthProvider.credential(email, password);
    await signInWithCredential(auth, authCredential);  
    // EmailAuthProvider.credential(email, password);

  }
*/




























// Dynamically import Firebase from CDN//  const firebaseApp: any = await import('https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js');
// const firebaseAuth = await import('https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js');
// import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js'

// If you enabled Analytics in your project, add the Firebase SDK for Google Analytics
// import { getAnalytics } from 'https://www.gstatic.com/firebasejs/12.1.0/firebase-analytics.js'

// Add Firebase products that you want to use
// import { getAuth } from 'https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js'
// import { getFirestore } from 'https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js'



/*
// Module Declaration Exact NameSpace Reference - Firebase Function
export const signUp = (email:any, password:any) => {

  createUserWithEmailAndPassword(auth, email.value, password.value)
  .then( () => { /*logAccount();*} )
  // .then( this.gtag_report_conversion(window.location) ); // Conversion Analytics
  .catch( (error:any) => { console.log( "error: ", error ); });

}

// Module Declaration Exact NameSpace Reference - Firebase Function
export const signIn = (email:string, password:string) => {

  console.log(email);
  signInWithEmailAndPassword(auth, email, password)
  .catch( (error:any) => { console.log( "error: ", error ); });

}
*/




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













