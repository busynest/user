
import { html, LitElement, css, }           from 'lit';
import { customElement, state }             from 'lit/decorators.js';
import { connect }                          from 'pwa-helpers/connect-mixin.js';
import { store, RootState }                 from './store';
import { navigate, setName }                from './user-action.js';
import { userStyles }                       from './styles';
import { Settings }                         from './styles-settings';
import { firebaseUser, deleteUser, userName, profileURL, userEmail, auth } from './user-functions';
import { onAuthStateChanged } from 'firebase/auth';
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
      const a : any = this.shadowRoot!.getElementById('settings');
      a.addEventListener('click', (e:any) => { e.preventDefault(); });
      const b : any = this.shadowRoot!.getElementById('emailForm');
      b.addEventListener('click', (e:any) => { e.preventDefault(); });
      const c : any = this.shadowRoot!.getElementById('passwordForm');
      c.addEventListener('click', (e:any) => { e.preventDefault(); });
      const d : any = this.shadowRoot!.getElementById('deleteForm');
      d.addEventListener('click', (e:any) => { e.preventDefault(); });

      this.shadowRoot!.querySelector('#profile')!   .addEventListener('click',    () => { store.dispatch(navigate('profile')); } );
      this.shadowRoot!.querySelector('#email')!     .addEventListener('click',    () => { store.dispatch(navigate('email')); } );
      this.shadowRoot!.querySelector('#password')!  .addEventListener('click',    () => { store.dispatch(navigate('password')); } );
      this.shadowRoot!.querySelector('#account')!   .addEventListener('click',    () => { store.dispatch(navigate('delete')); } );

      this.shadowRoot!.querySelector('#save')!      .addEventListener('click',    () => { this.alertProfile(); } );
      this.shadowRoot!.querySelector('#update')!    .addEventListener('click',    () => { this.alertEmail(); } );
      this.shadowRoot!.querySelector('#pass')!      .addEventListener('click',    () => { this.alertPassword(); } );
      this.shadowRoot!.querySelector('#deleteUser')!.addEventListener('click',    () => { this.alertDelete(); } );
      
      this.shadowRoot!.querySelector("#fileupload")!.addEventListener('change',   () => { this._handleFiles(); }, false);

      // runFirebase();


      onAuthStateChanged( auth, (firebaseUser) => {
        if (firebaseUser) { /* INCLUDE */
          this._person    = userName();
          this._userMail  = userEmail();
          this._photoURL  = profileURL();
          store.dispatch( setName( this._person ) );
        }
        else              { /* EXCLUDE */ }
        store.dispatch( setName( this._person ) );
      });
    }
  
    stateChanged(state: RootState) {
      this.profileTopic      = state.user!.settings;
      this._user             = state.user!.currentUser;
      this._person           = state.user!.customer;
      this._name             = state.user!.name;
      this._phone            = state.user!.phone;
      this._userMail         = state.user!.email;
      this._photoURL         = state.user!.photoURL;
    }

    private alertProfile()  { if (this._user) { this.updateProfile() } else { alert('Please Login'); } }
    private updateProfile() {
      const person : any        = firebaseUser();
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
      const user = firebaseUser();
      const email = this.shadowRoot!.getElementById('email')!.value;
      user.updateEmail(email)
        .then( () => { console.log("Email update successful!" ); })
        .catch( (error: object) => { console.error('Error writing new message to Firebase Database', error); });
      user.sendEmailVerification()
        .then( () => { console.log("Email Verification successful!");})
        .catch( (error: object) => { console.error('Error writing new message to Firebase Database', error); });
    }
    
    /* Update Password */
    private alertPassword()  { if (this._user) { this.updatePassword(); } else { alert('Please Login'); } }
    private updatePassword() {
      const user = firebaseUser();
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
      return [
        Settings,
        userStyles,
        css`

        button:focus  { outline: none; }

        #uploader {
          position:         absolute;
          right:            0;
          width:            28px;
          height:           28px;
          border:           2px solid #303030;
          border-radius:    50%;
          transform:        rotateZ(90deg);
          overflow:         hidden;
          box-shadow:    1px 1px 2px black, 0 0 25px grey, 0 0 5px #fff;
        }

        .profile {
          width:            200px;
          margin:           auto;
        }

        .userImage {
          border-radius:  50%;
          overflow:       hidden;
          margin:         auto;
          border:         2px solid #303030;
          box-shadow:    1px 1px 2px black, 0 0 25px grey, 0 0 5px #fff;
        }

        .file-container {
  
        } 

        .trigger {
          position: relative;
          width: 200px;
          display:        block;
          text-shadow:    1px 1px 12px black, 0 0 35px grey, 0 0 15px #fff;
          font-size:      1em;
          transition:     all .4s;
          cursor:         pointer;
          text-align:     center;
        }

        #fileupload {
 

          width:          200px;
          height:         100%;
         /* background:   #39D2B4; */
          position:       absolute;
          top: 0; left: 0;
          opacity:        0;

          cursor:         pointer;
        }

        .max {
          max-width: 600px;
          margin: auto;
        }

        .welcome {
          text-align: center;
          text-shadow:    1px 1px 2px black, 0 0 15px grey, 0 0 5px #fff;
        }

        @media  (max-width: 460px) {
          #profile, #email { text-align: left; }
          #account, #password { text-align: right; }
        }
/*
        @media (min-width: 640px) {
          :host{ display: grid; grid-template-columns: 50% 50%; }
        }
*/
        `
      ];
    }
  
    protected render() {
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
        <div  class="spec" ?on="${ this.profileTopic === 'profile' }">
          <div class="profile">

          <h2 class="welcome">${this._person}</h2>

          <label for="fileupload" class="trigger">
            <input type="file" name="fileupload" id="fileupload" accept="image/*">
            ${this._user
            ? html`
            <progress value="0" max="100" id="uploader"></progress>
            <input
              type="image"
              class="userImage"
              id="image"
              alt="user"
              height="171px"
              width="171px"
              src="${this._photoURL}">
              `
              : html`${faceIcon}` }
              upload a photo
          </label>

        </div>
          <form id="settings">
            <ul>
              <li><p><label><h3 class="pageTitle">Username</h3><input id="contractor" type="text" ></label></p></li>
              <li><p><label><h3 class="pageTitle">Telephone: ${this._phone}</h3><input id="phoneNumber" type="text" ></label></p></li>
              </ul>
          </form>

          <ul class="max">
            <li><p><label><input type="checkbox" id="list" placeholder="true">Public Profile</label></p></li>
            <li><button id="save" class="action-button" >save</button></li>
          </ul>

          </div>

        <form class="spec" ?on="${ this.profileTopic === 'email' }" id="emailForm">
          <ul>
            <li><h3 class="pageTitle">Change Email ${this._userMail}</h3></li>
            <li><p><label>Email<input type="email" id="email"></label></p></li>
            <li><p><label>Verify Email<input type="email" id="emailVerify"></label></p></li>
            <li><p><button id="update" class="action-button" >update</button></p></li>
            <li><div class="verified"></div></li>
          </ul>
        </form>

        <form class="spec" ?on="${ this.profileTopic === 'password' }" id="passwordForm">
        <ul>
          <li><h3 class="pageTitle">Update Password</h3></li>
          <li><p><label>New Password        <input type="Password" id="newPass"></label></p></li>
          <li><p><label>Verify Password     <input type="Password" id="passVerify"></label></p></li>
          <li><p><button id="pass" class="action-button">create</button></p></li>
        </ul>
        </form>

        <form class="spec" ?on="${ this.profileTopic === 'delete' }" id="deleteForm">
          <ul>
            <li><h3 class="pageTitle">Delete Account</h3></li>
            <li><p>Permanently delete the user account and data related to:</p></li>
            <!-- <li><p>\${this.userMail}</p></li> -->
            <li><p><button id="deleteUser" class="action-button">Delete</button></p></li>
          </ul>
        </form>
      </form>
  
      `
    }
  }
 
  declare global {
    interface HTMLElementTagNameMap {
        'user-settings': UserSettings;
    }
  }
