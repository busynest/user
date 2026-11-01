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
import { animation } from '../css/animation.js';
import { measureSheet, playRoll, releaseRoll, rollStyle } from '../css/roll.js';
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
        this.heldHeight = null;
        this.onSubmit = (event) => {
            event.preventDefault();
        };
        this.onRoll = (event) => {
            if (!(event instanceof TransitionEvent) || (event.propertyName !== 'max-height' && event.propertyName !== 'height'))
                return;
            if (event.propertyName === 'height')
                return;
            const clip = event.currentTarget;
            const sheet = clip.querySelector('.roll-sheet');
            if (!sheet)
                return;
            releaseRoll(clip, sheet);
        };
    }
    connectedCallback() {
        applyFirebaseConfig(this);
        super.connectedCallback();
        this.addEventListener('submit', this.onSubmit);
    }
    disconnectedCallback() {
        this.removeEventListener('submit', this.onSubmit);
        super.disconnectedCallback();
    }
    onTabKey(event) {
        if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft')
            return;
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
            animation,
            rollStyle,
            tapStyle,
            css `

      :host {
        display:          grid;
        background-color: var(--pwa_settings_background_color, #fffdf8);
      }

      form {
        box-sizing:       border-box;
        display:          grid;
        border:           0;
      }

      .pageTitle { margin: 0; }

      .signed-out {
        margin:           0;
        padding:          20px 16px;
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
    willUpdate(changed) {
        if (!changed.has('profileTopic') || !this.login)
            return;
        const clip = this.shadowRoot?.querySelector('.roll');
        const sheet = clip?.querySelector('.roll-sheet');
        if (!clip || !sheet || (clip.style.maxHeight !== 'none' && clip.style.maxHeight !== ''))
            return;
        this.heldHeight = Math.ceil(sheet.getBoundingClientRect().height);
    }
    updated(changed) {
        if (!changed.has('profileTopic') && !changed.has('login'))
            return;
        const clip = this.shadowRoot?.querySelector('.roll');
        const sheet = clip?.querySelector('.roll-sheet');
        if (!clip || !sheet)
            return;
        if (this.heldHeight == null) {
            releaseRoll(clip, sheet);
            return;
        }
        const from = this.heldHeight;
        this.heldHeight = null;
        const to = measureSheet(clip, sheet);
        if (Math.abs(to - from) > 1)
            playRoll(clip, sheet, from, to, to);
        else
            releaseRoll(clip, sheet);
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
              part="tab"
              value="profile"
              aria-selected="${this.profileTopic === 'profile'}"
              ?on="${this.profileTopic === 'profile'}"
              @click="${() => this.openTab('profile')}">Icon
            </button>
          </li>

          <li>
            <button
              type="button"
              role="tab"
              part="tab"
              value="verification"
              aria-selected="${this.profileTopic === 'verification'}"
              ?on="${this.profileTopic === 'verification'}"
              @click="${() => this.openTab('verification')}">Profile
            </button>
          </li>

          <li>
            <button
              type="button"
              role="tab"
              part="tab"
              value="password"
              aria-selected="${this.profileTopic === 'password'}"
              ?on="${this.profileTopic === 'password'}"
              @click="${() => this.openTab('password')}">Password
            </button>
          </li>

          <li>
            <button
              type="button"
              role="tab"
              part="tab"
              value="delete"
              aria-selected="${this.profileTopic === 'delete'}"
              ?on="${this.profileTopic === 'delete'}"
              @click="${() => this.openTab('delete')}">Delete
            </button>
          </li>

        </ul>

      </nav>

      
      <div class=     "wrapper">
        <div class="inner roll" @transitionend="${this.onRoll}">
          <div class="roll-sheet">


          <!-- Page 1: Profile -->
          <section
            part="panel"
            role="tabpanel"
            aria-hidden="${this.profileTopic === 'profile' ? 'false' : 'true'}"
            ?inert="${this.profileTopic !== 'profile'}"
            ?hidden="${this.profileTopic !== 'profile'}">

            <!-- Display Username -->
            <h2>${title}</h2>

            <!-- Custom Image Element - Display / Upload -->
            <contact-photo emptyArtwork="${this.empty}" exportparts="progress, file, preview"></contact-photo>

          </section>
          
          <!-- Page 2: Verification -->
          <section
            part="panel"
            role="tabpanel"
            aria-hidden="${this.profileTopic === 'verification' ? 'false' : 'true'}"
            ?inert="${this.profileTopic !== 'verification'}"
            ?hidden="${this.profileTopic !== 'verification'}">

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
            part="panel"
            role="tabpanel"
            aria-hidden="${this.profileTopic === 'password' ? 'false' : 'true'}"
            ?inert="${this.profileTopic !== 'password'}"
            ?hidden="${this.profileTopic !== 'password'}">

            <!-- Page Title -->
            <h2>Password</h2>

            <!-- Custom - Password -->
            <input-password exportparts="password, verify, submit: password-submit"></input-password>

          </section>

          <!-- Page 4: Delete -->
          <section
            part="panel"
            role="tabpanel"
            aria-hidden="${this.profileTopic === 'delete' ? 'false' : 'true'}"
            ?inert="${this.profileTopic !== 'delete'}"
            ?hidden="${this.profileTopic !== 'delete'}">

            <!-- Page Title -->
            <h2>Delete Account</h2>

            <!-- Custom - Delete -->
            <delete-user exportparts="submit: delete"></delete-user>

          </section>

          </div>
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
UserSettings = __decorate([
    customElement('user-settings'),
    __metadata("design:paramtypes", [])
], UserSettings);
export { UserSettings };
//# sourceMappingURL=settings.js.map