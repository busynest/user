import { CSSResultArray, html, LitElement }   from 'lit';
import { customElement, property, state }     from 'lit/decorators.js';
import { connect }                            from 'pwa-helpers/connect-mixin';

import { store, AppState }  from '../../store';

import { close }            from '../css/svg';
import { show }             from '../css/toggle';

import { listStyle }        from '../form/css/list';

import { drawerStyle }      from './css/drawer';
import { exitStyle }        from './css/exit';
import { linkStyle }        from './css/link';
import { lineStyle }        from './css/paragraph';

import { toggleSign }       from '../../redux/frontend'; 
import { logOut }           from '../../firebase/interface';

import '../form/login';
import '../form/signup';
import { animation } from '../css/animation';

@customElement('user-drawer')
export class UserDrawer extends connect(store)(LitElement) {

  /** @attr url */
  @property({type: String, reflect: true}) private url = '';

  /** @attr drawer */
  @property({type:Boolean, attribute: true, reflect: true}) public drawer = false; // Drawer State
  
 /** @attr subscribe */
  @property({type:Boolean, attribute: true, reflect: true}) public subscribe = false; // Drawer State
  
  @state() private name         = "";     // String Username
  @state() private user         = false;  // True user is logged-in, false, user is logged-out, state
  @state() private signup       = false;  // True sign-up, false log-in, State
  
  constructor() { super(); }

  stateChanged(state: AppState) {
    this.name         = state.backend!.name;            // User Name
    this.drawer       = state.frontend!.drawer;         // Drawer State
    this.user         = state.frontend!.login;          // Logged in-out State
    this.signup       = state.frontend!.registerOne;    // Sign-up State
  }

  protected firstUpdated() {

    this.shadowRoot!.querySelector('.close')!.addEventListener('click', () => {
       store.dispatch(toggleSign());
      } );

    this.shadowRoot!.querySelector('.leave')!.addEventListener('click', () => {
        if (this.user) { logOut() }
        store.dispatch( toggleSign() );
      } );
      
  }

  static get styles(): CSSResultArray { return [
    show,
    animation,
    drawerStyle,
    exitStyle,
    linkStyle,
    lineStyle,
    listStyle
  ] };

  protected render() {
    return html`

    <!-- Drawer Wrapper -->
    <section
      class="userDrawer ${this.drawer ? 'out' : 'in'}">

      <!-- Exit Button -->
      <header class="exit">
        <div></div>
        <h3>${ this.user === false ? this.signup === this.subscribe ? `Login` : `Subscribe` : this.name }</h3>
        <button class="close">${close}</button>
      </header>

      <!-- Logged-out State -->
      <div
        class="spec ${this.drawer ? 'spec-out' : 'spec-in'}"
        ?on="${ this.user === false }">

        <div class=     "wrapper">
          <div class=   "inner">

            <!-- Log-in State -->
            <form-login
              source="drawer"
              class="content ${
                this.signup        ===     /* If true, sign-up state */
                this.subscribe    ?       /* If true, subscribe state */
                'opened'          :
                'closed'
              } ">
            </form-login>

            <!-- Sign-up State -->
            <form-signup
              source="drawer"
              class="content ${ !this.signup === this.subscribe ? 'opened' : 'closed' } ">
            </form-signup>

          </div>
        </div>

      </div>

      <!-- Logged-in State -->
      <div
        class="spec setLog"
        ?on="${ this.user === true }">

          <p><a href="${this.url}">Settings</a></p>

          <p><a class="leave" aria-label="log out">log out</a></p>
          
      </div>

    </section>

    `;
  }

}

declare global {
  interface HTMLElementTagNameMap {
      'user-drawer': UserDrawer;
  }
}

/*

\?on="\${ true === this._sign \? !this.subscribe \: this.subscribe }"
\?on="${ false === this._sign \? !this.subscribe \: this.subscribe }"


     <h3>\${
          this._log       \?     /* If logged-in state is true 
          this._name      \:     /* Show username 
          true            \===    /* else logged-out, Show if true equals 
          /* this._sign      \===    /*true sign-up state equals 
          this.subscribe  \?     /* If subscribe state is true 
          'Login'         \:     /* Show login txt, else 
          'Subscribe'           /* Show subscribe txt 
          }</h3>

*/