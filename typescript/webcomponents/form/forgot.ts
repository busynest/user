

import { html, TemplateResult,  }     from 'lit';
import { customElement, state }       from "lit/decorators.js"
import { LazyLoader }                 from '../../lazy-loader';
import { auth }                       from '../../firebase/authentication';

import { sendPasswordResetEmail/*, verifyPasswordResetCode*/ }     from 'firebase/auth';

@customElement('email-reset')
export class EmailReset extends LazyLoader {

  @state() private userEmail :string = '';
  // @state() private code :string = '';

  constructor() { super(); }

  protected firstUpdated() {

    this.shadowRoot!.querySelector(".reset")!.addEventListener("click", () => { 
      this.restPassword();
    } );

  }

  // Handle input changes to keep the password property in sync
  private handleEmail(event: Event) {
    const input = event.target as HTMLInputElement;
    this.userEmail = input.value; // Update the property with the input value
  }

    protected render():TemplateResult {
      return html`

        <form class="resetPass">

          <input
            class       ="email"
            type        ="text"
            placeholder ="email"
            @change     ="${this.handleEmail}">

          <button
            type        ="submit"
            class       ="reset">Forgot Password</button>

        </form>

        <input
          class ="phoneVerify"
          type  ="text" />

    `
  }


  // Reset Password Email
  private restPassword = async () => {

    await sendPasswordResetEmail( auth, this.userEmail )
    .catch( (error:any) => { console.log(error); } );

  }
/*
  private async restCode () {

    await verifyPasswordResetCode(auth, this.code);
    
  }
*/

}

declare global { 
  interface HTMLElementTagNameMap {
    'email-reset': EmailReset;
  }
}


/*
    let actionCodeSettings = {
        url: 'https://www.contractorscentre.com/?email=user@example.com',
        iOS: {
          bundleId: 'com.contracotors.ios'
        },
        android: {
          packageName: 'com.contracotors.android',
          installApp: true,
          minimumVersion: '12'
        },
        handleCodeInApp: true
      };
*/

/**
 * 
private _restCode() {
    let x:any = this.shadowRoot!.querySelector('.email')!
    let email = x.target.value
    // @ts-ignore
    firebase
        .auth()
        .sendPasswordResetEmail( email )
        // @ts-ignore
        .then( () => { firebase.auth().confirmPasswordReset( code, newPassword )})
      .catch( (error:any) => { console.log("Password Reset Error: ", error); });

    // @ts-ignore
    firebase
     .auth()
     // @ts-ignore
     .verifyPasswordResetCode( code )
     .then()
     .catch()

 // firebase.auth().confirmPasswordReset( code, newPassword )
 // firebase.auth().verifyPasswordResetCode( code )
}


 */