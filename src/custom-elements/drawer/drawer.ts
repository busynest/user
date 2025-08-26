import { css, CSSResultArray, html, LitElement }               from 'lit';
import { customElement, property, state }           from 'lit/decorators.js';
import { connect }                        from 'pwa-helpers/connect-mixin';
import { store, AppState }                from '../../store';
import { close }                          from '../../css/svg';
import { show }                           from '../../css/toggle';

import { visibility }   from './css/visibility';
import { drawerStyle }  from './css/drawer';
import { exitStyle }    from './css/exit';
import { linkStyle }    from './css/link';
import { lineStyle }    from './css/paragraph';
import { listStyle }    from '../../css/form/list';

import { toggleSign }   from '../../redux/frontend'; 
import { logOut }       from '../../start';

import './input/login';
import './input/sign-up';

@customElement('user-drawer')
export class UserDrawer extends connect(store)(LitElement) {

  /** @attr url */
  @property({type: String, reflect: true}) private url = '';

  /** @attr drawer */
  @property({type:Boolean, attribute: true, reflect: true}) public drawer = false; // Drawer State
  
  @state() private _name        = ""; // Drawer State
  @state() private _log         = false; // Login State
  @state() private _sign        = false; // Sign-up State

  constructor() { super(); }

  protected firstUpdated() {

    this.shadowRoot!.querySelector('.close')!.addEventListener('click', () => {
       store.dispatch(toggleSign())
      } );

    this.shadowRoot!.querySelector('.leave')!.addEventListener('click', () => {
        if (this._log) { logOut() }
        store.dispatch( toggleSign() ); 
      } );
      
  }

  stateChanged(state: AppState) {
    this._name        = state.backend!.name;        // User Name
    this.drawer       = state.frontend!.drawer;     // Drawer State
    this._log         = state.frontend!.login;      // Logged in-out State
    this._sign        = state.frontend!.register;   // Sign-up State
  }

  static get styles(): CSSResultArray { return [
    show,
    visibility,
    drawerStyle,
    exitStyle,
    linkStyle,
    lineStyle,
    listStyle,
    css`
    
      :host {
        position:               fixed;
        top:                    0;
        left:                   0;
        right:                  0;
        visibility:             hidden;
        will-change:            transform;
        transform:              translate3d(0, -150%, 0);
        transition-property:    visibility, transform;
        /*transition-duration:    1.4s;*/
        display:                block;
      }

      :host([drawer]) {       
        transition-duration:    1.4s;
        visibility:             visible;
        transform:              translate3d(0, 0, 0);
      }

    `

  ] };

  protected render() {
    return html`

    <!-- Drawer Wrapper -->
    <div
      class=" userDrawer"
      ?on="${ this.drawer === true }">

      <!-- Exit Button -->
      <div class="exit">
        <div></div>
        <h3>${this._log ? this._name + " : Logged-in" : "SUBSCRIBE" }</h3>
        <button class="close">${close}</button>
      </div>

      <!-- Logged-out State -->
      <div
        class="spec"
        ?on="${ this._log === false }">

        <!-- Log-in State -->
        <user-log-in
          class="spec"
          ?on="${ this._sign === true }"></user-log-in>

        <!-- Sign-up State -->
        <user-sign-up
          class="spec"
          ?on="${ this._sign === false }"></user-sign-up>

      </div>

      <!-- Logged-in State -->
      <div
        class="spec setLog"
        ?on="${ this._log === true }">

          <p><a href="${this.url}">Settings</a></p>

          <p><a class="leave" aria-label="log out">log out</a></p>
          
      </div>

    </div>

    `;
  }

}

declare global {
  interface HTMLElementTagNameMap {
      'user-drawer': UserDrawer;
  }
}
