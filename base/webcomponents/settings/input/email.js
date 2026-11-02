var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { LitElement, css, html } from "lit";
import { property, state } from "lit/decorators.js";
import { connect } from "pwa-helpers";
import store from "../../../store.js";
import { auth } from "../../../firebase/authentication.js";
import { labelStyle } from "../../form/css/label.js";
import { inputStyle } from "../../form/css/input.js";
import { buttonStyle } from "../../form/css/button.js";
import { toggleStyle } from "../../form/css/toggle.js";
import { statusStyle, liveStatus } from "../../form/css/status.js";
import { revealControl } from "../../form/reveal.js";
import { verifyBeforeUpdateEmail } from "firebase/auth";
import { emailActionCodeSettings } from "../../../firebase/authentication.js";
import { sendVerification } from "../../../api/verify.js";
import { reauthenticate, takeAuthFailure } from "../../../firebase/interface.js";
import { pwaAuthError, pwaEmailChanged } from "../../../events/names.js";
import { emitWindow, toAuthError } from "../../../events/emit.js";
import { emitLegacyEmailChanged } from "../../../deprecated/email-changed.js";
import { userMessage } from "../../../firebase/message.js";
export class ContactEmail extends connect(store)(LitElement) {
    constructor() {
        super();
        this.email = '';
        this.login = false;
        this.mail = "";
        this.busy = false;
        this.status = '';
        this.tone = '';
        this.showPassword = false;
        this.saveEmail = async (event) => {
            event.preventDefault();
            if (this.busy)
                return;
            const current = auth.currentUser;
            if (!current) {
                this.show({ code: 'pwa/signed-out', message: 'Sign in first.' });
                return;
            }
            const currentPassword = this.shadowRoot?.querySelector('#pwa-current-email-password')?.value ?? '';
            const contactMail = this.shadowRoot?.querySelector('#pwa-email');
            if (!contactMail) {
                return;
            }
            if (currentPassword.length < 6) {
                this.show({ code: 'pwa/current-password', message: 'Enter your current password.' });
                return;
            }
            this.busy = true;
            this.tone = '';
            this.status = '';
            const ok = await reauthenticate(currentPassword);
            if (!ok) {
                const detail = takeAuthFailure();
                this.tone = 'error';
                this.status = userMessage(detail ?? { code: 'pwa/unknown', message: 'Something went wrong. Try again.' });
                this.busy = false;
                return;
            }
            try {
                const settings = emailActionCodeSettings();
                if (settings)
                    await verifyBeforeUpdateEmail(current, contactMail.value, settings);
                else
                    await verifyBeforeUpdateEmail(current, contactMail.value);
                const detail = { email: contactMail.value };
                emitWindow(pwaEmailChanged, detail);
                emitLegacyEmailChanged(detail);
                this.tone = '';
                this.status = 'Check your inbox to confirm the new address.';
                if (!current.emailVerified) {
                    try {
                        await sendVerification();
                    }
                    catch { }
                }
            }
            catch (error) {
                const detail = toAuthError(error);
                this.tone = 'error';
                this.status = userMessage(error);
                emitWindow(pwaAuthError, detail);
            }
            finally {
                this.busy = false;
            }
        };
    }
    stateChanged(state) {
        this.login = state.frontend.login;
        this.mail = state.backend.email;
    }
    handleEmail(event) {
        const input = event.target;
        this.mail = input.value;
    }
    static get styles() {
        return [
            labelStyle,
            inputStyle,
            buttonStyle,
            toggleStyle,
            statusStyle,
            css `
    
      :host, form { display: grid; align-content: start; }

    `
        ];
    }
    render() {
        return html `

    <form
      autocomplete="on"
      aria-busy="${this.busy ? 'true' : 'false'}"
      @submit="${this.saveEmail}">

      <label for="pwa-current-email-password">Current password</label>

      <span class="pair">

          <input
            id            = "pwa-current-email-password"
            name          = "current_password"
            type          = "${this.showPassword ? 'text' : 'password'}"
            autocomplete  = "current-password"
            aria-invalid  = "${this.tone === 'error' ? 'true' : 'false'}"
            aria-describedby = "pwa-email-status"/>

          ${revealControl(this.showPassword, () => { this.showPassword = !this.showPassword; })}

      </span>

      <label for="pwa-email" >E-mail

        <input
          id            = "pwa-email"
          name          = "email"
          part          = "email"
          type          = "email"
          autocomplete  = "email"
          inputmode     = "email"
          autocapitalize= "off"
          spellcheck    = "false"
          class         = "email"
          aria-invalid  = "${this.tone === 'error' ? 'true' : 'false'}"
          aria-describedby = "pwa-email-status"
          @input        = "${this.handleEmail}"
          .value        = "${this.mail}"/>

      </label>

      ${liveStatus('pwa-email-status', this.status, this.tone)}

      <button
        type          = "submit"
        class         = "action-button"
        part          = "submit"
        aria-busy     = "${this.busy ? 'true' : 'false'}"
        ?disabled     = "${this.login === false || this.busy}">${this.busy ? 'Saving…' : 'Update'}</button>

    </form>

    `;
    }
    show(detail) {
        this.tone = 'error';
        this.status = userMessage(detail);
        emitWindow(pwaAuthError, detail);
    }
}
__decorate([
    property({ type: String, reflect: true }),
    __metadata("design:type", Object)
], ContactEmail.prototype, "email", void 0);
__decorate([
    state(),
    __metadata("design:type", Boolean)
], ContactEmail.prototype, "login", void 0);
__decorate([
    state(),
    __metadata("design:type", String)
], ContactEmail.prototype, "mail", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], ContactEmail.prototype, "busy", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], ContactEmail.prototype, "status", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], ContactEmail.prototype, "tone", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], ContactEmail.prototype, "showPassword", void 0);
customElements.define('contact-email', ContactEmail);
//# sourceMappingURL=email.js.map