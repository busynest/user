
import { CSSResultArray, LitElement, css, html } from "lit";
import { property, state } from "lit/decorators.js";
import { actionButton, inputStyles, labelStyles } from "./css/styles";
import { AppState } from "../../store";
import { updatePass } from "../../firebase/password";

export class InputPassword extends LitElement {

  @property({ type: String, reflect: true}) name = '';
  @state() private _user = false;
  

    constructor(){
      super();
    }

    stateChanged(state: AppState) {

      this._user = state.frontend!.login; // Login State

    }

    protected firstUpdated() {
  
      this.shadowRoot!.querySelector('.pass')!.addEventListener('click',() => {
        this.alertPassword();
      } );

    }

    /* Update Password */
    private alertPassword() {

     // if (this._user) {

        const password = this.shadowRoot!.querySelector("#passVerify")!;

        // updatePassword(user, password);
        updatePass(password.value);

     // } else { alert('Please Login'); }
    
    }

    static get styles(): CSSResultArray { return [ labelStyles, inputStyles, actionButton,
      css`

      :host {
        display:  grid;
        grid-template-rows: auto auto auto auto auto;
      }
      
      ` ]; }

    render() {
      return html`

        <label for="newPass">New Password</label>
        <input type="password" id="newPass">

        <label for="passVerify">Verify Password</label>
        <input type="password" id="passVerify"></label>

        <button class="action-button pass" >update</button>

      `;
    }
}

customElements.define('input-password', InputPassword);

declare global { 
  interface HTMLElementTagNameMap {
    'input-password': InputPassword;
  }
}

