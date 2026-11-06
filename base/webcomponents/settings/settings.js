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
import { state, customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../../store.js';
import { navigateAuth } from '../../redux/session.js';
import { navigation } from './css/navigation.js';
import './input/uploader.js';
import './input/name.js';
import './input/email.js';
import './input/password.js';
import './input/delete.js';
import './input/verify.js';
import { listStyle } from '../form/css/list.js';
import { tapStyle } from '../css/tap.js';
import { applyFirebaseConfig } from '../../firebase/attribute.js';
import { accountTitle } from '../form/letters.js';
let UserSettings = class UserSettings extends connect(store)(LitElement) {
    constructor() {
        super();
        /** @attr emptyArtwork */
        this.empty = '';
        this.profileTopic = '';
        this.name = '';
        this.email = '';
        this.login = false;
        /** Clip size. auto is the resting panel. A px value is mid-roll. */
        this.clipHeight = 'auto';
        /** Sheet translate. none keeps the panel's bottom on the clip. */
        this.sheetShift = 'none';
        /** True only while this settings clip and sheet are easing. */
        this.rollMotion = false;
        /** Tab rolling up behind the fold. Empty when the panel is at rest. */
        this.leaving = '';
        /** Outgoing clip size. A px value while it rolls up to the fold. */
        this.leaveClipHeight = '0px';
        /** Outgoing sheet translate. Starts at 0 and rides the rising bottom edge. */
        this.leaveSheetShift = 'translate3d(0, 0, 0)';
        /** True only while the outgoing clip and sheet are easing. */
        this.leaveMotion = false;
        this.booted = false;
        this.heldHeight = null;
        this.leaveFrom = 0;
        this.columnWidth = 0;
        this.columnObserver = null;
        this.onSubmit = (event) => {
            event.preventDefault();
        };
        // Only this clip. Nothing in another component, and no child form, ends the roll.
        this.onFrontEnd = (event) => {
            if (!(event instanceof TransitionEvent))
                return;
            if (event.target !== event.currentTarget)
                return;
            if (event.propertyName !== 'max-height')
                return;
            this.rest();
        };
        this.onBackEnd = (event) => {
            if (!(event instanceof TransitionEvent))
                return;
            if (event.target !== event.currentTarget)
                return;
            if (event.propertyName !== 'max-height')
                return;
            this.leaving = '';
            this.leaveMotion = false;
        };
    }
    connectedCallback() {
        applyFirebaseConfig(this);
        if (!this.hasAttribute('role'))
            this.setAttribute('role', 'region');
        if (!this.hasAttribute('aria-label'))
            this.setAttribute('aria-label', 'Account settings');
        super.connectedCallback();
        /* Required - cancel native form submit */
        this.addEventListener('submit', this.onSubmit);
    }
    disconnectedCallback() {
        this.removeEventListener('submit', this.onSubmit);
        this.columnObserver?.disconnect();
        this.columnObserver = null;
        super.disconnectedCallback();
    }
    // Required - move across the four tabs from the keyboard
    onTabKey(event) {
        if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft')
            return;
        event.preventDefault();
        const order = ['profile', 'verification', 'password', 'delete'];
        const index = order.indexOf(this.profileTopic);
        const step = event.key === 'ArrowRight' ? 1 : -1;
        const next = order[(index + step + order.length) % order.length];
        store.dispatch(navigateAuth(next));
        this.updateComplete.then(() => {
            this.shadowRoot?.querySelector(`button[value="${next}"]`)?.focus();
        });
    }
    stateChanged(state) {
        this.profileTopic = state.session.settings;
        this.login = Boolean(state.session.login);
        this.name = state.session.name;
        this.email = state.session.email;
    }
    static get styles() {
        return [
            navigation,
            listStyle,
            tapStyle,
            css `

      :host {
        display:          block;
        box-sizing:       border-box;
        width:            100%;
        min-width:        0; /* Required - shrink inside a flex or grid track */
        max-width:        100%;
        /* Required - this component's clock. It is not the drawer or the page login. */
        --pwa_slide:      2s;
        background-color: var(--pwa_background, var(--pwa_settings_background_color, #fff));
      }

      @media (prefers-reduced-motion: reduce) {
        :host { --pwa_slide: 0s; }
      }

      /* Required - this settings roll only. The two clips share one cell so the
         stage is as tall as the lower edge, and the incoming clip paints in front. */
      .settings-stage {
        display:          grid;
      }

      .settings-clip {
        grid-area:        1 / 1;
        align-self:       start;
        justify-self:     stretch;
        display:          block;
        overflow:         hidden;
        min-height:       0;
        width:            100%;
      }

      .settings-clip.is-front { z-index: 2; }
      .settings-clip.is-back { z-index: 1; }

      .settings-sheet {
        display:          block;
        height:           auto;
        width:            100%;
        box-sizing:       border-box;
        background-color: var(--pwa_background, var(--pwa_settings_background_color, #fff));
      }

      /* Required - an inactive tab stays fully behind the fold. */
      .settings-sheet > section[hidden] {
        display:          none !important;
      }

      form {
        box-sizing:       border-box;
        display:          grid;
        border:           0;
      }

      .pageTitle { margin: 0; }

      .signed-out {
        margin:           0;
        padding:          20px var(--pwa_inset, 0px);
        text-align:       center;
        color:            var(--pwa_label_text_color, #1c2430);
        font-size:        0.95rem;
        line-height:      1.45;
      }

      /* up to 576 pixels */
      @media only screen and (max-width: 576px) {
        h2 {
          font-size: medium;
        }
      }

    `
        ];
    }
    openTab(name) {
        store.dispatch(navigateAuth(name));
    }
    tabOn(name) {
        return (this.profileTopic || 'profile') === name;
    }
    willUpdate(changed) {
        if (!this.booted || !this.login || changed.has('login'))
            return;
        if (!changed.has('profileTopic'))
            return;
        if (this.reduced())
            return;
        const previous = String(changed.get('profileTopic') || '');
        if (!previous || previous === this.profileTopic)
            return;
        const clip = this.clipFor(previous);
        this.leaveFrom = clip ? Math.ceil(clip.getBoundingClientRect().height) : 0;
        this.leaving = previous;
        this.leaveMotion = false;
        this.leaveClipHeight = `${this.leaveFrom}px`;
        this.leaveSheetShift = 'translate3d(0, 0, 0)';
        /* Required - park the incoming panel behind the fold before it paints. */
        this.rollMotion = false;
        this.clipHeight = '0px';
        this.sheetShift = 'translate3d(0, -100%, 0)';
        this.heldHeight = 0;
    }
    updated(changed) {
        const boot = !this.booted;
        this.booted = true;
        if (boot)
            this.watchColumn();
        if (boot || !changed.has('profileTopic') || !this.login || changed.has('login'))
            return;
        const clip = this.frontClip();
        const sheet = this.sheetOf(clip);
        if (clip && sheet && this.heldHeight != null) {
            const from = this.heldHeight;
            this.heldHeight = null;
            const to = this.sheetPx(clip, sheet);
            if (Math.abs(to - from) > 1)
                this.rollLayer('front', clip, sheet, from, to, to);
            else
                this.rest();
        }
        const back = this.backClip();
        const backSheet = this.sheetOf(back);
        if (back && backSheet && this.leaving) {
            const sheetH = this.sheetPx(back, backSheet);
            const from = this.leaveFrom || sheetH;
            this.rollLayer('back', back, backSheet, from, 0, sheetH);
        }
    }
    watchColumn() {
        if (typeof ResizeObserver === 'undefined')
            return;
        this.columnObserver = new ResizeObserver(() => {
            const width = Math.round(this.getBoundingClientRect().width);
            if (!width || width === this.columnWidth)
                return;
            this.columnWidth = width;
            if (this.rollMotion) {
                const clip = this.frontClip();
                const sheet = this.sheetOf(clip);
                if (clip && sheet) {
                    const from = Math.ceil(clip.getBoundingClientRect().height);
                    const sheetH = this.sheetPx(clip, sheet);
                    this.rollLayer('front', clip, sheet, from, sheetH, sheetH);
                }
            }
            if (this.leaveMotion) {
                const clip = this.backClip();
                const sheet = this.sheetOf(clip);
                if (clip && sheet) {
                    const from = Math.ceil(clip.getBoundingClientRect().height);
                    const sheetH = this.sheetPx(clip, sheet);
                    this.rollLayer('back', clip, sheet, from, 0, sheetH);
                }
            }
        });
        this.columnObserver.observe(this);
    }
    clipFor(name) {
        return this.shadowRoot?.querySelector(`.settings-clip[data-panel="${name}"]`) ?? null;
    }
    frontClip() {
        return this.clipFor(this.profileTopic || 'profile');
    }
    backClip() {
        return this.leaving ? this.clipFor(this.leaving) : null;
    }
    sheetOf(clip) {
        return clip?.querySelector('.settings-sheet') ?? null;
    }
    reduced() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    // Sheet height in px. The clip cap is released for the read and put back. No paint.
    sheetPx(clip, sheet) {
        const transition = clip.style.transition;
        const maxHeight = clip.style.maxHeight;
        const height = clip.style.height;
        clip.style.transition = 'none';
        clip.style.maxHeight = 'none';
        clip.style.height = 'auto';
        const px = Math.ceil(sheet.offsetHeight);
        clip.style.height = height;
        clip.style.maxHeight = maxHeight;
        clip.style.transition = transition;
        return px;
    }
    // Required - resting panel. The first paint binds this, with no transition.
    rest() {
        this.rollMotion = false;
        this.clipHeight = 'auto';
        this.sheetShift = 'none';
    }
    layerStyle(motion, height) {
        const travel = motion && !this.reduced();
        return {
            height,
            maxHeight: height === 'auto' ? 'none' : height,
            transition: travel
                ? 'height var(--pwa_slide, 2s) ease-in-out, max-height var(--pwa_slide, 2s) ease-in-out'
                : 'none',
        };
    }
    shiftStyle(motion, shift) {
        const travel = motion && !this.reduced();
        return {
            transform: shift,
            transition: travel ? 'transform var(--pwa_slide, 2s) ease-in-out' : 'none',
        };
    }
    clipStyle() {
        return this.layerStyle(this.rollMotion, this.clipHeight);
    }
    sheetStyle() {
        return this.shiftStyle(this.rollMotion, this.sheetShift);
    }
    leaveClipStyle() {
        return this.layerStyle(this.leaveMotion, this.leaveClipHeight);
    }
    leaveSheetStyle() {
        return this.shiftStyle(this.leaveMotion, this.leaveSheetShift);
    }
    // Ease one clip from → to. translateY = clip − sheetHeight, so the bottom stays glued.
    rollLayer(layer, clip, sheet, from, to, sheetHeight) {
        const start = from - sheetHeight;
        const end = to - sheetHeight;
        const shift = (px) => `translate3d(0, ${px}px, 0)`;
        if (this.reduced() || Math.abs(to - from) <= 1) {
            if (layer === 'front')
                this.rest();
            else
                this.leaving = '';
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
        if (layer === 'front') {
            this.rollMotion = true;
            this.clipHeight = `${Math.max(0, to)}px`;
            this.sheetShift = shift(end);
        }
        else {
            this.leaveMotion = true;
            this.leaveClipHeight = `${Math.max(0, to)}px`;
            this.leaveSheetShift = shift(end);
        }
    }
    layerOf(name) {
        if (name === this.leaving)
            return 'back';
        if (this.tabOn(name))
            return 'front';
        return 'idle';
    }
    // One tab panel. It stays in its own clip, so a tab change does not remount it.
    panel(name, title) {
        const layer = this.layerOf(name);
        const on = layer === 'front';
        const concealed = layer === 'idle';
        const id = `pwa-panel-${name}`;
        const labelledby = `pwa-tab-${name}`;
        const body = name === 'profile' ? html `
            <h2>${title}</h2>
            <contact-photo emptyArtwork="${this.empty}" exportparts="progress, file, preview"></contact-photo>
          ` : name === 'verification' ? html `
            <h2>Contact Information</h2>
            <input-name exportparts="name, submit: name-submit"></input-name>
            <contact-email exportparts="email, submit: email-submit"></contact-email>
            <email-verify exportparts="notice, status: verify-status, submit: verify-submit, verified, unverified"></email-verify>
          ` : name === 'password' ? html `
            <h2>Password</h2>
            <input-password exportparts="password, verify, submit: password-submit"></input-password>
          ` : html `
            <h2>Delete Account</h2>
            <delete-user exportparts="submit: delete"></delete-user>
          `;
        return html `
          <section
            id="${id}"
            part="panel"
            role="tabpanel"
            aria-labelledby="${labelledby}"
            aria-hidden="${on ? 'false' : 'true'}"
            ?inert="${!on}"
            ?hidden="${concealed}">
            ${body}
          </section>
        `;
    }
    render() {
        if (!this.login) {
            return html `
        <p class="signed-out" part="signed-out" role="status">Sign in to change the photo, name, email, or password.</p>
      `;
        }
        const title = accountTitle(this.name, this.email);
        return html `
    
      <!-- Page Menu -->
      <nav aria-label="Account" @keydown="${this.onTabKey}">

        <ul role="tablist">

          <li>
            <button
              type="button"
              role="tab"
              id="pwa-tab-profile"
              part="tab"
              value="profile"
              aria-selected="${this.tabOn('profile')}"
              aria-controls="pwa-panel-profile"
              tabindex="${this.tabOn('profile') ? '0' : '-1'}"
              ?on="${this.tabOn('profile')}"
              @click="${() => this.openTab('profile')}">Photo
            </button>
          </li>

          <li>
            <button
              type="button"
              role="tab"
              id="pwa-tab-verification"
              part="tab"
              value="verification"
              aria-selected="${this.tabOn('verification')}"
              aria-controls="pwa-panel-verification"
              tabindex="${this.tabOn('verification') ? '0' : '-1'}"
              ?on="${this.tabOn('verification')}"
              @click="${() => this.openTab('verification')}">Profile
            </button>
          </li>

          <li>
            <button
              type="button"
              role="tab"
              id="pwa-tab-password"
              part="tab"
              value="password"
              aria-selected="${this.tabOn('password')}"
              aria-controls="pwa-panel-password"
              tabindex="${this.tabOn('password') ? '0' : '-1'}"
              ?on="${this.tabOn('password')}"
              @click="${() => this.openTab('password')}">Password
            </button>
          </li>

          <li>
            <button
              type="button"
              role="tab"
              id="pwa-tab-delete"
              part="tab"
              value="delete"
              aria-selected="${this.tabOn('delete')}"
              aria-controls="pwa-panel-delete"
              tabindex="${this.tabOn('delete') ? '0' : '-1'}"
              ?on="${this.tabOn('delete')}"
              @click="${() => this.openTab('delete')}">Delete
            </button>
          </li>

        </ul>

      </nav>

      
      <div class="settings-stage">
        ${['profile', 'verification', 'password', 'delete'].map((name) => {
            const layer = this.layerOf(name);
            return html `
            <div
              class="settings-clip ${layer === 'front' ? 'is-front' : layer === 'back' ? 'is-back' : ''}"
              data-panel="${name}"
              style=${styleMap(layer === 'back' ? this.leaveClipStyle() : layer === 'front' ? this.clipStyle() : { height: '0px', maxHeight: '0px', transition: 'none' })}
              @transitionend=${layer === 'back' ? this.onBackEnd : this.onFrontEnd}>
              <div class="settings-sheet" style=${styleMap(layer === 'back' ? this.leaveSheetStyle() : layer === 'front' ? this.sheetStyle() : { transform: 'translate3d(0, -100%, 0)', transition: 'none' })}>
                ${this.panel(name, title)}
              </div>
            </div>
          `;
        })}
      </div>

    `;
    }
};
__decorate([
    property({ type: String, reflect: true }),
    __metadata("design:type", Object)
], UserSettings.prototype, "empty", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], UserSettings.prototype, "profileTopic", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], UserSettings.prototype, "name", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], UserSettings.prototype, "email", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], UserSettings.prototype, "login", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], UserSettings.prototype, "clipHeight", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], UserSettings.prototype, "sheetShift", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], UserSettings.prototype, "rollMotion", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], UserSettings.prototype, "leaving", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], UserSettings.prototype, "leaveClipHeight", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], UserSettings.prototype, "leaveSheetShift", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], UserSettings.prototype, "leaveMotion", void 0);
UserSettings = __decorate([
    customElement('user-settings'),
    __metadata("design:paramtypes", [])
], UserSettings);
export { UserSettings };
//# sourceMappingURL=settings.js.map