import { CSSResultArray, html, LitElement }   from 'lit';
import { customElement, property, state }     from 'lit/decorators.js';
import { connect }                            from 'pwa-helpers/connect-mixin.js';
import { store, AppState }                    from '../../store';
import { iconStyles }                         from './css/icon';
import { toggleSign }                         from '../../redux/frontend';
// import { faceIcon }                           from '../../css/svg';

@customElement('user-icon')
export class UserIcon extends connect(store)(LitElement) {
  
  /** @attr subscribe */
  @property({type: Boolean, reflect: true}) public subscribe = false;

  /** @attr emptyArtwork */
  @property({type: String, reflect: true}) public emptyArtwork = '';

  @state() private _user = false;
  @state() private _photoURL = '';
  // @state() private _sign = false;

  constructor() { super(); }

  protected firstUpdated() {
    this.shadowRoot!.querySelector('.toggles')!.addEventListener('click', () => {
      // console.log('logged-in: ',this._user);
      store.dispatch(toggleSign());
    } );
  }
  
  stateChanged(state: AppState) {
    this._user        = state.frontend!.login;
    this._photoURL    = state.backend!.photoURL;
    // this._sign        = state.frontend!.register;
  }  

  static get styles():CSSResultArray { return [ iconStyles ] }
  
  protected render() {
    return html`

      <!-- two classes: icon / login -->
      <button
        class="${this._user ? 'icon' : 'login'} toggles"
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
              src     = "${this._photoURL ? this._photoURL : this.emptyArtwork}">
       <!--   </div> -->
          ` : this.subscribe ? 'Subscribe' : 'Login' }

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