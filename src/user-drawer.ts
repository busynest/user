

/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

// @ts-check

import { html, LitElement, css, customElement, property } from 'lit-element';
import { connect }                      from 'pwa-helpers/connect-mixin.js';
import { store, RootState }             from './store';
import { userStyles, close }            from './styles';
import { User }                         from './styles-drawer';
import { closeSign, signUp }            from './user-action'; 
import { logOut, anon, google  }        from './user-functions';

@customElement('user-drawer')
export class UserDrawer extends connect(store)(LitElement) {

    @property({type: Boolean})
    private _log = false;

    @property({type: Boolean})
    private _subscribe = false;

    @property({type: Boolean})
    private _sign = false;

    constructor() {
      super();
    }

    protected firstUpdated() {
      this.shadowRoot!.getElementById('close')         .addEventListener('click', () => { store.dispatch( closeSign(false) ) } );
      this.shadowRoot!.getElementById('or')            .addEventListener('click', () => { anon() } );
      this.shadowRoot!.getElementById('googleSignIn')  .addEventListener('click', () => { google() } );
      this.shadowRoot!.getElementById('leave')         .addEventListener('click', () => { logOut() } );
      this.shadowRoot!.getElementById('log')           .addEventListener('click', () => { this._signIn() } );
      this.shadowRoot!.getElementById('newUser')       .addEventListener('click', () => { this._signUp() } );
      this.shadowRoot!.getElementById('new')           .addEventListener('click', () => { store.dispatch( signUp() ) } );
    }

    stateChanged(state: RootState) {
      this._subscribe   = state.user!.snackState;
      this._log         = state.user!.currentUser;
      this._sign        = state.user!.register;
      // this.welcome      = state.user.welcome;
    }
  
    private _signIn() {
      const a = this.shadowRoot!.getElementById('logs');
      a.addEventListener('click', e => { e.preventDefault(); });
      // Prevent Form's Page Refresh
      const email       = this.shadowRoot!.getElementById('txtEmail').value;
      const password    = this.shadowRoot!.getElementById('txtPassword').value;
      // @ts-ignore
      firebase.auth().signInWithEmailAndPassword(email, password).catch( (error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
    }
  
    private _signUp() {
      const email = this.shadowRoot!.getElementById('newtEmail').value;
      const pass  = this.shadowRoot!.getElementById('newPassword').value;
      if (email.length < 4) {
        alert('Please enter an email address.');
        return;
      }
      if (pass.length < 4) {
        alert('Please enter a password.');
        return;
      }
      // @ts-ignore
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
        User,
        css`
        :host { 

         }
        `
      ]}
  
    protected render() {
      return html`
  
      <!-- Login Wrapper -->
      <div class="visibility userDrawer" ?on="${ this._subscribe === true }">

        <div class="exit">
          <div></div>
          <h3 id="or">${this._log ? html`ACCOUNT` : html`SUBSCRIBE` }</h3>
          <button id="close" class="sign-right">${close}</button>
        </div>

        <div class="spec" ?on="${ this._log === false }">

          <p><button id="new">create a new account</button></p>
  
          <p><button id="googleSignIn" class="google">
            <span class="icon"></span>
            <span class="buttonText">Sign in with Google</span>
          </button></p>

          <form id="logs" autocomplete="on" class="spec" ?on="${ this._sign === true }">
          <ul>
            <li class="inpat">
              <label><input   id="txtEmail"      type="email"      >Email</label>
              <label><input   id="txtPassword"   type="Password"   >Password</label>
            </li>
            <li><button id="log" class="action-button">Sign in</button></li>
          </ul>
          </form>

        <!-- Sign UP -->
        <form id="signup" autocomplete="on" class="spec" ?on="${ this._sign === false }">
          <ul>
            <li class="inpat">
              <label><input   id="newEmail"         type="email"      >Email</label>
              <label><input   id="newPassword"      type="Password"   >Password</label>
              <label><input   id="verifyEmail"      type="email"      >Verify Email</label>
              <label><input   id="veriftPassword"   type="Password"   >Verify Password</label>
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
  }