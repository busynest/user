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
import { auth } from '../../../firebase/authentication';
export class DeleteUser extends connect(store)(LitElement) {
    constructor() {
        super();
        this.login = false;
        this.email = '';
        this.officialDelete = async () => {
            if (auth.currentUser) {
                return auth.currentUser.delete().then(() => { }).catch(() => { });
            }
            else {
                alert('Please Sign-in');
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
            css `

    :host {
      display:                  grid;
      grid-template-rows:       1fr auto;
    }
    
    p {
      padding:              0 16px;
    }

    `
        ];
    }
    render() {
        return html `

      <p>Permanently delete the user account and data related to: ${this.email}</p>

      <button
        class="action-button deleteUser"
        ?disabled="${this.login === false}">Delete</button>

    `;
    }
    alertDelete() { if (auth.currentUser) {
        this.deleteUser();
    }
    else {
        alert('Please Login');
    } }
    deleteUser() {
        const d = confirm("Delete Account?");
        if (d == true) {
            this.officialDelete();
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