
//@ts-check
import { html, LitElement }             from 'lit-element';
import { connect }                      from 'pwa-helpers/connect-mixin.js';
import { store }                        from '../store';
// import { store }                        from '../../../../src/store';
import { userStyles, close }            from './styles';
import { User }                         from './styles-drawer';
import { closeSign }                    from './user-action'; 
import { logOut, anon, google  }        from './user-functions';
import  user                            from './user-reducer';
store.addReducers({
  user
});
export class UserDrawer extends connect(store)(LitElement) {
    static get properties() {
      return {
        _log:             { type: Boolean },
        _subscribe:       { type: Boolean },
        _user:            { type: String }
      };
    }
    
    constructor() {
      super();
    }

    firstUpdated() {
      this.shadowRoot.getElementById('close')         .addEventListener('click', () => { store.dispatch(closeSign(false)) } );
      this.shadowRoot.getElementById('or')            .addEventListener('click', () => { anon() } );
      this.shadowRoot.getElementById('googleSignIn')  .addEventListener('click', () => { google() } );
      this.shadowRoot.getElementById('leave')         .addEventListener('click', () => { logOut() } );
      this.shadowRoot.getElementById('log')           .addEventListener('click', () => { this._signIn() } );
    }

    stateChanged(state) {
      this._subscribe   = state.user.snackState;
      this._log         = state.user.currentUser;
      this._user        = state.user.setUser;
    }

    _close() { closeSign(false) }
  
    _signIn() {
      const a = this.shadowRoot.getElementById('logs');
      a.addEventListener('click', e => { e.preventDefault(); });
      // Prevent Form's Page Refresh
      const email       = this.shadowRoot.getElementById('txtEmail').value;
      const password    = this.shadowRoot.getElementById('txtPassword').value;
      firebase.auth().signInWithEmailAndPassword(email, password).catch( (error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
    }
  
    _signUp() {
      const email = this.shadowRoot.getElementById('txtEmail').value;
      const pass  = this.shadowRoot.getElementById('txtPassword').value;
      if (email.length < 4) {
        alert('Please enter an email address.');
        return;
      }
      if (pass.length < 4) {
        alert('Please enter a password.');
        return;
      }
      firebase.auth().createUserWithEmailAndPassword(email, pass).catch( (error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
  
      });
    }
  
    static get styles() {
      return [
        userStyles,
        User
      ]}
  
    render() {
      return html`
  
      <!-- Login Wrapper -->
      <div class="visibility userDrawer" ?on="${ this._subscribe === true }" id="logs">

        <div class="exit">
          <div></div>
          <h3 id="or">${this._log ? html`ACCOUNT` :  html`SUBSCRIBE` }</h3>
          <button id="close" class="sign-right">${close}</button>
        </div>

        <div
          class="spec"
          ?on="${ this._log === false }"
          id="logForm"
          autocomplete="on">

          <p><a href="/subscribe">create a new account</a></p>
  
          <p><button     id="googleSignIn" class="google">
            <span     class="icon"></span>
            <span     class="buttonText">Sign in with Google</span>
          </button></p>

          <form>
          <ul>
            <li class="inpat">
              <label><input   id="txtEmail"      type="email"      placeholder=""  >Email</label>
              <label><input   id="txtPassword"   type="Password"   placeholder=""  >Password</label>
            </li>
            <li><button id="log" class="action-button">Sign in</button></li>
          </ul>
          </form>

        </div>
  
        <!-- Logged IN -->
        <div class="spec setLog" ?on="${ this._log === true }">
          <p><a href="/settings">Profile Settings</a></p>
          <p><a href="/feedback">Send Feedback</a></p>
          <p><a id="leave" aria-label="log out">log out</a></p>
        </div>
  
      </div>
      `;
    }
  }
  window.customElements.define('user-drawer', UserDrawer);

  /*
  constructor() {
    super();
      // Stamp the template.
      let shadowRoot = this.attachShadow({mode: 'open'});
      this.shadowRoot.appendChild(document.importNode(template.content, true));
      // Cache some elements so that you don't qsa all the time.
      this._counter = shadowRoot.querySelector('counter-element');
  }

  _stateChanged(state) {
    // Update the UI.
    this._clicksSpan.textContent = this._counter.clicks = state.counter.clicks;
    this._valueSpan.textContent = this._counter.value = state.counter.value;
    this._didLoadSpan.textContent = state.lazy ? state.lazy.didLoad : 'undefined';
  }
  */
