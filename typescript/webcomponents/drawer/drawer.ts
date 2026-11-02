import { css, CSSResultArray, html, LitElement, PropertyValues }   from 'lit';
import { customElement, property, state }     from 'lit/decorators.js';
import { classMap }                           from 'lit/directives/class-map.js';
import { styleMap }                           from 'lit/directives/style-map.js';
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

  /** True while the panel is open or still rolling shut. Drops on transitionend. */
  @property({ type: Boolean, reflect: true }) private sliding = false;

  /** Arms the form-swap transition. False on the first paint. */
  @state() private motion = false;

  /** Clip height. 0px is shut. auto is the resting open size. */
  @state() private clipHeight = '0px';

  /** Sheet translate. -100% parks the sheet above the clip. */
  @state() private sheetShift = 'translate3d(0, -100%, 0)';

  /** True only while this drawer's clip and sheet are easing. */
  @state() private rollMotion = false;

  private booted = false;
  private wasOpen = false;
  private sawOpen = false;
  private returnFocus: HTMLElement | null = null;
  private stopNotice: (() => void) | null = null;
  private heldHeight: number | null = null;
  private columnWidth = 0;
  private columnObserver: ResizeObserver | null = null;
  
  constructor() { super(); }

  override connectedCallback(): void {
    applyFirebaseConfig(this);
    if (!this.id) this.id = 'pwa-user-drawer';
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
    this.columnObserver?.disconnect();
    this.columnObserver = null;
    super.disconnectedCallback();
  }

  stateChanged(state: AppState) {
    const open        = state.frontend!.drawer;         // Drawer State
    this.name         = state.backend!.name;            // User Name
    this.email        = state.backend!.email;
    this.verified     = Boolean(state.backend?.verified);
    if (open) this.sliding = true;
    else if (this.reduced()) this.sliding = false;
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

  protected willUpdate(changed: PropertyValues): void {
    if (!this.booted) {
      if (this.drawer) this.restOpen();
      return;
    }
    if (changed.has('signup')) this.motion = true;
    if (changed.has('drawer') || !changed.has('signup') || !this.drawer) return;
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
    if (!boot && changed.has('drawer')) {
      this.heldHeight = null;
      if (this.drawer) this.unroll();
      else this.rollUp();
    } else if (!boot && this.heldHeight != null && this.drawer) {
      const from = this.heldHeight;
      this.heldHeight = null;
      const clip = this.clip();
      const sheet = this.sheet();
      if (clip && sheet) {
        const to = Math.ceil(sheet.getBoundingClientRect().height);
        if (Math.abs(to - from) > 1) this.rollBetween(clip, sheet, from, to, to);
        else this.restOpen();
      }
    }
    if (boot) requestAnimationFrame(() => { this.motion = true; });
    if (!changed.has('drawer')) return;
    if (this.drawer) {
      const active = deepActive();
      this.returnFocus = active && !this.contains(active) ? active : this.returnFocus;
      this.shadowRoot?.querySelector<HTMLElement>('.close')?.focus({ preventScroll: true });
      void refreshEmailVerified(false);
      return;
    }
    const back = this.returnFocus ?? this.toggleButton();
    back?.focus();
    this.returnFocus = null;
  }

  private clip(): HTMLElement | null {
    return this.shadowRoot?.querySelector('.drawer-clip') ?? null;
  }

  private sheet(): HTMLElement | null {
    return this.shadowRoot?.querySelector('.userDrawer') ?? null;
  }

  // Required - the account button, when nothing else had focus at open.
  private toggleButton(): HTMLElement | null {
    const icon = document.querySelector('user-icon');
    const button = icon?.shadowRoot?.querySelector('button');
    return button instanceof HTMLElement ? button : null;
  }

  private reduced(): boolean {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  // Required - closed, no transition. The first render binds this.
  private restShut(): void {
    this.rollMotion = false;
    this.clipHeight = '0px';
    this.sheetShift = 'translate3d(0, -100%, 0)';
  }

  // Required - open at content size. No transition, so it does not ease.
  private restOpen(): void {
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

  // Required - clip and sheet start together. Open from 0 is translate -100% → 0.
  private unroll(): void {
    const clip = this.clip();
    const sheet = this.sheet();
    if (!clip || !sheet) return;
    this.scrollTop = 0;
    this.placeAnchor();
    const target = this.sheetPx(clip, sheet);
    const from = Math.ceil(clip.getBoundingClientRect().height);
    this.rollBetween(clip, sheet, from, target, target);
  }

  private rollUp(): void {
    const clip = this.clip();
    const sheet = this.sheet();
    if (!clip || !sheet) return;
    const current = Math.ceil(sheet.getBoundingClientRect().height);
    const from = Math.ceil(clip.getBoundingClientRect().height);
    this.rollBetween(clip, sheet, from, 0, current);
    if (this.reduced()) this.sliding = false;
  }

  // Sheet height in px. The clip cap is released for the read and put back. No paint.
  private sheetPx(clip: HTMLElement, sheet: HTMLElement): number {
    const transition = clip.style.transition;
    const maxHeight = clip.style.maxHeight;
    const height = clip.style.height;
    clip.style.transition = 'none';
    clip.style.maxHeight = 'none';
    clip.style.height = 'auto';
    const px = Math.ceil(sheet.getBoundingClientRect().height);
    clip.style.height = height;
    clip.style.maxHeight = maxHeight;
    clip.style.transition = transition;
    return px;
  }

  // Ease the clip from → to. translateY = clip − sheetHeight, so the bottom stays glued.
  private rollBetween(clip: HTMLElement, sheet: HTMLElement, from: number, to: number, sheetHeight: number): void {
    const start = from - sheetHeight;
    const end = to - sheetHeight;
    const shift = (px: number) => `translate3d(0, ${px}px, 0)`;
    if (this.reduced() || Math.abs(to - from) <= 1) {
      if (to === 0) this.restShut();
      else this.restOpen();
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

  // Required - visibility, pointer-events, and inert drop when the close reaches 0.
  // Only this clip. A form transition inside the sheet does not count.
  private onClipEnd = (event: Event) => {
    if (!(event instanceof TransitionEvent)) return;
    if (event.target !== event.currentTarget) return;
    if (event.propertyName !== 'max-height') return;
    const clip = event.currentTarget;
    if (!(clip instanceof HTMLElement)) return;
    if (this.drawer) {
      this.restOpen();
      return;
    }
    if (clip.getBoundingClientRect().height > 1) return;
    this.sliding = false;
    this.restShut();
  };

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
        last.focus({ preventScroll: true });
      }
      return;
    }
    if (!inside || active === last) {
      event.preventDefault();
      first.focus({ preventScroll: true });
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

    this.watchColumn();
  }

  // Required - a parent grid can park this tag after named areas. Shift it back under the previous element.
  private placeAnchor(): void {
    const pos = getComputedStyle(this).position;
    if (pos === 'fixed' || pos === 'absolute') {
      if (this.style.top) this.style.top = '';
      return;
    }
    const parent = this.parentElement;
    if (!parent) return;
    const prev = this.previousElementSibling;
    const want = prev
      ? prev.getBoundingClientRect().bottom
      : parent.getBoundingClientRect().top + (parseFloat(getComputedStyle(parent).paddingTop) || 0);
    const applied = parseFloat(this.style.top) || 0;
    const delta = want - (this.getBoundingClientRect().top - applied);
    if (Math.abs(delta - applied) <= 0.5) return;
    this.style.top = Math.abs(delta) <= 0.5 ? '' : `${delta}px`;
  }

  // Required - a resize while the sheet is rolling retargets the measured height.
  private watchColumn(): void {
    if (typeof ResizeObserver === 'undefined') return;
    this.columnObserver = new ResizeObserver(() => {
      this.placeAnchor();
      const width = Math.round(this.getBoundingClientRect().width);
      if (!width || width === this.columnWidth) return;
      this.columnWidth = width;
      this.onColumnResize();
    });
    this.columnObserver.observe(this);
    const prev = this.previousElementSibling;
    if (prev) this.columnObserver.observe(prev);
    this.placeAnchor();
  }

  // Required - keep the sheet bottom on the clip while the column reflows.
  private onColumnResize(): void {
    if (!this.rollMotion) return;
    const clip = this.clip();
    const sheet = this.sheet();
    if (!clip || !sheet) return;
    const from = Math.ceil(clip.getBoundingClientRect().height);
    const sheetH = this.sheetPx(clip, sheet);
    this.rollBetween(clip, sheet, from, this.drawer ? sheetH : 0, sheetH);
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
    /* Required - this drawer's roll only. The clip hangs from the tag and grows down. */
    .drawer-clip {
      display:                block;
      position:               absolute;
      top:                    0;
      left:                   0;
      right:                  0;
      overflow:               hidden;
      min-height:             0;
      z-index:                var(--pwa_drawer_z-index, 5);
      border-radius:          var(--pwa_drawer_border-radius, 0 0 18px 18px);
      box-shadow:             0 18px 40px rgba(28, 36, 48, 0.16);
    }

    .drawer-clip > .userDrawer {
      height:                 auto;
      align-self:             start;
    }

    .exit > h2 {
      display:                flex;
      align-items:            center;
      justify-content:        center;
      gap:                    8px;
      flex-wrap:              wrap;
    }

    .close:focus-visible,
    .leave:focus-visible,
    .settings:focus-visible,
    a:focus-visible,
    ::slotted(a:focus-visible),
    ::slotted(button:focus-visible) {
      outline:                2px solid var(--pwa_focus, #1c2430);
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
      /* Required - same centered column as the form controls. */
      margin:                   12px auto;
      border:                   1px solid var(--pwa_line_color, #e3daca);
      border-radius:            10px;
      box-sizing:               border-box;
      text-align:               center;
      cursor:                   pointer;
      display:                  block;
      width:                    max(0px, calc(min(100%, var(--pwa_max_width, 400px)) - 2 * var(--pwa_inset, 0px)));
      max-width:                100%;
      min-width:                0;
      min-height:               var(--pwa_tap, 44px); /* Required - minimum tap target */
    }

    ::slotted(a[aria-current]),
    ::slotted(button[aria-current]) {
      color:                    var(--pwa_nav_highlight_color, #1c2430);
      background:               var(--pwa_nav_on_background, #f2f2f2);
    }
    `
  ] };

  protected render() {
    // Required - reflected attribute. The shell keeps the clip visible while it rolls.
    this.toggleAttribute('sliding', this.sliding);
    return html`

    <!-- Clip. The first render binds shut, with no transition. -->
    <div
      class="drawer-clip"
      style=${styleMap(this.clipStyle())}
      @transitionend=${this.onClipEnd}>

    <!-- Drawer Wrapper. Its translate is bound here, not by a shared class. -->
    <section
      part="panel"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pwa-drawer-title"
      aria-hidden="${this.drawer ? 'false' : 'true'}"
      ?inert="${!this.drawer}"
      class="userDrawer"
      style=${styleMap(this.sheetStyle())}>

      <!-- Exit Button -->
      <div class="exit" part="header">
        <div></div>
        <h2 id="pwa-drawer-title" part="title">
          <span class="who">${ this.user === false ? this.signup === this.subscribe ? `Login` : `Subscribe` : accountTitle(this.name, this.email) }</span>
          ${this.user ? this.verified ? verifiedMark : html`<span class="unverified" part="unverified">Not verified</span>` : ''}
        </h2>
        <button class="close" part="close" type="button" aria-label="Close">${close}</button>
      </div>

      <!-- Logged-out State -->
      <div
        class="spec"
        ?on="${ this.user === false }">

        <div class=     "wrapper">
          <div class=${classMap({ inner: true, motion: this.motion })}>

            <!-- Log-in State -->
            <form-login
              source="drawer"
              ?hide-google="${this.hideGoogle}"
              exportparts="email: login-email, password: login-password, submit: login-submit, switch: login-switch, forgot: login-forgot, status: login-status, reveal: login-reveal, google: login-google"
              ?inert="${this.signup !== this.subscribe}"
              aria-hidden="${this.signup !== this.subscribe ? 'true' : 'false'}"
              class=${classMap({
                content: true,
                opened: this.signup === this.subscribe,
                closed: this.signup !== this.subscribe,
              })}>
            </form-login>

            <!-- Sign-up State -->
            <form-signup
              source="drawer"
              ?hide-google="${this.hideGoogle}"
              exportparts="email: signup-email, password: signup-password, submit: signup-submit, switch: signup-switch, status: signup-status, reveal: signup-reveal, notice: signup-notice, google: signup-google"
              ?inert="${this.signup === this.subscribe}"
              aria-hidden="${this.signup === this.subscribe ? 'true' : 'false'}"
              class=${classMap({
                content: true,
                opened: !this.signup === this.subscribe,
                closed: !this.signup !== this.subscribe,
              })}>
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
    </div>

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