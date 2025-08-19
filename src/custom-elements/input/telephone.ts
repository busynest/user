import { CSSResultArray, LitElement, css, html } from "lit";
import { property } from "lit/decorators.js";
import { inputStyles, labelStyles, actionButton } from "./css/styles";
import { auth } from "../../firebase/start";
import { updateEmail } from "firebase/auth";
import './format/phone';

export class InputTelephone extends LitElement {

  @property({ type: String, reflect: true}) telephone = '';

    constructor(){
      super();
    }

    static get styles(): CSSResultArray { return [ labelStyles, inputStyles, actionButton,
      css`
      
      :host {
        display: grid;
        grid-template-rows: auto auto auto;
      }

      `
     ]; }

    render() {
      return html`

      <label for="phoneNumber">Telephone: ${this.telephone}</label>

      <phone-format></phone-format>

      <button class="action-button" @click="${this.saveTelephone}">Update</button>

      `;
    }

  // Save Email
  private saveTelephone = async () => {
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

customElements.define('input-telephone', InputTelephone);

declare global { 
  interface HTMLElementTagNameMap {
    'input-telephone': InputTelephone;
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