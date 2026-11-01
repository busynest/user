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
import { close } from '../css/svg.js';
import { show } from '../css/toggle.js';
import { listStyle } from '../form/css/list.js';
import { drawerStyle } from './css/drawer.js';
import { exitStyle } from './css/exit.js';
import { linkStyle } from './css/link.js';
import { lineStyle } from './css/paragraph.js';
import { closeSign } from '../../redux/frontend.js';
import { logOut } from '../../firebase/interface.js';
import { refreshEmailVerified } from '../../api/verify.js';
import { applyFirebaseConfig } from '../../firebase/attribute.js';
import { pwaDrawerToggleName, pwaSettings } from '../../events/names.js';
import { emitElement } from '../../events/emit.js';
import { deepActive, focusable } from './keys.js';
import { accountTitle } from '../form/letters.js';
import { noticeStyle } from '../form/css/notice.js';
import { onVerificationNotice, verificationNotice } from '../form/notice.js';
import { verifiedMark, verifiedStyle } from '../form/verified.js';
import '../settings/input/verify.js';
import '../form/login.js';
import '../form/signup.js';
import { animation, drawerShell } from '../css/animation.js';
import { tapStyle } from '../css/tap.js';
let UserDrawer = class UserDrawer extends connect(store)(LitElement) {
    constructor() {
        super();
        this.url = '';
        this.drawer = false;
        this.subscribe = false;
        this.hideGoogle = false;
        this.name = "";
        this.email = "";
        this.verified = false;
        this.notice = "";
        this.user = false;
        this.signup = false;
        this.sliding = false;
        this.shown = false;
        this.wasOpen = false;
        this.sawOpen = false;
        this.returnFocus = null;
        this.stopNotice = null;
        this.openFrame = 0;
        this.reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        this.onSlideEnd = (event) => {
            if (!(event instanceof TransitionEvent))
                return;
            if (event.propertyName !== 'transform')
                return;
            if (event.target !== event.currentTarget)
                return;
            if (this.drawer)
                return;
            this.sliding = false;
        };
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
        this.onLightClick = (event) => {
            if (event.defaultPrevented)
                return;
            const target = event.target;
            if (!(target instanceof Element))
                return;
            const control = target.closest('a, button');
            if (!(control instanceof HTMLElement))
                return;
            if (!this.contains(control))
                return;
            if (this.shadowRoot?.contains(control))
                return;
            store.dispatch(closeSign());
        };
        this.onSettings = (event) => {
            const url = this.destination();
            const proceed = this.dispatchEvent(new CustomEvent(pwaSettings, {
                bubbles: true,
                composed: true,
                cancelable: true,
                detail: { url }
            }));
            if (!proceed) {
                event.preventDefault();
                return;
            }
            store.dispatch(closeSign());
            if (url)
                return;
            event.preventDefault();
            const settings = document.querySelector('user-settings');
            if (settings instanceof HTMLElement)
                settings.scrollIntoView({ block: 'nearest' });
        };
    }
    connectedCallback() {
        applyFirebaseConfig(this);
        super.connectedCallback();
        this.addEventListener('keydown', this.onKey);
        this.addEventListener('click', this.onLightClick);
        this.notice = verificationNotice();
        this.stopNotice = onVerificationNotice(() => { this.notice = verificationNotice(); });
    }
    disconnectedCallback() {
        cancelAnimationFrame(this.openFrame);
        this.shadowRoot?.querySelector('.userDrawer')?.removeEventListener('transitionend', this.onSlideEnd);
        this.removeEventListener('keydown', this.onKey);
        this.removeEventListener('click', this.onLightClick);
        this.stopNotice?.();
        this.stopNotice = null;
        super.disconnectedCallback();
    }
    stateChanged(state) {
        const open = state.frontend.drawer;
        this.name = state.backend.name;
        this.email = state.backend.email;
        this.verified = Boolean(state.backend?.verified);
        if (open)
            this.sliding = true;
        else {
            cancelAnimationFrame(this.openFrame);
            if (this.reduceMotion.matches)
                this.sliding = false;
        }
        this.shown = open && (this.reduceMotion.matches || this.shown);
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
        if (changed.has('drawer') && this.drawer && !this.shown && !this.reduceMotion.matches) {
            this.armOpen();
        }
        if (!changed.has('drawer'))
            return;
        if (this.drawer) {
            const active = deepActive();
            this.returnFocus = active && !this.contains(active) ? active : this.returnFocus;
            this.shadowRoot?.querySelector('.close')?.focus();
            void refreshEmailVerified(false);
            return;
        }
        this.returnFocus?.focus();
        this.returnFocus = null;
    }
    armOpen() {
        cancelAnimationFrame(this.openFrame);
        this.openFrame = requestAnimationFrame(() => {
            this.openFrame = requestAnimationFrame(() => {
                if (this.drawer)
                    this.shown = true;
            });
        });
    }
    firstUpdated() {
        this.shadowRoot.querySelector('.userDrawer').addEventListener('transitionend', this.onSlideEnd);
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
            drawerShell,
            drawerStyle,
            exitStyle,
            linkStyle,
            lineStyle,
            listStyle,
            tapStyle,
            noticeStyle,
            verifiedStyle,
            css `
    .exit > h3 {
      display:                flex;
      align-items:            center;
      justify-content:        center;
      gap:                    8px;
      flex-wrap:              wrap;
    }

    .close:focus-visible,
    .leave:focus-visible,
    .settings:focus-visible {
      outline:                2px solid var(--pwa_action_border_color, #214f34);
      outline-offset:         2px;
    }

    .leave {
      min-height:             var(--pwa_tap, 44px); /* Required - minimum tap target */
    }

    ::slotted(a),
    ::slotted(button),
    slot > a,
    slot > button {
      font:                     inherit;
      font-size:                0.95rem;
      font-weight:              600;
      color:                    var(--pwa_label_text_color, #1c2430);
      background:               transparent;
      text-decoration:          none;
      appearance:               none;
      padding:                  12px 16px;
      margin:                   12px 16px;
      border:                   1px solid var(--pwa_line_color, #e3daca);
      border-radius:            10px;
      box-sizing:               border-box;
      text-align:               center;
      cursor:                   pointer;
      display:                  block;
      width:                    auto;
      min-height:               var(--pwa_tap, 44px); /* Required - minimum tap target */
    }

    ::slotted(a[aria-current]),
    ::slotted(button[aria-current]) {
      color:                    var(--pwa_nav_highlight_color, #1c2430);
      background:               var(--pwa_nav_on_background, #f3efe6);
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
      aria-hidden="${this.sliding ? 'false' : 'true'}"
      ?inert="${!this.sliding}"
      class="userDrawer ${this.shown ? 'out' : 'in'}">

      <!-- Exit Button -->
      <header class="exit" part="header">
        <div></div>
        <h3 id="pwa-drawer-title" part="title">
          <span class="who">${this.user === false ? this.signup === this.subscribe ? `Login` : `Subscribe` : accountTitle(this.name, this.email)}</span>
          ${this.user ? this.verified ? verifiedMark : html `<span class="unverified" part="unverified">Not verified</span>` : ''}
        </h3>
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
              ?hide-google="${this.hideGoogle}"
              exportparts="email: login-email, password: login-password, submit: login-submit, switch: login-switch, forgot: login-forgot, status: login-status, reveal: login-reveal, google: login-google"
              ?inert="${this.signup !== this.subscribe}"
              class="content ${this.signup ===
            this.subscribe ?
            'opened' :
            'closed'} ">
            </form-login>

            <!-- Sign-up State -->
            <form-signup
              source="drawer"
              ?hide-google="${this.hideGoogle}"
              exportparts="email: signup-email, password: signup-password, submit: signup-submit, switch: signup-switch, status: signup-status, reveal: signup-reveal, notice: signup-notice, google: signup-google"
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

          <!-- Required - Jack's markers. A host link replaces the fallback. -->
          <slot name="before"><a href="/settings">slotted - before</a></slot>

          ${this.settingsControl()}

          <slot><a href="/settings">slotted - default</a></slot>

          ${this.user && this.notice && !this.verified ? html `
            <p class="notice" part="notice" role="status" aria-live="polite">Check your inbox for the verification email. You can still sign in.</p>
          ` : ''}

          ${this.user ? html `<email-verify exportparts="notice: verify-notice, status: verify-status, submit: verify-submit, verified: email-verified, unverified"></email-verify>` : ''}

          <button class="leave" part="logout" type="button" aria-label="Log out">Log out</button>
          
      </div>

    </section>

    `;
    }
    destination() {
        return (this.url || '').trim();
    }
    settingsControl() {
        const url = this.destination();
        if (url) {
            return html `<a href="${url}" part="settings" @click="${this.onSettings}">Settings</a>`;
        }
        return html `<button type="button" class="settings" part="settings" @click="${this.onSettings}">Settings</button>`;
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
    property({ type: Boolean, attribute: 'hide-google', reflect: true }),
    __metadata("design:type", Object)
], UserDrawer.prototype, "hideGoogle", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], UserDrawer.prototype, "name", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], UserDrawer.prototype, "email", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], UserDrawer.prototype, "verified", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], UserDrawer.prototype, "notice", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], UserDrawer.prototype, "user", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], UserDrawer.prototype, "signup", void 0);
__decorate([
    property({ type: Boolean, reflect: true }),
    __metadata("design:type", Object)
], UserDrawer.prototype, "sliding", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], UserDrawer.prototype, "shown", void 0);
UserDrawer = __decorate([
    customElement('user-drawer'),
    __metadata("design:paramtypes", [])
], UserDrawer);
export { UserDrawer };
//# sourceMappingURL=drawer.js.map