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
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
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
        /** @attr subscribe */
        this.subscribe = false; // Drawer State
        /** @attr hide-google */
        this.hideGoogle = false;
        this._name = "";
        this._email = "";
        this._verified = false;
        this._notice = "";
        this._log = false; // Login State
        this._sign = false; // Sign-up State
        /** Arms the form-swap transition. False on the first paint. */
        this.motion = false;
        /** Clip size. auto is the resting card. A px value is mid-roll. */
        this.clipHeight = 'auto';
        /** Sheet translate. none keeps the card's bottom on the clip. */
        this.sheetShift = 'none';
        /** True only while this card's clip and sheet are easing. */
        this.rollMotion = false;
        this.booted = false;
        this.stopNotice = null;
        this.heldHeight = null;
        this.columnWidth = 0;
        this.columnObserver = null;
        // Only this clip. The form swap's transform does not release the roll.
        this.onClipEnd = (event) => {
            if (!(event instanceof TransitionEvent))
                return;
            if (event.target !== event.currentTarget)
                return;
            if (event.propertyName !== 'max-height')
                return;
            this.rest();
        };
    }
    connectedCallback() {
        applyFirebaseConfig(this);
        if (!this.hasAttribute('role'))
            this.setAttribute('role', 'region');
        if (!this.hasAttribute('aria-label'))
            this.setAttribute('aria-label', 'Account');
        super.connectedCallback();
        this._notice = verificationNotice();
        this.stopNotice = onVerificationNotice(() => { this._notice = verificationNotice(); });
    }
    disconnectedCallback() {
        this.stopNotice?.();
        this.stopNotice = null;
        this.columnObserver?.disconnect();
        this.columnObserver = null;
        super.disconnectedCallback();
    }
    stateChanged(state) {
        this._name = state.session.name; // User Name
        this._email = state.session.email;
        this._verified = Boolean(state.session.verified);
        this._log = state.session.login; // Logged in-out State
        this._sign = state.session.registerTwo; // Sign-up State - register
    }
    willUpdate(changed) {
        if (!this.booted)
            return;
        if (!changed.has('_sign') && !changed.has('_log'))
            return;
        if (changed.has('_sign'))
            this.motion = true;
        const clip = this.clip();
        if (!clip)
            return;
        this.heldHeight = Math.ceil(clip.getBoundingClientRect().height);
        this.rollMotion = false;
        this.clipHeight = `${this.heldHeight}px`;
        this.sheetShift = 'translate3d(0, 0, 0)';
    }
    updated(changed) {
        const boot = !this.booted;
        this.booted = true;
        if (boot) {
            this.watchColumn();
            requestAnimationFrame(() => { this.motion = true; });
            return;
        }
        if (!changed.has('_sign') && !changed.has('_log'))
            return;
        const clip = this.clip();
        const sheet = this.sheet();
        if (!clip || !sheet || this.heldHeight == null)
            return;
        const from = this.heldHeight;
        this.heldHeight = null;
        const to = Math.ceil(sheet.getBoundingClientRect().height);
        if (Math.abs(to - from) > 1)
            this.rollBetween(clip, sheet, from, to, to);
        else
            this.rest();
    }
    watchColumn() {
        if (typeof ResizeObserver === 'undefined')
            return;
        this.columnObserver = new ResizeObserver(() => {
            const width = Math.round(this.getBoundingClientRect().width);
            if (!width || width === this.columnWidth)
                return;
            this.columnWidth = width;
            if (!this.rollMotion)
                return;
            const clip = this.clip();
            const sheet = this.sheet();
            if (!clip || !sheet)
                return;
            const from = Math.ceil(clip.getBoundingClientRect().height);
            const sheetH = Math.ceil(sheet.getBoundingClientRect().height);
            this.rollBetween(clip, sheet, from, sheetH, sheetH);
        });
        this.columnObserver.observe(this);
    }
    clip() {
        return this.shadowRoot?.querySelector('.login-clip') ?? null;
    }
    sheet() {
        return this.shadowRoot?.querySelector('.service') ?? null;
    }
    reduced() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    // Required - resting card. auto, no translate, no transition.
    rest() {
        this.rollMotion = false;
        this.clipHeight = 'auto';
        this.sheetShift = 'none';
    }
    clipStyle() {
        const travel = this.rollMotion && !this.reduced();
        return {
            height: this.clipHeight,
            maxHeight: this.clipHeight === 'auto' ? 'none' : this.clipHeight,
            transition: travel
                ? 'height var(--pwa_slide, 2s) ease-in-out, max-height var(--pwa_slide, 2s) ease-in-out'
                : 'none',
        };
    }
    sheetStyle() {
        const travel = this.rollMotion && !this.reduced();
        return {
            transform: this.sheetShift,
            transition: travel ? 'transform var(--pwa_slide, 2s) ease-in-out' : 'none',
        };
    }
    // Ease the clip from → to. translateY = clip − sheetHeight, so the bottom stays glued.
    rollBetween(clip, sheet, from, to, sheetHeight) {
        const start = from - sheetHeight;
        const end = to - sheetHeight;
        const shift = (px) => `translate3d(0, ${px}px, 0)`;
        if (this.reduced() || Math.abs(to - from) <= 1) {
            this.rest();
            return;
        }
        const travel = 'height var(--pwa_slide, 2s) ease-in-out, max-height var(--pwa_slide, 2s) ease-in-out';
        const move = 'transform var(--pwa_slide, 2s) ease-in-out';
        clip.style.transition = 'none';
        sheet.style.transition = 'none';
        clip.style.height = `${Math.max(0, from)}px`;
        clip.style.maxHeight = `${Math.max(0, from)}px`;
        sheet.style.transform = shift(start);
        void clip.offsetHeight;
        clip.style.transition = travel;
        sheet.style.transition = move;
        clip.style.height = `${Math.max(0, to)}px`;
        clip.style.maxHeight = `${Math.max(0, to)}px`;
        sheet.style.transform = shift(end);
        this.rollMotion = true;
        this.clipHeight = `${Math.max(0, to)}px`;
        this.sheetShift = shift(end);
    }
    static get styles() {
        return [
            authStyles,
            linkStyle,
            lineStyle,
            listStyle,
            animation,
            tapStyle,
            noticeStyle,
            css `
      /* Required - this card's roll only. Block, so the sheet is not stretched to the clip. */
      .login-clip {
        display:            block;
        overflow:           hidden;
        min-height:         0;
      }

      .login-clip > .service {
        height:             auto;
        align-self:         start;
      }
    `
        ];
    }
    ;
    render() {
        return html `

    <div
      class="login-clip"
      style=${styleMap(this.clipStyle())}
      @transitionend=${this.onClipEnd}>
    <section class="service" part="panel" style=${styleMap(this.sheetStyle())}>

      <div part="header">
        <h2 part="title">${this._log ? accountTitle(this._name, this._email) : this._sign === this.subscribe ? 'Login' : 'Subscribe'}</h2>
      </div>

      <!-- Logged-out State -->
      <div
        class=          "spec"
        ?on=            "${this._log === false}">

        <div class=     "wrapper">
          <div class=${classMap({ inner: true, motion: this.motion })}>

            <!-- Required - subscribe chooses the open form -->
            <form-login
              source=       "page"
              ?hide-google= "${this.hideGoogle}"
              exportparts=  "email: login-email, password: login-password, submit: login-submit, switch: login-switch, forgot: login-forgot, status: login-status, reveal: login-reveal, google: login-google"
              ?inert=       "${this._sign !== this.subscribe}"
              aria-hidden=  "${this._sign !== this.subscribe ? 'true' : 'false'}"
              class=        ${classMap({
            content: true,
            opened: this._sign === this.subscribe,
            closed: this._sign !== this.subscribe,
        })}></form-login>

            <!-- Sign-up State -->
            <form-signup
              source=       "page"
              ?hide-google= "${this.hideGoogle}"
              exportparts=  "email: signup-email, password: signup-password, submit: signup-submit, switch: signup-switch, status: signup-status, reveal: signup-reveal, notice: signup-notice, google: signup-google"
              ?inert=       "${this._sign === this.subscribe}"
              aria-hidden=  "${this._sign === this.subscribe ? 'true' : 'false'}"
              class=        ${classMap({
            content: true,
            opened: !this._sign === this.subscribe,
            closed: !this._sign !== this.subscribe,
        })}></form-signup>

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
    </div>

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
__decorate([
    state(),
    __metadata("design:type", Object)
], UserLogin.prototype, "motion", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], UserLogin.prototype, "clipHeight", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], UserLogin.prototype, "sheetShift", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], UserLogin.prototype, "rollMotion", void 0);
UserLogin = __decorate([
    customElement('user-login'),
    __metadata("design:paramtypes", [])
], UserLogin);
export { UserLogin };
/*

\?on="\${ true === this._sign \? !this.subscribe \: this.subscribe }"
\?on="\${ false === this._sign \? !this.subscribe \: this.subscribe }"

*/ 
//# sourceMappingURL=page.js.map