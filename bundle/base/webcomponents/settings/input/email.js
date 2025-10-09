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
import { labelStyle } from "../../../css/form/label";
import { inputStyle } from "../../../css/form/input";
import { buttonStyle } from "../../../css/form/button";
import { updateEmail } from "firebase/auth";
export class ContactEmail extends connect(store)(LitElement) {
    email = '';
    login = false;
    mail = "";
    constructor() { super(); }
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
    
      :host {
        display:      grid;
      }

      form { display: grid; }

    `
        ];
    }
    render() {
        return html `

    <form
      autocomplete="off"
      @submit="${this.default}">

      <label for="pwa-email" >E-mail:</label>

      <input
        id            = "pwa-email"
        name          = "email"
        type          = "email"
        class         = "email"
        data-label    = "Account Email"
        @input        = "${this.handleEmail}"
        .value        = "${this.mail}"/>

      <button
        class         = "action-button" 
        @click        = "${this.saveEmail}"
        ?disabled     = "${this.login === false}">Update</button>

    </form>

    `;
    }
    default = (e) => {
        e.preventDefault();
    };
    saveEmail = async () => {
        if (auth.currentUser) {
            let contactMail = this.shadowRoot?.querySelector('#pwa-email');
            await updateEmail(auth.currentUser, contactMail.value).catch((error) => { console.log(error); });
            const emailChangedEvent = new CustomEvent("userEmailChanged", {
                detail: { email: contactMail.value }
            });
            window.dispatchEvent(emailChangedEvent);
            alert('Email Updated');
        }
    };
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