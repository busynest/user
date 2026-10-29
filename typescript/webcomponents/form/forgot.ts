import { html, TemplateResult, css } from 'lit';
import { customElement, state }       from "lit/decorators.js"
import { LazyLoader }                 from '../../lazyLoader';
import { auth }                       from '../../firebase/authentication';
import { sendPasswordResetEmail }     from 'firebase/auth';
import { pwaAuthError }               from '../../events/names';
import { emitWindow, toAuthError }    from '../../events/emit';
import { userMessage }                from '../../firebase/message';
import { labelStyle }                 from './css/label';
import { inputStyle }                 from './css/input';
import { buttonStyle }                from './css/button';

@customElement('email-reset')
export class EmailReset extends LazyLoader {

  @state() private userEmail :string = '';

  constructor() { super(); }

  static styles = [
    labelStyle,
    inputStyle,
    buttonStyle,
    css`:host { display: block; }`
  ];

  private handleEmail(event: Event) {
    const input = event.target as HTMLInputElement;
    this.userEmail = input.value;
  }

  protected render(): TemplateResult {
    return html`

      <form
        class="resetPass"
        novalidate
        @submit="${this.resetPassword}">

        <label>Email

          <input
            class         = "email"
            part          = "email"
            type          = "email"
            autocomplete  = "email"
            @change       = "${this.handleEmail}">

        </label>

        <button
          type          = "submit"
          part          = "submit"
          class         = "reset action-button">Send reset email</button>

      </form>

    `;
  }

  // Required - cancel native submit, then send the reset
  private resetPassword = async (event: Event) => {

    event.preventDefault();

    const input = this.renderRoot.querySelector('.email') as HTMLInputElement | null;
    this.userEmail = input?.value ?? '';

    if (this.userEmail.length < 4) {
      const detail = { code: 'pwa/missing-email', message: 'Enter an email address.' };
      emitWindow(pwaAuthError, detail);
      alert(userMessage(detail));
      return;
    }

    try {
      await sendPasswordResetEmail(auth, this.userEmail);
      alert('Check your inbox for the reset email.');
    } catch (error) {
      emitWindow(pwaAuthError, toAuthError(error));
      alert(userMessage(error));
    }

  }

}

declare global {
  interface HTMLElementTagNameMap {
    'email-reset': EmailReset;
  }
}
