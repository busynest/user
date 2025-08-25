import { CSSResultArray, LitElement, css, html } from "lit";
import { state }              from "lit/decorators.js";
import { connect }            from "pwa-helpers";
import store, { AppState }    from "../../../store";
import { buttonStyle }        from "../../../css/form/button";
import { auth }               from '../../../start';

export class DeleteUser extends connect(store)(LitElement) {
   
  @state() private login : boolean = false;

  constructor() { super(); }

  protected firstUpdated() {

    this.shadowRoot!.querySelector('.deleteUser')!.addEventListener('click',() => {
      this.alertDelete();
    } );

  }

  stateChanged(state: AppState) {
    this.login = state.frontend!.login;
  }

  static get styles(): CSSResultArray { return [
    buttonStyle,
    css`

    :host {
      display:                  grid;
      grid-template-rows:       auto auto;
      border-top:               2px solid var(--pwa_divider);
    }
    
    ` ]; }

  render() {
    return html`

      <p>Permanently delete the user account and data related to:</p>

      <button
        class="action-button deleteUser"
        ?disabled="${this.login === false}">Delete</button>

    `;
  }

  /* Delete Account */
  private alertDelete()  { if (auth.currentUser) { this.deleteUser(); } else { alert('Please Login'); } }
  private deleteUser() {
    const d = confirm("Delete Account?");
    if    ( d == true ) { this.officialDelete(); console.log("user gone"); }
    else  { console.log("user here"); }
  }

  // Delete Declaration
  private officialDelete = async () => {

    if(auth.currentUser) {
  
      return auth.currentUser.delete().then( () => { }).catch( () => { });

    } else { alert('Please Sign-in') }
    
  };

}

customElements.define('delete-user', DeleteUser);

declare global { 
  interface HTMLElementTagNameMap {
    'delete-user': DeleteUser;
  }
}

