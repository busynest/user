import { html, LitElement, css }                from 'lit';
import { customElement, state }                 from 'lit/decorators.js';
import { connect }                              from 'pwa-helpers/connect-mixin';
import { store, AppState }                      from '../store';
import { userStyles, close }                    from '../styles';
import { User }                                 from './styles-drawer';
import { signUpAction, toggleSign }             from '../settings/user-redux'; 
import { logOut, anon_SignIn, google_SignIn, signIn, signUp  } from '../firebase-functions/user-firebase';

@customElement('user-drawer')
export class UserDrawer extends connect(store)(LitElement) {

    @state() private _log = false;
    @state() private _subscribe = false;
    @state() private _sign = false;

    constructor() {
      super();
    }

    protected firstUpdated() {
      this.shadowRoot!.querySelector('.sign')!          .addEventListener('click', () => { store.dispatch(toggleSign()) } );
      this.shadowRoot!.querySelector('.new')!           .addEventListener('click', () => { store.dispatch(signUpAction())} );
      this.shadowRoot!.querySelector('#or')!            .addEventListener('click', () => { anon_SignIn() } );
      this.shadowRoot!.querySelector('#googleSignIn')!  .addEventListener('click', () => { google_SignIn() } );
      this.shadowRoot!.querySelector('#leave')!         .addEventListener('click', () => { logOut() } );
      this.shadowRoot!.querySelector('#log')!           .addEventListener('click', () => { this._signIn() } );
      this.shadowRoot!.querySelector('#newUser')!       .addEventListener('click', () => { this._signUp() } );
    }

    stateChanged(state: AppState) {
      this._subscribe   = state.pwa_auth!.snackState;
      this._log         = state.pwa_auth!.currentUser;
      this._sign        = state.pwa_auth!.register;
      // this.welcome      = state.user.welcome;
    }
  
    static get styles() {
      return [
        userStyles,
        User,
        css`

        `
      ]}
  
    protected render() {
      return html`
  
      <!-- Login Wrapper -->
      <div class="visibility userDrawer" ?on="${ this._subscribe === true }">

        <div class="exit">
          <div></div>
          <h3 id="or">${this._log ? html`ACCOUNT` : html`SUBSCRIBE` }</h3>
          <button class="sign">${close}</button>
        </div>

        <div class="spec" ?on="${ this._log === false }">

          <p><button class="new">create a new account</button></p>
  
          <p><button id="googleSignIn" class="google">
            <span class="icon"></span>
            <span class="buttonText">Sign in with Google</span>
          </button></p>

          <form id="logs" autocomplete="on" class="spec" ?on="${ this._sign === true }">
          <ul>
            <li class="inpat">
              <label><input   id="txtEmail"      type="email"      >Email</label>
              <label><input   id="txtPassword"   type="password"   >Password</label>
            </li>
            <li><button id="log" class="action-button">Sign in</button></li>
          </ul>
          </form>

        <!-- Sign UP -->
        <form id="signup" autocomplete="on" class="spec" ?on="${ this._sign === false }">
          <ul>
            <li class="inpat">
              <label><input   id="newEmail"         type="email"      >Email</label>
              <label><input   id="newPassword"      type="password"   >Password</label>
              <label><input   id="verifyEmail"      type="email"      >Verify Email</label>
              <label><input   id="veriftPassword"   type="password"   >Verify Password</label>
            </li>
            <li><button id="newUser" class="action-button">Sign up</button></li>
          </ul>
        </form>

        </div>
  
        <!-- Logged IN -->
        <div class="spec setLog" ?on="${ this._log === true }">
          <slot></slot>
          <p><a href="/settings">Settings</a></p>
          <p><a id="leave" aria-label="log out">log out</a></p>
        </div>
  
      </div>
      `;
    }
    
    // Sign IN
    private _signIn() {
      // Prevent Form's Page Refresh
      const a : any = this.shadowRoot!.getElementById('logs');
      a.addEventListener('click', (e:any) => { e.preventDefault(); });
      
      const email : any       = this.shadowRoot!.getElementById('txtEmail');
      const password : any    = this.shadowRoot!.getElementById('txtPassword');

      if (email.length < 4) { alert('Please enter an email address.'); return; }
      if (password.length < 4) { alert('Please enter a password.'); return; }

      // Sign IN with email and password
      signIn(email.value, password.value);
    }
  
    // Sign UP.
    private _signUp() {
      const email : any = this.shadowRoot!.getElementById('newtEmail');
      const pass : any = this.shadowRoot!.getElementById('newPassword');

      if (email.length < 4) { alert('Please enter an email address.'); return; }
      if (pass.length < 4)  { alert('Please enter a password.'); return; }

      // Sign UP with email and password.
      signUp(email.value, pass.value);
  
  }

}

declare global {
  interface HTMLElementTagNameMap {
      'user-drawer': UserDrawer;
  }
}