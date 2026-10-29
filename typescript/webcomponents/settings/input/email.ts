import { CSSResultArray, LitElement, css, html } from "lit";
import { property, state }  from "lit/decorators.js";
import { connect }          from "pwa-helpers";
import store, { AppState }  from "../../../store";
import { auth }             from "../../../firebase/authentication";
import { labelStyle }       from "../../form/css/label";
import { inputStyle }       from "../../form/css/input";
import { buttonStyle }      from "../../form/css/button";
import { verifyBeforeUpdateEmail } from "firebase/auth";
import { reauthenticate }   from "../../../firebase/interface";

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
    
      :host, form { display: grid; }

    `
    ]; }

  render() {
    return html`

    <form
      autocomplete="off"
      @submit="${this.saveEmail}">

      <label for="pwa-current-email-password">Current password

        <input
          id            = "pwa-current-email-password"
          name          = "current_password"
          type          = "password"
          autocomplete  = "current-password"/>

      </label>

      <label for="pwa-email" >E-mail:

        <input
          id            = "pwa-email"
          name          = "email"
          type          = "email"
          class         = "email"
          data-label    = "Account Email"
          @input        = "${this.handleEmail}"
          .value        = "${this.mail}"/>

        <span class="verified"></span>

      </label>

      <button
        type          = "submit"
        class         = "action-button"
        ?disabled     = "${this.login === false}">Update</button>

    </form>

    `;
  }

  // Save Email
  private saveEmail = async (event: Event) => {

    event.preventDefault();

    const current = auth.currentUser;
    if (!current) { alert('Please Login'); return; }

    const currentPassword = (this.shadowRoot?.querySelector('#pwa-current-email-password') as HTMLInputElement | null)?.value ?? '';
    const contactMail = this.shadowRoot?.querySelector('#pwa-email') as HTMLInputElement | null;
    if (!contactMail) { return; }
    if (currentPassword.length < 6) { alert('Enter your current password.'); return; }

    const ok = await reauthenticate(currentPassword);
    if (!ok) { return; }

    try {

      // Required - verify the new address before it replaces the current one
      await verifyBeforeUpdateEmail(current, contactMail.value);

      window.dispatchEvent(new CustomEvent("userEmailChanged", {
        detail: { email: contactMail.value }
      }));

      alert('Verification email sent');

    } catch (error) {

      alert(error instanceof Error ? error.message : 'Email was not updated');

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