import { CSSResultArray, html, LitElement }   from 'lit';
import { customElement, property, state }     from 'lit/decorators.js';
import { connect }                            from 'pwa-helpers/connect-mixin.js';
import { store, AppState }                    from '../../store.js';

import { authStyles }   from './css/auth.js';
import { linkStyle }    from './css/link.js';
import { lineStyle }    from './css/paragraph.js'; 
import { animation }    from '../css/animation.js'; 

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
  
  constructor() { super(); }

  override connectedCallback(): void {
    applyFirebaseConfig(this);
    super.connectedCallback();
    this._notice = verificationNotice();
    this.stopNotice = onVerificationNotice(() => { this._notice = verificationNotice(); });
  }

  override disconnectedCallback(): void {
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

  // protected firstUpdated() { }

  static get styles(): CSSResultArray { return [
    authStyles,
    linkStyle,
    lineStyle,
    listStyle,
    animation,
    tapStyle,
    noticeStyle
  ] };

  protected render() {
    return html`

    <section class="service" part="panel">

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