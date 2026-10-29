var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { html, css } from 'lit';
import { customElement, state } from "lit/decorators.js";
import { LazyLoader } from '../../lazyLoader';
import { auth } from '../../firebase/authentication';
import { sendPasswordResetEmail } from 'firebase/auth';
import { pwaAuthError } from '../../events/names';
import { emitWindow, toAuthError } from '../../events/emit';
import { userMessage } from '../../firebase/message';
import { labelStyle } from './css/label';
import { inputStyle } from './css/input';
import { buttonStyle } from './css/button';
let EmailReset = class EmailReset extends LazyLoader {
    constructor() {
        super();
        this.userEmail = '';
        this.resetPassword = async (event) => {
            event.preventDefault();
            const input = this.renderRoot.querySelector('.email');
            this.userEmail = input?.value ?? '';
            if (this.userEmail.length < 4) {
                const detail = { code: 'pwa/missing-email', message: 'Enter an email address.' };
                emitWindow(pwaAuthError, detail);
                alert(userMessage(detail));
                return;
            }
            try {
                await sendPasswordResetEmail(auth, this.userEmail);
                alert('Check your inbox for the reset email.');
            }
            catch (error) {
                emitWindow(pwaAuthError, toAuthError(error));
                alert(userMessage(error));
            }
        };
    }
    static { this.styles = [
        labelStyle,
        inputStyle,
        buttonStyle,
        css `:host { display: block; }`
    ]; }
    handleEmail(event) {
        const input = event.target;
        this.userEmail = input.value;
    }
    render() {
        return html `

      <form
        class="resetPass"
        novalidate
        @submit="${this.resetPassword}">

        <label>Email

          <input
            class         = "email"
            part          = "email"
            type          = "email"
            autocomplete  = "email"
            @change       = "${this.handleEmail}">

        </label>

        <button
          type          = "submit"
          part          = "submit"
          class         = "reset action-button">Send reset email</button>

      </form>

    `;
    }
};
__decorate([
    state(),
    __metadata("design:type", String)
], EmailReset.prototype, "userEmail", void 0);
EmailReset = __decorate([
    customElement('email-reset'),
    __metadata("design:paramtypes", [])
], EmailReset);
export { EmailReset };
//# sourceMappingURL=forgot.js.map