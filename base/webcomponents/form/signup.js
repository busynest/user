var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { signInWithGoogle, takeGoogleNotice } from '../../firebase/google.js';
import { auth } from '../../firebase/authentication.js';
import { logAccount } from '../../firebase/interface.js';
import { sendVerification } from '../../api/verify.js';
import { pwaAuthError, pwaSignup } from '../../events/names.js';
import { emitWindow, toAuthError, toPwaUser } from '../../events/emit.js';
import { userMessage } from '../../firebase/message.js';
import { newPasswordIssue, passwordHint, passwordMax, passwordMin } from '../../firebase/password.js';
import { buttonStyle } from './css/button.js';
import { labelStyle } from './css/label.js';
import { inputStyle } from './css/input.js';
import { listStyle } from './css/list.js';
import { toggleStyle } from './css/toggle.js';
import { statusStyle, liveStatus } from './css/status.js';
import { noticeStyle } from './css/notice.js';
import { tapStyle } from '../css/tap.js';
import { revealControl } from './reveal.js';
import { googleButton } from './google-button.js';
import { markVerificationNotice } from './notice.js';
import store from '../../store.js';
import { universalToggle } from '../../redux/frontend.js';
const sentMessage = 'Check your inbox for the verification email. You can still sign in.';
let FormSignup = class FormSignup extends LitElement {
    constructor() {
        super();
        this.source = '';
        this.hideGoogle = false;
        this.email = '';
        this.password = '';
        this.status = '';
        this.tone = '';
        this.busy = false;
        this.showPassword = false;
        this.notice = '';
        this.newAccount = async (email, password) => {
            this.busy = true;
            this.tone = '';
            this.status = '';
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                await logAccount();
                const person = toPwaUser(userCredential.user);
                if (person)
                    emitWindow(pwaSignup, { user: person });
                try {
                    await sendVerification();
                    this.notice = sentMessage;
                    markVerificationNotice(email);
                }
                catch (error) {
                    this.tone = 'error';
                    this.status = userMessage(error);
                }
            }
            catch (error) {
                this.show(toAuthError(error));
            }
            finally {
                this.busy = false;
            }
        };
    }
    connectedCallback() {
        super.connectedCallback();
        this.adoptRedirect();
    }
    updated() {
        this.adoptRedirect();
    }
    adoptRedirect() {
        if (!this.classList.contains('opened'))
            return;
        const pending = takeGoogleNotice();
        if (!pending)
            return;
        this.show(pending);
    }
    static get styles() {
        return [
            listStyle,
            labelStyle,
            inputStyle,
            buttonStyle,
            toggleStyle,
            statusStyle,
            noticeStyle,
            tapStyle,
            css `

      :host {
        background-color:           var(--pwa_background, var(--section_background_color, #fff));
      }
    
      .double {
        display: grid;
        grid-template-columns: 1fr auto;
      }

      form { display: grid; }

    `
        ];
    }
    ;
    render() {
        const emailId = `${this.source}-signup-email`;
        const passId = `${this.source}-signup-pass`;
        const hintId = `${this.source || 'page'}-signup-password-hint`;
        const statusId = `${this.source || 'page'}-signup-status`;
        return html `
  
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

            <label for="${passId}">Password</label>

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

          </li>

          <li>

            ${liveStatus(statusId, this.status, this.tone)}

            ${this.hideGoogle ? '' : googleButton(this.busy, () => { void this.google(); })}

            <button
              type=         "submit"
              part=         "submit"
              class=        "newUser action-button"
              aria-busy=    "${this.busy ? 'true' : 'false'}"
              ?disabled=    "${this.busy}">${this.busy ? 'Creating account…' : 'Sign up'}</button>

          </li>

        </ul>

        ${this.notice ? html `
          <p class="notice" part="notice" role="status" aria-live="polite">${this.notice}</p>
        ` : ''}

        <button
          type="button"
          part="switch"
          class="new"
          @click="${this.change}">login with existing email</button>

      </form>

    `;
    }
    change() {
        store.dispatch(universalToggle(this.source));
    }
    async google() {
        if (this.busy)
            return;
        this.busy = true;
        this.tone = '';
        this.status = '';
        try {
            await signInWithGoogle();
        }
        catch (error) {
            this.show(toAuthError(error));
        }
        finally {
            this.busy = false;
        }
    }
    show(detail) {
        this.tone = 'error';
        this.status = userMessage(detail);
        emitWindow(pwaAuthError, detail);
    }
    readFields() {
        const email = this.renderRoot.querySelector('input[type="email"]');
        const password = this.renderRoot.querySelector('input[name="new-password"]');
        this.email = email?.value ?? '';
        this.password = password?.value ?? '';
    }
    _handleSubmit(event) {
        event.preventDefault();
        void this.signUp();
    }
    handleEmail(event) {
        const input = event.target;
        this.email = input.value;
    }
    handlePassword(event) {
        const input = event.target;
        this.password = input.value;
    }
    async signUp() {
        if (this.busy)
            return;
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
};
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], FormSignup.prototype, "source", void 0);
__decorate([
    property({ type: Boolean, attribute: 'hide-google', reflect: true }),
    __metadata("design:type", Object)
], FormSignup.prototype, "hideGoogle", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], FormSignup.prototype, "email", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], FormSignup.prototype, "password", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], FormSignup.prototype, "status", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], FormSignup.prototype, "tone", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], FormSignup.prototype, "busy", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], FormSignup.prototype, "showPassword", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], FormSignup.prototype, "notice", void 0);
FormSignup = __decorate([
    customElement('form-signup'),
    __metadata("design:paramtypes", [])
], FormSignup);
export { FormSignup };
//# sourceMappingURL=signup.js.map