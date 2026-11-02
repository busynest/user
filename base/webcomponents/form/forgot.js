var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { html, css } from 'lit';
import { customElement, state } from "lit/decorators.js";
import { LazyLoader } from '../../lazyLoader.js';
import { auth } from '../../firebase/authentication.js';
import { sendPasswordResetEmail } from 'firebase/auth';
import { pwaAuthError, pwaResetSent } from '../../events/names.js';
import { emitWindow, toAuthError } from '../../events/emit.js';
import { userMessage } from '../../firebase/message.js';
import { openDrawer } from '../../api/drawer.js';
import store from '../../store.js';
import { universalToggle } from '../../redux/session.js';
import { labelStyle } from './css/label.js';
import { inputStyle } from './css/input.js';
import { buttonStyle } from './css/button.js';
import { toggleStyle } from './css/toggle.js';
const resetWait = 45;
const sentMessage = 'If an account uses that email, a reset link is on its way.';
function emailProblem(value) {
    if (value.length < 4) {
        return { code: 'pwa/missing-email', message: 'Enter an email address.' };
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return { code: 'pwa/invalid-email', message: 'Enter a valid email address.' };
    }
    return null;
}
function missingAccount(error) {
    return toAuthError(error).code === 'auth/user-not-found';
}
let EmailReset = class EmailReset extends LazyLoader {
    constructor() {
        super();
        this.userEmail = '';
        this.status = '';
        this.tone = '';
        this.invalid = false;
        this.busy = false;
        this.cooldown = 0;
        this.timer = 0;
        this.resetPassword = async (event) => {
            event.preventDefault();
            if (this.busy || this.cooldown > 0)
                return;
            const input = this.renderRoot.querySelector('.email');
            this.userEmail = (input ? input.value : this.userEmail).trim();
            if (input && input.value !== this.userEmail)
                input.value = this.userEmail;
            const problem = emailProblem(this.userEmail);
            if (problem) {
                this.showError(problem, 'email');
                return;
            }
            this.busy = true;
            this.tone = '';
            this.status = '';
            try {
                await sendPasswordResetEmail(auth, this.userEmail);
                this.showSent();
            }
            catch (error) {
                if (missingAccount(error))
                    this.showSent();
                else
                    this.showFirebase(error);
            }
            finally {
                this.busy = false;
            }
        };
        this.backToSignIn = () => {
            const drawer = document.querySelector('user-drawer');
            if (drawer) {
                const subscribe = drawer.hasAttribute('subscribe');
                const signup = Boolean(store.getState().session?.registerOne);
                if (signup !== subscribe)
                    store.dispatch(universalToggle('drawer'));
                openDrawer();
                return;
            }
            const page = document.querySelector('user-login');
            if (!page)
                return;
            const subscribe = page.hasAttribute('subscribe');
            const signup = Boolean(store.getState().session?.registerTwo);
            if (signup !== subscribe)
                store.dispatch(universalToggle('page'));
            page.scrollIntoView({ block: 'nearest' });
        };
    }
    static { this.styles = [
        labelStyle,
        inputStyle,
        buttonStyle,
        toggleStyle,
        css `
      :host {
        display:          block;
        background-color: var(--pwa_background, #fff);
      }

      /* Required - live region stays in the tree. Idle layout stays put. */
      .status {
        margin:                 0 0 8px;
        color:                  var(--pwa_label_text_color, #1c2430);
        font-size:              0.95rem;
        line-height:            1.4;
      }

      .status:not(.on) {
        position:               absolute;
        width:                  1px;
        height:                 1px;
        padding:                0;
        margin:                 -1px;
        overflow:               hidden;
        clip:                   rect(0, 0, 0, 0);
        white-space:            nowrap;
        border:                 0;
      }

      .status.error { color: var(--pwa_close_color, #9a3b32); }

      .status:focus { outline: 0; }

      .status:focus-visible {
        outline:                2px solid var(--pwa_focus, #1c2430);
        outline-offset:         2px;
      }

      button.reset:disabled {
        cursor:                 default;
        opacity:                0.72;
      }

      button.new {
        display:                block;
      }
    `
    ]; }
    connectedCallback() {
        if (!this.hasAttribute('role'))
            this.setAttribute('role', 'region');
        if (!this.hasAttribute('aria-label'))
            this.setAttribute('aria-label', 'Reset password');
        super.connectedCallback();
    }
    disconnectedCallback() {
        window.clearInterval(this.timer);
        this.timer = 0;
        super.disconnectedCallback();
    }
    handleEmail(event) {
        const input = event.target;
        this.userEmail = input.value;
        if (this.invalid)
            this.invalid = false;
    }
    buttonLabel() {
        if (this.busy)
            return 'Sending…';
        if (this.cooldown > 0)
            return `Send again in ${this.cooldown}s`;
        return 'Send reset email';
    }
    render() {
        const described = 'pwa-reset-status';
        return html `

      <form
        class="resetPass"
        novalidate
        aria-busy="${this.busy ? 'true' : 'false'}"
        @submit="${this.resetPassword}">

        <label for="pwa-reset-email">Email

          <input
            id            = "pwa-reset-email"
            class         = "email"
            part          = "email"
            name          = "email"
            type          = "email"
            autocomplete  = "email"
            required
            aria-invalid  = "${this.invalid ? 'true' : 'false'}"
            aria-describedby = "${described}"
            @input        = "${this.handleEmail}"
            @change       = "${this.handleEmail}">

        </label>

        <p
          id            = "pwa-reset-status"
          part          = "status"
          class         = "status ${this.status ? 'on' : ''} ${this.tone}"
          role          = "status"
          aria-live     = "polite"
          aria-atomic   = "true"
          tabindex      = "-1">${this.status}</p>

        <button
          type          = "submit"
          part          = "submit"
          class         = "reset action-button"
          aria-describedby = "${described}"
          aria-busy     = "${this.busy ? 'true' : 'false'}"
          ?disabled     = "${this.busy || this.cooldown > 0}">${this.buttonLabel()}</button>

        <button
          type          = "button"
          part          = "back"
          class         = "new"
          @click        = "${this.backToSignIn}">back to sign in</button>

      </form>

    `;
    }
    showSent() {
        this.tone = '';
        this.status = sentMessage;
        this.invalid = false;
        this.cooldown = resetWait;
        this.armCooldown();
        emitWindow(pwaResetSent, { email: this.userEmail });
        void this.updateComplete.then(() => { this.focusStatus(); });
    }
    showError(detail, focus) {
        this.tone = 'error';
        this.status = userMessage(detail);
        this.invalid = focus === 'email';
        emitWindow(pwaAuthError, detail);
        void this.updateComplete.then(() => { this.focusAfter(focus); });
    }
    showFirebase(error) {
        const detail = toAuthError(error);
        this.tone = 'error';
        this.status = userMessage(error);
        this.invalid = detail.code === 'auth/invalid-email';
        emitWindow(pwaAuthError, detail);
        void this.updateComplete.then(() => {
            this.focusAfter(this.invalid ? 'email' : 'status');
        });
    }
    focusAfter(focus) {
        if (focus === 'email')
            this.focusEmail();
        else
            this.focusStatus();
    }
    focusEmail() {
        const input = this.renderRoot.querySelector('.email');
        input?.focus();
    }
    focusStatus() {
        const status = this.renderRoot.querySelector('#pwa-reset-status');
        status?.focus();
    }
    armCooldown() {
        window.clearInterval(this.timer);
        this.timer = window.setInterval(() => {
            if (this.cooldown <= 1) {
                this.cooldown = 0;
                window.clearInterval(this.timer);
                this.timer = 0;
                return;
            }
            this.cooldown -= 1;
        }, 1000);
    }
};
__decorate([
    state(),
    __metadata("design:type", String)
], EmailReset.prototype, "userEmail", void 0);
__decorate([
    state(),
    __metadata("design:type", String)
], EmailReset.prototype, "status", void 0);
__decorate([
    state(),
    __metadata("design:type", String)
], EmailReset.prototype, "tone", void 0);
__decorate([
    state(),
    __metadata("design:type", Boolean)
], EmailReset.prototype, "invalid", void 0);
__decorate([
    state(),
    __metadata("design:type", Boolean)
], EmailReset.prototype, "busy", void 0);
__decorate([
    state(),
    __metadata("design:type", Number)
], EmailReset.prototype, "cooldown", void 0);
EmailReset = __decorate([
    customElement('email-reset'),
    __metadata("design:paramtypes", [])
], EmailReset);
export { EmailReset };
//# sourceMappingURL=forgot.js.map