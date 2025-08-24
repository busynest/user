import { CSSResultArray, LitElement, css, html } from "lit";
import { property } from "lit/decorators.js";
import { actionButton } from "./css/styles";
import { auth } from '../../start';

export class DeleteUser extends LitElement {

  @property({ type: String, reflect: true}) name = '';
  
    constructor() { super(); }

    protected firstUpdated() {
  
      this.shadowRoot!.querySelector('.deleteUser')!.addEventListener('click',(e:Event) => {
        e.preventDefault();
        this.alertDelete();
      } );

    }

    static get styles(): CSSResultArray { return [ actionButton,
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

        <button class="action-button deleteUser">Delete</button>

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

