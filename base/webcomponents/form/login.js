var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { html, LitElement, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { signInWithGoogle, takeGoogleNotice } from '../../firebase/google.js';
import { auth } from '../../firebase/authentication.js';
import { pwaAuthError, pwaLogin, pwaResetSent } from '../../events/names.js';
import { emitWindow, toAuthError, toPwaUser } from '../../events/emit.js';
import { userMessage } from '../../firebase/message.js';
import { buttonStyle } from './css/button.js';
import { labelStyle } from './css/label.js';
import { inputStyle } from './css/input.js';
import { listStyle } from './css/list.js';
import { toggleStyle } from './css/toggle.js';
import { statusStyle, liveStatus } from './css/status.js';
import { tapStyle } from '../css/tap.js';
import { revealControl } from './reveal.js';
import { googleButton } from './google-button.js';
import store from '../../store.js';
import { universalToggle } from '../../redux/session.js';
import { rememberEmail } from './draft.js';
const sentMessage = 'If an account uses that email, a reset link is on its way.';
let FormLogin = class FormLogin extends LitElement {
    constructor() {
        super();
        this.source = '';
        this.hideGoogle = false;
        this.email = '';
        this.password = '';
        this.status = '';
        this.tone = '';
        this.busy = false;
        this.resetBusy = false;
        this.showPassword = false;
        this.signIn = async (email, password) => {
            this.busy = true;
            this.tone = '';
            this.status = '';
            try {
                const signed = await signInWithEmailAndPassword(auth, email, password);
                const person = toPwaUser(signed.user);
                if (person)
                    emitWindow(pwaLogin, { user: person });
            }
            catch (error) {
                this.show(toAuthError(error));
            }
            finally {
                this.busy = false;
            }
        };
        this.forgot = async () => {
            if (this.busy || this.resetBusy)
                return;
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
            }
            catch (error) {
                if (toAuthError(error).code === 'auth/user-not-found')
                    this.sent(email);
                else
                    this.show(toAuthError(error));
            }
            finally {
                this.resetBusy = false;
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
            tapStyle,
            css `
    
      :host {
        background-color:           var(--pwa_background, var(--section_background_color, #fff));
      }

      .double {
        display:                    grid;
        grid-template-columns:      1fr auto;
      }

      form { display: grid; }

    `
        ];
    }
    ;
    render() {
        const emailId = `${this.source}-login-email`;
        const passId = `${this.source}-login-pass`;
        const statusId = `${this.source || 'page'}-login-status`;
        return html `

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

            <label for="${passId}">Password</label>

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
          @click="${this.change}">create a new account</button>

      </form>

    `;
    }
    change() {
        store.dispatch(universalToggle(this.source));
    }
    async google() {
        if (this.busy || this.resetBusy)
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
    show(detail, error = true) {
        this.tone = error ? 'error' : '';
        this.status = userMessage(detail);
        if (error)
            emitWindow(pwaAuthError, detail);
    }
    handleEmail(event) {
        const input = event.target;
        this.email = input.value;
        rememberEmail(this.email);
    }
    handlePassword(event) {
        const input = event.target;
        this.password = input.value;
    }
    readFields() {
        const email = this.renderRoot.querySelector('input[type="email"]');
        const password = this.renderRoot.querySelector('input[name="password"]');
        this.email = email?.value ?? '';
        this.password = password?.value ?? '';
        rememberEmail(this.email);
    }
    _handleSubmit(event) {
        event.preventDefault();
        void this.login();
    }
    async login() {
        if (this.busy)
            return;
        this.readFields();
        if (this.email.length < 4) {
            this.show({ code: 'pwa/missing-email', message: 'Enter an email address.' });
            return;
        }
        if (!this.password) {
            this.show({ code: 'pwa/missing-password', message: 'Enter a password.' });
            return;
        }
        await this.signIn(this.email, this.password);
    }
    sent(email) {
        this.tone = '';
        this.status = sentMessage;
        emitWindow(pwaResetSent, { email });
    }
};
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], FormLogin.prototype, "source", void 0);
__decorate([
    property({ type: Boolean, attribute: 'hide-google', reflect: true }),
    __metadata("design:type", Object)
], FormLogin.prototype, "hideGoogle", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], FormLogin.prototype, "email", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], FormLogin.prototype, "password", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], FormLogin.prototype, "status", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], FormLogin.prototype, "tone", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], FormLogin.prototype, "busy", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], FormLogin.prototype, "resetBusy", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], FormLogin.prototype, "showPassword", void 0);
FormLogin = __decorate([
    customElement('form-login'),
    __metadata("design:paramtypes", [])
], FormLogin);
export { FormLogin };
//# sourceMappingURL=login.js.map