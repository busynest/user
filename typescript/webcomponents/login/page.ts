import { CSSResultArray, html, LitElement, PropertyValues } from 'lit';
import { customElement, property, state }     from 'lit/decorators.js';
import { connect }                            from 'pwa-helpers/connect-mixin.js';
import { store, AppState }                    from '../../store.js';

import { authStyles }   from './css/auth.js';
import { linkStyle }    from './css/link.js';
import { lineStyle }    from './css/paragraph.js'; 
import { animation }    from '../css/animation.js';
import { measureSheet, playRoll, releaseRoll, rollStyle } from '../css/roll.js'; 

import { listStyle }    from '../form/css/list.js';

import '../form/login.js';
import '../form/signup.js';
import { tapStyle } from '../css/tap.js';
import { applyFirebaseConfig } from '../../firebase/attribute.js';
import { accountTitle } from '../form/letters.js';
import { noticeStyle } from '../form/css/notice.js';
import { onVerificationNotice, verificationNotice } from '../form/notice.js';

@customElement('user-login')
export class UserLogin extends connect(store)(LitElement) {

  /** @attr subscribe */
  @property({type:Boolean, attribute: true, reflect: true}) public subscribe = false; // Drawer State

  /** @attr hide-google */
  @property({type: Boolean, attribute: 'hide-google', reflect: true}) public hideGoogle = false;
  
  @state() private _name        = "";
  @state() private _email       = "";
  @state() private _verified    = false;
  @state() private _notice      = "";
  @state() private _log         = false; // Login State
  @state() private _sign        = false; // Sign-up State

  private stopNotice: (() => void) | null = null;
  private heldHeight: number | null = null;
  
  constructor() { super(); }

  override connectedCallback(): void {
    applyFirebaseConfig(this);
    super.connectedCallback();
    this._notice = verificationNotice();
    this.stopNotice = onVerificationNotice(() => { this._notice = verificationNotice(); });
    this.addEventListener('transitionend', this.onRoll);
  }

  override disconnectedCallback(): void {
    this.removeEventListener('transitionend', this.onRoll);
    this.stopNotice?.();
    this.stopNotice = null;
    super.disconnectedCallback();
  }

  stateChanged(state: AppState) {
    this._name        = state.backend!.name;        // User Name
    this._email       = state.backend!.email;
    this._verified    = Boolean(state.backend?.verified);
    this._log         = state.frontend!.login;      // Logged in-out State
    this._sign        = state.frontend!.registerTwo;   // Sign-up State - register
  }

  protected willUpdate(changed: PropertyValues): void {
    if (!changed.has('_sign') && !changed.has('_log')) return;
    const sheet = this.sheet();
    if (!sheet || (this.style.maxHeight !== 'none' && this.style.maxHeight !== '')) return;
    this.heldHeight = Math.ceil(sheet.getBoundingClientRect().height);
  }

  protected updated(changed: PropertyValues): void {
    if (!changed.has('_sign') && !changed.has('_log')) return;
    const sheet = this.sheet();
    if (!sheet) return;
    if (this.heldHeight == null) {
      releaseRoll(this, sheet);
      return;
    }
    const from = this.heldHeight;
    this.heldHeight = null;
    const to = measureSheet(this, sheet);
    if (Math.abs(to - from) > 1) playRoll(this, sheet, from, to, to);
    else releaseRoll(this, sheet);
  }

  private sheet(): HTMLElement | null {
    return this.shadowRoot?.querySelector('.service') ?? null;
  }

  private onRoll = (event: Event) => {
    if (!(event instanceof TransitionEvent) || event.propertyName !== 'max-height') return;
    if (event.target !== this) return;
    const sheet = this.sheet();
    if (!sheet) return;
    releaseRoll(this, sheet);
  };

  static get styles(): CSSResultArray { return [
    authStyles,
    linkStyle,
    lineStyle,
    listStyle,
    animation,
    rollStyle,
    tapStyle,
    noticeStyle
  ] };

  protected render() {
    return html`

    <section class="service roll-sheet" part="panel">

      <header part="header">
        <h3 part="title">${this._log ? accountTitle(this._name, this._email) : this._sign === this.subscribe ? 'Login' : 'Subscribe'}</h3>
      </header>

      <!-- Logged-out State -->
      <div
        class=          "spec"
        ?on=            "${ this._log === false }">

        <div class=     "wrapper">
          <div class=   "inner">

            <!-- Required - subscribe chooses the open form -->
            <form-login
              source=       "page"
              ?hide-google= "${this.hideGoogle}"
              exportparts=  "email: login-email, password: login-password, submit: login-submit, switch: login-switch, forgot: login-forgot, status: login-status, reveal: login-reveal, google: login-google"
              ?inert=       "${this._sign !== this.subscribe}"
              class=        "content ${ this._sign === this.subscribe ? 'opened' : 'closed' } "></form-login>

            <!-- Sign-up State -->
            <form-signup
              source=       "page"
              ?hide-google= "${this.hideGoogle}"
              exportparts=  "email: signup-email, password: signup-password, submit: signup-submit, switch: signup-switch, status: signup-status, reveal: signup-reveal, notice: signup-notice, google: signup-google"
              ?inert=       "${this._sign === this.subscribe}"
              class=        "content ${ !this._sign === this.subscribe ? 'opened' : 'closed' }"></form-signup>

          </div>
        </div>

      </div>

      <!-- Logged-in State -->
      <div
        class=          "spec setLog"
        ?on=            "${ this._log === true }">

          ${this._notice && !this._verified ? html`
            <p class="notice" part="notice" role="status" aria-live="polite">Check your inbox for the verification email. You can still sign in.</p>
          ` : ''}

          <slot name="content"></slot>
          
      </div>

    </section>

    `;
  }

}

declare global {
  interface HTMLElementTagNameMap {
      'user-login': UserLogin;
  }
}

/*

\?on="\${ true === this._sign \? !this.subscribe \: this.subscribe }"
\?on="\${ false === this._sign \? !this.subscribe \: this.subscribe }"

*/