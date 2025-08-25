import { css, CSSResultArray, html, LitElement }                   from 'lit';
import { customElement, state }               from 'lit/decorators.js';
import { connect }                            from 'pwa-helpers/connect-mixin.js';
import { store, AppState }                    from '../../store';
import { iconStyles }                         from './css/icon';
import { toggleSign }                         from '../../redux/frontend';
// import { faceIcon }                           from '../../css/svg';

@customElement('user-icon')
export class UserIcon extends connect(store)(LitElement) {

  @state() private _user = false;
  @state() private _photoURL = '';
  // @state() private _sign = false;

  constructor() { super(); }

  protected firstUpdated() {
    this.shadowRoot!.querySelector('button')!.addEventListener('click', () => {
      console.log('logged-in: ',this._user);
      store.dispatch(toggleSign());
    } );
  }
  
  stateChanged(state: AppState) {
    this._user        = state.frontend!.login;
    this._photoURL    = state.backend!.photoURL;
    // this._sign        = state.frontend!.register;
  }  

  static get styles():CSSResultArray { return [
    iconStyles,
    css`

      :host { margin: auto; display: grid; }

    ` ] }
  
  protected render() {
    return html`

      <button
        class="${this._user ? 'icon' : 'login'}"
        aria-label="login">
        
        ${ this._user ? html`
       <!--   <div
            class   = "iconArea"> -->
            <input
              type    = "image"
              class   = "userImage"
              alt     = "Login"
              height  = "38px"
              width   = "38px"
              src     = "${this._photoURL}">
       <!--   </div> -->
          ` : html`<slot></slot>` }

      </button>

    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
      'user-icon': UserIcon;
  }
}

/*
<!--
         -->
<!--
        \${ this._user
          \? html\`
          <div
            class   = "iconArea">
            <input
              type    = "image"
              class   = "userImage"
              alt     = "Login"
              height  = "32px"
              width   = "32px"
              src     = "\${this._photoURL}"><!-- id = "image" 
          </div>
          \`
          \: faceIcon }-->
*/