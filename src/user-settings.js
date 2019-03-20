
/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

// @ts-check

import { html, LitElement }             from 'lit-element';
import { setPassiveTouchGestures } from '@polymer/polymer/lib/utils/settings.js';
import { connect }                      from 'pwa-helpers/connect-mixin.js';
import { store }                        from '../demo/store';
// import { store }                        from '../../../src/store';
import { navigate, setName }            from './user-action.js';
import { userStyles }                   from './styles';
import { Settings }                     from './styles-settings';
import { firebaseUser, deleteUser, runFirebase, userName }     from './user-functions'; // runFirebase
import  user                            from './user-reducer';
store.addReducers({
  user
});
export class UserSettings extends connect(store)(LitElement) {
    static get properties() {
      return {
        profileTopic:     { type: String },
        _person:           { type: String }

        // business:         { type: String },
        // profile:          { type: String },
        // phone:            { type: Number },
        // userMail:         { type: String }
      }
    }
    constructor() {
      super();
      setPassiveTouchGestures(true);
    }

    firstUpdated() {
      const a = this.shadowRoot.getElementById('settings');
      a.addEventListener('click', e => { e.preventDefault(); });

      this.shadowRoot.getElementById('profile')   .addEventListener('click',    () => { store.dispatch(navigate('profile')); } );
      this.shadowRoot.getElementById('email')     .addEventListener('click',    () => { store.dispatch(navigate('email')); } );
      this.shadowRoot.getElementById('password')  .addEventListener('click',    () => { store.dispatch(navigate('password')); } );
      this.shadowRoot.getElementById('account')   .addEventListener('click',    () => { store.dispatch(navigate('delete')); } );

      this.shadowRoot.getElementById('save')      .addEventListener('click',    () => { this.alertProfile(); } );
      this.shadowRoot.getElementById('update')    .addEventListener('click',    () => { this.updateEmail(); } );
      this.shadowRoot.getElementById('pass')      .addEventListener('click',    () => { this.updatePassword(); } );
      this.shadowRoot.getElementById('deleteUser').addEventListener('click',    () => { this._deleteUser(); } );
      
      runFirebase();

      firebase.auth().onAuthStateChanged( (firebaseUser) => {
        if (firebaseUser) { /* INCLUDE */ this._person = userName(); }
        else              { /* EXCLUDE */ }
        store.dispatch( setName( this._person ) );
      });

    }
  
    stateChanged(state) {
      this.profileTopic     = state.user.settings;
      this._person           = state.user.customer;
      // this.phone            = state.user.customer;
      // this.profile          = state.user.profileChoice;
      // this.userMail         = state.user.profileChoice;
      // this._photoUR         = state.user.profilePhoto;
    }

    _getProfile() {/*
      this.userMail         = firebaseUser.email;
      this.emailVerified    = firebaseUser.emailVerified;
      const name            = firebaseUser.displayName;
      const email           = firebaseUser.email;
      const phone           = firebaseUser.phoneNumber;
      const photo           = firebaseUser.photoURL;
      const document        = firebaseUser.uid;*/
    }

    alertProfile() { alert( this.updateProfile() ) }

    updateProfile() {
      const person          = firebaseUser();
      const contractor      = this.shadowRoot.getElementById('contractor').value;
      const phone           = this.shadowRoot.getElementById('phoneNumber').value;
      const list            = this.shadowRoot.getElementById('list').checked;
      // const photo         = this.shadowRoot.getElementById('');
      // const company         = this.shadowRoot.getElementById('company').value;
      // const enroll          = this.shadowRoot.getElementById('who').value;
      console.log(contractor);
      console.log(phone);
      console.log(list);
      console.log(user);
      if (firebaseUser) {
        person.updateProfile({
          displayName: contractor,
          phoneNumber: phone
          // photoURL: ""
        })
          .then( () => { console.log("User update successful!"); })
          .catch( (error) =>{ console.error('Error writing new message to Firebase Database', error); });
/*
        firestore.collection("users").doc(user.id).set({
          company:             user.id,
          enrollment:          list
          // location:         this.location,
        })
          .then( () => { console.log("Document successfully written!"); })
          .catch( (error) => { console.error('Error writing new message to Firebase Database', error); });    */
      }
      location.reload();
    }

    /* Update email */
    updateEmail() {
      const user = firebaseUser();
      const email = this.shadowRoot.getElementById('email').value;
      user.updateEmail(email)
        .then( () => { console.log("Email update successful!" ); })
        .catch( (error) => { console.error('Error writing new message to Firebase Database', error); });
      user.sendEmailVerification()
        .then( () => { console.log("Email Verification successful!");})
        .catch( (error) => { console.error('Error writing new message to Firebase Database', error); });
    }
    
    /* Update Password */
    updatePassword() {
      const user = firebaseUser();
      const newPassword = this.shadowRoot.getElementById('newPass').value;
      user.updatePassword(newPassword)
        .then( () => { console.log("Password successful!"); })
        .catch( (error) => { console.error('Error writing new message to Firebase Database', error); });
    }

    /* Delete User Account */
    _deleteUser() {
      const d = confirm("Delete Account?");
      if    ( d == true ) { deleteUser(); console.log("user gone"); }
      else  { console.log("user here"); }
    }

    _handleFiles() {
      const uploader  = this.shadowRoot.getElementById('uploader');
      const file      = this.shadowRoot.getElementById('fileupload').files[0];
      const now       = storageRef.child('/images/' + file.name );
      const task      = now.put(file);
      task.on('state_changed',
        function progress(snapshot) { const percentage = ( snapshot.bytesTransferred / snapshot.totalBytes ) * 100; uploader.value = percentage },
        function error(error) { },
        function complete() { }
      )
      this._imagePath = file.name;
      console.log(this._imagePath);
    }

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
    static get styles() {
      return [
        Settings,
        userStyles
      ];
    }
  
    render() {
      return html`
        <!-- Page Menu -->
        <div>
          <ul class="setMenu">
            <li><button id="profile"   value="profile"   class="topButton"  ?on="${ this.profileTopic === 'profile'}"   ><p>Profile</p>   </button></li>
            <li><button id="email"     value="email"     class="topButton"  ?on="${ this.profileTopic === 'email'}"     ><p>Email</p>      </button></li>
            <li><button id="password"  value="password"  class="topButton"  ?on="${ this.profileTopic === 'password'}"  ><p>Password</p>  </button></li>
            <li><button id="account"   value="delete"    class="topButton"  ?on="${ this.profileTopic === 'delete'}"    ><p>Delete</p>   </button></li>
          </ul>
        </div>
  
        <!-- Page Body -->
        <form id="settings">
          <fieldset  class="spec" ?on="${ this.profileTopic === 'profile' }">
          <progress value="0" max="100" id="uploader">0%</progress>
          <ul>
            <li><h3 class="pageTitle">User's Profile${this._person}</h3></li>
            <li><p><label for="fileupload">Select a photo to upload:</label><input type="file" name="fileupload" id="fileupload" accept="image/*" multiple></p></li>
            <li><p><input id="contractor"       type=text        placeholder=""></p></li>
            <li><p><input id="phoneNumber"      type="text"      placeholder=""></p></li>
            <li><p><label>List my business in Phonebook</label><input type="checkbox" id="list" placeholder="true"></p></li>
            <li><button id="save" class="action-button" >save</button></li>
          </ul>
        </fieldset>

        <fieldset class="spec" ?on="${ this.profileTopic === 'email' }">
          <ul>
            <li><h3 class="pageTitle">Change Email</h3></li>
            <li><p><label>Email            <input type="text" id="email"            placeholder="email"></label></p></li>
            <li><p><label>Verify Email     <input type="text" id="emailVerify"      placeholder="verify"></label></p></li>
            <li><p><button id="update" class="action-button" >update</button></p></li>
            <li><div class="verified"></div></li>
          </ul>
        </fieldset>

        <fieldset class="spec" ?on="${ this.profileTopic === 'password' }">
        <ul>
          <li><h3 class="pageTitle">Update Password</h3></li>
          <li><p><label>New Password        <input type="text" id="newPass"         placeholder="password"></label></p></li>
          <li><p><label>Verify Password     <input type="text" id="passVerify"      placeholder="verify"></label></p></li>
          <li><p><button id="pass" class="action-button">create</button></p></li>
        </ul>
        </fieldset>

        <fieldset id="account" class="spec" ?on="${ this.profileTopic === 'delete' }">
          <ul>
            <li><h3 class="pageTitle">Delete Account</h3></li>
            <li><p>Permanently delete the user account and data related to:</p></li>
            <!-- <li><p>\${this.userMail}</p></li> -->
            <li><p><button id="deleteUser" class="action-button">Delete</button></p></li>
          </ul>
        </fieldset>
      </form>
  
      `
    }
  }
  
  window.customElements.define('user-settings', UserSettings);
 
