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

import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { signInWithGoogle, takeGoogleNotice } from '../../firebase/google.js';

import { auth }           from '../../firebase/authentication.js';

import { pwaAuthError, pwaLogin, pwaResetSent } from '../../events/names.js';
import { emitWindow, toAuthError, toPwaUser } from '../../events/emit.js';
import { userMessage } from '../../firebase/message.js';

import { buttonStyle }    from './css/button.js';
import { labelStyle }     from './css/label.js';
import { inputStyle }     from './css/input.js';
import { listStyle }      from './css/list.js';
import { toggleStyle }    from './css/toggle.js';
import { statusStyle, liveStatus } from './css/status.js';
import { tapStyle }       from '../css/tap.js';
import { revealControl }  from './reveal.js';
import { googleButton }   from './google-button.js';

import store                  from '../../store.js';
import { universalToggle }    from '../../redux/frontend.js';
import { rememberEmail }      from './draft.js';

/** Required - same sentence as email-reset, whether or not the account exists. */
const sentMessage = 'If an account uses that email, a reset link is on its way.';

@customElement('form-login')
export class FormLogin extends LitElement {

  @property({type: String}) public source      = '';

  /** @attr hide-google */
  @property({type: Boolean, attribute: 'hide-google', reflect: true}) public hideGoogle = false;
  @state() private email        = '';
  @state() private password     = '';
  @state() private status       = '';
  @state() private tone         = '';
  @state() private busy         = false;
  @state() private resetBusy    = false;
  @state() private showPassword = false;

  constructor() { super(); }

  override connectedCallback(): void {
    super.connectedCallback();
    this.adoptRedirect();
  }

  protected updated(): void {
    this.adoptRedirect();
  }

  private adoptRedirect() {
    if (!this.classList.contains('opened')) return;
    const pending = takeGoogleNotice();
    if (!pending) return;
    this.show(pending);
  }

  static get styles() { return [
    listStyle,
    labelStyle,
    inputStyle,
    buttonStyle,
    toggleStyle,
    statusStyle,
    tapStyle,
    css`
    
      :host {
        background-color:           var(--pwa_background, #fff);
      }

      .double {
        display:                    grid;
        grid-template-columns:      1fr auto;
      }

      form { display: grid; }

    `
  ] };

  protected render() {
    const emailId = `${this.source}-login-email`;
    const passId = `${this.source}-login-pass`;
    const statusId = `${this.source || 'page'}-login-status`;
    return html`

      <!-- Log-in State -->
      <form
        @submit=          ${this._handleSubmit}
        autocomplete=     "on"
        aria-busy=        "${this.busy || this.resetBusy ? 'true' : 'false'}"
        novalidate>

        <ul>

          <li>

            <label for="${emailId}">Email

              <input
                id=             "${emailId}"
                name=           "email"
                part=           "email"
                type=           "email"
                autocomplete=   "username"
                inputmode=      "email"
                autocapitalize= "off"
                spellcheck=     "false"
                aria-invalid=   "${this.tone === 'error' ? 'true' : 'false'}"
                aria-describedby="${statusId}"
                @input=         "${this.handleEmail}"
                @change=        "${this.handleEmail}">

            </label>

          </li>

          <li>

            <label for="${passId}">Password

              <span class="pair">

                <input
                  id=             "${passId}"
                  name=           "password"
                  part=           "password"
                  type=           "${this.showPassword ? 'text' : 'password'}"
                  autocomplete=   "current-password"
                  aria-invalid=   "${this.tone === 'error' ? 'true' : 'false'}"
                  aria-describedby="${statusId}"
                  @input=         "${this.handlePassword}"
                  @change=        "${this.handlePassword}">

                ${revealControl(this.showPassword, () => { this.showPassword = !this.showPassword; })}

              </span>

            </label>

          </li>

          <li>

            ${liveStatus(statusId, this.status, this.tone)}

            ${this.hideGoogle ? '' : googleButton(this.busy || this.resetBusy, () => { void this.google(); })}

            <button
              type=       "submit"
              part=       "submit"
              class=      "login action-button"
              aria-busy=  "${this.busy ? 'true' : 'false'}"
              ?disabled=  "${this.busy || this.resetBusy}">${this.busy ? 'Signing in…' : 'Sign in'}</button>

          </li>

        </ul>

        <button
          type="button"
          part="forgot"
          class="new"
          ?disabled="${this.busy || this.resetBusy}"
          @click="${this.forgot}">${this.resetBusy ? 'Sending…' : 'Forgot password?'}</button>

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

  private async google() {
    if (this.busy || this.resetBusy) return;
    this.busy = true;
    this.tone = '';
    this.status = '';
    try {
      await signInWithGoogle();
    } catch (error) {
      this.show(toAuthError(error));
    } finally {
      this.busy = false;
    }
  }

  private show(detail: { code: string; message: string }, error = true) {
    this.tone = error ? 'error' : '';
    this.status = userMessage(detail);
    if (error) emitWindow(pwaAuthError, detail);
  }

  // Sync Email
  private handleEmail(event: Event) {
    const input     = event.target as HTMLInputElement;
    this.email      = input.value;
    rememberEmail(this.email);
  }

  // Sync Password
  private handlePassword(event: Event) {
    const input     = event.target as HTMLInputElement;
    this.password   = input.value;
  }

  // Required - read the fields on submit. Type toggles when the password is shown.
  private readFields() {
    const email     = this.renderRoot.querySelector('input[type="email"]') as HTMLInputElement | null;
    const password  = this.renderRoot.querySelector('input[name="password"]') as HTMLInputElement | null;
    this.email      = email?.value ?? '';
    this.password   = password?.value ?? '';
    rememberEmail(this.email);
  }

  // Form Default
  private _handleSubmit(event: Event) {
    event.preventDefault();
    void this.login();
  }
  
  // Login Action
  private async login() {
    if (this.busy) return;
    this.readFields();
    if (this.email.length < 4) {
      this.show({ code: 'pwa/missing-email', message: 'Enter an email address.' });
      return;
    }
    // Required - sign-in sends the stored password. The 8-character rule is for a new one.
    if (!this.password) {
      this.show({ code: 'pwa/missing-password', message: 'Enter a password.' });
      return;
    }
    await this.signIn(this.email, this.password);
  }
  
  // Firebase Authentication Function: Sign in using Email and Password
  private signIn = async (email: string, password: string) => {

    this.busy = true;
    this.tone = '';
    this.status = '';

    try {
      const signed = await signInWithEmailAndPassword(auth, email, password);
      const person = toPwaUser(signed.user);
      if (person) emitWindow(pwaLogin, { user: person });
    } catch (error) {
      this.show(toAuthError(error));
    } finally {
      this.busy = false;
    }

  }

  // Required - reset for the address already in the form
  private forgot = async () => {

    if (this.busy || this.resetBusy) return;

    this.readFields();
    const email = this.email.trim();

    if (email.length < 4) {
      this.show({ code: 'pwa/missing-email', message: 'Enter an email address.' });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      this.show({ code: 'pwa/invalid-email', message: 'Enter a valid email address.' });
      return;
    }

    this.resetBusy = true;
    this.tone = '';
    this.status = '';

    try {
      await sendPasswordResetEmail(auth, email);
      this.sent(email);
    } catch (error) {
      if (toAuthError(error).code === 'auth/user-not-found') this.sent(email);
      else this.show(toAuthError(error));
    } finally {
      this.resetBusy = false;
    }

  }

  private sent(email: string) {
    this.tone = '';
    this.status = sentMessage;
    emitWindow(pwaResetSent, { email });
  }

}

declare global {
  interface HTMLElementTagNameMap {
      'form-login': FormLogin;
  }
}
