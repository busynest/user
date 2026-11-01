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
import { buttonStyle } from "../../form/css/button.js";
import { labelStyle } from "../../form/css/label.js";
import { inputStyle } from "../../form/css/input.js";
import { toggleStyle } from "../../form/css/toggle.js";
import { statusStyle, liveStatus } from "../../form/css/status.js";
import { revealControl } from "../../form/reveal.js";
import { auth } from '../../../firebase/authentication.js';
import { deleteUserFiles, logAccountDelete, reauthenticate, takeAuthFailure } from '../../../firebase/interface.js';
import { pwaAccountDeleted, pwaAuthError } from '../../../events/names.js';
import { emitWindow, toAuthError } from '../../../events/emit.js';
import { userMessage } from '../../../firebase/message.js';
export class DeleteUser extends connect(store)(LitElement) {
    constructor() {
        super();
        this.login = false;
        this.email = '';
        this.busy = false;
        this.status = '';
        this.tone = '';
        this.showPassword = false;
        this.alertDelete = () => {
            if (this.busy)
                return;
            const current = auth.currentUser;
            if (!current) {
                this.show({ code: 'pwa/signed-out', message: 'Sign in first.' });
                return;
            }
            const password = this.shadowRoot.querySelector('#pwa-delete-password').value;
            if (password.length < 6) {
                this.show({ code: 'pwa/current-password', message: 'Enter your current password.' });
                return;
            }
            const d = confirm("Delete Account?");
            if (d == true)
                void this.officialDelete(password);
        };
        this.officialDelete = async (password) => {
            this.busy = true;
            this.tone = '';
            this.status = '';
            const ok = await reauthenticate(password);
            if (!ok) {
                const detail = takeAuthFailure();
                this.tone = 'error';
                this.status = userMessage(detail ?? { code: 'pwa/unknown', message: 'Something went wrong. Try again.' });
                this.busy = false;
                return;
            }
            const current = auth.currentUser;
            if (!current) {
                this.show({ code: 'pwa/signed-out', message: 'Sign in first.' });
                this.busy = false;
                return;
            }
            try {
                const uid = current.uid;
                await deleteUserFiles(uid);
                await logAccountDelete();
                await current.delete();
                emitWindow(pwaAccountDeleted, { uid });
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
        this.email = state.backend.email;
    }
    static get styles() {
        return [
            buttonStyle,
            labelStyle,
            inputStyle,
            toggleStyle,
            statusStyle,
            css `

    :host {
      display:                  grid;
      grid-template-rows:       auto auto auto auto;
      align-content:            start;
      box-sizing:               border-box;
      width:                    100%;
      max-width:                min(100%, var(--pwa_max_width, 400px));
      min-width:                0;
      margin-inline:            auto;
      padding-inline:           var(--pwa_inset, 0px);
    }
    
    p.lead {
      margin:               0;
      padding:              4px 0 0;
      line-height:          1.5;
      color:                var(--pwa_label_text_color, #1c2430);
    }

    `
        ];
    }
    render() {
        return html `

      <p class="lead">Permanently delete the user account and data related to: ${this.email}</p>

      <label for="pwa-delete-password">Current password

        <span class="pair">

          <input
            id="pwa-delete-password"
            name="current_password"
            type="${this.showPassword ? 'text' : 'password'}"
            autocomplete="current-password"
            aria-describedby="pwa-delete-status"/>

          ${revealControl(this.showPassword, () => { this.showPassword = !this.showPassword; })}

        </span>

      </label>

      ${liveStatus('pwa-delete-status', this.status, this.tone)}

      <button
        type="button"
        part="submit"
        class="action-button deleteUser"
        aria-busy="${this.busy ? 'true' : 'false'}"
        ?disabled="${this.login === false || this.busy}"
        @click="${this.alertDelete}">${this.busy ? 'Deleting…' : 'Delete'}</button>

    `;
    }
    show(detail) {
        this.tone = 'error';
        this.status = userMessage(detail);
        emitWindow(pwaAuthError, detail);
    }
}
__decorate([
    state(),
    __metadata("design:type", Boolean)
], DeleteUser.prototype, "login", void 0);
__decorate([
    state(),
    __metadata("design:type", String)
], DeleteUser.prototype, "email", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], DeleteUser.prototype, "busy", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], DeleteUser.prototype, "status", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], DeleteUser.prototype, "tone", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], DeleteUser.prototype, "showPassword", void 0);
customElements.define('delete-user', DeleteUser);
//# sourceMappingURL=delete.js.map