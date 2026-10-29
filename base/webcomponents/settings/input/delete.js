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
import { buttonStyle } from "../../form/css/button";
import { labelStyle } from "../../form/css/label";
import { inputStyle } from "../../form/css/input";
import { auth } from '../../../firebase/authentication';
import { deleteUserFiles, logAccountDelete, reauthenticate } from '../../../firebase/interface';
import { pwaAccountDeleted, pwaAuthError } from '../../../events/names';
import { emitWindow, toAuthError } from '../../../events/emit';
import { userMessage } from '../../../firebase/message';
export class DeleteUser extends connect(store)(LitElement) {
    constructor() {
        super();
        this.login = false;
        this.email = '';
        this.officialDelete = async (password) => {
            const ok = await reauthenticate(password);
            if (!ok) {
                return;
            }
            const current = auth.currentUser;
            if (!current) {
                alert('Please Sign-in');
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
                emitWindow(pwaAuthError, toAuthError(error));
                alert(userMessage(error));
            }
        };
    }
    firstUpdated() {
        this.shadowRoot.querySelector('.deleteUser').addEventListener('click', () => {
            this.alertDelete();
        });
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
            css `

    :host {
      display:                  grid;
      grid-template-rows:       auto auto auto;
    }
    
    p {
      margin:               0;
      padding:              4px 20px 0;
      line-height:          1.5;
      color:                var(--pwa_label_text_color, #1c2430);
    }

    `
        ];
    }
    render() {
        return html `

      <p>Permanently delete the user account and data related to: ${this.email}</p>

      <label for="pwa-delete-password">Current password

        <input
          id="pwa-delete-password"
          type="password"
          autocomplete="current-password"/>

      </label>

      <button
        type="button"
        part="submit"
        class="action-button deleteUser"
        ?disabled="${this.login === false}">Delete</button>

    `;
    }
    alertDelete() {
        const current = auth.currentUser;
        if (!current) {
            const detail = { code: 'pwa/signed-out', message: 'Sign in first.' };
            emitWindow(pwaAuthError, detail);
            alert(userMessage(detail));
            return;
        }
        const password = this.shadowRoot.querySelector('#pwa-delete-password').value;
        if (password.length < 6) {
            const detail = { code: 'pwa/current-password', message: 'Enter your current password.' };
            emitWindow(pwaAuthError, detail);
            alert(userMessage(detail));
            return;
        }
        const d = confirm("Delete Account?");
        if (d == true) {
            this.officialDelete(password);
            console.log("user gone");
        }
        else {
            console.log("user here");
        }
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
customElements.define('delete-user', DeleteUser);
//# sourceMappingURL=delete.js.map