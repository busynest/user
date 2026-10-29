import { CSSResultArray, LitElement, css, html } from 'lit';
import { state } from 'lit/decorators.js';
import { connect } from 'pwa-helpers';

import store, { AppState } from '../../../store';
import { sendVerification } from '../../../api/verify';
import { userMessage } from '../../../firebase/message';
import { buttonStyle } from '../../form/css/button';
import { tapStyle } from '../../css/tap';

/** Required - seconds before another verification email. Matches email-reset. */
const verifyWait = 45;

/** Required - sentence after Firebase accepts the message. */
const sentMessage = 'Check your inbox for the verification email.';

export class EmailVerify extends connect(store)(LitElement) {

  @state() private login = false;
  @state() private verified = false;
  @state() private email = '';
  @state() private status = '';
  @state() private tone = '';
  @state() private busy = false;
  @state() private cooldown = 0;

  private timer = 0;

  constructor() { super(); }

  override disconnectedCallback(): void {
    this.clearWait();
    super.disconnectedCallback();
  }

  stateChanged(state: AppState) {
    this.login = Boolean(state.frontend?.login);
    this.verified = Boolean(state.backend?.verified);
    this.email = state.backend?.email ?? '';
    this.hidden = !this.login;
    if (this.verified) this.clearWait();
  }

  static get styles(): CSSResultArray {
    return [
      buttonStyle,
      tapStyle,
      css`

        :host { display: block; }

        .notice {
          margin:               4px 16px 8px;
          padding:              14px 16px 16px;
          color:                var(--pwa_label_text_color, #1c2430);
          background:           var(--pwa_nav_on_background, #f3efe6);
          border:               1px solid var(--pwa_line_color, #e3daca);
          border-radius:        10px;
        }

        .lead {
          margin:               0;
          font-size:            0.95rem;
          line-height:          1.45;
        }

        .notice.ok {
          color:                var(--pwa_action_background_color, #2a6b45);
        }

        /* Required - live region stays in the tree. Idle layout stays put. */
        .status {
          margin:               8px 0 0;
          color:                var(--pwa_label_text_color, #1c2430);
          font-size:            0.95rem;
          line-height:          1.4;
        }

        .status:not(.on) {
          position:             absolute;
          width:                1px;
          height:               1px;
          padding:              0;
          margin:               -1px;
          overflow:             hidden;
          clip:                 rect(0, 0, 0, 0);
          white-space:          nowrap;
          border:               0;
        }

        .status.error { color: var(--pwa_close_color, #9a3b32); }

        .status:focus { outline: 0; }

        .status:focus-visible {
          outline:              2px solid var(--pwa_action_border_color, #214f34);
          outline-offset:       2px;
        }

        button.action-button {
          display:              inline-block;
          margin:               12px 0 0;
          max-width:            100%;
        }

        button.action-button:disabled {
          cursor:               default;
          opacity:              0.72;
        }

      `
    ];
  }

  private lead(): string {
    if (this.email) return `${this.email} is not verified yet. You can still sign in.`;
    return 'This email is not verified yet. You can still sign in.';
  }

  private buttonLabel(): string {
    if (this.busy) return 'Sending…';
    if (this.cooldown > 0) return `Send again in ${this.cooldown}s`;
    return 'Resend verification email';
  }

  protected render() {

    if (!this.login) return html``;

    if (this.verified) {
      return html`
        <p class="notice ok" part="notice" role="status" aria-live="polite">Email verified.</p>
      `;
    }

    const described = 'pwa-verify-status';

    return html`
      <div class="notice" part="notice">

        <p class="lead">${this.lead()}</p>

        <form novalidate @submit="${this.resend}">

          <p
            id="pwa-verify-status"
            part="status"
            class="status ${this.status ? 'on' : ''} ${this.tone}"
            role="status"
            aria-live="polite"
            aria-atomic="true"
            tabindex="-1">${this.status}</p>

          <button
            type="submit"
            part="submit"
            class="action-button"
            aria-describedby="${described}"
            aria-busy="${this.busy ? 'true' : 'false'}"
            ?disabled="${this.busy || this.cooldown > 0}">${this.buttonLabel()}</button>

        </form>

      </div>
    `;
  }

  // Required - cancel native submit, then send the verification email
  private resend = async (event: Event) => {

    event.preventDefault();

    if (this.busy || this.cooldown > 0 || this.verified) return;

    this.busy = true;
    this.tone = '';
    this.status = '';

    try {
      const sent = await sendVerification();
      if (sent) this.showSent();
    } catch (error) {
      this.showFirebase(error);
    } finally {
      this.busy = false;
    }

  };

  // Required - one sentence, then the same 45s wait as email-reset
  private showSent() {

    this.tone = '';
    this.status = sentMessage;
    this.cooldown = verifyWait;
    this.armCooldown();
    alert(sentMessage);
    void this.updateComplete.then(() => { this.focusStatus(); });

  }

  // Required - Firebase codes stay on the event. The sentence is the friendly one.
  private showFirebase(error: unknown) {

    this.tone = 'error';
    this.status = userMessage(error);
    alert(this.status);
    void this.updateComplete.then(() => { this.focusStatus(); });

  }

  private focusStatus() {
    const status = this.renderRoot.querySelector('#pwa-verify-status') as HTMLElement | null;
    status?.focus();
  }

  private clearWait() {
    window.clearInterval(this.timer);
    this.timer = 0;
    this.cooldown = 0;
  }

  private armCooldown() {

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

}

customElements.define('email-verify', EmailVerify);

declare global {
  interface HTMLElementTagNameMap {
    'email-verify': EmailVerify;
  }
}
