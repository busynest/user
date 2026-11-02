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
import { navigateAuth } from '../../redux/frontend.js';
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
        this.empty = '';
        this.profileTopic = '';
        this.name = '';
        this.email = '';
        this.login = false;
        this.clipHeight = 'auto';
        this.sheetShift = 'none';
        this.rollMotion = false;
        this.booted = false;
        this.heldHeight = null;
        this.columnWidth = 0;
        this.columnObserver = null;
        this.onSubmit = (event) => {
            event.preventDefault();
        };
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
            this.setAttribute('aria-label', 'Account settings');
        super.connectedCallback();
        this.addEventListener('submit', this.onSubmit);
    }
    disconnectedCallback() {
        this.removeEventListener('submit', this.onSubmit);
        this.columnObserver?.disconnect();
        this.columnObserver = null;
        super.disconnectedCallback();
    }
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
        this.profileTopic = state.frontend.settings;
        this.login = Boolean(state.frontend?.login);
        this.name = state.backend.name;
        this.email = state.backend.email;
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

      /* Required - this settings roll only. Block, so the sheet is not stretched. */
      .settings-clip {
        display:          block;
        overflow:         hidden;
        min-height:       0;
      }

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
        const clip = this.clip();
        const sheet = this.sheet();
        if (!clip || !sheet || this.heldHeight == null)
            return;
        const from = this.heldHeight;
        this.heldHeight = null;
        const to = this.sheetPx(clip, sheet);
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
            const sheetH = this.sheetPx(clip, sheet);
            this.rollBetween(clip, sheet, from, sheetH, sheetH);
        });
        this.columnObserver.observe(this);
    }
    clip() {
        return this.shadowRoot?.querySelector('.settings-clip') ?? null;
    }
    sheet() {
        return this.shadowRoot?.querySelector('.settings-sheet') ?? null;
    }
    reduced() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
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
              @click="${() => this.openTab('profile')}">Icon
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

      
      <div
        class="settings-clip"
        style=${styleMap(this.clipStyle())}
        @transitionend=${this.onClipEnd}>
          <div class="settings-sheet" style=${styleMap(this.sheetStyle())}>


          <!-- Page 1: Profile -->
          <section
            id="pwa-panel-profile"
            part="panel"
            role="tabpanel"
            aria-labelledby="pwa-tab-profile"
            aria-hidden="${this.tabOn('profile') ? 'false' : 'true'}"
            ?inert="${!this.tabOn('profile')}"
            ?hidden="${!this.tabOn('profile')}">

            <!-- Display Username -->
            <h2>${title}</h2>

            <!-- Custom Image Element - Display / Upload -->
            <contact-photo emptyArtwork="${this.empty}" exportparts="progress, file, preview"></contact-photo>

          </section>
          
          <!-- Page 2: Verification -->
          <section
            id="pwa-panel-verification"
            part="panel"
            role="tabpanel"
            aria-labelledby="pwa-tab-verification"
            aria-hidden="${this.tabOn('verification') ? 'false' : 'true'}"
            ?inert="${!this.tabOn('verification')}"
            ?hidden="${!this.tabOn('verification')}">

            <!-- Page Title -->
            <h2>Contact Information</h2>

            <!-- Required - unverified notice. Sign-in stays open. -->
            <email-verify exportparts="notice, status: verify-status, submit: verify-submit, verified, unverified"></email-verify>

            <!-- Custom - Username -->
            <input-name exportparts="name, submit: name-submit"></input-name>

            <!-- Custom - Email -->
            <contact-email exportparts="email, submit: email-submit"></contact-email>

          </section>

          <!-- Page 3: Password -->
          <section
            id="pwa-panel-password"
            part="panel"
            role="tabpanel"
            aria-labelledby="pwa-tab-password"
            aria-hidden="${this.tabOn('password') ? 'false' : 'true'}"
            ?inert="${!this.tabOn('password')}"
            ?hidden="${!this.tabOn('password')}">

            <!-- Page Title -->
            <h2>Password</h2>

            <!-- Custom - Password -->
            <input-password exportparts="password, verify, submit: password-submit"></input-password>

          </section>

          <!-- Page 4: Delete -->
          <section
            id="pwa-panel-delete"
            part="panel"
            role="tabpanel"
            aria-labelledby="pwa-tab-delete"
            aria-hidden="${this.tabOn('delete') ? 'false' : 'true'}"
            ?inert="${!this.tabOn('delete')}"
            ?hidden="${!this.tabOn('delete')}">

            <!-- Page Title -->
            <h2>Delete Account</h2>

            <!-- Custom - Delete -->
            <delete-user exportparts="submit: delete"></delete-user>

          </section>

          </div>
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
UserSettings = __decorate([
    customElement('user-settings'),
    __metadata("design:paramtypes", [])
], UserSettings);
export { UserSettings };
//# sourceMappingURL=settings.js.map