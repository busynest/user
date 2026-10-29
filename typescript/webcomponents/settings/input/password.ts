
import { CSSResultArray, LitElement, css, html } from "lit";
import { state }            from "lit/decorators.js";
import { connect }          from "pwa-helpers";
import store, { AppState }  from "../../../store";
import { auth }             from "../../../firebase/authentication";
import { labelStyle }       from "../../form/css/label";
import { inputStyle }       from "../../form/css/input";
import { buttonStyle  }     from "../../form/css/button";
import { updatePassword }   from "firebase/auth";
import { reauthenticate }   from "../../../firebase/interface";

export class InputPassword extends connect(store)(LitElement) {

  @state() private message    : string    = '';
  @state() private password   : string    = '';
  @state() private login      : boolean   = false;

  constructor() { super(); }

   stateChanged(state: AppState) {
      this.login = state.frontend!.login;
    }

  // Handle input changes to keep the password property in sync
  private handleInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.password = input.value; // Update the property with the input value
  }

  static get styles(): CSSResultArray { return [
    labelStyle,
    inputStyle,
    buttonStyle,
    css`

      :host{
        display:        grid;
      }

      form { display: grid; }

      p.error { color: red; }
    
    ` ]; }

  render() {
    return html`

      <form
        autocomplete="off"
        @submit="${this.default}">

        <!-- Required - recent login -->
        <div>

          <label for="pwa-current-password">Current Password

            <input
              id      = "pwa-current-password"
              name    = "current_password"
              type    = "password"
              autocomplete = "current-password">

          </label>

        </div>

        <!-- Input - 1 -->
        <div>
          
          <label for="pwa-new-password">New Password

            <input
              id      = "pwa-new-password"
              name    = "new_password"
              type    = "password"
              .value  = "${this.password}"
              @input  = "${this.handleInputChange}"
              aria-describedby = "password-help">

          </label>

        </div>

        <!-- Input - 2 -->
        <div>

          <label for="pwa-verify-password">Verify Password

            <input
              id      = "pwa-verify-password"
              name    = "verify_password"
              type    = "password">

          </label>

          ${this.message ? html`

            <p
              class=${this.message.includes('Password entered') ? '' : 'error'}
              aria-live="polite">

              ${this.message}

            </p>

          ` : '' }

        </div>

        <!-- Submit -->
        <button
          type="submit"
          class="action-button pass"
          ?disabled="${this.login === false}">Update</button>

      </form>

    `;
  }

  /* Required - read both passwords on submit */
  private default = (e:Event) => {
    e.preventDefault();
    this.alertPassword();
  }

  /* Update Password */
  private alertPassword() {

    const currentPassword = (this.shadowRoot!.querySelector('#pwa-current-password') as HTMLInputElement).value;
    const entered = (this.shadowRoot!.querySelector('#pwa-new-password') as HTMLInputElement).value;
    const verify = (this.shadowRoot!.querySelector('#pwa-verify-password') as HTMLInputElement).value;
    this.password = entered;

    if (currentPassword.length < 6) {
      this.message = 'Enter your current password';
      return;
    }

    if (!this.password) {
      this.message = 'Please enter a password';
    } else if (this.password !== verify) {
      this.message = 'Passwords do not match';
    } else if (this.password.length < 8) {
      this.message = 'Password must be at least 8 characters long';
    } else {
      this.message = `Password entered:`;

      if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(this.password)) {
        this.message = 'Password must include letters, numbers, and be 8+ characters';
      } else {

        if (auth.currentUser)     { this.updatePass(currentPassword, this.password); }
        else                      { alert('Please Login'); }
        
      }

    }
    
  }

  // Firebase Password Function
  private updatePass = async (currentPassword: string, newPassword: string) => {

    const current = auth.currentUser;
    if (!current) { alert('Please Login'); return; }

    const ok = await reauthenticate(currentPassword);
    if (!ok) { return; }

    try {
      await updatePassword(current, newPassword);
      alert('Password updated');
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Password was not updated');
    }

  }

}

customElements.define('input-password', InputPassword);

declare global { 
  interface HTMLElementTagNameMap {
    'input-password': InputPassword;
  }
}


// grid-template-rows: auto auto auto auto auto;