import { CSSResultArray, LitElement, css, html } from "lit";
import { property, state } from "lit/decorators.js";
import { inputStyles, actionButton } from "./css/styles";
import { auth } from "../../firebase/start";
import { PhoneAuthProvider, updatePhoneNumber } from "firebase/auth";
import store, { AppState } from "../../store";
import { accPhone } from "../../redux/backend";
import { connect } from "pwa-helpers";

export class InputTelephone extends connect(store)(LitElement) {

  /** @attr telephone */
  @property({ type: String, reflect: true}) telephone = '';

  // Formatted
  @state() private value: string = '';

  // Unformatted
  @state() private number: number = 0;

  constructor() { super(); }

  stateChanged(state: AppState) {
    this.telephone  = state.backend!.phone;
  }

  connectedCallback() {
    super.connectedCallback();
    this.addFormResetListener();
  }

  static get styles(): CSSResultArray { return [ inputStyles, actionButton,
    css`
    
      :host, form { display: grid; }

    `
    ]; }

  render() {
    return html`

      <form
        @submit="${this.default}">

      <label
        for="pwa-telephone">Telephone:</label>

      <input
        id="pwa-telephone"
        name="telephone" v
        type="text"
        @input="${this.onInput}"
        @change="${this.handleTelephone}"
        @keydown="${this.onKeyDown}"
        placeholder="${this.formatPhoneNumber(this.telephone) || '(XXX) XXX-XXXX'}"
        inputmode="numeric"
        pattern="[0-9]*"
        data-label="Phone Number"
      />

      <button
        class="action-button"
        @click="${this.saveTelephone}">Update
      </button>

    </form>

    `;
  }




  private onKeyDown(event: KeyboardEvent) {

    // Allow backspace, delete, tab, escape, enter, and arrow keys
    const allowedKeys = ['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];
    
    if (allowedKeys.includes(event.key) || (event.key >= '0' && event.key <= '9') || (event.key >= 'Numpad0' && event.key <= 'Numpad9')) {
      // Allow normal operation
    } else {
      // Prevent the default action (e.g., character input)
      event.preventDefault();
    }
    
  }

  private onInput(event: Event) {

    const inputElement = event.target as HTMLInputElement;
    const unformattedValue = this.unformatPhoneNumber(inputElement.value);

    // Check the length of the unformatted phone number
    if (unformattedValue.length <= 10) {
      this.value = unformattedValue;
    } else {
      // If the length exceeds 10, reset the input value to the previously stored value
      inputElement.value = this.formatPhoneNumber(this.value);
    }
  }

  private formatPhoneNumber(phoneNumber: string): string {
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');
    let formatted = '';

    if (cleaned.length > 0) {
      formatted = `(${cleaned.slice(0, 3)}`;
    }
    if (cleaned.length >= 3) {
      formatted += `) ${cleaned.slice(3, 6)}`;
    }
    if (cleaned.length > 6) {
      formatted += `-${cleaned.slice(6, 10)}`;
    }

    return formatted;
  }

  private unformatPhoneNumber(formattedPhoneNumber: string): string {
    return formattedPhoneNumber.replace(/\D/g, '');
  }

  private addFormResetListener() {
    const form = this.closest('form');
    if (form) {
      form.addEventListener('reset', () => this.resetInput());
    }
  }

  private resetInput() {
    this.value = '';
  }










  /* Form Default */
  private default = (e:Event) => {
    e.preventDefault();
  }

  // Handle input changes to keep the password property in sync
  private handleTelephone(event: Event) {
    const input = event.target as HTMLInputElement;
    this.number = input.value; // Update the property with the input value
  }

  // Save Email
  private saveTelephone = async () => {

    if ( auth.currentUser ) {




    // Step 1: Verify the new phone number
    PhoneAuthProvider.credentialWithPhoneNumbers("+1234567890")
        .then((verificationId) => {
            // Prompt user to enter the SMS code
            const smsCode = "123456"; // User enters this
            const credential = PhoneAuthProvider.credential(verificationId, smsCode);

            // Step 2: Update the user's phone number
            updatePhoneNumber(auth.currentUser, credential)
                .then(() => {
                    console.log("Phone number updated successfully!");
                })
                .catch((error) => {
                    console.error("Error updating phone number:", error);
                });
        })
        .catch((error) => {
            console.error("Error verifying phone number:", error);
        });





   
      // Change Email Firebase Function
      await updatePhoneNumber(
        // auth.PhoneAuthProvider.credential(verificationId, verificationCode).catch((error:Error) => { console.log(error); });
        auth.currentUser, this.number ).catch((error:Error) => { console.log(error); });

      // Dispatch Custom Event
      store.dispatch(accPhone(this.number));

      alert('Telephone Updated: ' + this.number);

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


/*
// Module Declaration Exact NameSpace Reference - Asynchronous Firebase Function
export const google_SignIn = async () => {

  const provider:any = new GoogleAuthProvider();
  provider.addScope('profile');
  provider.addScope('email');

  signInWithRedirect(auth, provider);

  const credential = GoogleAuthProvider.credential(
    googleUser.getAuthResponse().id_token
  );
  const result = await signInWithCredential(auth, credential);

  getRedirectResult(auth)
    .then( (result: any) => {
    if (result.credential) { /*Access Token to access Google API 
    const token = result.credential.accessToken; console.log("Google Token", token); }
    // The signed-in user info.
    // const firebaseUser = result.firebaseUser;
  }).catch( (error:any) => { console.log('Sign in error: ', error); } );

  // GoogleCredential credential = new GoogleCredential().setAccessToken(accessToken);

};

*/


/*
// Module Declaration Exact NameSpace Reference - Asynchronous Firebase Function
export const anon_SignIn = async () => {

  signInAnonymously(auth)
  .then(() => { })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
  });

}
*/