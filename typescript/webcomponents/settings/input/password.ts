import { CSSResultArray, LitElement, css, html } from "lit";
import { state }            from "lit/decorators.js";
import { connect }          from "pwa-helpers";
import store, { AppState }  from "../../../store.js";
import { auth }             from "../../../firebase/authentication.js";
import { labelStyle }       from "../../form/css/label.js";
import { inputStyle }       from "../../form/css/input.js";
import { buttonStyle  }     from "../../form/css/button.js";
import { toggleStyle }      from "../../form/css/toggle.js";
import { statusStyle, liveStatus } from "../../form/css/status.js";
import { revealControl }    from "../../form/reveal.js";
import { updatePassword }   from "firebase/auth";
import { reauthenticate, takeAuthFailure } from "../../../firebase/interface.js";
import { pwaAuthError, pwaPasswordChanged } from "../../../events/names.js";
import { emitWindow, toAuthError } from "../../../events/emit.js";
import { userMessage } from "../../../firebase/message.js";
import { newPasswordIssue, passwordHint, passwordMax, passwordMin, passwordMismatch } from "../../../firebase/password.js";

export class InputPassword extends connect(store)(LitElement) {

  @state() private message    : string    = '';
  @state() private tone       : string    = '';
  @state() private password   : string    = '';
  @state() private login      : boolean   = false;
  @state() private busy       : boolean   = false;
  @state() private showCurrent = false;
  @state() private showNext = false;
  @state() private showVerify = false;

  constructor() { super(); }

   stateChanged(state: AppState) {
      this.login = state.frontend!.login;
    }

  private handleInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.password = input.value;
  }

  static get styles(): CSSResultArray { return [
    labelStyle,
    inputStyle,
    buttonStyle,
    toggleStyle,
    statusStyle,
    css`

      :host{
        display:        grid;
        align-content:  start;
      }

      form { display: grid; align-content: start; }

    ` ]; }

  render() {
    return html`

      <form
        autocomplete="on"
        aria-busy="${this.busy ? 'true' : 'false'}"
        @submit="${this.default}">

        <div>

          <label for="pwa-current-password">Current Password</label>

          <span class="pair">

              <input
                id      = "pwa-current-password"
                name    = "current_password"
                type    = "${this.showCurrent ? 'text' : 'password'}"
                autocomplete = "current-password"
                aria-invalid = "${this.tone === 'error' ? 'true' : 'false'}"
                aria-describedby = "pwa-password-status">

              ${revealControl(this.showCurrent, () => { this.showCurrent = !this.showCurrent; })}

          </span>

        </div>

        <div>
          
          <label for="pwa-new-password">New Password</label>

          <span class="pair">

              <input
                id      = "pwa-new-password"
                name    = "new_password"
                part    = "password"
                type    = "${this.showNext ? 'text' : 'password'}"
                autocomplete = "new-password"
                minlength    = "${passwordMin}"
                maxlength    = "${passwordMax}"
                .value  = "${this.password}"
                @input  = "${this.handleInputChange}"
                aria-invalid = "${this.tone === 'error' ? 'true' : 'false'}"
                aria-describedby = "pwa-new-password-hint pwa-password-status">

              ${revealControl(this.showNext, () => { this.showNext = !this.showNext; })}

            </span>

          <p id="pwa-new-password-hint" class="hint" part="hint">${passwordHint}</p>

        </div>

        <div>

          <label for="pwa-verify-password">Verify Password</label>

          <span class="pair">

              <input
                id      = "pwa-verify-password"
                name    = "verify_password"
                part    = "verify"
                type    = "${this.showVerify ? 'text' : 'password'}"
                autocomplete = "new-password"
                minlength    = "${passwordMin}"
                maxlength    = "${passwordMax}"
                aria-invalid = "${this.tone === 'error' ? 'true' : 'false'}"
                aria-describedby = "pwa-password-status">

              ${revealControl(this.showVerify, () => { this.showVerify = !this.showVerify; })}

          </span>

        </div>

        ${liveStatus('pwa-password-status', this.message, this.tone)}

        <button
          type="submit"
          part="submit"
          class="action-button pass"
          aria-busy="${this.busy ? 'true' : 'false'}"
          ?disabled="${this.login === false || this.busy}">${this.busy ? 'Saving…' : 'Update'}</button>

      </form>

    `;
  }

  private show(detail: { code: string; message: string }) {
    this.tone = 'error';
    this.message = userMessage(detail);
    emitWindow(pwaAuthError, detail);
  }

  /* Required - read both passwords on submit */
  private default = (event: Event) => {
    event.preventDefault();
    void this.alertPassword();
  }

  /* Update Password */
  private async alertPassword() {

    if (this.busy) return;

    const currentPassword = (this.shadowRoot!.querySelector('#pwa-current-password') as HTMLInputElement).value;
    const entered = (this.shadowRoot!.querySelector('#pwa-new-password') as HTMLInputElement).value;
    const verify = (this.shadowRoot!.querySelector('#pwa-verify-password') as HTMLInputElement).value;
    this.password = entered;

    if (currentPassword.length < 6) {
      this.show({ code: 'pwa/current-password', message: 'Enter your current password.' });
      return;
    }

    const issue = newPasswordIssue(this.password);
    if (issue) {
      this.show(issue);
      return;
    }

    if (this.password !== verify) {
      this.show({ code: 'pwa/password-mismatch', message: passwordMismatch });
      return;
    }

    if (!auth.currentUser) {
      this.show({ code: 'pwa/signed-out', message: 'Sign in first.' });
      return;
    }

    await this.updatePass(currentPassword, this.password);

  }

  private updatePass = async (currentPassword: string, newPassword: string) => {

    const current = auth.currentUser;
    if (!current) {
      this.show({ code: 'pwa/signed-out', message: 'Sign in first.' });
      return;
    }

    this.busy = true;
    this.tone = '';
    this.message = '';

    const ok = await reauthenticate(currentPassword);
    if (!ok) {
      const detail = takeAuthFailure();
      this.tone = 'error';
      this.message = userMessage(detail ?? { code: 'pwa/unknown', message: 'Something went wrong. Try again.' });
      this.busy = false;
      return;
    }

    try {
      await updatePassword(current, newPassword);
      this.tone = '';
      this.message = 'Password saved.';
      emitWindow(pwaPasswordChanged, { uid: current.uid });
    } catch (error) {
      const detail = toAuthError(error);
      this.tone = 'error';
      this.message = userMessage(error);
      emitWindow(pwaAuthError, detail);
    } finally {
      this.busy = false;
    }

  }

}

customElements.define('input-password', InputPassword);

declare global { 
  interface HTMLElementTagNameMap {
    'input-password': InputPassword;
  }
}
