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

@customElement('user-settings')
export class UserSettings extends connect(store)(LitElement) {

  /** @attr emptyArtwork */
  @property({type: String, reflect: true}) public empty = '';

  @state() private profileTopic = '';
  @state() private name = '';

  constructor() { super(); }

  protected firstUpdated() {

    /* Form Default */
    const forms = this.querySelectorAll('form')!
    forms.forEach( item => {
      item.preventDefault();
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

  stateChanged(state: AppState) {
    this.profileTopic   = state.frontend!.settings;       // Page String
    this.name           = state.backend!.name;            // Username
  }

  static get styles():CSSResultArray { return [
    navigation,
    listStyle,
    animation,
    css`

      :host {
        display:          grid;
        background-color: var(--pwa_settings_background, white);
      }

      form {
        box-sizing:       border-box;
        display:          grid;
        border:           0;
      }

      .pageTitle { margin: 0; }

      h2 {
        color:            var(--pwa_section_header, black);
        text-align:       center;
        text-shadow:      1px 1px 2px black, 0 0 15px grey, 0 0 5px #fff;
        
        border-bottom:    2px solid var(--pwa_divider, black);

        margin:           0;
        padding:          16px 0;
      }

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
      <nav>

        <ul>

          <li>
            <button
              value="profile"
              ?on="${ this.profileTopic === 'profile'}">Icon
            </button>
          </li>

          <li>
            <button
              value="verification"
              ?on="${ this.profileTopic === 'verification'}">Profile
            </button>
          </li>

          <li>
            <button 
              value="password"
              ?on="${ this.profileTopic === 'password'}">Password
            </button>
          </li>

          <li>
            <button
              value="delete"
              ?on="${ this.profileTopic === 'delete'}">Delete
            </button>
          </li>

        </ul>

      </nav>

      
      <div class=     "wrapper">
        <div class=   "inner">


          <!-- Page 1: Profile -->
          <section
            class="content ${ this.profileTopic === 'profile' ? 'opened' : 'closed'}">

            <!-- Display Username -->
            <h2>${this.name}</h2>

            <!-- Custom Image Element - Display / Upload -->
            <contact-photo emptyArtwork="${this.empty}"></contact-photo>

          </section>
          
          <!-- Page 2: Verification -->
          <section
            class="content ${ this.profileTopic === 'verification' ? 'opened' : 'closed'}">

            <!-- Page Title -->
            <h2>Contact Information</h2>

            <!-- Custom - Username -->
            <input-name></input-name>

            <!-- Custom - Email -->
            <contact-email></contact-email>

          </section>

          <!-- Page 3: Password -->
          <section
            class="content ${ this.profileTopic === 'password' ? 'opened' : 'closed'}">

            <!-- Page Title -->
            <h2>Password</h2>

            <!-- Custom - Password -->
            <input-password></input-password>

          </section>

          <!-- Page 4: Delete -->
          <section
            class="content ${ this.profileTopic === 'delete' ? 'opened' : 'closed'}">

            <!-- Page Title -->
            <h2>Delete Account</h2>

            <!-- Custom - Delete -->
            <delete-user></delete-user>

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



