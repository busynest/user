import { CSSResultArray, html, LitElement }   from 'lit';
import { customElement, property, state }     from 'lit/decorators.js';
import { connect }                            from 'pwa-helpers/connect-mixin';
import { store, AppState }                    from '../../store';

import { authStyles }   from './css/auth';
import { linkStyle }    from './css/link';
import { lineStyle }    from './css/paragraph'; 
import { animation }    from '../css/animation'; 

import { listStyle }    from '../form/css/list';

import '../form/login';
import '../form/signup';
import { tapStyle } from '../css/tap';
import { applyFirebaseConfig } from '../../firebase/attribute';

@customElement('user-login')
export class UserLogin extends connect(store)(LitElement) {

  /** @attr subscribe */
  @property({type:Boolean, attribute: true, reflect: true}) public subscribe = false; // Drawer State
  
  @state() private _name        = "";
  @state() private _log         = false; // Login State
  @state() private _sign        = false; // Sign-up State
  
  constructor() { super(); }

  override connectedCallback(): void {
    applyFirebaseConfig(this);
    super.connectedCallback();
  }

  stateChanged(state: AppState) {
    this._name        = state.backend!.name;        // User Name
    this._log         = state.frontend!.login;      // Logged in-out State
    this._sign        = state.frontend!.registerTwo;   // Sign-up State - register
  }

  // protected firstUpdated() { }

  static get styles(): CSSResultArray { return [
    authStyles,
    linkStyle,
    lineStyle,
    listStyle,
    animation,
    tapStyle
  ] };

  protected render() {
    return html`

    <section class="service">

      <header>
        <h3>${this._log ? this._name : this._sign === this.subscribe ? 'Login' : 'Subscribe'}</h3>
      </header>

      <!-- Logged-out State -->
      <div
        class=          "spec"
        ?on=            "${ this._log === false }">

        <div class=     "wrapper">
          <div class=   "inner">

            <!-- Required - subscribe chooses the open form -->
            <form-login
              source=       "page"
              class=        "content ${ this._sign === this.subscribe ? 'opened' : 'closed' } "></form-login>

            <!-- Sign-up State -->
            <form-signup
              source=       "page"
              class=        "content ${ !this._sign === this.subscribe ? 'opened' : 'closed' }"></form-signup>

          </div>
        </div>

      </div>

      <!-- Logged-in State -->
      <div
        class=          "spec setLog"
        ?on=            "${ this._log === true }">

          <slot name="content"></slot>
          
      </div>

    </section>

    `;
  }

}

declare global {
  interface HTMLElementTagNameMap {
      'user-login': UserLogin;
  }
}

/*

\?on="\${ true === this._sign \? !this.subscribe \: this.subscribe }"
\?on="\${ false === this._sign \? !this.subscribe \: this.subscribe }"

*/