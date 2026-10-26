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

import {
  EmailAuthProvider,
  signInWithCredential
}                         from 'firebase/auth';

import { auth }           from '../../firebase/authentication';

import { buttonStyle }    from './css/button';
import { labelStyle }     from './css/label';
import { inputStyle }     from './css/input';
import { listStyle }      from './css/list';
import { toggleStyle }    from './css/toggle';
import { tapStyle }       from '../css/tap';

import store                  from '../../store';
import { universalToggle }    from '../../redux/frontend';

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
        background-color:           white;
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
        autocomplete=     "on">

        <ul>

          <li>

            <label>Email

              <input
                id=       "${this.source}-login-email"
                type=     "email"
                @change=  "${this.handleEmail}">

            </label>

          </li>

          <li>

            <label>Password

              <input
                id=       "${this.source}-login-pass"
                type=     "password"
                @change=  "${this.handlePassword}">

            </label>

          </li>

          <li>

            <button
              type=       "submit"
              class=      "login action-button">Sign in</button>

          </li>
    
          <!-- Change State 
          <li>

            <p class=     "divider">Or</p>



          </li> -->

        </ul>

        <button
          type="button"
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
  }

  // Form Default
  private _handleSubmit(event: Event) {
    event.preventDefault(); // Prevent Form Default Behaviour
    this.login();
  }
  
  // Login Action
  private login() {
    this.readFields();
    if (this.email.length < 4) { alert('Please enter an email address.'); return; }
    if (this.password.length < 4) { alert('Please enter a password.'); return; }
    this.signIn(this.email,this.password); // Sign in with email and password
  }
  
  // Firebase Authentication Function: Sign in using Email and Password
  private signIn = async (email:string, password:string) => {
  
    try {
      const authCredential = EmailAuthProvider.credential(email, password);
      await signInWithCredential(auth, authCredential);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Sign in failed');
    }
  
  }

}

declare global {
  interface HTMLElementTagNameMap {
      'form-login': FormLogin;
  }
}
