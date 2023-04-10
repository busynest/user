

import { LitElement, html, css, CSSResult, TemplateResult } from 'lit';
import { customElement, state }   from "lit/decorators.js"
import { connect }                from 'pwa-helpers/connect-mixin';
import { store }                  from '../store';


@customElement('create-user')
export class CreateUser extends connect(store)(LitElement) {

  @state() private _method  = false;
  @state() private _error   = '';

  constructor() {
    super();
  }

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

  protected firstUpdated() {

  }

  static get styles():CSSResult {
    return css`

        :host {
          display:                      grid;
          grid-gap:                     8px;
          padding-bottom:               8px;
      /*    --primary-blue:               #184A78;
          --primary-blue-light:         #3F9EF5;
          --secondary-blue:             #FF5F2D;
          --type-color:                 #171D29;
          --secondary-background-blue:  #E5EEF3;*/
          --mdc-theme-primary:          var(--primary-orange);  /* #03a9f4; */
          --mdc-theme-on-primary:       whitesmoke;
        }

        @media only screen and (max-width: 600px) {
          h2[title] { font-size: 1.3em }
          :host{ font-size: 14px }
        }

        form {
          display: grid;
          grid-gap: 8px;
        }

            `
  }

  protected render():TemplateResult {
    return html`

  ${ this._method ? html` 
      <form autocomplete="on">

        <p>Sign up to advertise your business with us.</p>

        <mwc-textfield filled autocomplete="email"
          type          = "email"
          class         = "newEmail"
          label         = "New Email"
          iconTrailing  = "mail"
          style = "
            margin:   auto;
            width:    100%;">
        </mwc-textfield>

        <mwc-textfield filled autocomplete="password"
          type          = "password"
          class         = "newSignal"
          label         = "New Password"
          iconTrailing  = "lock"
          style = "
            margin:   auto;
            width:    100%;">
        </mwc-textfield>
        <!-- /* this.gtag_report_conversion, */ -->

        <mwc-button raised autocomplete
          label   = "Sign up"
          style   = "width: 100%;"
          @click  = "${ this._create }"></mwc-button>

        ${this._error}

        <p
          style="
            color: whitesmoke;
            text-align: center;">
          By clicking "sign up" you agree to our <br />
          <a href="/terms">Terms of Service </a> & <a href="privacy">Privacy Policy</a>.
        </p>
      </form>
  ` : html`

        <form autocomplete="on"
          style="
            display:    grid;
            grid-gap:   8px;">

            <mwc-textfield filled autocomplete
              autocomplete  = "email"
              type          = "email"
              class         = "existingEmail"
              label         = "Email"
              iconTrailing  = "mail"
              style = "
                margin:   auto;
                width:    100%;">
            </mwc-textfield>

            <mwc-textfield filled autocomplete="password"
              autocomplete  = "password"
              type          = "password"
              class         = "existingSignal"
              label         = "Password"
              iconTrailing  = "lock"
              style = "
                margin:   auto;
                width:    100%;">
            </mwc-textfield>

            <mwc-button raised
              label   = "login"
              style   = "width: 100%"
              @click  ="${ this._signIn }"></mwc-button>

            <p style="text-align:center;">${this._error}</p>

            <a
              href  ="/reset"
              style="
              text-decoration:  none;
              color:            blue;
              text-align:       center;">

                <mwc-button filled
                  label = "Forgot Password"
                  style = "width: 100%"></mwc-button>

            </a>
      </form>
  <!--  </form>  -->

  `}

    `
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
    let password:any = this.shadowRoot!.querySelector('.existingSignal')!;
    // @ts-ignore 
    firebase
      .auth()
      .signInWithEmailAndPassword(email.value, password.value)
      .catch( (error:any) => { this._error = error, console.log( "error: ", error ); });
  }
}


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