import { html, LitElement, css }          from 'lit';
import { customElement, state }           from 'lit/decorators.js';

import { EmailAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth }           from '../../../start';

import { buttonStyle }    from '../../../css/form/button';
import { labelStyle }     from '../../../css/form/label';
import { inputStyle }     from '../../../css/form/input';
import { listStyle }      from '../../../css/form/list';
import { toggleStyle }    from '../css/toggle';

import store              from '../../../store';
import { signUpAction }   from '../../../redux/frontend';

@customElement('user-log-in')
export class UserLogIn extends LitElement {

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

      <!-- Log-in State -->
      <form
        @submit=${this._handleSubmit}
        autocomplete="on">

        <ul>

          <li>
            <label for="pwa-login-email">Email</label>
            <input
              id="pwa-login-email"
              type="email"
              @change="${this.handleEmail}">
          </li>

          <li>
            <label for="pwa-login-pass">Password</label>
            <input
              id="pwa-login-pass"
              type="password"
              @change="${this.handlePassword}">
          </li>

          <li>
            <button
              class="login action-button"
              @click="${this.login}">Sign in</button>

          </li>
    
          <!-- Change State -->
          <li>
            <p class="divider">Or</p>
            <button
              class="new"
              @click="${ this.change }">create a new account</button>
          </li>

        </ul>

      </form>

    `;
  }

  private change() {
    store.dispatch(signUpAction());
  }

  // Sync Email
  private handleEmail(event: Event) {
    const input   = event.target as HTMLInputElement;
    this.email    = input.value; // Update the property with the input value
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
      'user-log-in': UserLogIn;
  }
}
