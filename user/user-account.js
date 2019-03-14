//@ts-check

import { html, LitElement, css }        from 'lit-element';
import { connect }                      from 'pwa-helpers/connect-mixin.js';
import { store }                        from '../../store';
import { User }                         from '../../styles/user-account-styles';
import { Settings }                     from '../../styles/user-settings-styles';
import { Section }                      from '../../styles/section';
import { Buttons }                      from '../../styles/buttons';
import { Forms }                        from '../../styles/forms';
import { Fonts }                        from '../../styles/fonts';
import { Show }                         from '../../styles/on_off';
import { close }                        from '../app-elements/icons';
import { setUser, closeSign, setList, updateLogin, setAuth } from '../../user/action/user';

export const authChange   = () => { return firebase.auth().onAuthStateChanged( (firebaseUser) => { if(firebaseUser) {store.dispatch( setAuth(true) )} else{store.dispatch( setAuth(false) )} });}
export const firebaseUser = () => { return firebase.auth().currentUser || "demo"; };
export const firebaseID   = () => { return firebase.auth().currentUser.uid  || "demo" ; };
export const logOut       = () => { return firebase.auth().signOut(); }; /* .then( () => { } ).catch( () => { } ) */
export const isUser       = () => { return !!firebase.auth().currentUser; };
export const profileURL   = () => { return firebase.auth().currentUser.photoURL || '/images/manifest/icon-48x48.png'; }; 
export const userName     = () => { return firebase.auth().currentUser.displayName; };
export const userEmail    = () => { return firebase.auth().currentUser.email; };
export const deleteUser   = () => { return firebase.auth().currentUser.delete() }; /* .then( () => { }).catch( () => { }) */
export const deleteDoc    = (collect, item) => { return firestore.collection(collect).doc(item).delete() };
export const runList      = () => { firebase.auth().onAuthStateChanged( (firebaseUser) => { if (firebaseUser) { store.dispatch(setList(firebaseUser)); } else { store.dispatch(setList(firebaseUser)); } }); };
export const runFirebase  = () => { firebase.auth().onAuthStateChanged( (firebaseUser) => {
                                    if (firebaseUser) { store.dispatch(updateLogin(true)); store.dispatch(setUser(firebaseUser)); }
                                    else { store.dispatch(updateLogin(false)); store.dispatch(setUser(firebaseUser)); }
                                  }); };
export const saveMessage  = (messageText) => {
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
    }).then( (messageRef) => {
      // 2 - Upload the image to Cloud Storage.
      var filePath = firebase.auth().currentUser.uid + '/' + messageRef.id + '/' + file.name;
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
export const deviceToken = () => {
  // Saves the messaging device token to the datastore.
  firebase.messaging().getToken().then( (currentToken) => {
    if (currentToken) {
      console.log('Got FCM device token:', currentToken);
      // Saving the Device Token to the datastore.
      firebase.firestore().collection('fcmTokens').doc(currentToken)
          .set({uid: firebase.auth().currentUser.uid});
    } else {
      // Need to request permissions to show notifications.
      requestNotificationsPermissions();
    }
  }).catch( (error) => { console.error('Unable to get messaging token.', error); });
};

export const signUp = () => {
  const email = this.shadowRoot.getElementById('txtEmail').value;
  const pass  = this.shadowRoot.getElementById('txtPassword').value;
  if (email.length < 4) {
    alert('Please enter an email address.');
    return;
  }
  if (pass.length < 4) {
    alert('Please enter a password.');
    return;
  }
  firebase.auth().createUserWithEmailAndPassword(email, pass).catch( (error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // [START_EXCLUDE]
    if (errorCode == 'auth/weak-password') {
      alert('The password is too weak.');
    } else {
      alert(errorMessage);
    }
    console.log(error);
  });

}

export const anon = () => {
  if (firebase.auth().currentUser) {
    // [START signout]
    firebase.auth().signOut();
    // [END signout]
  } else {
    // [START authanon]
    firebase.auth().signInAnonymously().catch( (error) => {
      // Handle Errors here.
      const errorCode     = error.code;
      const errorMessage  = error.message;
      // [START_EXCLUDE]
      if (errorCode === 'auth/operation-not-allowed') {
        alert('You must enable Anonymous auth in the Firebase Console.');
      } else { console.error(error); }
      // [END_EXCLUDE]
    });
    // [END authanon]
}
};

export const google = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('profile');
  provider.addScope('email');
  firebase.auth().signInWithRedirect(provider);
  firebase.auth().getRedirectResult().then( (result) => {
    if (result.credential) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const token         = result.credential.accessToken; console.log("Google Token");
    }
    // The signed-in user info.
    const firebaseUser            = result.firebaseUser;
  }).catch( (error) => {
    // Handle Errors here.
    const errorCode       = error.code;
    const errorMessage    = error.message;
    // The email of the user's account used.
    const email           = error.email;
    // The firebase.auth.AuthCredential type that was used.
    const credential      = error.credential;
  });
};

export class UserBar extends connect(store)(LitElement) {
  static get properties() {
    return {
      _log:             { type: Boolean }
    };
  }
  constructor() {
    super();
  }

  firstUpdated() {
    // Prevent Form's Page Refresh
    var a = this.shadowRoot.getElementById('logForm');
    a.addEventListener('submit', e => { e.preventDefault(); });
    this.shadowRoot.getElementById('log')           .addEventListener('click', () => { this._signIn() } );
    this.shadowRoot.getElementById('close')         .addEventListener('click', () => { this._close() } );
    this.shadowRoot.getElementById('or')            .addEventListener('click', () => { anon() } );
    this.shadowRoot.getElementById('googleSignIn')  .addEventListener('click', () => { google() } );
    this.shadowRoot.getElementById('leave')         .addEventListener('click', () => { logOut() } );
  }

  _stateChanged(state) {
    this._log = state.user.currentUser;
  }

  _close() {
    store.dispatch(closeSign(false))
  }

  _signIn() {
    var email       = this.shadowRoot.getElementById('txtEmail').value;
    var password    = this.shadowRoot.getElementById('txtPassword').value;

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
    });
  }

  _signUp() {
    var email = this.shadowRoot.getElementById('txtEmail').value;
    var pass  = this.shadowRoot.getElementById('txtPassword').value;
    if (email.length < 4) {
      alert('Please enter an email address.');
      return;
    }
    if (pass.length < 4) {
      alert('Please enter a password.');
      return;
    }
    firebase.auth().createUserWithEmailAndPassword(email, pass).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      // [START_EXCLUDE]
      if (errorCode == 'auth/weak-password') {
        alert('The password is too weak.');
      } else {
        alert(errorMessage);
      }
      console.log(error);

    });
  }

  static get styles() {
    return [
      User,
      Buttons,
      Forms,
      Fonts,
      Show,
      css`
      :host {
        display:              block;
        box-sizing:           border-box;
        position:             fixed;
        right:                0;
        /* box-shadow:           0 0 10px rgba(0, 0, 0, 0.5); */
        text-align:           center;
        will-change:          transform;
        transform:            translate3d(0, -100%, 0);
        transition-property:  visibility, transform;
        transition-duration:  0.2s;
        color:                var(--app-dark-text-color);
        visibility:           hidden;
      }
      :host([active]) {
        visibility:           visible;
        transform:            translate3d(0, 0, 0);
      }
    `]}

  render() {
    return html`

    <!-- Login Wrapper -->
    <div class="log"> 

      <form
        id="logForm"
        class="spec"
        ?on=${ this._log === false }
        autocomplete="on">

        <div class="exit">
          <div></div>
          <h3 id="or">Account</h3>
          <button id="close" class="sign-right">${close}</button>
        </div>

        <label><input   id="txtEmail"      type="email"      placeholder=""  >email</label>
        <label><input   id="txtPassword"   type="Password"   placeholder=""  >password</label>
        <button id="log" class="action-button">Sign in</button>

        <div          class="divide"></div>
          <button     id="googleSignIn" class="google">
            <span     class="icon"></span>
            <span     class="buttonText">Sign in with Google</span>
          </button>
        <div          class="divide"></div>

        <p><a href="/subscribe">create new account</a></p>

      </form>

      <!-- Logged IN -->
      <div class="spec setLog" ?on="${ this._log === true }">
        <p><a href="/business card">Profile</a></p>
        <p><a href="/settings">Settings</a></p>
        <p><a href="/feedback">Feedback</a></p>
        <p><a id="leave" aria-label="log out">log out</a></p>
      </div>

     </div>

    `;
  }
}
window.customElements.define('user-bar', UserBar);

export class UserSettings extends connect(store)(LitElement) {

  static get properties() {
    return {
      person:           { type: String },
      business:         { type: String },
      profile:          { type: String },
      profileTopic:     { type: String },
      baseID:           { type: String },
      phone:            { type: Number },
      stakeholder:      { type: String },
      userMail:         { type: String }
    }
  }

  firstUpdated() {

    // this._getProfile();

    // Prevent Form's Page Refresh
    var a = this.shadowRoot.getElementById('settings');
    a.addEventListener('click', e => { e.preventDefault(); });

    this.shadowRoot.getElementById('save').addEventListener('click',    () => { this._createProfile(); } );
    this.shadowRoot.getElementById('update').addEventListener('click',  () => { this._email(); } );
    this.shadowRoot.getElementById('pass').addEventListener('click',    () => { this._password(); } );
    this.shadowRoot.getElementById('deleteUser').addEventListener('click',  () => { this._startDelete(); } );
/*
    firebase.auth().onAuthStateChanged( (firebaseUser) => {
      if (firebaseUser) {
        // INCLUDE
        this._photoURL = firebaseUser.photoURL;
        if ( this._photoURL === null ) { this._photoURL = '/images/manifest/icon-48x48.png' };
        this.shadowRoot.getElementById('add').removeAttribute('hidden');
      } else {
        // EXCLUDE
        this.shadowRoot.getElementById('add').setAttribute('hidden', true);
      }
    });
*/
  }

  _stateChanged(state) {
    // this.person       = state.user.customer; /** Stakeholder Option */
    // this.profile      = state.user.profile;
    this.profileTopic = state.user.settings;
    // this.userMail     = state.user.setUser.apiKey
  }

  _getProfile() {
    this.userMail         = firebaseUser.email;
    const emailVerified   = firebaseUser.emailVerified;
    
  }

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

  _createProfile() {
    const company             = this.shadowRoot.getElementById('company').value;
    const enroll              = this.shadowRoot.getElementById('who').value;

    firebaseCustomer.doc(this.baseID).set({
      company:             company,
      enrollment:          enroll
      // location:         this.location,
    }).then(function() {
      console.log("Document successfully written!");
    }).catch(function(error) {
      console.error('Error writing new message to Firebase Database', error);
    });
    
  }

  _updateUser() {
    const user          = firebaseUser();
    const company       = this.shadowRoot.getElementById('company').value;
    const phone         = this.shadowRoot.getElementById('phoneNumber').value;
    // const photo         = this.shadowRoot.getElementById('');
    // const document      = this.shadowRoot.getElementById('');
    // DATABASE
    const contractor    = this.shadowRoot.getElementById('contractor').value;

    user.updateProfile({
      displayName: company,
      phoneNumber: phone
      // photoURL: ""
    })
    .then( () => { console.log("User update successful!"); })
    .catch( (error) =>{ console.error('Error writing new message to Firebase Database', error);
    });
    
  }

  _email() {
    const user = firebaseUser();
    const email = this.shadowRoot.getElementById('email').value;

    user.updateEmail(email)
      .then( () => { console.log("Email update successful!"); })
      .catch( (error) => { console.error('Error writing new message to Firebase Database', error);
    });

    user.sendEmailVerification()
    .then( () => { console.log("Email Verification successful!");})
    .catch( (error) => { console.error('Error writing new message to Firebase Database', error);
    });

  }

  _password() {
    const user = firebaseUser();
    const newPassword = this.shadowRoot.getElementById('newPass').value;

    user.updatePassword(newPassword).then(function() {
      console.log("Password successful!");
    }).catch(function(error) {
      console.error('Error writing new message to Firebase Database', error);
    });
  }

  _updatedUser() {
    const name      = firebaseUser.displayName;
    const email     = firebaseUser.email;
    const phone     = firebaseUser.phoneNumber;
    const photo     = firebaseUser.photoURL;
    const document  = firebaseUser.uid;

    firebaseDatabase.collection("users").doc(document).set({
      name:     name,
      email:    email,
      phone:    phone,
      photo:    photo
    }).then(function() {
      console.log(name);
      console.log(email);
      console.log(phone);
      console.log(photo);
      console.log(document);
      console.log("Document successfully written!");
    }).catch(function(error) {
      console.error('Error writing new message to Firebase Database', error);
    });
    
  }

  _startDelete() {
    const d = confirm("Delete Account?");
    if    ( d == true ) { deleteUser(); console.log("user gone"); }
    else  { console.log("user here"); }
  }

  static get styles() {
    return [
      Settings,
      Forms,
      Section,
      Buttons,
      Show,
      css`

      `
    ];
  }

  render() {
    return html`
      <!-- Page Menu -->
      <div>
        <ul class="setMenu">
          <li><a href="/settings#profile">    <button id="profile"   value="profile"   class="topButton"  ?on="${ this.profileTopic === 'profile'}"   ><p>Profile</p>   </button></a></li>
          <li><a href="/settings#email">      <button id="email"     value="email"     class="topButton"  ?on="${ this.profileTopic === 'email'}"     ><p>Email</p>      </button></a></li>
          <li><a href="/settings#password">   <button id="password"  value="password"  class="topButton"  ?on="${ this.profileTopic === 'password'}"  ><p>Password</p>  </button></a></li>
          <li><a href="/settings#delete">     <button id="account"   value="account"   class="topButton"  ?on="${ this.profileTopic === 'delete'}"   ><p>Delete</p>   </button></a></li>
        </ul>
      </div>

      <!-- Page Body -->
      <div>

        <form id="settings" class="spec" ?on="${ this.profileTopic === 'profile' }"></ul>
          <fieldset>
          <ul>
            <li><h3 class="pageTitle">Contractor Profile</h3></li>
            <li><p><label for="fileupload">Select a photo to upload:</label><input type="file" name="fileupload" value="fileupload" id="fileupload"></p></li>
            <li><p><input id="contractor"       type=text        placeholder="${this.person}"></p></li>
            <li><p><input id="phoneNumber"      type="text"      placeholder="${this.phone}"></p></li>
            <li><p><label>List my business in Phonebook</label><input type="checkbox" id="list" placeholder="true"></p></li>
            <li><button id="save" class="action-button" >save</button></li>
          </ul>

          </fieldset>
        </form>

      <form class="spec" ?on="${ this.profileTopic === 'email' }">
        <fieldset>
          <ul>
            <li><h3 class="pageTitle">Change Email</h3></li>
            <li><p><label>Email            <input id="email"            type="text"      placeholder="email"></label></p></li>
            <li><p><label>Verify Email     <input id="emailVerify"      type="text"      placeholder="verify"></label></p></li>
            <li><p><button id="update" class="action-button" >update</button></p></li>
            <li><div class="verified"></div></li>
          </ul>
        </fieldset>
      </form>

      <form class="spec" ?on="${ this.profileTopic === 'password' }">
      <fieldset>
        <ul>
          <li><h3 class="pageTitle">Update Password</h3></li>
          <li><p><label>New Password        <input id="newPass"     type="text"      placeholder="password"></label></p></li>
          <li><p><label>Verify Password     <input id="passVerify"  type="text"      placeholder="verify"></label></p></li>
          <li><p><button id="pass" class="action-button">create</button></p></li>
        </ul>
        </fieldset>
      </form>
      
      <form id="account" class="spec" ?on="${ this.profileTopic === 'delete' }">
        <fieldset>
          <ul>
            <li><h3 class="pageTitle">Delete Account</h3></li>
            <li><p>Permanently delete the user account and data related to:</p></li>
            <li><p>${this.userMail}</p></li>
            <li><p><button id="deleteUser" class="action-button">Delete</button></p></li>
          </ul>
        </fieldset>
      </form>
      
      <!-- Close Body -->
      </div>

    `
  }
}

window.customElements.define('user-settings', UserSettings);

// window.onerror = function(message, file, line, col, error){ console.log(arguments); }