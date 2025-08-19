import { CSSResultArray, LitElement, PropertyValues, css, html } from "lit";
import { property, state } from "lit/decorators.js";
import { actionButton, inputStyles, labelStyles } from "./css/styles";
import { store, AppState } from "../../store";
import { Auth, getAuth, updateProfile } from "firebase/auth";
import { connect } from "pwa-helpers";
import { accName } from "../../redux/backend";

export class InputName extends connect(store)(LitElement) {

  /** @attr value */
  @property({ type: String, reflect: true}) public value = '';
  @state() private _user = false;
  
    constructor(){
      super();
    }

    protected firstUpdated(_changedProperties: PropertyValues): void {

      this.shadowRoot!.querySelector('.save')!.addEventListener('click',(e:Event) => {
        e.preventDefault();
        console.log('save click');
        this.alertProfile();
      } );

    }

    stateChanged(state: AppState) {

      this._user = state.frontend!.login; // Login State
      this.value = state.frontend!.name;  // user-name

    }

    static get styles(): CSSResultArray { return [ labelStyles, inputStyles, actionButton,
      css`

      :host {
        display:  grid;
        grid-template-rows: auto auto;
      }
      
      ` ]; }

    render() {
      return html`

      <label for="pwa-name">Name:</label>

      <input
        id            = "pwa-name" 
        type          = "text"
        data-label    = "Contact Name"
        value         = "${ this.value }" />

      <!-- Save to Database -->
      <button class="action-button save">save</button>

      `;
    }

    private alertProfile = async () => {

      const username : any = this.shadowRoot!.querySelector('#pwa-name');

      // Dispatch the Information to Firestore Function
      if (this._user) {

        const user:Auth = getAuth();

        await updateProfile(user.currentUser, { displayName: username.value })
        .then( () => { store.dispatch(accName(username.value)) })
        .then( () => { alert('updated name:' + username.value); });

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

        /* Update Password 
        private alertPassword() {
          if (this._user) {
    
            const password = this.shadowRoot!.querySelector("input type=password")!;
            console.log("email: ", password);
            // updatePassword(user, password);
    
          } else { alert('Please Login'); } }
    */


/*
  .catch( (error: object) =>{
    console.error('Error writing new message to Firebase Database', error);
  });
*/