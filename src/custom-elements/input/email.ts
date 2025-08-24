import { CSSResultArray, LitElement, css, html } from "lit";
import { property, state } from "lit/decorators.js";
import { inputStyles, labelStyles, actionButton } from "./css/styles";
import { auth } from "../../start";
import { updateEmail } from "firebase/auth";
import { connect } from "pwa-helpers";
import store, { AppState } from "../../store";

export class ContactEmail extends connect(store)(LitElement) {

  /** @attr email */
  @property({ type: String, reflect: true}) email = '';
  
  @state() private mail: string = ""

  constructor() { super(); }

  stateChanged(state: AppState) {
    this.mail = state.backend!.email ;
  }

    static get styles(): CSSResultArray { return [ labelStyles, inputStyles, actionButton,
      css`
      
      :host {
        display:      grid;
        border-top:   2px solid var(--pwa_divider);
      }

      form { display: grid; }

      `
     ]; }

    render() {
      return html`

      <form
        @submit="${this.default}">

        <label for="pwa-email" >E-mail:</label>

        <input
          id            = "pwa-email"
          type          = "text"
          class         = "email"
          type          = "email"
          data-label    = "Account Email"
          placeholder   = "${this.mail}"/>

        <button
          class="action-button" 
          @click="${this.saveEmail}">Update</button>

      </form>

      `;
    }

  /* Form Default */
  private default = (e:Event) => {
    e.preventDefault();
  }

  // Save Email
  private saveEmail = async () => {
    if ( auth.currentUser ) {
      
      let contactMail :any = this.shadowRoot?.querySelector('#pwa-email')!;
      console.log(contactMail);
      console.log(contactMail);
   
      // Change Email Firebase Function
      await updateEmail( auth.currentUser, contactMail.value ).catch((error:Error) => { console.log(error); });

      // Verify Email Custom Event
      const emailChangedEvent = new CustomEvent("userEmailChanged", {
        detail: { email: contactMail.value }
      });

      // Dispatch Custom Event
      window.dispatchEvent(emailChangedEvent);

      alert('Email Updated');

    }
  }

}

customElements.define('contact-email', ContactEmail);

declare global { 
  interface HTMLElementTagNameMap {
    'contact-email': ContactEmail;
  }
}




    // this.emailVerification();
      // let document    :any = doc( db, 'users', auth.currentUser.uid );
      // .then(() => updateDoc( document, { "contractorEmail":contactMail.email } ).catch(e=>console.log(e)) )
      // store.dispatch( businessEmail(contactMail.email) ); // Redux Account Update
      // console.log('good');
/*
// Email Verification  
private emailVerification() {

  // const auth : any = getAuth();
  console.log( 'auth.currentUser: ', auth.currentUser);

  // Todo: Find Soruce of Dependency
  sendEmailVerification(auth.currentUser)
    .then(() => { console.log('success')
      // Email verification sent!
    }).catch( e => console.log(e) );

}
*/