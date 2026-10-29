import { css, CSSResultArray, html, LitElement }          from 'lit';
import { state, customElement, property }           from 'lit/decorators.js';
import { connect }                        from 'pwa-helpers/connect-mixin.js';
import { store, AppState }                from '../../store';
import { navigateAuth }                   from '../../redux/frontend';
import { navigation }                     from './css/navigation';
import './input/uploader';
import './input/name';
import './input/email';
import './input/password';
import './input/delete';
import { listStyle } from '../form/css/list';
import { animation } from '../css/animation';
import { tapStyle } from '../css/tap';
import { applyFirebaseConfig } from '../../firebase/attribute';

@customElement('user-settings')
export class UserSettings extends connect(store)(LitElement) {

  /** @attr emptyArtwork */
  @property({type: String, reflect: true}) public empty = '';

  @state() private profileTopic = '';
  @state() private name = '';

  constructor() { super(); }

  override connectedCallback(): void {
    applyFirebaseConfig(this);
    super.connectedCallback();
  }

  protected firstUpdated() {

    /* Required - cancel native form submit */
    this.addEventListener('submit', (event: Event) => {
      event.preventDefault();
    });

    /* 1 */
    this.shadowRoot!.querySelector('button[value=profile]')!.addEventListener('click', () => {
      store.dispatch(navigateAuth('profile'));
    } );
    
    /* 2 */
    this.shadowRoot!.querySelector('button[value=verification]')!.addEventListener('click', () => {
      store.dispatch(navigateAuth('verification'));
    } );
    
    /* 3 */
    this.shadowRoot!.querySelector('button[value=password]')!.addEventListener('click', () => {
      store.dispatch(navigateAuth('password'));
    } );
    
    /* 4 */
    this.shadowRoot!.querySelector('button[value=delete]')!.addEventListener('click', () => {
      store.dispatch(navigateAuth('delete'));
    } );

  }

  // Required - move across the four tabs from the keyboard
  private onTabKey(event: KeyboardEvent) {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
    const order = ['profile', 'verification', 'password', 'delete'];
    const index = order.indexOf(this.profileTopic);
    const step = event.key === 'ArrowRight' ? 1 : -1;
    const next = order[(index + step + order.length) % order.length];
    store.dispatch(navigateAuth(next));
    this.updateComplete.then(() => {
      this.shadowRoot?.querySelector<HTMLButtonElement>(`button[value="${next}"]`)?.focus();
    });
  }

  stateChanged(state: AppState) {
    this.profileTopic   = state.frontend!.settings;       // Page String
    this.name           = state.backend!.name;            // Username
  }

  static get styles():CSSResultArray { return [
    navigation,
    listStyle,
    animation,
    tapStyle,
    css`

      :host {
        display:          grid;
        background-color: var(--pwa_settings_background_color, #fffdf8);
      }

      form {
        box-sizing:       border-box;
        display:          grid;
        border:           0;
      }

      .pageTitle { margin: 0; }

      /* up to 576 pixels */
      @media only screen and (max-width: 576px) {
        h2 {
          font-size: medium;
        }
      }

    `
    ]; }

  protected render() {
    return html`
    
      <!-- Page Menu -->
      <nav aria-label="Account" @keydown="${this.onTabKey}">

        <ul role="tablist">

          <li>
            <button
              type="button"
              role="tab"
              part="tab"
              value="profile"
              aria-selected="${this.profileTopic === 'profile'}"
              ?on="${ this.profileTopic === 'profile'}">Icon
            </button>
          </li>

          <li>
            <button
              type="button"
              role="tab"
              part="tab"
              value="verification"
              aria-selected="${this.profileTopic === 'verification'}"
              ?on="${ this.profileTopic === 'verification'}">Profile
            </button>
          </li>

          <li>
            <button
              type="button"
              role="tab"
              part="tab"
              value="password"
              aria-selected="${this.profileTopic === 'password'}"
              ?on="${ this.profileTopic === 'password'}">Password
            </button>
          </li>

          <li>
            <button
              type="button"
              role="tab"
              part="tab"
              value="delete"
              aria-selected="${this.profileTopic === 'delete'}"
              ?on="${ this.profileTopic === 'delete'}">Delete
            </button>
          </li>

        </ul>

      </nav>

      
      <div class=     "wrapper">
        <div class=   "inner">


          <!-- Page 1: Profile -->
          <section
            part="panel"
            role="tabpanel"
            aria-hidden="${this.profileTopic === 'profile' ? 'false' : 'true'}"
            ?inert="${this.profileTopic !== 'profile'}"
            class="content ${ this.profileTopic === 'profile' ? 'opened' : 'closed'}">

            <!-- Display Username -->
            <h2>${this.name}</h2>

            <!-- Custom Image Element - Display / Upload -->
            <contact-photo emptyArtwork="${this.empty}" exportparts="progress, file, preview"></contact-photo>

          </section>
          
          <!-- Page 2: Verification -->
          <section
            part="panel"
            role="tabpanel"
            aria-hidden="${this.profileTopic === 'verification' ? 'false' : 'true'}"
            ?inert="${this.profileTopic !== 'verification'}"
            class="content ${ this.profileTopic === 'verification' ? 'opened' : 'closed'}">

            <!-- Page Title -->
            <h2>Contact Information</h2>

            <!-- Custom - Username -->
            <input-name exportparts="name, submit: name-submit"></input-name>

            <!-- Custom - Email -->
            <contact-email exportparts="email, submit: email-submit"></contact-email>

          </section>

          <!-- Page 3: Password -->
          <section
            part="panel"
            role="tabpanel"
            aria-hidden="${this.profileTopic === 'password' ? 'false' : 'true'}"
            ?inert="${this.profileTopic !== 'password'}"
            class="content ${ this.profileTopic === 'password' ? 'opened' : 'closed'}">

            <!-- Page Title -->
            <h2>Password</h2>

            <!-- Custom - Password -->
            <input-password exportparts="password, verify, submit: password-submit"></input-password>

          </section>

          <!-- Page 4: Delete -->
          <section
            part="panel"
            role="tabpanel"
            aria-hidden="${this.profileTopic === 'delete' ? 'false' : 'true'}"
            ?inert="${this.profileTopic !== 'delete'}"
            class="content ${ this.profileTopic === 'delete' ? 'opened' : 'closed'}">

            <!-- Page Title -->
            <h2>Delete Account</h2>

            <!-- Custom - Delete -->
            <delete-user exportparts="submit: delete"></delete-user>

          </section>

        </div>
      </div>

    `
  }
  
}
 
declare global {
  interface HTMLElementTagNameMap {
      'user-settings': UserSettings;
  }
}



