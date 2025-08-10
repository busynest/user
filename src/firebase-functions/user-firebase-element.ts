import { html, LitElement, css  }       from 'lit';
import { customElement, state }         from 'lit/decorators.js';
import { connect }                      from 'pwa-helpers/connect-mixin.js';
import { store, AppState }              from '../store';
import { userStyles }                   from '../styles';
import { openSignX, setImageX }         from '../settings/user-redux';
import { auth, profileURL }             from './user-firebase';
import { onAuthStateChanged }           from 'firebase/auth';


// Firebase Authentication Software

// - Modular and Global Namespace
// - Custom Element to input data for properties
// - Informattion Sharing

// Purpose: To initialize firebase connection via SDK - Software Development Kit

// Step 1: Initialize account information into place of firebase connection
// Step 2: Established connection indicator
// Step 3: Create Firebase Objects / NameSpaces - Transferred Representational States





@customElement('firebase-element')
export class FirebaseElement extends connect(store)(LitElement) {

  @state() private _user = false;
  @state() private _photoURL = '';

  constructor() {
    super();
  }

  protected firstUpdated() {
    this.shadowRoot!.getElementById('subscribe')!.addEventListener('click', () => { store.dispatch(openSignX()) } );

    onAuthStateChanged( auth, (firebaseUser) => {
      if (firebaseUser) { /* INCLUDE */ this._photoURL = profileURL(); }
      else              { /* EXCLUDE */ }
      store.dispatch( setImageX( this._photoURL ) );
    });
  }
  
  stateChanged(state: AppState) {
    this._user        = state.pwa_auth!.currentUser;
    this._photoURL    = state.pwa_auth!.photoURL;
  }  


  static get styles() {
    return [
      userStyles,
      css`
     
        `
    ]}
  
  protected render() {
    return html`


    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
      'firebase-element': FirebaseElement;
  }
}