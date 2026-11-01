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
import { state } from "lit/decorators.js";
import { connect } from "pwa-helpers";
import store from "../../../store.js";
import { auth } from "../../../firebase/authentication.js";
import { labelStyle } from "../../form/css/label.js";
import { inputStyle } from "../../form/css/input.js";
import { buttonStyle } from "../../form/css/button.js";
import { toggleStyle } from "../../form/css/toggle.js";
import { statusStyle, liveStatus } from "../../form/css/status.js";
import { revealControl } from "../../form/reveal.js";
import { updatePassword } from "firebase/auth";
import { reauthenticate, takeAuthFailure } from "../../../firebase/interface.js";
import { pwaAuthError, pwaPasswordChanged } from "../../../events/names.js";
import { emitWindow, toAuthError } from "../../../events/emit.js";
import { userMessage } from "../../../firebase/message.js";
import { newPasswordIssue, passwordHint, passwordMax, passwordMin, passwordMismatch } from "../../../firebase/password.js";
export class InputPassword extends connect(store)(LitElement) {
    constructor() {
        super();
        this.message = '';
        this.tone = '';
        this.password = '';
        this.login = false;
        this.busy = false;
        this.showCurrent = false;
        this.showNext = false;
        this.showVerify = false;
        this.default = (event) => {
            event.preventDefault();
            void this.alertPassword();
        };
        this.updatePass = async (currentPassword, newPassword) => {
            const current = auth.currentUser;
            if (!current) {
                this.show({ code: 'pwa/signed-out', message: 'Sign in first.' });
                return;
            }
            this.busy = true;
            this.tone = '';
            this.message = '';
            const ok = await reauthenticate(currentPassword);
            if (!ok) {
                const detail = takeAuthFailure();
                this.tone = 'error';
                this.message = userMessage(detail ?? { code: 'pwa/unknown', message: 'Something went wrong. Try again.' });
                this.busy = false;
                return;
            }
            try {
                await updatePassword(current, newPassword);
                this.tone = '';
                this.message = 'Password saved.';
                emitWindow(pwaPasswordChanged, { uid: current.uid });
            }
            catch (error) {
                const detail = toAuthError(error);
                this.tone = 'error';
                this.message = userMessage(error);
                emitWindow(pwaAuthError, detail);
            }
            finally {
                this.busy = false;
            }
        };
    }
    stateChanged(state) {
        this.login = state.frontend.login;
    }
    handleInputChange(event) {
        const input = event.target;
        this.password = input.value;
    }
    static get styles() {
        return [
            labelStyle,
            inputStyle,
            buttonStyle,
            toggleStyle,
            statusStyle,
            css `

      :host{
        display:        grid;
        align-content:  start;
      }

      form { display: grid; align-content: start; }

    `
        ];
    }
    render() {
        return html `

      <form
        autocomplete="on"
        aria-busy="${this.busy ? 'true' : 'false'}"
        @submit="${this.default}">

        <div>

          <label for="pwa-current-password">Current Password

            <span class="pair">

              <input
                id      = "pwa-current-password"
                name    = "current_password"
                type    = "${this.showCurrent ? 'text' : 'password'}"
                autocomplete = "current-password"
                aria-describedby = "pwa-password-status">

              ${revealControl(this.showCurrent, () => { this.showCurrent = !this.showCurrent; })}

            </span>

          </label>

        </div>

        <div>
          
          <label for="pwa-new-password">New Password

            <span class="pair">

              <input
                id      = "pwa-new-password"
                name    = "new_password"
                part    = "password"
                type    = "${this.showNext ? 'text' : 'password'}"
                autocomplete = "new-password"
                minlength    = "${passwordMin}"
                maxlength    = "${passwordMax}"
                .value  = "${this.password}"
                @input  = "${this.handleInputChange}"
                aria-describedby = "pwa-new-password-hint pwa-password-status">

              ${revealControl(this.showNext, () => { this.showNext = !this.showNext; })}

            </span>

            <p id="pwa-new-password-hint" class="hint" part="hint">${passwordHint}</p>

          </label>

        </div>

        <div>

          <label for="pwa-verify-password">Verify Password

            <span class="pair">

              <input
                id      = "pwa-verify-password"
                name    = "verify_password"
                part    = "verify"
                type    = "${this.showVerify ? 'text' : 'password'}"
                autocomplete = "new-password"
                minlength    = "${passwordMin}"
                maxlength    = "${passwordMax}"
                aria-describedby = "pwa-password-status">

              ${revealControl(this.showVerify, () => { this.showVerify = !this.showVerify; })}

            </span>

          </label>

        </div>

        ${liveStatus('pwa-password-status', this.message, this.tone)}

        <button
          type="submit"
          part="submit"
          class="action-button pass"
          aria-busy="${this.busy ? 'true' : 'false'}"
          ?disabled="${this.login === false || this.busy}">${this.busy ? 'Saving…' : 'Update'}</button>

      </form>

    `;
    }
    show(detail) {
        this.tone = 'error';
        this.message = userMessage(detail);
        emitWindow(pwaAuthError, detail);
    }
    async alertPassword() {
        if (this.busy)
            return;
        const currentPassword = this.shadowRoot.querySelector('#pwa-current-password').value;
        const entered = this.shadowRoot.querySelector('#pwa-new-password').value;
        const verify = this.shadowRoot.querySelector('#pwa-verify-password').value;
        this.password = entered;
        if (currentPassword.length < 6) {
            this.show({ code: 'pwa/current-password', message: 'Enter your current password.' });
            return;
        }
        const issue = newPasswordIssue(this.password);
        if (issue) {
            this.show(issue);
            return;
        }
        if (this.password !== verify) {
            this.show({ code: 'pwa/password-mismatch', message: passwordMismatch });
            return;
        }
        if (!auth.currentUser) {
            this.show({ code: 'pwa/signed-out', message: 'Sign in first.' });
            return;
        }
        await this.updatePass(currentPassword, this.password);
    }
}
__decorate([
    state(),
    __metadata("design:type", String)
], InputPassword.prototype, "message", void 0);
__decorate([
    state(),
    __metadata("design:type", String)
], InputPassword.prototype, "tone", void 0);
__decorate([
    state(),
    __metadata("design:type", String)
], InputPassword.prototype, "password", void 0);
__decorate([
    state(),
    __metadata("design:type", Boolean)
], InputPassword.prototype, "login", void 0);
__decorate([
    state(),
    __metadata("design:type", Boolean)
], InputPassword.prototype, "busy", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], InputPassword.prototype, "showCurrent", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], InputPassword.prototype, "showNext", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], InputPassword.prototype, "showVerify", void 0);
customElements.define('input-password', InputPassword);
//# sourceMappingURL=password.js.map