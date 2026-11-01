import { CSSResultArray, LitElement, css, html } from "lit";
import { state }              from "lit/decorators.js";
import { connect }            from "pwa-helpers";
import store, { AppState }    from "../../../store.js";
import { buttonStyle }        from "../../form/css/button.js";
import { labelStyle }         from "../../form/css/label.js";
import { inputStyle }         from "../../form/css/input.js";
import { toggleStyle }        from "../../form/css/toggle.js";
import { statusStyle, liveStatus } from "../../form/css/status.js";
import { revealControl }      from "../../form/reveal.js";
import { auth }               from '../../../firebase/authentication.js';
import { deleteUserFiles, logAccountDelete, reauthenticate, takeAuthFailure } from '../../../firebase/interface.js';
import { pwaAccountDeleted, pwaAuthError } from '../../../events/names.js';
import { emitWindow, toAuthError } from '../../../events/emit.js';
import { userMessage } from '../../../firebase/message.js';

export class DeleteUser extends connect(store)(LitElement) {
   
  @state() private login : boolean = false;
  @state() private email : string ='';
  @state() private busy = false;
  @state() private status = '';
  @state() private tone = '';
  @state() private showPassword = false;

  constructor() { super(); }

  stateChanged(state: AppState) {
    this.login = state.frontend!.login;
    this.email = state.backend!.email;
  }

  static get styles(): CSSResultArray { return [
    buttonStyle,
    labelStyle,
    inputStyle,
    toggleStyle,
    statusStyle,
    css`

    :host {
      display:                  grid;
      grid-template-rows:       auto auto auto auto;
      align-content:            start;
    }
    
    p.lead {
      margin:               0;
      padding:              4px 20px 0;
      line-height:          1.5;
      color:                var(--pwa_label_text_color, #1c2430);
    }

    ` ]; }

  render() {
    return html`

      <p class="lead">Permanently delete the user account and data related to: ${this.email}</p>

      <label for="pwa-delete-password">Current password

        <span class="pair">

          <input
            id="pwa-delete-password"
            name="current_password"
            type="${this.showPassword ? 'text' : 'password'}"
            autocomplete="current-password"
            aria-describedby="pwa-delete-status"/>

          ${revealControl(this.showPassword, () => { this.showPassword = !this.showPassword; })}

        </span>

      </label>

      ${liveStatus('pwa-delete-status', this.status, this.tone)}

      <button
        type="button"
        part="submit"
        class="action-button deleteUser"
        aria-busy="${this.busy ? 'true' : 'false'}"
        ?disabled="${this.login === false || this.busy}"
        @click="${this.alertDelete}">${this.busy ? 'Deleting…' : 'Delete'}</button>

    `;
  }

  private show(detail: { code: string; message: string }) {
    this.tone = 'error';
    this.status = userMessage(detail);
    emitWindow(pwaAuthError, detail);
  }

  /* Delete Account */
  private alertDelete = () => {
    if (this.busy) return;
    const current = auth.currentUser;
    if (!current) {
      this.show({ code: 'pwa/signed-out', message: 'Sign in first.' });
      return;
    }

    const password = (this.shadowRoot!.querySelector('#pwa-delete-password') as HTMLInputElement).value;
    if (password.length < 6) {
      this.show({ code: 'pwa/current-password', message: 'Enter your current password.' });
      return;
    }

    const d = confirm("Delete Account?");
    if (d == true) void this.officialDelete(password);
  }

  // Required - storage files, then the analytics signal, then the auth user. The host owns users/{uid}.
  private officialDelete = async (password: string) => {

    this.busy = true;
    this.tone = '';
    this.status = '';

    const ok = await reauthenticate(password);
    if (!ok) {
      const detail = takeAuthFailure();
      this.tone = 'error';
      this.status = userMessage(detail ?? { code: 'pwa/unknown', message: 'Something went wrong. Try again.' });
      this.busy = false;
      return;
    }

    const current = auth.currentUser;
    if (!current) {
      this.show({ code: 'pwa/signed-out', message: 'Sign in first.' });
      this.busy = false;
      return;
    }

    try {

      const uid = current.uid;
      await deleteUserFiles(uid);
      await logAccountDelete();
      await current.delete();
      emitWindow(pwaAccountDeleted, { uid });

    } catch (error) {

      const detail = toAuthError(error);
      this.tone = 'error';
      this.status = userMessage(error);
      emitWindow(pwaAuthError, detail);

    } finally {
      this.busy = false;
    }

  };

}

customElements.define('delete-user', DeleteUser);

declare global { 
  interface HTMLElementTagNameMap {
    'delete-user': DeleteUser;
  }
}
