import { CSSResultArray, LitElement, css, html } from "lit";
import { state }              from "lit/decorators.js";
import { connect }            from "pwa-helpers";
import store, { AppState }    from "../../../store";
import { buttonStyle }        from "../../form/css/button";
import { auth }               from '../../../firebase/authentication';
import { deleteDocument, deleteUserFiles, logAccountDelete } from '../../../firebase/interface';
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
    css`

    :host {
      display:                  grid;
      grid-template-rows:       1fr auto;
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

      <button
        type="button"
        part="submit"
        class="action-button deleteUser"
        ?disabled="${this.login === false}">Delete</button>

    `;
  }

  /* Delete Account */
  private alertDelete()  {
    if (auth.currentUser) { this.deleteUser(); }
    else {
      const detail = { code: 'pwa/signed-out', message: 'Sign in first.' };
      emitWindow(pwaAuthError, detail);
      alert(userMessage(detail));
    }
  }
  private deleteUser() {
    const d = confirm("Delete Account?");
    if    ( d == true ) { this.officialDelete(); console.log("user gone"); }
    else  { console.log("user here"); }
  }

  // Required - storage files, then the analytics signal, then the auth user
  private officialDelete = async () => {

    const current = auth.currentUser;

    if (!current) { alert('Please Sign-in'); return; }

    try {

      const uid = current.uid;
      await deleteUserFiles(uid);
      // Required - profile doc. deleteDoc resolves when users/{uid} was never created.
      try {
        await deleteDocument('users', uid);
      } catch (error) {
        const code = error && typeof error === 'object' && 'code' in error ? String(error.code) : '';
        if (!code.includes('permission-denied')) throw error;
      }
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

