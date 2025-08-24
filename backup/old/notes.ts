      
      
        /*
        private gtag_report_conversion(url:any) {
          var callback = function () {
            if (typeof(url) != 'undefined') {
              window.location = url;
            }
          };
          // @ts-ignore
          gtag('event', 'conversion', {
            'send_to': 'AW-937270922/YDL4CKjKuNIBEIq99r4D',
            'event_callback': callback
          });
          return false;
        }
      */
      
      
      /*    --primary-blue:               #184A78;
          --primary-blue-light:         #3F9EF5;
          --secondary-blue:             #FF5F2D;
          --type-color:                 #171D29;
          --secondary-background-blue:  #E5EEF3;
          --mdc-theme-primary:          var(--primary-orange);  /* #03a9f4; 
          --mdc-theme-on-primary:       whitesmoke;

    /*
  }
  private _create() {
    let email:any     = this.shadowRoot!.querySelector('.newEmail')!;
    let password:any  = this.shadowRoot!.querySelector('.newSignal')!;
    // @ts-ignore 
    firebase
      .auth()
      .createUserWithEmailAndPassword(email.value, password.value)
      // .then( this.gtag_report_conversion(window.location) );
      .catch( (error:any) => { this._error = error, console.log( "error: ", error ); });
  }

  private _signIn() {
    let email:any = this.shadowRoot!.querySelector('.existingEmail')!;
    console.log(email);
    let password:any = this.shadowRoot!.querySelector('.existingSignal')!;
    // @ts-ignore 
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch( (error:any) => { this._error = error, console.log( "error: ", error ); });
  }
}
*/

/**
 * 
 *   // property({type: Boolean}) private _email   = false;
 * 
 *    // const forms = this.shadowRoot!.querySelectorAll('form');
   // forms.forEach( () => {       this.shadowRoot!.addEventListener('click', (   e:any  ) => {  e.preventDefault(), console.log(e) }, { passive: false } ); });
    // this.shadowRoot!.querySelector('#signUp')!.addEventListener('click', (e:any) => { e.preventDefault() } );
    // this.shadowRoot!.querySelector('#signIn')!.addEventListener('click', (e:any) => { e.preventDefault() } );
 * 
 * 
 * <!--
 * 
 * 
 * <!--
  <mwc-button
      outlined
      label="sign in"
      icon="autorenew"
      @click="\${ ()=>{ this._method = !this._method } }"></mwc-button>
  -->

  
<!--
        <p><input type="email" class="resetEmail"  placeholder="example@email.com"></p>
        <p><input type="submit" class="reset" @click="\${this._restCode}"/></p>
        <p class="forgot" @click="\${()=>{this._email = !this._email} }">Login</p>
-->
 * 
  <button \@click="\${()=>{this._method = \!this._method} }">sign up</button>
-->
<!--
    <mwc-button
      outlined
      label="sign up"
      icon="autorenew"
      style="width: 100%;"
      @click="\${ ()=>{ this._method = !this._method } }"></mwc-button>
-->
  <!--  <form class="signIn" >  -->
 * 
 */


  // @ts-ignore 
  // private _anon() { firebase.auth().signInAnonymously(); }