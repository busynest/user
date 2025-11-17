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
import { close } from '../css/svg';
import { show } from '../css/toggle';
import { listStyle } from '../form/css/list';
import { drawerStyle } from './css/drawer';
import { exitStyle } from './css/exit';
import { linkStyle } from './css/link';
import { lineStyle } from './css/paragraph';
import { toggleSign } from '../../redux/frontend';
import { logOut } from '../../firebase/interface';
import '../form/login';
import '../form/signup';
import { animation } from '../css/animation';
let UserDrawer = class UserDrawer extends connect(store)(LitElement) {
    constructor() {
        super();
        this.url = '';
        this.drawer = false;
        this.subscribe = false;
        this.name = "";
        this.user = false;
        this.signup = false;
    }
    stateChanged(state) {
        this.name = state.backend.name;
        this.drawer = state.frontend.drawer;
        this.user = state.frontend.login;
        this.signup = state.frontend.registerOne;
    }
    firstUpdated() {
        this.shadowRoot.querySelector('.close').addEventListener('click', () => {
            store.dispatch(toggleSign());
        });
        this.shadowRoot.querySelector('.leave').addEventListener('click', () => {
            if (this.user) {
                logOut();
            }
            store.dispatch(toggleSign());
        });
    }
    static get styles() {
        return [
            show,
            animation,
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
      class="userDrawer ${this.drawer ? 'out' : 'in'}">

      <!-- Exit Button -->
      <header class="exit">
        <div></div>
        <h3>${this.user === false ? this.signup === this.subscribe ? `Login` : `Subscribe` : this.name}</h3>
        <button class="close">${close}</button>
      </header>

      <!-- Logged-out State -->
      <div
        class="spec ${this.drawer ? 'spec-out' : 'spec-in'}"
        ?on="${this.user === false}">

        <div class=     "wrapper">
          <div class=   "inner">

            <!-- Log-in State -->
            <form-login
              source="drawer"
              class="content ${this.signup ===
            this.subscribe ?
            'opened' :
            'closed'} ">
            </form-login>

            <!-- Sign-up State -->
            <form-signup
              source="drawer"
              class="content ${!this.signup === this.subscribe ? 'opened' : 'closed'} ">
            </form-signup>

          </div>
        </div>

      </div>

      <!-- Logged-in State -->
      <div
        class="spec setLog"
        ?on="${this.user === true}">

          <slot name="before"></slot>

          <a href="${this.url}">Settings</a>

          <slot name="within"></slot>

          <button class="leave" aria-label="log out">log out</button>
          
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
], UserDrawer.prototype, "name", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], UserDrawer.prototype, "user", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], UserDrawer.prototype, "signup", void 0);
UserDrawer = __decorate([
    customElement('user-drawer'),
    __metadata("design:paramtypes", [])
], UserDrawer);
export { UserDrawer };
//# sourceMappingURL=drawer.js.map