import { css, CSSResultArray, html, LitElement, PropertyValues }   from 'lit';
import { customElement, property, state }     from 'lit/decorators.js';
import { connect }                            from 'pwa-helpers/connect-mixin.js';

import { store, AppState }  from '../../store.js';

import { close }            from '../css/svg.js';
import { show }             from '../css/toggle.js';

import { listStyle }        from '../form/css/list.js';

import { drawerStyle }      from './css/drawer.js';
import { exitStyle }        from './css/exit.js';
import { linkStyle }        from './css/link.js';
import { lineStyle }        from './css/paragraph.js';

import { closeSign }       from '../../redux/frontend.js'; 
import { logOut }           from '../../firebase/interface.js';
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

@customElement('user-drawer')
export class UserDrawer extends connect(store)(LitElement) {

  /** @attr url */
  @property({type: String, reflect: true}) public url = '';

  /** @attr drawer */
  @property({type:Boolean, attribute: true, reflect: true}) public drawer = false; // Drawer State
  
 /** @attr subscribe */
  @property({type:Boolean, attribute: true, reflect: true}) public subscribe = false; // Drawer State

  /** @attr hide-google */
  @property({type: Boolean, attribute: 'hide-google', reflect: true}) public hideGoogle = false;
  
  @state() private name         = "";     // String Username
  @state() private email        = "";
  @state() private verified     = false;
  @state() private notice       = "";
  @state() private user         = false;  // True user is logged-in, false, user is logged-out, state
  @state() private signup       = false;  // True sign-up, false log-in, State

  private wasOpen = false;
  private sawOpen = false;
  private returnFocus: HTMLElement | null = null;
  private stopNotice: (() => void) | null = null;
  
  constructor() { super(); }

  override connectedCallback(): void {
    applyFirebaseConfig(this);
    super.connectedCallback();
    this.addEventListener('keydown', this.onKey);
    this.addEventListener('click', this.onLightClick);
    this.notice = verificationNotice();
    this.stopNotice = onVerificationNotice(() => { this.notice = verificationNotice(); });
  }

  override disconnectedCallback(): void {
    this.removeEventListener('keydown', this.onKey);
    this.removeEventListener('click', this.onLightClick);
    this.stopNotice?.();
    this.stopNotice = null;
    super.disconnectedCallback();
  }

  stateChanged(state: AppState) {
    const open        = state.frontend!.drawer;         // Drawer State
    this.name         = state.backend!.name;            // User Name
    this.email        = state.backend!.email;
    this.verified     = Boolean(state.backend?.verified);
    this.drawer       = open;
    this.user         = state.frontend!.login;          // Logged in-out State
    this.signup       = state.frontend!.registerOne;    // Sign-up State

    // Required - UI event from this element. Skip the closed state on first read.
    const changed = this.sawOpen ? open !== this.wasOpen : open;
    if (changed) {
      emitElement(this, pwaDrawerToggleName, { open });
    }
    this.wasOpen = open;
    this.sawOpen = true;
  }

  protected updated(changed: PropertyValues): void {
    if (!changed.has('drawer')) return;
    if (this.drawer) {
      const active = deepActive();
      this.returnFocus = active && !this.contains(active) ? active : this.returnFocus;
      this.shadowRoot?.querySelector<HTMLElement>('.close')?.focus();
      void refreshEmailVerified(false);
      return;
    }
    this.returnFocus?.focus();
    this.returnFocus = null;
  }

  // Required - Escape closes. Tab stays inside the open drawer.
  private onKey = (event: KeyboardEvent) => {
    if (!this.drawer) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      store.dispatch(closeSign());
      return;
    }
    if (event.key !== 'Tab') return;
    const items = focusable(this);
    if (!items.length) return;
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

  // Required - a host link or button in a slot closes the drawer. preventDefault keeps it open.
  private onLightClick = (event: Event) => {
    if (event.defaultPrevented) return;
    const target = event.target;
    if (!(target instanceof Element)) return;
    const control = target.closest('a, button');
    if (!(control instanceof HTMLElement)) return;
    if (!this.contains(control)) return;
    if (this.shadowRoot?.contains(control)) return;
    store.dispatch(closeSign());
  };
  
  protected firstUpdated() {

    this.shadowRoot!.querySelector('.close')!.addEventListener('click', () => {
       store.dispatch(closeSign());
      } );

    this.shadowRoot!.querySelector('.leave')!.addEventListener('click', async () => {
        if (this.user) {
          try { await logOut(); }
          catch { return; }
        }
        store.dispatch(closeSign());
      } );

      const link = this.shadowRoot!.querySelectorAll('a');
      link.forEach( item => {
        item.addEventListener('click', () => {
          store.dispatch( closeSign() );
        });
      });
      
  }

  static get styles(): CSSResultArray { return [
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
    css`
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
  ] };

  protected render() {
    return html`

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
        <h3 id="pwa-drawer-title" part="title">
          <span class="who">${ this.user === false ? this.signup === this.subscribe ? `Login` : `Subscribe` : accountTitle(this.name, this.email) }</span>
          ${this.user ? this.verified ? verifiedMark : html`<span class="unverified" part="unverified">Not verified</span>` : ''}
        </h3>
        <button class="close" part="close" type="button" aria-label="Close">${close}</button>
      </header>

      <!-- Logged-out State -->
      <div
        class="spec ${this.drawer ? 'spec-out' : 'spec-in'}"
        ?on="${ this.user === false }">

        <div class=     "wrapper">
          <div class=   "inner">

            <!-- Log-in State -->
            <form-login
              source="drawer"
              ?hide-google="${this.hideGoogle}"
              exportparts="email: login-email, password: login-password, submit: login-submit, switch: login-switch, forgot: login-forgot, status: login-status, reveal: login-reveal, google: login-google"
              ?inert="${this.signup !== this.subscribe}"
              class="content ${
                this.signup        ===     /* If true, sign-up state */
                this.subscribe    ?       /* If true, subscribe state */
                'opened'          :
                'closed'
              } ">
            </form-login>

            <!-- Sign-up State -->
            <form-signup
              source="drawer"
              ?hide-google="${this.hideGoogle}"
              exportparts="email: signup-email, password: signup-password, submit: signup-submit, switch: signup-switch, status: signup-status, reveal: signup-reveal, notice: signup-notice, google: signup-google"
              ?inert="${this.signup === this.subscribe}"
              class="content ${ !this.signup === this.subscribe ? 'opened' : 'closed' } ">
            </form-signup>

          </div>
        </div>

      </div>

      <!-- Logged-in State -->
      <div
        class="spec setLog"
        ?on="${ this.user === true }">

          <!-- Required - Jack's markers. A host link replaces the fallback. -->
          <slot name="before"><a href="/settings">slotted - before</a></slot>

          ${this.settingsControl()}

          <slot><a href="/settings">slotted - default</a></slot>

          ${this.user && this.notice && !this.verified ? html`
            <p class="notice" part="notice" role="status" aria-live="polite">Check your inbox for the verification email. You can still sign in.</p>
          ` : ''}

          ${this.user ? html`<email-verify exportparts="notice: verify-notice, status: verify-status, submit: verify-submit, verified: email-verified, unverified"></email-verify>` : ''}

          <button class="leave" part="logout" type="button" aria-label="Log out">Log out</button>
          
      </div>

    </section>

    `;
  }

  // Required - url is the href. Empty url stays on this page and tells the host.
  private destination(): string {
    return (this.url || '').trim();
  }

  private settingsControl() {
    const url = this.destination();
    if (url) {
      return html`<a href="${url}" part="settings" @click="${this.onSettings}">Settings</a>`;
    }
    return html`<button type="button" class="settings" part="settings" @click="${this.onSettings}">Settings</button>`;
  }

  private onSettings = (event: Event) => {
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
    if (url) return;
    event.preventDefault();
    const settings = document.querySelector('user-settings');
    if (settings instanceof HTMLElement) settings.scrollIntoView({ block: 'nearest' });
  };

}

declare global {
  interface HTMLElementTagNameMap {
      'user-drawer': UserDrawer;
  }
}

/*

\?on="\${ true === this._sign \? !this.subscribe \: this.subscribe }"
\?on="${ false === this._sign \? !this.subscribe \: this.subscribe }"


     <h3>\${
          this._log       \?     /* If logged-in state is true 
          this._name      \:     /* Show username 
          true            \===    /* else logged-out, Show if true equals 
          /* this._sign      \===    /*true sign-up state equals 
          this.subscribe  \?     /* If subscribe state is true 
          'Login'         \:     /* Show login txt, else 
          'Subscribe'           /* Show subscribe txt 
          }</h3>

*/