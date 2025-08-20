import { CSSResultArray, LitElement, css, html } from "lit";
import { property } from "lit/decorators.js";
import { inputStyles, labelStyles, actionButton } from "./css/styles";
import { auth } from "../../firebase/start";
import { updatePhoneNumber } from "firebase/auth";
import './format/phone';
import store from "../../store";
import { accPhone } from "../../redux/backend";

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
      
      let phone :any = this.shadowRoot?.querySelector('phone-format');

      console.log(phone);
   
      // Change Email Firebase Function
      await updatePhoneNumber(
        // auth.PhoneAuthProvider.credential(verificationId, verificationCode).catch((error:Error) => { console.log(error); });
        auth.currentUser, phone.value ).catch((error:Error) => { console.log(error); });

      // Dispatch Custom Event
      store.dispatch(accPhone(phone.value));

      alert('Telephone Updated: ' + phone.value);

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