var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../../store';
import { iconStyles } from './css/icon';
import { toggleSign } from '../../redux/frontend';
let UserIcon = class UserIcon extends connect(store)(LitElement) {
    constructor() {
        super();
        this.subscribe = false;
        this.emptyArtwork = '';
        this._user = false;
        this._photoURL = '';
    }
    firstUpdated() {
        this.shadowRoot.querySelector('.toggles').addEventListener('click', () => {
            store.dispatch(toggleSign());
            console.log('here');
        });
    }
    stateChanged(state) {
        this._user = state.frontend.login;
        this._photoURL = state.backend.photoURL;
    }
    static get styles() { return [iconStyles]; }
    render() {
        return html `

      <!-- two classes: icon / login -->
      <button
        class="${this._user ? 'icon' : 'login'} toggles"
        aria-label="login">
        
        ${this._user ? html `
       <!--   <div
            class   = "iconArea"> -->
            <input
              type    = "image"
              class   = "userImage"
              alt     = "Login"
              height  = "38px"
              width   = "38px"
              src     = "${this._photoURL ? this._photoURL : this.emptyArtwork}">
       <!--   </div> -->
          ` : this.subscribe ? 'Subscribe' : 'Login'}

      </button>

    `;
    }
};
__decorate([
    property({ type: Boolean, reflect: true }),
    __metadata("design:type", Object)
], UserIcon.prototype, "subscribe", void 0);
__decorate([
    property({ type: String, reflect: true }),
    __metadata("design:type", Object)
], UserIcon.prototype, "emptyArtwork", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], UserIcon.prototype, "_user", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], UserIcon.prototype, "_photoURL", void 0);
UserIcon = __decorate([
    customElement('user-icon'),
    __metadata("design:paramtypes", [])
], UserIcon);
export { UserIcon };
