import { CSSResultArray, LitElement, css, html } from "lit";
import { property, state }  from "lit/decorators.js";
import { connect }          from "pwa-helpers";
import store, { AppState }  from "../../../store";
import { auth }             from "../../../start";
import { labelStyle }       from "../../../css/form/label";
import { inputStyle }       from "../../../css/form/input";
import { buttonStyle }      from "../../../css/form/button";
import { updateEmail }      from "firebase/auth";

export class ContactEmail extends connect(store)(LitElement) {

  /** @attr email */
  @property({ type: String, reflect: true}) email = '';
  
  @state() private login      : boolean   = false;
  @state() private mail       : string    = "";

  constructor() { super(); }

  stateChanged(state: AppState) {
    this.login  = state.frontend!.login;
    this.mail   = state.backend!.email ;
  }

  // Handle input changes to keep the password property in sync
  private handleEmail(event: Event) {
    const input = event.target as HTMLInputElement;
    this.mail = input.value; // Update the property with the input value
  }

  static get styles(): CSSResultArray { return [
    labelStyle,
    inputStyle,
    buttonStyle,
    css`
    
      :host {
        display:      grid;
      }

      form { display: grid; }

    `
    ]; }

  render() {
    return html`

    <form
      autocomplete="off"
      @submit="${this.default}">

      <label for="pwa-email" >E-mail:</label>

      <input
        id            = "pwa-email"
        name          = "email"
        type          = "email"
        class         = "email"
        data-label    = "Account Email"
        @input        = "${this.handleEmail}"
        .value        = "${this.mail}"/>

      <button
        class         = "action-button" 
        @click        = "${this.saveEmail}"
        ?disabled     = "${this.login === false}">Update</button>

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