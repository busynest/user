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
import { store } from "../../../store.js";
import { updateProfile } from "firebase/auth";
import { accName } from "../../../redux/session.js";
import { auth } from "../../../firebase/authentication.js";
import { labelStyle } from "../../form/css/label.js";
import { inputStyle } from "../../form/css/input.js";
import { buttonStyle } from "../../form/css/button.js";
import { statusStyle, liveStatus } from "../../form/css/status.js";
import { pwaAuthError, pwaProfileUpdated } from "../../../events/names.js";
import { emitWindow, toAuthError } from "../../../events/emit.js";
import { userMessage } from "../../../firebase/message.js";
export class InputName extends connect(store)(LitElement) {
    constructor() {
        super();
        this.login = false;
        this.draft = '';
        this.busy = false;
        this.status = '';
        this.tone = '';
        this.dirty = false;
        /* Form Default */
        this.default = (event) => {
            event.preventDefault();
            void this.alertProfile();
        };
        this.alertProfile = async () => {
            if (this.busy)
                return;
            const input = this.renderRoot.querySelector('#pwa-name');
            const name = (input?.value ?? this.draft).trim();
            const current = auth.currentUser;
            if (!current) {
                this.show({ code: 'pwa/signed-out', message: 'Sign in first.' });
                return;
            }
            this.busy = true;
            this.tone = '';
            this.status = '';
            try {
                await updateProfile(current, { displayName: name });
                this.dirty = false;
                this.draft = name;
                store.dispatch(accName(name));
                this.status = 'Name saved.';
                emitWindow(pwaProfileUpdated, {
                    uid: current.uid,
                    displayName: name,
                    photoURL: current.photoURL
                });
            }
            catch (error) {
                this.show(toAuthError(error));
            }
            finally {
                this.busy = false;
            }
        };
    }
    stateChanged(state) {
        const signedIn = Boolean(state.session.login);
        if (signedIn !== this.login)
            this.dirty = false;
        this.login = signedIn;
        if (!this.dirty)
            this.draft = state.session.name ?? '';
    }
    static get styles() {
        return [
            labelStyle,
            inputStyle,
            buttonStyle,
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
        @submit="${this.default}">
  
        <label
          for="pwa-name">Name

          <input
            id            = "pwa-name"
            name          = "name"
            part          = "name"
            type          = "text"
            autocomplete  = "name"
            aria-invalid  = "${this.tone === 'error' ? 'true' : 'false'}"
            aria-describedby = "pwa-name-status"
            @input        = "${this.handleInput}"
            .value        = "${this.draft}" />

          </label>

        ${liveStatus('pwa-name-status', this.status, this.tone)}
    
        <button
          class="action-button save"
          part="submit"
          type="submit"
          aria-busy="${this.busy ? 'true' : 'false'}"
          ?disabled="${this.login === false || this.busy}">${this.busy ? 'Saving…' : 'Update'}</button>

      </form>

    `;
    }
    handleInput(event) {
        const input = event.target;
        this.dirty = true;
        this.draft = input.value;
    }
    show(detail) {
        this.tone = 'error';
        this.status = userMessage(detail);
        emitWindow(pwaAuthError, detail);
    }
}
__decorate([
    state(),
    __metadata("design:type", Object)
], InputName.prototype, "login", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], InputName.prototype, "draft", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], InputName.prototype, "busy", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], InputName.prototype, "status", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], InputName.prototype, "tone", void 0);
customElements.define('input-name', InputName);
//# sourceMappingURL=name.js.map