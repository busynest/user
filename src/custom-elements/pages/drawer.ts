import { html, LitElement }               from 'lit';
import { customElement, state }           from 'lit/decorators.js';
import { connect }                        from 'pwa-helpers/connect-mixin';
import { store, AppState }                from '../../store';
import { listStyles }                     from '../../css/list';
import { close }                          from '../../css/svg';
import { show }                           from '../../css/toggle';
import { drawerStyles }                   from '../../css/drawer-styles';
import { signUpAction, toggleSign }       from '../../redux/frontend'; 
import { logOut }                         from '../../firebase/start';
import { signIn, signUp }                 from '../../firebase/login';

@customElement('user-drawer')
export class UserDrawer extends connect(store)(LitElement) {

    @state() private _subscribe = false; // Drawer State
    @state() private _log = false; // Login State
    @state() private _sign = false; // Sign-up State

    constructor() {
      super();
    }

    protected firstUpdated() {
      
      const forms = this.querySelectorAll('form')!;
      forms.forEach( item => { item.preventDefault(); });

      this.shadowRoot!.querySelector('.sign')!      .addEventListener('click', () => { store.dispatch(toggleSign()) } );
      this.shadowRoot!.querySelector('.new')!       .addEventListener('click', () => { store.dispatch(signUpAction())} );
      this.shadowRoot!.querySelector('.login')!     .addEventListener('click', () => { this._signIn() } );
      this.shadowRoot!.querySelector('.newUser')!   .addEventListener('click', () => { this._signUp() } );
      this.shadowRoot!.querySelector('.leave')!     .addEventListener('click', () => { logOut() } );
     // this.shadowRoot!.querySelector('#or')!            .addEventListener('click', () => { anon_SignIn() } );
    }

    stateChanged(state: AppState) {
      this._subscribe   = state.frontend!.drawer;     // Drawer State
      this._log         = state.frontend!.login;      // Logged in-out State
      this._sign        = state.frontend!.register;   // Sign-up State
    }
  
    static get styles() { return [ show, drawerStyles, listStyles ] };
  
    protected render() {
      return html`
  
      <!-- Drawer Wrapper -->
      <div class="visibility userDrawer" ?on="${ this._subscribe === true }">

        <!-- Exit Button -->
        <div class="exit">
          <div></div>
          <h3>${this._log ? "ACCOUNT" : "SUBSCRIBE" }</h3>
          <button class="sign">${close}</button>
        </div>

        <!-- Logged-out State -->
        <div class="spec" ?on="${ this._log === false }">

          <!-- Change Sign-up State -->
          <p><button class="new">${ this._sign ? 'create a new account' : 'sign-in' }</button></p>

          <!-- Sign-up State -->
          <form id="pwa-signin" @submit=${this._handleSubmit} autocomplete="on" class="spec" ?on="${ this._sign === true }">
          <ul>
            <li class="inpat">
              <label><input   id="txtEmail"      type="email"      >Email</label>
              <label><input   id="txtPassword"   type="password"   >Password</label>
            </li>
            <li><button class="login action-button">Sign in</button></li>
          </ul>
          </form>

        <!-- Sign UP -->
        <form id="pwa-signup" @submit=${this._handleSubmit} autocomplete="on" class="spec" ?on="${ this._sign === false }">
          <ul>
            <li class="inpat">
              <label><input   id="newEmail"         type="email"      >Email</label>
              <!-- <label><input   id="verifyEmail"      type="email"      >Verify Email</label> -->
              <label><input   id="newPassword"      type="password"   >Password</label>
              <!-- <label><input   id="veriftPassword"   type="password"   >Verify Password</label> -->
            </li>
            <li><button class="newUser action-button">Sign up</button></li>
          </ul>
        </form>

        </div>
  
        <!-- Logged-in State -->
        <div class="spec setLog" ?on="${ this._log === true }">
          <slot></slot>
          <p><a href="/settings">Settings</a></p>
          <p><a class="leave" aria-label="log out">log out</a></p>
        </div>
  
      </div>

      `;
    }

    private _handleSubmit(event: Event) {
      event.preventDefault();
    }

    
    // Sign IN
    private _signIn() {
      console.log('clicked');
     // e.preventDefault();
      
      const email : any       = this.shadowRoot!.getElementById('txtEmail');
      const password : any    = this.shadowRoot!.getElementById('txtPassword');

      if (email.length < 4) { alert('Please enter an email address.'); return; }
      if (password.length < 4) { alert('Please enter a password.'); return; }

      // Sign IN with email and password
      signIn(email.value, password.value);
    }
  
    // Sign UP.
    private _signUp() {
      const email : any = this.shadowRoot!.getElementById('newEmail');
      const pass : any = this.shadowRoot!.getElementById('newPassword');

      console.log(email)

      if (email.length < 4) { alert('Please enter an email address.'); return; }
      if (pass.length < 4)  { alert('Please enter a password.'); return; }

      // Sign UP with email and password.
      signUp(email.value, pass.value);
  
  }

  /* To Do: Integration

  // Google Tag Manager Conversion - Integrateion
  private gtag_report_conversion = async () => {

    // @ts-ignore
    gtag('event', 'conversion', {'send_to': 'AW-937270922/amGHCMaJ06QYEIq99r4D'});

  }

*/

}

declare global {
  interface HTMLElementTagNameMap {
      'user-drawer': UserDrawer;
  }
}

/*

  <!-- Google Login Button 
  <p><button id="googleSignIn" class="google">
    <span class="icon"></span>
    <span class="buttonText">Sign in with Google</span>
  </button></p> -->

*/