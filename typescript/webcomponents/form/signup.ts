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
  createUserWithEmailAndPassword
}                         from 'firebase/auth';

import { auth }           from '../../firebase/authentication.js';
import { logAccount }     from '../../firebase/interface.js';
import { sendVerification } from '../../api/verify.js';

import { pwaAuthError, pwaSignup } from '../../events/names.js';
import { emitWindow, toAuthError, toPwaUser } from '../../events/emit.js';
import { userMessage } from '../../firebase/message.js';
import { newPasswordIssue, passwordHint, passwordMax, passwordMin } from '../../firebase/password.js';

import { buttonStyle }    from './css/button.js';
import { labelStyle }     from './css/label.js';
import { inputStyle }     from './css/input.js';
import { listStyle }      from './css/list.js';
import { toggleStyle }    from './css/toggle.js';
import { statusStyle, liveStatus } from './css/status.js';
import { noticeStyle }    from './css/notice.js';
import { tapStyle }       from '../css/tap.js';
import { revealControl }  from './reveal.js';
import { markVerificationNotice } from './notice.js';

import store                  from '../../store.js';
import { universalToggle }    from '../../redux/frontend.js';

/** Required - same sentence as the resend control in settings. */
const sentMessage = 'Check your inbox for the verification email. You can still sign in.';

@customElement('form-signup')
export class FormSignup extends LitElement {

  
  @property({type: String}) public source        = '';
  @state() private email        = '';
  @state() private password     = '';
  @state() private status       = '';
  @state() private tone         = '';
  @state() private busy         = false;
  @state() private showPassword = false;
  @state() private notice       = '';

  constructor() { super(); }

  static get styles() { return [
    listStyle,
    labelStyle,
    inputStyle,
    buttonStyle,
    toggleStyle,
    statusStyle,
    noticeStyle,
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
    const emailId = `${this.source}-signup-email`;
    const passId = `${this.source}-signup-pass`;
    const hintId = `${this.source || 'page'}-signup-password-hint`;
    const statusId = `${this.source || 'page'}-signup-status`;
    return html`
  
      <!-- Sign Up State-->
      <form
        @submit=            ${this._handleSubmit}
        autocomplete=       "on"
        aria-busy=          "${this.busy ? 'true' : 'false'}"
        novalidate>
        
        <ul>

          <li>

            <label for="${emailId}">Email

              <input
                id=           "${emailId}"
                name=         "email"
                part=         "email"
                type=         "email"
                autocomplete= "email"
                inputmode=    "email"
                autocapitalize="off"
                spellcheck=   "false"
                aria-invalid= "${this.tone === 'error' ? 'true' : 'false'}"
                aria-describedby="${statusId}"
                @input=       "${this.handleEmail}"
                @change=      "${this.handleEmail}">

            </label>

          </li>

          <li>

            <label for="${passId}">Password
              
              <span class="pair">

                <input
                  id=           "${passId}"
                  name=         "new-password"
                  part=         "password"
                  type=         "${this.showPassword ? 'text' : 'password'}"
                  autocomplete= "new-password"
                  minlength=    "${passwordMin}"
                  maxlength=    "${passwordMax}"
                  aria-invalid= "${this.tone === 'error' ? 'true' : 'false'}"
                  aria-describedby="${hintId} ${statusId}"
                  @input=       "${this.handlePassword}"
                  @change=      "${this.handlePassword}">

                ${revealControl(this.showPassword, () => { this.showPassword = !this.showPassword; })}

              </span>

              <p id="${hintId}" class="hint" part="hint">${passwordHint}</p>

            </label>

          </li>

          <li>

            ${liveStatus(statusId, this.status, this.tone)}

            <button
              type=         "submit"
              part=         "submit"
              class=        "newUser action-button"
              aria-busy=    "${this.busy ? 'true' : 'false'}"
              ?disabled=    "${this.busy}">${this.busy ? 'Creating account…' : 'Sign up'}</button>

          </li>

        </ul>

        ${this.notice ? html`
          <p class="notice" part="notice" role="status" aria-live="polite">${this.notice}</p>
        ` : ''}

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

  private show(detail: { code: string; message: string }) {
    this.tone = 'error';
    this.status = userMessage(detail);
    emitWindow(pwaAuthError, detail);
  }

  // Required - read the fields on submit. Type toggles when the password is shown.
  private readFields() {
    const email     = this.renderRoot.querySelector('input[type="email"]') as HTMLInputElement | null;
    const password  = this.renderRoot.querySelector('input[name="new-password"]') as HTMLInputElement | null;
    this.email      = email?.value ?? '';
    this.password   = password?.value ?? '';
  }

  // Form Default Behavior
  private _handleSubmit(event: Event) {
    event.preventDefault();
    void this.signUp();
  }

  // Sync Email
  private handleEmail(event: Event) {
    const input =     event.target as HTMLInputElement;
    this.email =      input.value;
  }

  // Sync Password
  private handlePassword(event: Event) {
    const input =     event.target as HTMLInputElement;
    this.password =   input.value;
  }

  // Sign Up Action
  private async signUp() {
    if (this.busy) return;
    this.readFields();
    if (this.email.length < 4) {
      this.show({ code: 'pwa/missing-email', message: 'Enter an email address.' });
      return;
    }
    const issue = newPasswordIssue(this.password);
    if (issue) {
      this.show(issue);
      return;
    }
    await this.newAccount(this.email, this.password);
  }

  // Create New Account using Email and Password
  private newAccount = async (email: string, password: string) => {

    this.busy = true;
    this.tone = '';
    this.status = '';

    try {

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await logAccount();
      const person = toPwaUser(userCredential.user);
      if (person) emitWindow(pwaSignup, { user: person });

      // Required - the account exists even when the verification mail fails
      try {
        await sendVerification();
        this.notice = sentMessage;
        markVerificationNotice(email);
      } catch (error) {
        // Required - sendVerification already dispatched pwa-auth-error
        this.tone = 'error';
        this.status = userMessage(error);
      }

    } catch (error) {

      this.show(toAuthError(error));

    } finally {
      this.busy = false;
    }

  }

}

declare global {
  interface HTMLElementTagNameMap {
      'form-signup': FormSignup;
  }
}
