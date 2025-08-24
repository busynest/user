import { html, LitElement }               from 'lit';
import { customElement, state }           from 'lit/decorators.js';
import { connect }                        from 'pwa-helpers/connect-mixin';
import { store, AppState }                from '../../store';
import { close }                          from '../../css/svg';
import { show }                           from '../../css/toggle';
import { drawerStyles }                   from '../../css/drawer-styles';
import { signUpAction, toggleSign }       from '../../redux/frontend'; 
import { logOut }                         from '../../start';
import '../drawer/login';
import '../drawer/sign-up';

@customElement('user-drawer')
export class UserDrawer extends connect(store)(LitElement) {

  @state() private _subscribe   = false; // Drawer State
  @state() private _log         = false; // Login State
  @state() private _sign        = false; // Sign-up State

  constructor() { super(); }

  protected firstUpdated() {

    this.shadowRoot!.querySelector('.new')!       .addEventListener('click', () => { store.dispatch(signUpAction())} );
    this.shadowRoot!.querySelector('.close')!     .addEventListener('click', () => { store.dispatch(toggleSign()) } );
    this.shadowRoot!.querySelector('.leave')!     .addEventListener('click', () => { logOut() } );

  }

  stateChanged(state: AppState) {
    this._subscribe   = state.frontend!.drawer;     // Drawer State
    this._log         = state.frontend!.login;      // Logged in-out State
    this._sign        = state.frontend!.register;   // Sign-up State
  }

  static get styles() { return [ show, drawerStyles ] };

  protected render() {
    return html`

    <!-- Drawer Wrapper -->
    <div
      class="visibility userDrawer"
      ?on="${ this._subscribe === true }">

      <!-- Exit Button -->
      <div class="exit">
        <div></div>
        <h3>${this._log ? "ACCOUNT" : "SUBSCRIBE" }</h3>
        <button class="close">${close}</button>
      </div>

      <!-- Logged-out State -->
      <div
        class="spec"
        ?on="${ this._log === false }">

        <!-- Change State -->
        <button
          class="new">${ this._sign ? 'create a new account' : 'sign-in' }</button>

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

        <slot></slot>
        <p><a href="/settings">Settings</a></p>
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
