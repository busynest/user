import { html, LitElement }               from 'lit';
import { customElement, state }           from 'lit/decorators.js';
import { loginStyles }                    from './css/styles';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth, logAccount }               from '../../start';

@customElement('user-sign-up')
export class UserSignUp extends LitElement {

  @state() private email        = '';
  @state() private password     = '';

  constructor() { super(); }

  static get styles() { return [ loginStyles ] };

  protected render() {
    return html`
  
      <!-- Sign Up State-->
      <form
        @submit=${this._handleSubmit}
        autocomplete="on">
        
        <ul>

          <li>
            <label>
              <input
                type="email"
                @change="${this.handleEmail}">Email
            </label>
          </li>

              <!-- <label><input   id="verifyEmail"      type="email"      >Verify Email</label> -->

          <li>
            <label>
              <input
                type="password"
                @change="${this.handlePassword}">Password
            </label>
          </li>

            <!-- <label><input   id="veriftPassword"   type="password"   >Verify Password</label> -->
          
          <li>
            <button
              class="newUser action-button"
              @click="${this.signUp}">Sign up</button>
          </li>

        </ul>

      </form>

    `;
  }

  // Form Default Behavior
  private _handleSubmit(event: Event) {
    event.preventDefault();
  }

  // Sync Email
  private handleEmail(event: Event) {
    const input = event.target as HTMLInputElement;
    this.email = input.value; // Update the property with the input value
  }

  // Sync Password
  private handlePassword(event: Event) {
    const input = event.target as HTMLInputElement;
    this.password = input.value; // Update the property with the input value
  }

  // Sign Up Action
  private signUp() {
    if (this.email.length < 4) { alert('Please enter an email address.'); return; }
    if (this.password.length < 4)  { alert('Please enter a password.'); return; }
    this.newAccount(this.email, this.password);  // Sign UP with email and password.
}

  // Create New Account using Email and Password
  private newAccount = async (email:any, password:any) => {
      
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


/* To Do: Integration

// Google Tag Manager Conversion - Integrateion
private gtag_report_conversion = async () => {

  // @ts-ignore
  gtag('event', 'conversion', {'send_to': 'AW-937270922/amGHCMaJ06QYEIq99r4D'});

}

*/

}

declare global {
  interface HTMLElementTagNameMap {
      'user-sign-up': UserSignUp;
  }
}
