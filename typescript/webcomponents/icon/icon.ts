import { css, CSSResultArray, html, LitElement }   from 'lit';
import { customElement, property, state }     from 'lit/decorators.js';
import { connect }                            from 'pwa-helpers/connect-mixin.js';
import { store, AppState }                    from '../../store';
import { iconStyles }                         from './css/icon';
import { toggleSign }                         from '../../redux/frontend';
import { applyFirebaseConfig }                from '../../firebase/attribute';
// import { faceIcon }                           from '../../css/svg';

@customElement('user-icon')
export class UserIcon extends connect(store)(LitElement) {
  
  /** @attr subscribe */
  @property({type: Boolean, reflect: true}) public subscribe = false;

  /** @attr empty */
  @property({type: String, reflect: true}) public empty = '';

  @state() private _user = false;
  @state() private _photoURL = '';
  // @state() private _sign = false;

  constructor() { super(); }

  override connectedCallback(): void {
    applyFirebaseConfig(this);
    super.connectedCallback();
  }

  protected firstUpdated() {
    this.shadowRoot!.querySelector('.toggles')!.addEventListener('click', () => {
      store.dispatch(toggleSign());
    } );
  }
  
  stateChanged(state: AppState) {
    this._user        = state.frontend!.login;
    this._photoURL    = state.backend!.photoURL;
    // this._sign        = state.frontend!.register;
  }  

  static get styles():CSSResultArray { return [ iconStyles, css`:host { border-radius: 10px; }` ] }
  
  protected render() {
    return html`

      <!-- two classes: icon / login -->
      <button
        type="button"
        class="${this._user ? 'icon' : 'login'} toggles"
        aria-label="${this._user ? 'account' : this.subscribe ? 'subscribe' : 'login'}">
        
        ${ this._user ? html`
            <img
              class="userImage"
              alt=""
              src="${this._photoURL ? this._photoURL : this.empty}">
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