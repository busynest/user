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
import { close } from '../../css/svg';
import { show } from '../../css/toggle';
import { drawerStyle } from './css/drawer';
import { exitStyle } from './css/exit';
import { linkStyle } from './css/link';
import { lineStyle } from './css/paragraph';
import { listStyle } from '../../css/form/list';
import { toggleSign } from '../../redux/frontend';
import { logOut } from '../../firebase/interface';
import './input/login';
import './input/sign-up';
let UserDrawer = class UserDrawer extends connect(store)(LitElement) {
    constructor() {
        super();
        this.url = '';
        this.drawer = false;
        this.subscribe = false;
        this._name = "";
        this._log = false;
        this._sign = false;
    }
    stateChanged(state) {
        this._name = state.backend.name;
        this.drawer = state.frontend.drawer;
        this._log = state.frontend.login;
        this._sign = state.frontend.register;
    }
    firstUpdated() {
        this.shadowRoot.querySelector('.close').addEventListener('click', () => {
            store.dispatch(toggleSign());
        });
        this.shadowRoot.querySelector('.leave').addEventListener('click', () => {
            if (this._log) {
                logOut();
            }
            store.dispatch(toggleSign());
        });
    }
    static get styles() {
        return [
            show,
            drawerStyle,
            exitStyle,
            linkStyle,
            lineStyle,
            listStyle
        ];
    }
    ;
    render() {
        return html `

    <!-- Drawer Wrapper -->
    <section
      class="userDrawer ${this.drawer ? 'opened' : 'closed'}">

      <!-- Exit Button -->
      <header class="exit">
        <div></div>
        <h3>${this._log ? this._name : this._sign === this.subscribe ? 'Subscribe' : 'Login'} </h3>
        <button class="close">${close}</button>
      </header>

      <!-- Logged-out State -->
      <div
        class="spec"
        ?on="${this._log === false}">

        <!-- Log-in State -->
        <user-log-in
          class="spec"
          ?on="${true === this._sign ? !this.subscribe : this.subscribe}"></user-log-in>

        <!-- Sign-up State -->
        <user-sign-up
          class="spec"
          ?on="${false === this._sign ? !this.subscribe : this.subscribe}"></user-sign-up>

      </div>

      <!-- Logged-in State -->
      <div
        class="spec setLog"
        ?on="${this._log === true}">

          <p><a href="${this.url}">Settings</a></p>

          <p><a class="leave" aria-label="log out">log out</a></p>
          
      </div>

    </section>

    `;
    }
};
__decorate([
    property({ type: String, reflect: true }),
    __metadata("design:type", Object)
], UserDrawer.prototype, "url", void 0);
__decorate([
    property({ type: Boolean, attribute: true, reflect: true }),
    __metadata("design:type", Object)
], UserDrawer.prototype, "drawer", void 0);
__decorate([
    property({ type: Boolean, attribute: true, reflect: true }),
    __metadata("design:type", Object)
], UserDrawer.prototype, "subscribe", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], UserDrawer.prototype, "_name", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], UserDrawer.prototype, "_log", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], UserDrawer.prototype, "_sign", void 0);
UserDrawer = __decorate([
    customElement('user-drawer'),
    __metadata("design:paramtypes", [])
], UserDrawer);
export { UserDrawer };
//# sourceMappingURL=drawer.js.map