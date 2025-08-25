import { CSSResultArray, LitElement, css, html } from "lit";
import { property, state }    from "lit/decorators.js";
import { connect }            from "pwa-helpers";
import { store, AppState }    from "../../../store";
import { updateProfile }      from "firebase/auth";
import { accName }            from "../../../redux/backend";
import { auth }               from "../../../start";
import { labelStyle }         from "../../../css/form/label";
import { inputStyle }         from "../../../css/form/input";
import { buttonStyle }        from "../../../css/form/button";

export class InputName extends connect(store)(LitElement) {

  /** @attr value */
  @property({ type: String, reflect: true}) public value = '';

  @state() private login : boolean = false;

  constructor() { super(); }

  stateChanged(state: AppState) {
    this.login  = state.frontend!.login;
    this.value  = state.frontend!.name;  // user-name
  }

  static get styles(): CSSResultArray { return [
    labelStyle,
    inputStyle,
    buttonStyle,
    css`

      :host, form { display: grid; }

    ` ]; }

  render() {
    return html`

      <form
        @submit="${this.default}">
  
        <label
          for="pwa-name"><span>Name:</span></label>

          <input
            id            = "pwa-name"
            name          = "username"
            type          = "text"
            data-label    = "Contact Name"
            @input        = "${ this.handleInput }"
            .value        = "${ this.value }" />
    
        <!-- Save to Database -->
        <button
          class="action-button save"
          @click="${this.alertProfile}"
          ?disabled="${this.login === false}">Update</button>

      </form>

    `;
  }

  /* Form Default */
  private default = (e:Event) => {
    e.preventDefault();
  }

  // Handle input changes to keep the password property in sync
  private handleInput(event: Event) {
    const input   = event.target as HTMLInputElement;
    this.value    = input.value; // Update the property with the input value
  }

  private alertProfile = async () => {

    // Dispatch the Information to Firestore Function
    if (auth.currentUser) {

      await updateProfile(auth.currentUser, { displayName: this.value })
      .then( () => { store.dispatch(accName(this.value)) })
      .then( () => { alert('updated name:' + this.value); });

    } else { alert('Please Login'); }
  
  }

  
// Redux Dispatch Updated Information

}

customElements.define('input-name', InputName);

declare global { 
  interface HTMLElementTagNameMap {
    'input-name': InputName;
  }
}