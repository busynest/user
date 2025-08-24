
import { CSSResultArray, LitElement, css, html } from "lit";
import { state } from "lit/decorators.js";
import { actionButton, inputStyles, labelStyles } from "./css/styles";
import { auth } from "../../start";
import { updatePassword } from "firebase/auth";

export class InputPassword extends LitElement {

  @state() private message    : string    = '';
  @state() private password   : string    = '';

  constructor() { super(); }

  protected firstUpdated() {

    this.shadowRoot!.querySelector('.pass')!.addEventListener('click',() => {
      this.alertPassword();
    } );

  }

  // Handle input changes to keep the password property in sync
  private handleInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.password = input.value; // Update the property with the input value
  }

  static get styles(): CSSResultArray { return [ labelStyles, inputStyles, actionButton,
    css`

      :host{
        display:        grid;
        border-top:     2px solid var(--pwa_divider);
      }

      form { display: grid; }

      p.error { color: red; }
    
    ` ]; }

  render() {
    return html`

      <form
          @submit="${this.default}">

        <!-- Input - 1 -->
        <label for="pwa-new-password">New Password</label>

        <input
          id      = "pwa-new-password"
          name    = "new_password"
          type    = "password"
          .value  = "${this.password}"
          @input  = "${this.handleInputChange}"
          aria-describedby = "password-help">

        <!-- Input - 2 -->
        <label for="pwa-verify-password">Verify Password</label>

        <input
          id      = "pwa-verify-password"
          name    = "verify_password"
          type    = "password">

        <!-- Submit -->
        <button
          class="action-button pass" >update</button>

        ${this.message ? html`

            <p
              class=${this.message.includes('Password entered') ? '' : 'error'}
              aria-live="polite">

              ${this.message}

            </p>

          ` : ''
        }

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