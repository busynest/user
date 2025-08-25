import { css, html, LitElement }          from 'lit';
import { state, customElement }           from 'lit/decorators.js';
import { connect }                        from 'pwa-helpers/connect-mixin.js';
import { store, AppState }                from '../../store';
import { navigateAuth }                   from '../../redux/frontend';
import { navigation }                     from './css/navigation';
import './input/uploader';
import './input/name';
import './input/email';
import './input/password';
import './input/delete';
import { listStyle } from '../../css/form/list';

@customElement('user-settings')
export class UserSettings extends connect(store)(LitElement) {

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

  static get styles() { return [
    navigation,
    listStyle,
    css`

      /* Button Padding for Border Outline */
      :host {
        margin:           0 3px 0 3px;
        display:          grid;
      }

      /* Page Form */
      form {
        box-sizing:       border-box;
        display:          grid;
        border:           0;
      }

      /* Page Title  */
      .pageTitle { margin: 0; }

      h2 {
        color:            var(--pwa_section_header);
        text-align:       center;
        text-shadow:      1px 1px 2px black, 0 0 15px grey, 0 0 5px #fff;
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
              ?on="${ this.profileTopic === 'profile'}">Profile
            </button>
          </li>

          <li>
            <button
              value="verification"
              ?on="${ this.profileTopic === 'verification'}">Email
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

      <!-- Page 1: Profile -->
      <section ?on="${ this.profileTopic === 'profile' }">

        <!-- Display Username -->
        <h2>${this.name}</h2>

        <!-- Custom Image Element - Display / Upload -->
        <contact-photo></contact-photo>
          
        <!-- Custom - Username -->
        <input-name></input-name>

      </section>
      
      <!-- Page 2: Verification -->
      <section ?on="${ this.profileTopic === 'verification' }">

        <!-- Page Title -->
        <h2>Change E-mail</h2>

        <!-- Custom - Email -->
        <contact-email></contact-email>
        
        <!-- Indicator - Verified -->
        <div class="verified"></div>

      </section>

      <!-- Page 3: Password -->
      <section ?on="${ this.profileTopic === 'password' }">

        <!-- Page Title -->
        <h2>Change Password</h2>

        <!-- Custom - Password -->
        <input-password></input-password>

      </section>

      <!-- Page 4: Delete -->
      <section ?on="${ this.profileTopic === 'delete' }">

        <!-- Page Title -->
        <h2>Delete Account</h2>

        <!-- Custom - Delete -->
        <delete-user></delete-user>

      </section>

    `
  }
  
}
 
declare global {
  interface HTMLElementTagNameMap {
      'user-settings': UserSettings;
  }
}



