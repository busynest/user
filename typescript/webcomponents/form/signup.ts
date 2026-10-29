import {
  css,
  html,
  LitElement
}                         from 'lit';

import {
  customElement,
  property,
  state
}                         from 'lit/decorators.js';

import {
  createUserWithEmailAndPassword,
  sendEmailVerification
}                         from 'firebase/auth';

import { auth }           from '../../firebase/authentication';
import { logAccount }     from '../../firebase/interface';

import { pwaAuthError, pwaSignup } from '../../events/names';
import { emitWindow, toAuthError, toPwaUser } from '../../events/emit';
import { userMessage } from '../../firebase/message';

import { buttonStyle }    from './css/button';
import { labelStyle }     from './css/label';
import { inputStyle }     from './css/input';
import { listStyle }      from './css/list';
import { toggleStyle }    from './css/toggle';
import { tapStyle }       from '../css/tap';

import store                  from '../../store';
import { universalToggle }    from '../../redux/frontend';

@customElement('form-signup')
export class FormSignup extends LitElement {

  
  @property({type: String}) public source        = '';
  @state() private email        = '';
  @state() private password     = '';

  constructor() { super(); }

  static get styles() { return [
    listStyle,
    labelStyle,
    inputStyle,
    buttonStyle,
    toggleStyle,
    tapStyle,
    css`

      :host {
        background-color:           var(--section_background_color, #fffdf8);
      }
    
      .double {
        display: grid;
        grid-template-columns: 1fr auto;
      }

      form { display: grid; }

    `
  ] };

  protected render() {
    return html`
  
      <!-- Sign Up State-->
      <form
        @submit=            ${this._handleSubmit}
        autocomplete=       "on"
        novalidate>
        
        <ul>

          <li>

            <label>Email

              <input
                id=           "${this.source}-signup-email"
                part=         "email"
                type=         "email"
                autocomplete= "email"
                @change=      "${this.handleEmail}">

            </label>

          </li>

              <!-- <label><input   id="verifyEmail"      type="email"      >Verify Email</label> -->

          <li>

            <label>Password
              
              <input
                id=           "${this.source}-signup-pass"
                part=         "password"
                type=         "password"
                autocomplete= "new-password"
                @change=      "${this.handlePassword}">

            </label>

          </li>

          <li>

            <button
              type=         "submit"
              part=         "submit"
              class=        "newUser action-button">Sign up</button>

          </li>

          <!-- <label><input   id="veriftPassword"   type="password"   >Verify Password</label> -->

          <!-- Change State 
          <li>

            <p class=       "divider">Or</p>



          </li> -->

        </ul>

        <button
          type="button"
          part="switch"
          class="new"
          @click="${ this.change }">login with existing email</button>

      </form>

    `;
  }

  private change() {
    store.dispatch(universalToggle(this.source));
  }

  // Required - read the fields on submit
  private readFields() {
    const email     = this.renderRoot.querySelector('input[type="email"]') as HTMLInputElement | null;
    const password  = this.renderRoot.querySelector('input[type="password"]') as HTMLInputElement | null;
    this.email      = email?.value ?? '';
    this.password   = password?.value ?? '';
  }

  // Form Default Behavior
  private _handleSubmit(event: Event) {
    event.preventDefault();
    this.signUp();
  }

  // Sync Email
  private handleEmail(event: Event) {
    const input =     event.target as HTMLInputElement;
    this.email =      input.value; // Update the property with the input value
  }

  // Sync Password
  private handlePassword(event: Event) {
    const input =     event.target as HTMLInputElement;
    this.password =   input.value; // Update the property with the input value
  }

  // Sign Up Action
  private signUp() {
    this.readFields();
    if (this.email.length < 4) {
      const detail = { code: 'pwa/missing-email', message: 'Enter an email address.' };
      emitWindow(pwaAuthError, detail);
      alert(userMessage(detail));
      return;
    }
    if (this.password.length < 4) {
      const detail = { code: 'pwa/missing-password', message: 'Enter a password.' };
      emitWindow(pwaAuthError, detail);
      alert(userMessage(detail));
      return;
    }
    this.newAccount(this.email, this.password);  // Sign UP with email and password.
}

  // Create New Account using Email and Password
  private newAccount = async (email:string, password:string) => {

    try {

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userCredential.user);
      await logAccount();
      const person = toPwaUser(userCredential.user);
      if (person) emitWindow(pwaSignup, { user: person });

    } catch (error) {

      emitWindow(pwaAuthError, toAuthError(error));
      alert(userMessage(error));

    }

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
      'form-signup': FormSignup;
  }
}
