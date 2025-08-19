import { CSSResultArray, LitElement, css, html } from "lit";
import { property } from "lit/decorators.js";
import { inputStyles, labelStyles, actionButton } from "./css/styles";
import { auth } from "../../firebase/start";
import { updateEmail } from "firebase/auth";

export class ContactEmail extends LitElement {

  @property({ type: String, reflect: true}) email = '';

    constructor(){
      super();
    }

    static get styles(): CSSResultArray { return [ labelStyles, inputStyles, actionButton,
      css`
      
      :host {
        display: grid;
      }

      `
     ]; }

    render() {
      return html`

      <label for="pwa-email" >E-mail:</label>

      <input
        id            = "pwa-email"
        type          = "text"
        value         = "${this.email}"
        class         = "email"
        type          = "email"
        data-label    = "Account Email" />

      <button class="action-button"  @click="${this.saveEmail}">Update</button>

      `;
    }

  // Save Email
  private saveEmail = async () => {
    if ( auth.currentUser ) {
      
      let contactMail :any = this.shadowRoot?.querySelector('contact-email');
   
      // Change Email Firebase Function
      await updateEmail( auth.currentUser, contactMail.email ).catch((error:Error) => { console.log(error); });

      // Verify Email Custom Event
      const emailChangedEvent = new CustomEvent("userEmailChanged", {
        detail: { email: contactMail.email }
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