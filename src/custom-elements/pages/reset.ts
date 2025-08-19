

import { html, TemplateResult,  }     from 'lit';
import { customElement, state }       from "lit/decorators.js"
import { connect }                    from 'pwa-helpers/connect-mixin';
import { store, AppState }            from '../../store';
import { LazyLoader }                 from '../../lazy-loader';
import { sendPasswordResetEmail }     from 'firebase/auth';
import { auth }                       from '../../firebase/start';

@customElement('reset-options')
export class ResetOptions extends connect(store)(LazyLoader) {

  @state() private userEmail :any = '';

  constructor() {
    super();
  }

  stateChanged (state: AppState) {
    this.userEmail = state.backend!.email;
  }

private _restPassword() {
  let emailAddress:any = this.shadowRoot!.querySelector('.email')!;

  sendPasswordResetEmail(auth, emailAddress)
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