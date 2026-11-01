import { css, CSSResultArray, html, LitElement, PropertyValues } from 'lit';
import { customElement, property, state }     from 'lit/decorators.js';
import { classMap }                           from 'lit/directives/class-map.js';
import { styleMap }                           from 'lit/directives/style-map.js';
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

  /** Arms the form-swap transition. False on the first paint. */
  @state() private motion = false;

  /** Clip size. auto is the resting card. A px value is mid-roll. */
  @state() private clipHeight = 'auto';

  /** Sheet translate. none keeps the card's bottom on the clip. */
  @state() private sheetShift = 'none';

  /** True only while this card's clip and sheet are easing. */
  @state() private rollMotion = false;

  private booted = false;
  private stopNotice: (() => void) | null = null;
  private heldHeight: number | null = null;
  
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

  protected willUpdate(changed: PropertyValues): void {
    if (!this.booted) return;
    if (!changed.has('_sign') && !changed.has('_log')) return;
    if (changed.has('_sign')) this.motion = true;
    const clip = this.clip();
    if (!clip) return;
    this.heldHeight = Math.ceil(clip.getBoundingClientRect().height);
    this.rollMotion = false;
    this.clipHeight = `${this.heldHeight}px`;
    this.sheetShift = 'translate3d(0, 0, 0)';
  }

  protected updated(changed: PropertyValues): void {
    const boot = !this.booted;
    this.booted = true;
    if (boot) {
      requestAnimationFrame(() => { this.motion = true; });
      return;
    }
    if (!changed.has('_sign') && !changed.has('_log')) return;
    const clip = this.clip();
    const sheet = this.sheet();
    if (!clip || !sheet || this.heldHeight == null) return;
    const from = this.heldHeight;
    this.heldHeight = null;
    const to = Math.ceil(sheet.getBoundingClientRect().height);
    if (Math.abs(to - from) > 1) this.rollBetween(clip, sheet, from, to, to);
    else this.rest();
  }

  private clip(): HTMLElement | null {
    return this.shadowRoot?.querySelector('.login-clip') ?? null;
  }

  private sheet(): HTMLElement | null {
    return this.shadowRoot?.querySelector('.service') ?? null;
  }

  private reduced(): boolean {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  // Required - resting card. auto, no translate, no transition.
  private rest(): void {
    this.rollMotion = false;
    this.clipHeight = 'auto';
    this.sheetShift = 'none';
  }

  private clipStyle() {
    const travel = this.rollMotion && !this.reduced();
    return {
      height: this.clipHeight,
      maxHeight: this.clipHeight === 'auto' ? 'none' : this.clipHeight,
      transition: travel
        ? 'height var(--pwa_slide, 2s) ease-in-out, max-height var(--pwa_slide, 2s) ease-in-out'
        : 'none',
    };
  }

  private sheetStyle() {
    const travel = this.rollMotion && !this.reduced();
    return {
      transform: this.sheetShift,
      transition: travel ? 'transform var(--pwa_slide, 2s) ease-in-out' : 'none',
    };
  }

  // Ease the clip from → to. translateY = clip − sheetHeight, so the bottom stays glued.
  private rollBetween(clip: HTMLElement, sheet: HTMLElement, from: number, to: number, sheetHeight: number): void {
    const start = from - sheetHeight;
    const end = to - sheetHeight;
    const shift = (px: number) => `translate3d(0, ${px}px, 0)`;
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

  // Only this clip. The form swap's transform does not release the roll.
  private onClipEnd = (event: Event) => {
    if (!(event instanceof TransitionEvent)) return;
    if (event.target !== event.currentTarget) return;
    if (event.propertyName !== 'max-height') return;
    this.rest();
  };

  static get styles(): CSSResultArray { return [
    authStyles,
    linkStyle,
    lineStyle,
    listStyle,
    animation,
    tapStyle,
    noticeStyle,
    css`
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
  ] };

  protected render() {
    return html`

    <div
      class="login-clip"
      style=${styleMap(this.clipStyle())}
      @transitionend=${this.onClipEnd}>
    <section class="service" part="panel" style=${styleMap(this.sheetStyle())}>

      <header part="header">
        <h3 part="title">${this._log ? accountTitle(this._name, this._email) : this._sign === this.subscribe ? 'Login' : 'Subscribe'}</h3>
      </header>

      <!-- Logged-out State -->
      <div
        class=          "spec"
        ?on=            "${ this._log === false }">

        <div class=     "wrapper">
          <div class=${classMap({ inner: true, motion: this.motion })}>

            <!-- Required - subscribe chooses the open form -->
            <form-login
              source=       "page"
              ?hide-google= "${this.hideGoogle}"
              exportparts=  "email: login-email, password: login-password, submit: login-submit, switch: login-switch, forgot: login-forgot, status: login-status, reveal: login-reveal, google: login-google"
              ?inert=       "${this._sign !== this.subscribe}"
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
        ?on=            "${ this._log === true }">

          ${this._notice && !this._verified ? html`
            <p class="notice" part="notice" role="status" aria-live="polite">Check your inbox for the verification email. You can still sign in.</p>
          ` : ''}

          <slot name="content"></slot>
          
      </div>

    </section>
    </div>

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