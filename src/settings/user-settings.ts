import { html, LitElement }                 from 'lit';
import { state, customElement }             from 'lit/decorators.js';
import { connect }                          from 'pwa-helpers/connect-mixin.js';
import { store, AppState }                  from '../store';
import { navigateX, setNameX }              from './user-redux.js';
import { userStyles }                       from '../styles';
import { Settings }                         from './settings-styles';
import {
  auth,           // Reference to Services
  // firebaseUser,   // Exact Name Reference - Short-circuit Evaluation - State Logical OR
  // profileURL,     // Exact Name Reference - Short-circuit Evaluation - State Logical OR
  // userName,       // Exact Name Reference - Short-circuit Evaluation - State Return
  // userEmail,      // Exact Name Reference - Short-circuit Evaluation - State Return
  deleteUser,      // Exact Name Function - Action
  user
} from '../firebase-functions/user-firebase';
import { onAuthStateChanged } from 'firebase/auth'; // Firebase Function
/*
export class Student {
  fullName: string;
  constructor(public firstName: string, public middleInitial: string, public lastName: string) {
      this.fullName = firstName + " " + middleInitial + " " + lastName;
  }
}
*/
export interface Person extends HTMLElement {
  firstName: string;
  lastName: string;
}

export const faceIcon = html`<svg viewBox="0 0 24 24" height="175px" width="175px"><path d="M9 11.75c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zm6 0c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-.29.02-.58.05-.86 2.36-1.05 4.23-2.98 5.21-5.37C11.07 8.33 14.05 10 17.42 10c.78 0 1.53-.09 2.25-.26.21.71.33 1.47.33 2.26 0 4.41-3.59 8-8 8z"></path></svg>`;

@customElement('user-settings')
export class UserSettings extends connect(store)(LitElement) {

    @state() private profileTopic = '';
    @state() private _user = false;
    @state() private _name = '';
    @state() private _person = '';
    @state() private _phone = '';
    @state() private _userMail = '';
    @state() private _photoURL = '';
    @state() private _imagePath = '';

    constructor() {
      super();
    }

    protected firstUpdated() {

      // ShadowRoot Default in Forms
      const a : any = this.shadowRoot!.getElementById('settings');
      a.addEventListener('click', (e:any) => { e.preventDefault(); });
      const b : any = this.shadowRoot!.getElementById('verificationForm');
      b.addEventListener('click', (e:any) => { e.preventDefault(); });
      const c : any = this.shadowRoot!.getElementById('passwordForm');
      c.addEventListener('click', (e:any) => { e.preventDefault(); });
      const d : any = this.shadowRoot!.getElementById('deleteForm');
      d.addEventListener('click', (e:any) => { e.preventDefault(); });

      this.shadowRoot!.querySelector('#profile')!   .addEventListener('click',    () => { store.dispatch(navigateX('profile')); } );
      this.shadowRoot!.querySelector('#verification')!     .addEventListener('click',    () => { store.dispatch(navigateX('verification')); } );
      this.shadowRoot!.querySelector('#password')!  .addEventListener('click',    () => { store.dispatch(navigateX('password')); } );
      this.shadowRoot!.querySelector('#account')!   .addEventListener('click',    () => { store.dispatch(navigateX('delete')); } );

      this.shadowRoot!.querySelector('#save')!      .addEventListener('click',    () => { this.alertProfile(); } );
      this.shadowRoot!.querySelector('#update')!    .addEventListener('click',    () => { this.alertEmail(); } );
      this.shadowRoot!.querySelector('#pass')!      .addEventListener('click',    () => { this.alertPassword(); } );
      this.shadowRoot!.querySelector('#deleteUser')!.addEventListener('click',    () => { this.alertDelete(); } );
      
      this.shadowRoot!.querySelector("#fileupload")!.addEventListener('change',   () => { this._handleFiles(); }, false);

      // runFirebase();


      // Firebase Function
      onAuthStateChanged( auth, (firebaseUser) => {
        if (firebaseUser) { /* INCLUDE */
          this._person    = userName();
          this._userMail  = userEmail();
          this._photoURL  = profileURL();
          store.dispatch( setNameX( this._person ) );
        }
        else              { /* EXCLUDE */ }
        store.dispatch( setNameX( this._person ) );
      });
    }
  
    stateChanged(state: AppState) {
      this.profileTopic      = state.pwa_auth!.settings;      // Page String
      this._user             = state.pwa_auth!.currentUser;   // Login State
      this._person           = state.pwa_auth!.customer;      // ID
      this._name             = state.pwa_auth!.name;          // Name
      this._phone            = state.pwa_auth!.phone;         // Phone
      this._userMail         = state.pwa_auth!.email;         // E-mail
      this._photoURL         = state.pwa_auth!.photoURL;      // Photo
    }

    private alertProfile()  { if (this._user) { this.updateProfile() } else { alert('Please Login'); } }
    private updateProfile() {
      const person : any        = this._name;
      const contractor : any    = this.shadowRoot!.getElementById('contractor');
      const phone : any         = this.shadowRoot!.getElementById('phoneNumber');
      const list : any          = this.shadowRoot!.getElementById('list');
      if( contractor === null ) { contractor === this._person }
      // const photo         = this.shadowRoot.getElementById('');
      // const company         = this.shadowRoot.getElementById('company').value;
      // const enroll          = this.shadowRoot.getElementById('who').value;
      if (auth.currentUser) {
        person.updateProfile({
          displayName: contractor.value,
          phoneNumber: phone.value
          // photoURL: ""
        })
        .then( () => {
          alert(
          'updated name:' + contractor.value +
          'updated phone:' + phone.value +
          'Public Profile:' + list.checked
          );
        })
        .catch( (error: object) =>{ console.error('Error writing new message to Firebase Database', error); });
/*
        firestore.collection("users").doc(user.id).set({
          company:             user.id,
          enrollment:          list
          // location:         this.location,
        })
          .then( () => { console.log("Document successfully written!"); })
          .catch( (error) => { console.error('Error writing new message to Firebase Database', error); });    */
      }
      // location.reload();
    }

    /* Update email */
    private alertEmail()  { if (this._user) { this.updateEmail(); } else { alert('Please Login'); } }
    private updateEmail() {
      const user = this._user;
      // const user = firebaseUser();
      const email = this.shadowRoot!.getElementById('email')!;
      user.updateEmail(email.value)
        .then( () => { console.log("Email update successful!" ); })
        .catch( (error: object) => { console.error('Error writing new message to Firebase Database', error); });
      user.sendEmailVerification()
        .then( () => { console.log("Email Verification successful!");})
        .catch( (error: object) => { console.error('Error writing new message to Firebase Database', error); });
    }
    
    /* Update Password */
    private alertPassword()  { if (this._user) { this.updatePassword(); } else { alert('Please Login'); } }
    private updatePassword() {
      const user = this._user
      // const user = firebaseUser();
      const newPassword = this.shadowRoot!.getElementById('newPass')!.value;
      user.updatePassword(newPassword)
        .then( () => { console.log("Password successful!"); })
        .catch( (error: object) => { console.error('Error writing new message to Firebase Database', error); });
    }

    /* Delete Account */
    private alertDelete()  { if (this._user) { this.deleteUser(); } else { alert('Please Login'); } }
    private deleteUser() {
      const d = confirm("Delete Account?");
      if    ( d == true ) { deleteUser(); console.log("user gone"); }
      else  { console.log("user here"); }
    }

    private _handleFiles() {
      const uploader  = this.shadowRoot!.querySelector('#uploader');
      const file      = this.shadowRoot!.querySelector('#fileupload')!.files[0];
      const now       = storageRef.child('/images/' + file.name );
      const task      = now.put(file);
      task.on('state_changed',
        function progress(snapshot: object) { const percentage = ( snapshot.bytesTransferred / snapshot.totalBytes ) * 100; uploader.value = percentage },
        function error(error: object) { error },
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
      return [ Settings, userStyles ];
    }
  
    protected render() {
      return html`
        <!-- Page Menu -->
        <nav>
          <ul class="setMenu">
            <li><button id="profile"        value="profile"        class="topButton"  ?on="${ this.profileTopic === 'profile'}"       >Profile        </button></li>
            <li><button id="verification"   value="verification"   class="topButton"  ?on="${ this.profileTopic === 'verification'}"  >Verification   </button></li>
            <li><button id="password"       value="password"       class="topButton"  ?on="${ this.profileTopic === 'password'}"      >Security       </button></li>
            <li><button id="account"        value="delete"         class="topButton"  ?on="${ this.profileTopic === 'delete'}"        >Delete         </button></li>
          </ul>
        </nav>
  
        <!-- Page Section: Profile -->
        <section class="spec" ?on="${ this.profileTopic === 'profile' }">

          <!-- Divider: Photo Uploader / Display -->
          <div class="profile">

            <!-- Display: Username -->
            <h2 class="welcome">${this._person}</h2>

            <!-- Profile Picture -->
            <label for="fileupload" class="trigger">
              <input type="file" name="fileupload" id="fileupload" accept="image/*">

              <!-- If Firebase User Signed-in -->
              ${this._user
              ? html`

              <!-- Progress Bar -->
              <progress value="0" max="100" id="uploader"></progress>

              <!-- Display Photo -->
              <input
                type="image"
                class="userImage"
                id="image"
                alt="user"
                height="171px"
                width="171px"
                src="${this._photoURL}">
                `
                : html`

                  <!-- If Firebase User NOT Signed-in -->
                  ${faceIcon}
                  
                ` }

                <!-- Text -->
                upload a photo

            </label>

          <!-- End Divider: Profile -->
          </div>

          <!-- Username / Telephone / Publish - Input -->
          <form id="settings">
            <ul>
              <li><p><label>Username<input id="contractor" type="text" ></label></p></li>
              <li><button id="save" class="action-button" >save</button></li>
            </ul>
          </form>

        </section>
        
        <!-- Page: Verification -->
        <section class="spec" ?on="${ this.profileTopic === 'verification' }" id="verificationForm">
          <form>
            <ul>
              <li class="formTitle"><h3 class="pageTitle">Email:</h3>${this._userMail}</li>
              <li><p><label>Email<input type="email" id="email"></label></p></li>
              <li><p><label>Verify Email<input type="email" id="emailVerify"></label></p></li>
              <li class="formTitle"><h3 class="pageTitle">Telephone:</h3>${this._phone}</li>
              <li><p><label>Telephone:<input id="phoneNumber" type="text" ></label></p></li>
              <li><p><button id="update" class="action-button" >update</button></p></li>
              <li><div class="verified"></div></li>
            </ul>
          </form>
        </section>

        <!-- Page: Password -->
        <section  class="spec" ?on="${ this.profileTopic === 'password' }" id="passwordForm">
          <form>
          <ul>
            <li><h3 class="pageTitle">Password</h3></li>
            <li><p><label>New Password <input type="password" id="newPass"></label></p></li>
            <li><p><label>Verify Password <input type="password" id="passVerify"></label></p></li>
            <li><h3 class="pageTitle">Consent</h3></li>
            <li><p><label><input type="checkbox" id="list" placeholder="true">Public Profile</label></p></li>
            <li><p><button id="pass" class="action-button">create</button></p></li>
          </ul>
          </form>
        </section>

        <!-- Page: Delete -->
         <section  class="spec" ?on="${ this.profileTopic === 'delete' }" id="deleteForm">
          <form>
            <ul>
              <li><h3 class="pageTitle">Delete Account</h3></li>
              <li><p>Permanently delete the user account and data related to:</p></li>
              <!-- <li><p>\${this.userMail}</p></li> -->
              <li><p><button id="deleteUser" class="action-button">Delete</button></p></li>
            </ul>
          </form>
        </section>
  
        

      `
    }
  }
 
  declare global {
    interface HTMLElementTagNameMap {
        'user-settings': UserSettings;
    }
  }
