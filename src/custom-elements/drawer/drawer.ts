import { css, CSSResultArray, html, LitElement }               from 'lit';
import { customElement, property, state }           from 'lit/decorators.js';
import { connect }                        from 'pwa-helpers/connect-mixin';
import { store, AppState }                from '../../store';
import { close }                          from '../../css/svg';
import { show }                           from '../../css/toggle';

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
  
 /** @attr register */
  @property({type:Boolean, attribute: true, reflect: true}) public register = false; // Drawer State
  
  @state() private _name        = ""; // Drawer State
  @state() private _log         = false; // Login State
  @state() private _sign        = false; // Sign-up State

  constructor() {
    super();
  }

  stateChanged(state: AppState) {
    this._name        = state.backend!.name;        // User Name
    this.drawer       = state.frontend!.drawer;     // Drawer State
    this._log         = state.frontend!.login;      // Logged in-out State
    this._sign        = state.frontend!.register;   // Sign-up State
  }

  protected firstUpdated() {

    this.shadowRoot!.querySelector('.close')!.addEventListener('click', () => {
       store.dispatch(toggleSign());
      } );

    this.shadowRoot!.querySelector('.leave')!.addEventListener('click', () => {
        if (this._log) { logOut() }
        store.dispatch( toggleSign() );
      } );
      
  }

  static get styles(): CSSResultArray { return [
    show,
    drawerStyle,
    exitStyle,
    linkStyle,
    lineStyle,
    listStyle,
    css`
    
      :host {
        z-index:                2;
        position:               fixed;
        top:                    0;
        left:                   0;
        right:                  0;
        overflow:               hidden;

        transition-property:    max-height;
        transition-duration:    1.4s;
        height:                 auto;
        max-height:             0px;
        transition:             max-height 1.5s ease-out;

        display:                block;
        padding-top:            env(safe-area-inset-top);
      }

        /*visibility:             hidden;
        /*will-change:            transform;
        transform:              translate3d(0, -150%, 0);
        transition-property:    visibility, transform;*/

        /*transform:              translate3d(0, 0, 0);*/

      :host([drawer]) {       
        transition-duration:    1.4s;
        max-height:             100%;
        transition:             max-height 1.5s ease-out;
      }

    `

  ] };

  protected render() {
    return html`

    <!-- Drawer Wrapper -->
    <section
      class="userDrawer ${this.drawer ? 'opened' : 'closed'}">

      <!-- Exit Button -->
      <header class="exit">
        <div></div>
        <h3>${this._log ? this._name + " : Logged-in" : "SUBSCRIBE" }</h3>
        <button class="close">${close}</button>
      </header>

      <!-- Logged-out State -->
      <div
        class="spec"
        ?on="${ this._log === false }">

        <!-- Log-in State -->
        <user-log-in
          class="spec"
          ?on="${ true === this._sign ? !this.register : this.register }"></user-log-in>

        <!-- Sign-up State -->
        <user-sign-up
          class="spec"
          ?on="${ false === this._sign ? !this.register : this.register }"></user-sign-up>

      </div>

      <!-- Logged-in State -->
      <div
        class="spec setLog"
        ?on="${ this._log === true }">

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
