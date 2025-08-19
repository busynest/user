import { css, html, LitElement }          from 'lit';
import { state, customElement }           from 'lit/decorators.js';
import { connect }                        from 'pwa-helpers/connect-mixin.js';
import { store, AppState }                from '../../store';
import { navigateAuth }                   from '../../redux/frontend';
import { show }                           from '../../css/toggle';
import { navigation }                     from '../../css/navigation';
import { listStyles }                     from '../../css/list';
import { actionButton }                   from '../input/css/styles';
import '../input/name';
import '../input/email';
import '../input/photo';
import '../input/telephone';
import '../input/password';
import { deleteUser }                     from '../../firebase/start';

@customElement('user-settings')
export class UserSettings extends connect(store)(LitElement) {

    @state() private profileTopic = '';
    @state() private _user = false;
    @state() private _name = '';
    @state() private _id= '';
    // @state() private _person= '';
    @state() private _phone = '';
    @state() private _userMail = '';
    @state() private _photoURL = '';
    @state() private _imagePath = '';

    constructor() {
      super();
    }

    protected firstUpdated() {

      const forms = this.querySelectorAll('form')!
      forms.forEach( item => {
        item.preventDefault();
      });

      this.shadowRoot!.querySelector('button[value=profile]')!.addEventListener('click', () => {
        store.dispatch(navigateAuth('profile'));
      } );
      
      this.shadowRoot!.querySelector('button[value=verification]')!.addEventListener('click', () => {
        store.dispatch(navigateAuth('verification'));
      } );
      
      this.shadowRoot!.querySelector('button[value=password]')!.addEventListener('click', () => {
        store.dispatch(navigateAuth('password'));
      } );
      
      this.shadowRoot!.querySelector('button[value=delete]')!.addEventListener('click', () => {
        store.dispatch(navigateAuth('delete'));
      } );



      this.shadowRoot!.querySelector('.deleteUser')!.addEventListener('click', (e:Event) => {
        e.preventDefault();
        this.alertDelete();
      } );
      
      // this.shadowRoot!.querySelector('.pass')!      .addEventListener('click',    () => { this.alertPassword(); } );
      // this.shadowRoot!.querySelector('#update')!    .addEventListener('click',    () => { this.alertEmail(); } );
      // this.shadowRoot!.querySelector("#fileupload")!.addEventListener('change',   () => { this._handleFiles(); }, false);

    }
  
    stateChanged(state: AppState) {

      this.profileTopic      = state.frontend!.settings;      // Page String
      this._user             = state.frontend!.login;         // Login State
      this._id               = state.frontend!.userId;        // ID

      this._name             = state.backend!.name;           // Name
      this._phone            = state.backend!.phone;          // Phone
      this._userMail         = state.backend!.email;          // E-mail
      this._photoURL         = state.backend!.photoURL;       // Photo

      // this._person           = state.frontend!.customer;      // ID

    }


    /* Delete Account */
    private alertDelete()  { if (this._user) { this.deleteUser(); } else { alert('Please Login'); } }
    private deleteUser() {
      const d = confirm("Delete Account?");
      if    ( d == true ) { deleteUser(); console.log("user gone"); }
      else  { console.log("user here"); }
    }

    /*
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
*/
    static get styles() { return [ show, navigation, actionButton, listStyles,
      css`

        /* Page Section */
        :host {
          margin:           0 3px 0 3px;
        }

        /* Page Form */
        form {
          box-sizing:       border-box;
          display:          grid;
          border:           0;
        }

        /* Page Title  */
        .pageTitle { margin: 0; }
        .welcome {
          color:            var(--pwa_section_header);
          text-align:       center;
          text-shadow:      1px 1px 2px black, 0 0 15px grey, 0 0 5px #fff;
        }

        /* Page - Input 
        .max {
          max-width:        600px;
          margin:           auto;
        } */

      `
     ]; }
  
    protected render() {
      return html`
        <!-- Page Menu -->
        <nav>
          <ul class="setMenu">
            <li><button value="profile"        class="topButton"  ?on="${ this.profileTopic === 'profile'}"       >Profile        </button></li>
            <li><button value="verification"   class="topButton"  ?on="${ this.profileTopic === 'verification'}"  >Verification   </button></li>
            <li><button value="password"       class="topButton"  ?on="${ this.profileTopic === 'password'}"      >Security       </button></li>
            <li><button value="delete"         class="topButton"  ?on="${ this.profileTopic === 'delete'}"        >Delete         </button></li>
          </ul>
        </nav>
  
        <!-- Page Section: Profile -->
        <section class="spec" ?on="${ this.profileTopic === 'profile' }">

          <!-- Display Username -->
          <h2 class="welcome">${this._name}</h2>

          <!-- Icon Element - Display / Upload -->
          <contact-photo></contact-photo>

          <form id="userName">

            <!-- Input - Name -->
            <input-name></input-name>

          </form>

        <!-- End Page Section: Profile -->
        </section>
        
        <!-- Page: Verification -->
        <section class="spec" ?on="${ this.profileTopic === 'verification' }">
          
          <form id="userVerify">

            <h2 class="welcome">Change E-mail</h2>
            <!-- <h3 class="pageTitle">Change E-mail</h3> -->

            <!-- Custom Input - Email -->
            <contact-email></contact-email>

            <h2 class="welcome">Change Telephone</h2>
            <!-- Custom Input - Telephone -->
            <input-telephone></input-telephone>

            <!-- Indicator - Verified -->
            <div class="verified"></div>

          </form>

        </section>

        <!-- Page: Password -->
        <section class="spec" ?on="${ this.profileTopic === 'password' }">
          
          <form id="userPassword">

            <h2 class="welcome">Change Password</h2>
            <!-- <h3 class="pageTitle">Change Password</h3> -->

            <input-password></input-password>

          </form>

        </section>

        <!-- Page: Delete -->
        <section class="spec" ?on="${ this.profileTopic === 'delete' }">
        
          <form id="userDelete">

            <h2 class="welcome">Delete Account</h2>
            <!-- <h3 class="pageTitle">Delete Account</h3> -->
            <p>Permanently delete the user account and data related to:</p>
            <!-- <li><p>\${this.userMail}</p></li> -->
            <button class="action-button deleteUser">Delete</button>

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


/*


<!--
            <label for="newPass">New Password</label>
            <input type="password" id="newPass">

            <label for="passVerify">Verify Password</label>
            <input type="password" id="passVerify"></label>

            <button class="action-button pass">update</button>
-->
            <!-- <h3 class="pageTitle">Consent</h3>
            <p><label><input type="checkbox" id="list" placeholder="true">Public Profile</label></p> -->
    













      // ShadowRoot Default in Forms
      const a : any = this.shadowRoot!.getElementById('settings');
      a.addEventListener('click', (e:any) => { e.preventDefault(); });
      const b : any = this.shadowRoot!.getElementById('verificationForm');
      b.addEventListener('click', (e:any) => { e.preventDefault(); });
      const c : any = this.shadowRoot!.getElementById('passwordForm');
      c.addEventListener('click', (e:any) => { e.preventDefault(); });
      const d : any = this.shadowRoot!.getElementById('deleteForm');
      d.addEventListener('click', (e:any) => { e.preventDefault(); });
*/


// Reference to Services // Exact Name Function - Action

  // firebaseUser,   // Exact Name Reference - Short-circuit Evaluation - State Logical OR
  // profileURL,     // Exact Name Reference - Short-circuit Evaluation - State Logical OR
  // userName,       // Exact Name Reference - Short-circuit Evaluation - State Return
  // userEmail,      // Exact Name Reference - Short-circuit Evaluation - State Return
  // user
  
/*

         <!-- Profile Section 
          <div stye="
            width:     200px;
            margin:    auto;
          "> -->

            <!-- Action Phrase -->
          
          <!-- End Profile Section 
          </div> -->



export class Student {
  fullName: string;
  constructor(public firstName: string, public middleInitial: string, public lastName: string) {
      this.fullName = firstName + " " + middleInitial + " " + lastName;
  }
}

export interface Person extends HTMLElement {
  firstName: string;
  lastName: string;
}
*/



    // To do: alert, then call funcion
    /* Update email
    private alertEmail() {
      if (this._user) {

        const email = this.shadowRoot!.querySelector("input type=email")!;
        console.log("email: ", email);
        (email);

      } else { alert('Please Login');

      }
    }; 
    

  <!--

              <li class="formTitle"><h3 class="pageTitle">Email:</h3>\${this._userMail}</li>
              <li><p><label>Email<input type="email" id="email"></label></p></li>
              
              <li><p><label>Verify Email<input type="email" id="emailVerify"></label></p></li>
              
              -->
    
      <!-- Profile Picture
            <label for="fileupload" class="trigger">
              <input type="file" name="fileupload" id="fileupload" accept="image/*">
 -->
              <!-- If Firebase User Signed-in 
              \${this._user
              \? html\`

              <!-- Custom Input - Icon -->
             

              <!-- Progress Bar 
              <progress value="0" max="100" id="uploader"></progress>

              <!-- Display Photo 
              <input
                type="image"
                class="userImage"
                id="image"
                alt="user"
                height="171px"
                width="171px"
                src="\${this._photoURL}"> 
                \`
                \: html\`

                  <!-- If Firebase User NOT Signed-in 
                  \${faceIcon}
                  
                \` }

                <!-- Text 
                upload a photo

            </label>-->
    
    
    */