
import { CSSResultArray, LitElement, css, html } from "lit";
import { state }            from "lit/decorators.js";
import { connect }          from "pwa-helpers";
import store, { AppState }  from "../../../store";
import { auth }             from "../../../firebase/authentication";
import { labelStyle }       from "../../form/css/label";
import { inputStyle }       from "../../form/css/input";
import { buttonStyle  }     from "../../form/css/button";
import { updatePassword }   from "firebase/auth";

export class InputPassword extends connect(store)(LitElement) {

  @state() private message    : string    = '';
  @state() private password   : string    = '';
  @state() private login      : boolean   = false;

  constructor() { super(); }

  protected firstUpdated() {

    this.shadowRoot!.querySelector('.pass')!.addEventListener('click',() => {
      this.alertPassword();
    } );

  }

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

      form { display: grid; grid-template-rows: 1fr 1fr auto;}

      p.error { color: red; }
    
    ` ]; }

  render() {
    return html`

      <form
        autocomplete="off"
        @submit="${this.default}">

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
          class="action-button pass"
          ?disabled="${this.login === false}">Update</button>

      </form>

    `;
  }

  /* Form Default */
  private default = (e:Event) => {
    e.preventDefault();
  }

  /* Update Password */
  private alertPassword() {

    if (!this.password) {
      this.message = 'Please enter a password';
    } else if (this.password.length < 8) {
      this.message = 'Password must be at least 8 characters long';
    } else {
      this.message = `Password entered:`;

      if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(this.password)) {
        this.message = 'Password must include letters, numbers, and be 8+ characters';
      } else {

        if (auth.currentUser)     { this.updatePass(this.password); }
        else                      { alert('Please Login'); }
        
      }

    }
    
  }

  // Firebase Password Function
  private updatePass = async (newPassword:any) => {

    if (auth.currentUser) {

      // Update new password
      await updatePassword ( auth.currentUser, newPassword )
        .then ( () => { console.log("Password successful!"); })
        .catch ( (error) => { console.log("Problem: "+ error.messge) }); //alertPassword(error); });

    } else { alert('Please Login'); }

  }

}

customElements.define('input-password', InputPassword);

declare global { 
  interface HTMLElementTagNameMap {
    'input-password': InputPassword;
  }
}


// grid-template-rows: auto auto auto auto auto;