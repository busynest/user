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
import { connect } from 'pwa-helpers/connect-mixin';
import { store } from '../../store';
import { close } from '../css/svg';
import { show } from '../css/toggle';
import { listStyle } from '../form/css/list';
import { drawerStyle } from './css/drawer';
import { exitStyle } from './css/exit';
import { linkStyle } from './css/link';
import { lineStyle } from './css/paragraph';
import { closeSign } from '../../redux/frontend';
import { logOut } from '../../firebase/interface';
import { applyFirebaseConfig } from '../../firebase/attribute';
import { pwaDrawerToggleName } from '../../events/names';
import { emitElement } from '../../events/emit';
import { deepActive, focusable } from './keys';
import '../form/login';
import '../form/signup';
import { animation } from '../css/animation';
import { tapStyle } from '../css/tap';
let UserDrawer = class UserDrawer extends connect(store)(LitElement) {
    constructor() {
        super();
        this.url = '';
        this.drawer = false;
        this.subscribe = false;
        this.name = "";
        this.user = false;
        this.signup = false;
        this.wasOpen = false;
        this.sawOpen = false;
        this.returnFocus = null;
        this.onKey = (event) => {
            if (!this.drawer)
                return;
            if (event.key === 'Escape') {
                event.preventDefault();
                store.dispatch(closeSign());
                return;
            }
            if (event.key !== 'Tab')
                return;
            const items = focusable(this);
            if (!items.length)
                return;
            const first = items[0];
            const last = items[items.length - 1];
            const active = deepActive();
            const inside = active ? items.includes(active) : false;
            if (event.shiftKey) {
                if (!inside || active === first) {
                    event.preventDefault();
                    last.focus();
                }
                return;
            }
            if (!inside || active === last) {
                event.preventDefault();
                first.focus();
            }
        };
    }
    connectedCallback() {
        applyFirebaseConfig(this);
        super.connectedCallback();
        this.addEventListener('keydown', this.onKey);
    }
    disconnectedCallback() {
        this.removeEventListener('keydown', this.onKey);
        super.disconnectedCallback();
    }
    stateChanged(state) {
        const open = state.frontend.drawer;
        this.name = state.backend.name;
        this.drawer = open;
        this.user = state.frontend.login;
        this.signup = state.frontend.registerOne;
        const changed = this.sawOpen ? open !== this.wasOpen : open;
        if (changed) {
            emitElement(this, pwaDrawerToggleName, { open });
        }
        this.wasOpen = open;
        this.sawOpen = true;
    }
    updated(changed) {
        if (!changed.has('drawer'))
            return;
        if (this.drawer) {
            const active = deepActive();
            this.returnFocus = active && !this.contains(active) ? active : this.returnFocus;
            this.shadowRoot?.querySelector('.close')?.focus();
            return;
        }
        this.returnFocus?.focus();
        this.returnFocus = null;
    }
    firstUpdated() {
        this.shadowRoot.querySelector('.close').addEventListener('click', () => {
            store.dispatch(closeSign());
        });
        this.shadowRoot.querySelector('.leave').addEventListener('click', async () => {
            if (this.user) {
                try {
                    await logOut();
                }
                catch {
                    return;
                }
            }
            store.dispatch(closeSign());
        });
        const link = this.shadowRoot.querySelectorAll('a');
        link.forEach(item => {
            item.addEventListener('click', () => {
                store.dispatch(closeSign());
            });
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
            listStyle,
            tapStyle,
            css `
    .close:focus-visible,
    .leave:focus-visible {
      outline:                2px solid var(--pwa_action_border_color, #214f34);
      outline-offset:         2px;
    }

    .leave {
      min-height:             var(--pwa_tap, 44px); /* Required - minimum tap target */
    }

    ::slotted(a) {
      font-size:                0.95rem;
      color:                    var(--pwa_label_text_color, #1c2430);
      font-weight:              600;
      text-decoration:          none;
      padding:                  12px 16px;
      margin:                   12px 16px;
      border:                   1px solid var(--pwa_line_color, #e3daca);
      border-radius:            10px;
      box-sizing:               border-box;
      text-align:               center;
      cursor:                   pointer;
      display:                  block;
      min-height:               var(--pwa_tap, 44px); /* Required - minimum tap target */
    }
    `
        ];
    }
    ;
    render() {
        return html `

    <!-- Drawer Wrapper -->
    <section
      part="panel"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pwa-drawer-title"
      aria-hidden="${this.drawer ? 'false' : 'true'}"
      ?inert="${!this.drawer}"
      class="userDrawer ${this.drawer ? 'out' : 'in'}">

      <!-- Exit Button -->
      <header class="exit" part="header">
        <div></div>
        <h3 id="pwa-drawer-title" part="title">${this.user === false ? this.signup === this.subscribe ? `Login` : `Subscribe` : this.name}</h3>
        <button class="close" part="close" type="button" aria-label="Close">${close}</button>
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
              exportparts="email: login-email, password: login-password, submit: login-submit, switch: login-switch"
              ?inert="${this.signup !== this.subscribe}"
              class="content ${this.signup ===
            this.subscribe ?
            'opened' :
            'closed'} ">
            </form-login>

            <!-- Sign-up State -->
            <form-signup
              source="drawer"
              exportparts="email: signup-email, password: signup-password, submit: signup-submit, switch: signup-switch"
              ?inert="${this.signup === this.subscribe}"
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

          <a href="${this.url}" part="settings">Settings</a>

          <slot></slot>

          <button class="leave" part="logout" type="button" aria-label="Log out">Log out</button>
          
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