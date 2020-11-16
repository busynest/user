

import { html, TemplateResult }                   from 'lit-element';
import { customElement, property }                from "lit-element/lib/decorators.js"
import { connect }                                from 'pwa-helpers/connect-mixin';
import { store, RootState }                       from '../store';
import { PageViewElement }                        from '../lazy-loader';

@customElement('reset-options')
export class ResetOptions extends connect(store)(PageViewElement) {

  @property({type: String})   private _userEmail    :any = '';

  constructor() {
    super();
  }

  stateChanged (state: RootState) {
    this._userEmail = state.account!.email;
  }

private _restPassword() {

  // @ts-ignore
  var auth = firebase.auth();
  var emailAddress = this._userEmail;

  auth
    .sendPasswordResetEmail(emailAddress)
    .then( () => { } )
    .catch( (error:any) => { console.log(error); });

    // -- verifyPasswordResetCode(code)
}

protected firstUpdated() {
  this.shadowRoot!.querySelector(".reset")!.addEventListener("click", () => { this._restPassword(); } );
}

  protected render():TemplateResult {
    return html`

<form class="resetPass">

  <input
    class       ="email"
    type        ="text"
    placeholder ="email">

  <input
    type        ="submit"
    class       ="reset"/>

</form>

  <input
    class ="phoneVerify"
    type  ="text" />

  `
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