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
    css`
    
      :host {
        background-color:           white;
      }

      .double {
        display:                    grid;
        grid-template-columns:      1fr auto;
      }

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
              class=      "login action-button"
              @click=     "${this.login}">Sign in</button>

          </li>
    
          <!-- Change State -->
          <li>

            <p class=     "divider">Or</p>

            <button
              class=      "new"
              @click=     "${ this.change }">create a new account</button>

          </li>

        </ul>

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

  // Form Default
  private _handleSubmit(event: Event) {
    event.preventDefault(); // Prevent Form Default Behaviour
  }
  
  // Login Action
  private login() {
    if (this.email.length < 4) { alert('Please enter an email address.'); return; }
    if (this.password.length < 4) { alert('Please enter a password.'); return; }
    this.signIn(this.email,this.password); // Sign in with email and password
  }

  
  // Firebase Authentication Function: Sign in using Email and Password
  private signIn = async (email:any, password:any) => {
  
    const authCredential = EmailAuthProvider.credential(email, password);

    await signInWithCredential(auth, authCredential).catch((error)=>{console.log(error)}); /*.then((/*credentials*)=>{/*onsole.log(credentials)})*/ 
  
    // await signInWithEmailAndPassword(auth, email, password);
    // EmailAuthProvider.credential(email, password);
  
  }

}

declare global {
  interface HTMLElementTagNameMap {
      'form-login': FormLogin;
  }
}
