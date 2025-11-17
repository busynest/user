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
import { connect } from 'pwa-helpers/connect-mixin';
import { store } from '../../store';
import { authStyles } from './css/auth';
import { linkStyle } from './css/link';
import { lineStyle } from './css/paragraph';
import { animation } from '../css/animation';
import { listStyle } from '../form/css/list';
import '../form/login';
import '../form/signup';
let UserLogin = class UserLogin extends connect(store)(LitElement) {
    constructor() {
        super();
        this.subscribe = false;
        this._name = "";
        this._log = false;
        this._sign = false;
    }
    stateChanged(state) {
        this._name = state.backend.name;
        this._log = state.frontend.login;
        this._sign = state.frontend.registerTwo;
    }
    static get styles() {
        return [
            authStyles,
            linkStyle,
            lineStyle,
            listStyle,
            animation
        ];
    }
    ;
    render() {
        return html `

    <section class="service">

      <header>
        <h3>${this._log ? this._name : this._sign === this.subscribe ?
            'Subscribe'
            :
                'Login'} </h3>
      </header>

      <!-- Logged-out State -->
      <div
        class=          "spec"
        ?on=            "${this._log === false}">

        <div class=     "wrapper">
          <div class=   "inner">

            <!-- Log-in State -->
            <form-login
              source=       "page"
              class=        "content ${true === this._sign ? 'opened' : 'closed'} "></form-login>

            <!-- Sign-up State -->
            <form-signup
              source=       "page"
              class=        "content ${false === this._sign ? 'opened' : 'closed'}"></form-signup>

          </div>
        </div>

      </div>

      <!-- Logged-in State -->
      <div
        class=          "spec setLog"
        ?on=            "${this._log === true}">

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
    state(),
    __metadata("design:type", Object)
], UserLogin.prototype, "_name", void 0);
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