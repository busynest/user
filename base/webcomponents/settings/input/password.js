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
export class InputPassword extends connect(store)(LitElement) {
    constructor() {
        super();
        this.message = '';
        this.password = '';
        this.login = false;
        this.default = (e) => {
            e.preventDefault();
        };
        this.updatePass = async (newPassword) => {
            if (auth.currentUser) {
                await updatePassword(auth.currentUser, newPassword)
                    .then(() => { console.log("Password successful!"); })
                    .catch((error) => { console.log("Problem: " + error.messge); });
            }
            else {
                alert('Please Login');
            }
        };
    }
    firstUpdated() {
        this.shadowRoot.querySelector('.pass').addEventListener('click', () => {
            this.alertPassword();
        });
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
              type    = "password"
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
              type    = "password">

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
          class="action-button pass"
          ?disabled="${this.login === false}">Update</button>

      </form>

    `;
    }
    alertPassword() {
        if (!this.password) {
            this.message = 'Please enter a password';
        }
        else if (this.password.length < 8) {
            this.message = 'Password must be at least 8 characters long';
        }
        else {
            this.message = `Password entered:`;
            if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(this.password)) {
                this.message = 'Password must include letters, numbers, and be 8+ characters';
            }
            else {
                if (auth.currentUser) {
                    this.updatePass(this.password);
                }
                else {
                    alert('Please Login');
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