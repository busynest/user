import { CSSResultArray, LitElement, css, html } from "lit";
import { state }              from "lit/decorators.js";
import { connect }            from "pwa-helpers";
import store, { AppState }    from "../../../store";
import { buttonStyle }        from "../../form/css/button";
import { labelStyle }         from "../../form/css/label";
import { inputStyle }         from "../../form/css/input";
import { auth }               from '../../../firebase/authentication';
import { deleteUserFiles, logAccountDelete, reauthenticate } from '../../../firebase/interface';
import { pwaAccountDeleted, pwaAuthError } from '../../../events/names';
import { emitWindow, toAuthError } from '../../../events/emit';
import { userMessage } from '../../../firebase/message';

export class DeleteUser extends connect(store)(LitElement) {
   
  @state() private login : boolean = false;
  @state() private email : string ='';

  constructor() { super(); }

  protected firstUpdated() {

    this.shadowRoot!.querySelector('.deleteUser')!.addEventListener('click',() => {
      this.alertDelete();
    } );

  }

  stateChanged(state: AppState) {
    this.login = state.frontend!.login;
    this.email = state.backend!.email;
  }

  static get styles(): CSSResultArray { return [
    buttonStyle,
    labelStyle,
    inputStyle,
    css`

    :host {
      display:                  grid;
      grid-template-rows:       auto auto auto;
    }
    
    p {
      margin:               0;
      padding:              4px 20px 0;
      line-height:          1.5;
      color:                var(--pwa_label_text_color, #1c2430);
    }

    ` ]; }

  render() {
    return html`

      <p>Permanently delete the user account and data related to: ${this.email}</p>

      <label for="pwa-delete-password">Current password

        <input
          id="pwa-delete-password"
          type="password"
          autocomplete="current-password"/>

      </label>

      <button
        type="button"
        part="submit"
        class="action-button deleteUser"
        ?disabled="${this.login === false}">Delete</button>

    `;
  }

  /* Delete Account */
  private alertDelete() {
    const current = auth.currentUser;
    if (!current) {
      const detail = { code: 'pwa/signed-out', message: 'Sign in first.' };
      emitWindow(pwaAuthError, detail);
      alert(userMessage(detail));
      return;
    }

    const password = (this.shadowRoot!.querySelector('#pwa-delete-password') as HTMLInputElement).value;
    if (password.length < 6) {
      const detail = { code: 'pwa/current-password', message: 'Enter your current password.' };
      emitWindow(pwaAuthError, detail);
      alert(userMessage(detail));
      return;
    }

    const d = confirm("Delete Account?");
    if (d == true) { this.officialDelete(password); console.log("user gone"); }
    else { console.log("user here"); }
  }

  // Required - storage files, then the analytics signal, then the auth user. The host owns users/{uid}.
  private officialDelete = async (password: string) => {

    const ok = await reauthenticate(password);
    if (!ok) { return; }

    const current = auth.currentUser;
    if (!current) { alert('Please Sign-in'); return; }

    try {

      const uid = current.uid;
      await deleteUserFiles(uid);
      await logAccountDelete();
      await current.delete();
      emitWindow(pwaAccountDeleted, { uid });

    } catch (error) {

      emitWindow(pwaAuthError, toAuthError(error));
      alert(userMessage(error));

    }

  };

}

customElements.define('delete-user', DeleteUser);

declare global { 
  interface HTMLElementTagNameMap {
    'delete-user': DeleteUser;
  }
}
