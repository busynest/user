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
import store from "../../../store";
import { auth } from "../../../firebase/authentication";
import { labelStyle } from "../../form/css/label";
import { inputStyle } from "../../form/css/input";
import { buttonStyle } from "../../form/css/button";
import { updatePassword } from "firebase/auth";
import { pwaAuthError, pwaPasswordChanged } from "../../../events/names";
import { emitWindow, toAuthError } from "../../../events/emit";
import { userMessage } from "../../../firebase/message";
export class InputPassword extends connect(store)(LitElement) {
    constructor() {
        super();
        this.message = '';
        this.password = '';
        this.login = false;
        this.default = (e) => {
            e.preventDefault();
            this.alertPassword();
        };
        this.updatePass = async (newPassword) => {
            if (auth.currentUser) {
                const current = auth.currentUser;
                await updatePassword(current, newPassword)
                    .then(() => { emitWindow(pwaPasswordChanged, { uid: current.uid }); })
                    .catch((error) => {
                    emitWindow(pwaAuthError, toAuthError(error));
                    alert(userMessage(error));
                });
            }
            else {
                const detail = { code: 'pwa/signed-out', message: 'Sign in first.' };
                emitWindow(pwaAuthError, detail);
                alert(userMessage(detail));
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
            css `

      :host{
        display:        grid;
      }

      form { display: grid; grid-template-rows: 1fr 1fr auto;}

      p.error { color: red; }
    
    `
        ];
    }
    render() {
        return html `

      <form
        autocomplete="off"
        @submit="${this.default}">

        <!-- Input - 1 -->
        <div>
          
          <label for="pwa-new-password">New Password

            <input
              id      = "pwa-new-password"
              name    = "new_password"
              part    = "password"
              type    = "password"
              autocomplete = "new-password"
              .value  = "${this.password}"
              @input  = "${this.handleInputChange}"
              aria-describedby = "password-help">

          </label>

        </div>

        <!-- Input - 2 -->
        <div>

          <label for="pwa-verify-password">Verify Password

            <input
              id      = "pwa-verify-password"
              name    = "verify_password"
              part    = "verify"
              type    = "password"
              autocomplete = "new-password">

          </label>

          ${this.message ? html `

            <p
              class=${this.message.includes('Password entered') ? '' : 'error'}
              aria-live="polite">

              ${this.message}

            </p>

          ` : ''}

        </div>

        <!-- Submit -->
        <button
          type="submit"
          part="submit"
          class="action-button pass"
          ?disabled="${this.login === false}">Update</button>

      </form>

    `;
    }
    alertPassword() {
        const entered = this.shadowRoot.querySelector('#pwa-new-password').value;
        const verify = this.shadowRoot.querySelector('#pwa-verify-password').value;
        this.password = entered;
        if (!this.password) {
            this.message = 'Please enter a password';
            emitWindow(pwaAuthError, { code: 'pwa/missing-password', message: this.message });
        }
        else if (this.password !== verify) {
            this.message = 'Passwords do not match';
            emitWindow(pwaAuthError, { code: 'pwa/password-mismatch', message: this.message });
        }
        else if (this.password.length < 8) {
            this.message = 'Password must be at least 8 characters long';
            emitWindow(pwaAuthError, { code: 'pwa/weak-password', message: this.message });
        }
        else {
            this.message = `Password entered:`;
            if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(this.password)) {
                this.message = 'Password must include letters, numbers, and be 8+ characters';
                emitWindow(pwaAuthError, { code: 'pwa/weak-password', message: this.message });
            }
            else {
                if (auth.currentUser) {
                    this.updatePass(this.password);
                }
                else {
                    const detail = { code: 'pwa/signed-out', message: 'Sign in first.' };
                    emitWindow(pwaAuthError, detail);
                    alert(userMessage(detail));
                }
            }
        }
    }
}
__decorate([
    state(),
    __metadata("design:type", String)
], InputPassword.prototype, "message", void 0);
__decorate([
    state(),
    __metadata("design:type", String)
], InputPassword.prototype, "password", void 0);
__decorate([
    state(),
    __metadata("design:type", Boolean)
], InputPassword.prototype, "login", void 0);
customElements.define('input-password', InputPassword);
//# sourceMappingURL=password.js.map