import { CSSResultArray, LitElement, css, html } from "lit";
import { state }    from "lit/decorators.js";
import { connect }            from "pwa-helpers";
import { store, AppState }    from "../../../store.js";
import { updateProfile }      from "firebase/auth";
import { accName }            from "../../../redux/backend.js";
import { nameAuth }           from "../../../redux/frontend.js";
import { auth }               from "../../../firebase/authentication.js";
import { labelStyle }         from "../../form/css/label.js";
import { inputStyle }         from "../../form/css/input.js";
import { buttonStyle }        from "../../form/css/button.js";
import { statusStyle, liveStatus } from "../../form/css/status.js";
import { pwaAuthError, pwaProfileUpdated } from "../../../events/names.js";
import { emitWindow, toAuthError } from "../../../events/emit.js";
import { userMessage } from "../../../firebase/message.js";

export class InputName extends connect(store)(LitElement) {

  @state() private login = false;
  @state() private draft = '';
  @state() private busy = false;
  @state() private status = '';
  @state() private tone = '';

  private dirty = false;

  constructor() { super(); }

  stateChanged(state: AppState) {
    const signedIn = Boolean(state.frontend?.login);
    if (signedIn !== this.login) this.dirty = false;
    this.login = signedIn;
    if (!this.dirty) this.draft = state.backend?.name ?? '';
  }

  static get styles(): CSSResultArray { return [
    labelStyle,
    inputStyle,
    buttonStyle,
    statusStyle,
    css`

      :host, form { display: grid; align-content: start; }

    ` ]; }

  render() {
    return html`

      <form
        autocomplete="on"
        aria-busy="${this.busy ? 'true' : 'false'}"
        @submit="${this.default}">
  
        <label
          for="pwa-name">Name

          <input
            id            = "pwa-name"
            name          = "name"
            part          = "name"
            type          = "text"
            autocomplete  = "name"
            aria-invalid  = "${this.tone === 'error' ? 'true' : 'false'}"
            aria-describedby = "pwa-name-status"
            @input        = "${ this.handleInput }"
            .value        = "${ this.draft }" />

          </label>

        ${liveStatus('pwa-name-status', this.status, this.tone)}
    
        <button
          class="action-button save"
          part="submit"
          type="submit"
          aria-busy="${this.busy ? 'true' : 'false'}"
          ?disabled="${this.login === false || this.busy}">${this.busy ? 'Saving…' : 'Update'}</button>

      </form>

    `;
  }

  /* Form Default */
  private default = (event: Event) => {
    event.preventDefault();
    void this.alertProfile();
  }

  private handleInput(event: Event) {
    const input   = event.target as HTMLInputElement;
    this.dirty    = true;
    this.draft    = input.value;
  }

  private show(detail: { code: string; message: string }) {
    this.tone = 'error';
    this.status = userMessage(detail);
    emitWindow(pwaAuthError, detail);
  }

  private alertProfile = async () => {

    if (this.busy) return;

    const input = this.renderRoot.querySelector('#pwa-name') as HTMLInputElement | null;
    const name = (input?.value ?? this.draft).trim();
    const current = auth.currentUser;

    if (!current) {
      this.show({ code: 'pwa/signed-out', message: 'Sign in first.' });
      return;
    }

    this.busy = true;
    this.tone = '';
    this.status = '';

    try {
      await updateProfile(current, { displayName: name });
      this.dirty = false;
      this.draft = name;
      store.dispatch(accName(name));
      store.dispatch(nameAuth(name));
      this.status = 'Name saved.';
      emitWindow(pwaProfileUpdated, {
        uid:          current.uid,
        displayName:  name,
        photoURL:     current.photoURL
      });
    } catch (error) {
      this.show(toAuthError(error));
    } finally {
      this.busy = false;
    }

  }

}

customElements.define('input-name', InputName);

declare global { 
  interface HTMLElementTagNameMap {
    'input-name': InputName;
  }
}
