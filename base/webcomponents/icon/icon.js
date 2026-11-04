var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../../store.js';
import { iconStyles } from './css/icon.js';
import { toggleSign } from '../../redux/session.js';
import { applyFirebaseConfig } from '../../firebase/attribute.js';
import { lettersFor } from '../form/letters.js';
// import { faceIcon }                           from '../../css/svg';
let UserIcon = class UserIcon extends connect(store)(LitElement) {
    // @state() private _sign = false;
    constructor() {
        super();
        /** @attr subscribe */
        this.subscribe = false;
        /** @attr empty */
        this.empty = '';
        this._user = false;
        this._open = false;
        this._photoURL = '';
        this._name = '';
        this._email = '';
    }
    connectedCallback() {
        applyFirebaseConfig(this);
        super.connectedCallback();
    }
    firstUpdated() {
        this.shadowRoot.querySelector('.toggles').addEventListener('click', () => {
            store.dispatch(toggleSign());
        });
    }
    stateChanged(state) {
        this._user = state.session.login;
        this._open = state.session.drawer;
        this._photoURL = state.session.photoURL;
        this._name = state.session.name;
        this._email = state.session.email;
    }
    updated() {
        const button = this.shadowRoot?.querySelector('button');
        const drawer = document.querySelector('user-drawer');
        if (!button || !(drawer instanceof HTMLElement) || !drawer.id)
            return;
        button.setAttribute('aria-controls', drawer.id);
        const control = button;
        if ('ariaControlsElements' in control)
            control.ariaControlsElements = [drawer];
    }
    static get styles() { return [iconStyles, css `:host { border-radius: 10px; }`]; }
    render() {
        return html `

      <!-- two classes: icon / login -->
      <button
        type="button"
        part="button"
        class="${this._user ? 'icon' : 'login'} toggles"
        aria-haspopup="dialog"
        aria-expanded="${this._open ? 'true' : 'false'}"
        aria-controls="pwa-user-drawer"
        aria-label="${this._user ? 'Account' : this.subscribe ? 'Subscribe' : 'Login'}">
        
        ${this._user ? this.face() : this.subscribe ? 'Subscribe' : 'Login'}

      </button>

    `;
    }
    // Required - photo, else initials. empty is only for an account with neither.
    face() {
        if (this._photoURL) {
            return html `<img class="userImage" part="photo" alt="" src="${this._photoURL}">`;
        }
        const letters = lettersFor(this._name, this._email);
        if (letters) {
            return html `<span class="initials" part="initials" aria-hidden="true">${letters}</span>`;
        }
        if (this.empty) {
            return html `<img class="userImage" part="photo" alt="" src="${this.empty}">`;
        }
        return html `<span class="initials" part="initials" aria-hidden="true">?</span>`;
    }
};
__decorate([
    property({ type: Boolean, reflect: true }),
    __metadata("design:type", Object)
], UserIcon.prototype, "subscribe", void 0);
__decorate([
    property({ type: String, reflect: true }),
    __metadata("design:type", Object)
], UserIcon.prototype, "empty", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], UserIcon.prototype, "_user", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], UserIcon.prototype, "_open", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], UserIcon.prototype, "_photoURL", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], UserIcon.prototype, "_name", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], UserIcon.prototype, "_email", void 0);
UserIcon = __decorate([
    customElement('user-icon'),
    __metadata("design:paramtypes", [])
], UserIcon);
export { UserIcon };
//# sourceMappingURL=icon.js.map