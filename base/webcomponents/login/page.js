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
import { store } from '../../store.js';
import { authStyles } from './css/auth.js';
import { linkStyle } from './css/link.js';
import { lineStyle } from './css/paragraph.js';
import { animation } from '../css/animation.js';
import { listStyle } from '../form/css/list.js';
import '../form/login.js';
import '../form/signup.js';
import { tapStyle } from '../css/tap.js';
import { applyFirebaseConfig } from '../../firebase/attribute.js';
import { accountTitle } from '../form/letters.js';
import { noticeStyle } from '../form/css/notice.js';
import { onVerificationNotice, verificationNotice } from '../form/notice.js';
let UserLogin = class UserLogin extends connect(store)(LitElement) {
    constructor() {
        super();
        this.subscribe = false;
        this.hideGoogle = false;
        this._name = "";
        this._email = "";
        this._verified = false;
        this._notice = "";
        this._log = false;
        this._sign = false;
        this.stopNotice = null;
    }
    connectedCallback() {
        applyFirebaseConfig(this);
        super.connectedCallback();
        this._notice = verificationNotice();
        this.stopNotice = onVerificationNotice(() => { this._notice = verificationNotice(); });
    }
    disconnectedCallback() {
        this.stopNotice?.();
        this.stopNotice = null;
        super.disconnectedCallback();
    }
    stateChanged(state) {
        this._name = state.backend.name;
        this._email = state.backend.email;
        this._verified = Boolean(state.backend?.verified);
        this._log = state.frontend.login;
        this._sign = state.frontend.registerTwo;
    }
    static get styles() {
        return [
            authStyles,
            linkStyle,
            lineStyle,
            listStyle,
            animation,
            tapStyle,
            noticeStyle
        ];
    }
    ;
    render() {
        return html `

    <section class="service" part="panel">

      <header part="header">
        <h3 part="title">${this._log ? accountTitle(this._name, this._email) : this._sign === this.subscribe ? 'Login' : 'Subscribe'}</h3>
      </header>

      <!-- Logged-out State -->
      <div
        class=          "spec"
        ?on=            "${this._log === false}">

        <div class=     "wrapper">
          <div class=   "inner">

            <!-- Required - subscribe chooses the open form -->
            <form-login
              source=       "page"
              ?hide-google= "${this.hideGoogle}"
              exportparts=  "email: login-email, password: login-password, submit: login-submit, switch: login-switch, forgot: login-forgot, status: login-status, reveal: login-reveal, google: login-google"
              ?inert=       "${this._sign !== this.subscribe}"
              class=        "content ${this._sign === this.subscribe ? 'opened' : 'closed'} "></form-login>

            <!-- Sign-up State -->
            <form-signup
              source=       "page"
              ?hide-google= "${this.hideGoogle}"
              exportparts=  "email: signup-email, password: signup-password, submit: signup-submit, switch: signup-switch, status: signup-status, reveal: signup-reveal, notice: signup-notice, google: signup-google"
              ?inert=       "${this._sign === this.subscribe}"
              class=        "content ${!this._sign === this.subscribe ? 'opened' : 'closed'}"></form-signup>

          </div>
        </div>

      </div>

      <!-- Logged-in State -->
      <div
        class=          "spec setLog"
        ?on=            "${this._log === true}">

          ${this._notice && !this._verified ? html `
            <p class="notice" part="notice" role="status" aria-live="polite">Check your inbox for the verification email. You can still sign in.</p>
          ` : ''}

          <slot name="content"></slot>
          
      </div>

    </section>

    `;
    }
};
__decorate([
    property({ type: Boolean, attribute: true, reflect: true }),
    __metadata("design:type", Object)
], UserLogin.prototype, "subscribe", void 0);
__decorate([
    property({ type: Boolean, attribute: 'hide-google', reflect: true }),
    __metadata("design:type", Object)
], UserLogin.prototype, "hideGoogle", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], UserLogin.prototype, "_name", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], UserLogin.prototype, "_email", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], UserLogin.prototype, "_verified", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], UserLogin.prototype, "_notice", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], UserLogin.prototype, "_log", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], UserLogin.prototype, "_sign", void 0);
UserLogin = __decorate([
    customElement('user-login'),
    __metadata("design:paramtypes", [])
], UserLogin);
export { UserLogin };
//# sourceMappingURL=page.js.map