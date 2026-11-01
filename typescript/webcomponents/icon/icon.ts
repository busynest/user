import { css, CSSResultArray, html, LitElement }   from 'lit';
import { customElement, property, state }     from 'lit/decorators.js';
import { connect }                            from 'pwa-helpers/connect-mixin.js';
import { store, AppState }                    from '../../store.js';
import { iconStyles }                         from './css/icon.js';
import { toggleSign }                         from '../../redux/frontend.js';
import { applyFirebaseConfig }                from '../../firebase/attribute.js';
import { lettersFor }                         from '../form/letters.js';
// import { faceIcon }                           from '../../css/svg';

@customElement('user-icon')
export class UserIcon extends connect(store)(LitElement) {
  
  /** @attr subscribe */
  @property({type: Boolean, reflect: true}) public subscribe = false;

  /** @attr empty */
  @property({type: String, reflect: true}) public empty = '';

  @state() private _user = false;
  @state() private _photoURL = '';
  @state() private _name = '';
  @state() private _email = '';
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
    this._name        = state.backend!.name;
    this._email       = state.backend!.email;
    // this._sign        = state.frontend!.register;
  }  

  static get styles():CSSResultArray { return [ iconStyles, css`:host { border-radius: 10px; }` ] }
  
  protected render() {
    return html`

      <!-- two classes: icon / login -->
      <button
        type="button"
        part="button"
        class="${this._user ? 'icon' : 'login'} toggles"
        aria-label="${this._user ? 'Account' : this.subscribe ? 'Subscribe' : 'Login'}">
        
        ${ this._user ? this.face() : this.subscribe ? 'Subscribe' : 'Login' }

      </button>

    `;
  }

  // Required - photo, else initials. empty is only for an account with neither.
  private face() {
    if (this._photoURL) {
      return html`<img class="userImage" part="photo" alt="" src="${this._photoURL}">`;
    }
    const letters = lettersFor(this._name, this._email);
    if (letters) {
      return html`<span class="initials" part="initials" aria-hidden="true">${letters}</span>`;
    }
    if (this.empty) {
      return html`<img class="userImage" part="photo" alt="" src="${this.empty}">`;
    }
    return html`<span class="initials" part="initials" aria-hidden="true">?</span>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
      'user-icon': UserIcon;
  }
}