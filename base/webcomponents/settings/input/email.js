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
import store from "../../../store";
import { auth } from "../../../firebase/authentication";
import { labelStyle } from "../../form/css/label";
import { inputStyle } from "../../form/css/input";
import { buttonStyle } from "../../form/css/button";
import { verifyBeforeUpdateEmail } from "firebase/auth";
import { reauthenticate } from "../../../firebase/interface";
export class ContactEmail extends connect(store)(LitElement) {
    constructor() {
        super();
        this.email = '';
        this.login = false;
        this.mail = "";
        this.saveEmail = async (event) => {
            event.preventDefault();
            const current = auth.currentUser;
            if (!current) {
                alert('Please Login');
                return;
            }
            const currentPassword = this.shadowRoot?.querySelector('#pwa-current-email-password')?.value ?? '';
            const contactMail = this.shadowRoot?.querySelector('#pwa-email');
            if (!contactMail) {
                return;
            }
            if (currentPassword.length < 6) {
                alert('Enter your current password.');
                return;
            }
            const ok = await reauthenticate(currentPassword);
            if (!ok) {
                return;
            }
            try {
                await verifyBeforeUpdateEmail(current, contactMail.value);
                window.dispatchEvent(new CustomEvent("userEmailChanged", {
                    detail: { email: contactMail.value }
                }));
                alert('Verification email sent');
            }
            catch (error) {
                alert(error instanceof Error ? error.message : 'Email was not updated');
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
            css `
    
      :host, form { display: grid; }

    `
        ];
    }
    render() {
        return html `

    <form
      autocomplete="off"
      @submit="${this.saveEmail}">

      <label for="pwa-current-email-password">Current password

        <input
          id            = "pwa-current-email-password"
          name          = "current_password"
          type          = "password"
          autocomplete  = "current-password"/>

      </label>

      <label for="pwa-email" >E-mail:

        <input
          id            = "pwa-email"
          name          = "email"
          type          = "email"
          class         = "email"
          data-label    = "Account Email"
          @input        = "${this.handleEmail}"
          .value        = "${this.mail}"/>

        <span class="verified"></span>

      </label>

      <button
        type          = "submit"
        class         = "action-button"
        ?disabled     = "${this.login === false}">Update</button>

    </form>

    `;
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
customElements.define('contact-email', ContactEmail);
//# sourceMappingURL=email.js.map