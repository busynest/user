import { css, html, LitElement }          from 'lit';
import { customElement, state }           from 'lit/decorators.js';

import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth }                     from '../../../firebase/authentication';
import { logAccount }               from '../../../firebase/interface';

import { buttonStyle }    from '../../../css/form/button';
import { labelStyle }     from '../../../css/form/label';
import { inputStyle }     from '../../../css/form/input';
import { listStyle }      from '../../../css/form/list';
import { toggleStyle }    from '../css/toggle';

import store              from '../../../store';
import { signUpAction }   from '../../../redux/frontend';

@customElement('user-sign-up')
export class UserSignUp extends LitElement {

  @state() private email        = '';
  @state() private password     = '';

  constructor() { super(); }

  static get styles() { return [
    listStyle,
    labelStyle,
    inputStyle,
    buttonStyle,
    toggleStyle,
    css`
    
      .double {
        display: grid;
        grid-template-columns: 1fr auto;
      }

    `
  ] };

  protected render() {
    return html`
  
      <!-- Sign Up State-->
      <form
        @submit=${this._handleSubmit}
        autocomplete="on">
        
        <ul>

          <li>
            <label for="pwa-signup-email">Email</label>
            <input
              id="pwa-signup-email"
              type="email"
              @change="${this.handleEmail}">
          </li>

              <!-- <label><input   id="verifyEmail"      type="email"      >Verify Email</label> -->

          <li>
            <label for="pwa-signup-pass">Password</label>
            <input
              id="pwa-signup-pass"
              type="password"
              @change="${this.handlePassword}">
          </li>

          <li>
            <button
              class="newUser action-button"
              @click="${this.signUp}">Sign up</button>
          </li>

          <!-- <label><input   id="veriftPassword"   type="password"   >Verify Password</label> -->

          <!-- Change State -->
          <li>
            <p class="divider">Or</p>
            <button
              class="new"
              @click="${ this.change }">login with existing email</button>
          </li>

        </ul>

      </form>

    `;
  }

  private change() {
    store.dispatch(signUpAction());
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
  gtag('event', 'conversion', {'send_to': 'AW-/'});

}

*/

}

declare global {
  interface HTMLElementTagNameMap {
      'user-sign-up': UserSignUp;
  }
}
