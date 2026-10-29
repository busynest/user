import { html, TemplateResult, css } from 'lit';
import { customElement, state }       from "lit/decorators.js"
import { LazyLoader }                 from '../../lazyLoader';
import { auth }                       from '../../firebase/authentication';
import { sendPasswordResetEmail }     from 'firebase/auth';
import { pwaAuthError, pwaResetSent } from '../../events/names';
import { emitWindow, toAuthError }    from '../../events/emit';
import { userMessage }                from '../../firebase/message';
import { openDrawer }                 from '../../api/drawer';
import store                          from '../../store';
import { universalToggle }            from '../../redux/frontend';
import { draftedEmail, onDraftEmail } from './draft';
import { labelStyle }                 from './css/label';
import { inputStyle }                 from './css/input';
import { buttonStyle }                from './css/button';
import { toggleStyle }                from './css/toggle';

/** Required - seconds before another reset email. */
const resetWait = 45;

/** Required - same sentence whether or not the account exists. */
const sentMessage = 'If an account uses that email, a reset link is on its way.';

/** Required - client check before sendPasswordResetEmail. */
function emailProblem(value: string): { code: string; message: string } | null {

  if (value.length < 4) {
    return { code: 'pwa/missing-email', message: 'Enter an email address.' };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return { code: 'pwa/invalid-email', message: 'Enter a valid email address.' };
  }

  return null;

}

/** Required - Firebase hides some missing accounts. This code does not. */
function missingAccount(error: unknown): boolean {
  return toAuthError(error).code === 'auth/user-not-found';
}

@customElement('email-reset')
export class EmailReset extends LazyLoader {

  @state() private userEmail :string = '';
  @state() private status    :string = '';
  @state() private tone      :string = '';
  @state() private invalid   :boolean = false;
  @state() private busy      :boolean = false;
  @state() private cooldown  :number = 0;

  private touched = false;
  private timer = 0;
  private stopDraft: (() => void) | null = null;

  constructor() { super(); }

  static styles = [
    labelStyle,
    inputStyle,
    buttonStyle,
    toggleStyle,
    css`
      :host { display: block; }

      /* Required - live region stays in the tree. Idle layout stays put. */
      .status {
        margin:                 0 16px 8px;
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
        outline:                2px solid var(--pwa_action_border_color, #214f34);
        outline-offset:         2px;
      }

      button.reset:disabled {
        cursor:                 default;
        opacity:                0.72;
      }

      button.new {
        display:                block;
        width:                  100%;
        box-sizing:             border-box;
      }
    `
  ];

  override connectedCallback(): void {
    super.connectedCallback();
    this.stopDraft = onDraftEmail(() => { this.prefill(); });
    this.prefill();
  }

  override disconnectedCallback(): void {
    window.clearInterval(this.timer);
    this.timer = 0;
    this.stopDraft?.();
    this.stopDraft = null;
    super.disconnectedCallback();
  }

  protected updated(): void {
    this.paintEmail();
  }

  // Optional - copy a sign-in address until the person types here
  private prefill() {

    if (this.touched) return;

    const draft = draftedEmail();

    if (!draft || draft === this.userEmail) return;

    this.userEmail = draft;
    this.paintEmail();

  }

  // Optional - uncontrolled field. Write the draft once, then leave the caret alone.
  private paintEmail() {

    if (this.touched) return;

    const input = this.renderRoot.querySelector('.email') as HTMLInputElement | null;

    if (!input || input.value || !this.userEmail) return;

    input.value = this.userEmail;

  }

  private handleEmail(event: Event) {
    const input = event.target as HTMLInputElement;
    this.touched = true;
    this.userEmail = input.value;
    if (this.invalid) this.invalid = false;
  }

  private buttonLabel(): string {
    if (this.busy) return 'Sending…';
    if (this.cooldown > 0) return `Send again in ${this.cooldown}s`;
    return 'Send reset email';
  }

  protected render(): TemplateResult {
    const described = 'pwa-reset-status';
    return html`

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

  // Required - cancel native submit, then send the reset
  private resetPassword = async (event: Event) => {

    event.preventDefault();

    if (this.busy || this.cooldown > 0) return;

    const input = this.renderRoot.querySelector('.email') as HTMLInputElement | null;
    this.userEmail = (input ? input.value : this.userEmail).trim();

    if (input && input.value !== this.userEmail) input.value = this.userEmail;

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
    } catch (error) {
      if (missingAccount(error)) this.showSent();
      else this.showFirebase(error);
    } finally {
      this.busy = false;
    }

  }

  // Required - one outcome for a sent link and for an unknown address
  private showSent() {

    this.tone = '';
    this.status = sentMessage;
    this.invalid = false;
    this.cooldown = resetWait;
    this.armCooldown();
    emitWindow(pwaResetSent, { email: this.userEmail });
    alert(sentMessage);
    void this.updateComplete.then(() => { this.focusStatus(); });

  }

  // Required - client checks. The event carries this code and sentence.
  private showError(detail: { code: string; message: string }, focus: 'email' | 'status') {

    this.tone = 'error';
    this.status = userMessage(detail);
    this.invalid = focus === 'email';
    emitWindow(pwaAuthError, detail);
    alert(this.status);
    void this.updateComplete.then(() => { this.focusAfter(focus); });

  }

  // Required - Firebase codes stay on the event. The sentence is the friendly one.
  private showFirebase(error: unknown) {

    const detail = toAuthError(error);
    this.tone = 'error';
    this.status = userMessage(error);
    this.invalid = detail.code === 'auth/invalid-email';
    emitWindow(pwaAuthError, detail);
    alert(this.status);
    void this.updateComplete.then(() => {
      this.focusAfter(this.invalid ? 'email' : 'status');
    });

  }

  private focusAfter(focus: 'email' | 'status') {
    if (focus === 'email') this.focusEmail();
    else this.focusStatus();
  }

  private focusEmail() {
    const input = this.renderRoot.querySelector('.email') as HTMLInputElement | null;
    input?.focus();
  }

  private focusStatus() {
    const status = this.renderRoot.querySelector('#pwa-reset-status') as HTMLElement | null;
    status?.focus();
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

  // Optional - drawer sign-in when a drawer is on the page. Otherwise the page form.
  private backToSignIn = () => {

    const drawer = document.querySelector('user-drawer');

    if (drawer) {
      const subscribe = drawer.hasAttribute('subscribe');
      const signup = Boolean(store.getState().frontend?.registerOne);
      if (signup !== subscribe) store.dispatch(universalToggle('drawer'));
      openDrawer();
      return;
    }

    const page = document.querySelector('user-login');

    if (!page) return;

    const subscribe = page.hasAttribute('subscribe');
    const signup = Boolean(store.getState().frontend?.registerTwo);
    if (signup !== subscribe) store.dispatch(universalToggle('page'));
    page.scrollIntoView({ block: 'nearest' });

  }

}

declare global {
  interface HTMLElementTagNameMap {
    'email-reset': EmailReset;
  }
}
