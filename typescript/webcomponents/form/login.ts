import {
  html,
  LitElement,
  css
}                         from 'lit';

import {
  customElement,
  property,
  state
}                         from 'lit/decorators.js';

import { signInWithEmailAndPassword } from 'firebase/auth';

import { auth }           from '../../firebase/authentication';

import { pwaAuthError, pwaLogin } from '../../events/names';
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
import { rememberEmail }      from './draft';

@customElement('form-login')
export class FormLogin extends LitElement {

  @property({type: String}) public source      = '';
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
        display:                    grid;
        grid-template-columns:      1fr auto;
      }

      form { display: grid; }

    `
  ] };

  protected render() {
    return html`

      <!-- Log-in State -->
      <form
        @submit=          ${this._handleSubmit}
        autocomplete=     "on"
        novalidate>

        <ul>

          <li>

            <label>Email

              <input
                id=             "${this.source}-login-email"
                part=           "email"
                type=           "email"
                autocomplete=   "email"
                @change=        "${this.handleEmail}">

            </label>

          </li>

          <li>

            <label>Password

              <input
                id=             "${this.source}-login-pass"
                part=           "password"
                type=           "password"
                autocomplete=   "current-password"
                @change=        "${this.handlePassword}">

            </label>

          </li>

          <li>

            <button
              type=       "submit"
              part=       "submit"
              class=      "login action-button">Sign in</button>

          </li>
    
          <!-- Change State 
          <li>

            <p class=     "divider">Or</p>



          </li> -->

        </ul>

        <button
          type="button"
          part="switch"
          class="new"
          @click="${ this.change }">create a new account</button>

      </form>

    `;
  }

  private change() {
    store.dispatch(universalToggle(this.source));
  }

  // Sync Email
  private handleEmail(event: Event) {
    const input     = event.target as HTMLInputElement;
    this.email      = input.value; // Update the property with the input value
    rememberEmail(this.email);
  }

  // Sync Password
  private handlePassword(event: Event) {
    const input     = event.target as HTMLInputElement;
    this.password   = input.value; // Update the property with the input value
  }

  // Required - read the fields on submit
  private readFields() {
    const email     = this.renderRoot.querySelector('input[type="email"]') as HTMLInputElement | null;
    const password  = this.renderRoot.querySelector('input[type="password"]') as HTMLInputElement | null;
    this.email      = email?.value ?? '';
    this.password   = password?.value ?? '';
    rememberEmail(this.email);
  }

  // Form Default
  private _handleSubmit(event: Event) {
    event.preventDefault(); // Prevent Form Default Behaviour
    this.login();
  }
  
  // Login Action
  private login() {
    this.readFields();
    if (this.email.length < 4) {
      const detail = { code: 'pwa/missing-email', message: 'Enter an email address.' };
      emitWindow(pwaAuthError, detail);
      alert(userMessage(detail));
      return;
    }
    if (this.password.length < 6) {
      const detail = { code: 'pwa/short-password', message: 'Password must be at least 6 characters.' };
      emitWindow(pwaAuthError, detail);
      alert(userMessage(detail));
      return;
    }
    this.signIn(this.email,this.password); // Sign in with email and password
  }
  
  // Firebase Authentication Function: Sign in using Email and Password
  private signIn = async (email:string, password:string) => {
  
    try {
      const signed = await signInWithEmailAndPassword(auth, email, password);
      const person = toPwaUser(signed.user);
      if (person) emitWindow(pwaLogin, { user: person });
    } catch (error) {
      emitWindow(pwaAuthError, toAuthError(error));
      alert(userMessage(error));
    }
  
  }

}

declare global {
  interface HTMLElementTagNameMap {
      'form-login': FormLogin;
  }
}
