
/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

// @ts-check

import { html, LitElement, css }        from 'lit-element';
import { connect }                      from 'pwa-helpers/connect-mixin.js';
import { store }                        from './store';
import { userStyles }                   from './styles';
import { openSign, setImage }           from './user-action';
import { profileURL }                   from './user-functions';

export const faceIcon = html`<svg viewBox="0 0 24 24" height="32px" width="32px"><path d="M9 11.75c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zm6 0c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-.29.02-.58.05-.86 2.36-1.05 4.23-2.98 5.21-5.37C11.07 8.33 14.05 10 17.42 10c.78 0 1.53-.09 2.25-.26.21.71.33 1.47.33 2.26 0 4.41-3.59 8-8 8z"></path></svg>`;

export class UserIcon extends connect(store)(LitElement) {

  static get properties() {
    return {
      _user:            { type: String },
      _photoURL:        { type: String }
    };
  }

  constructor() {
    super();
  }

  firstUpdated() {
    this.shadowRoot.getElementById('subscribe').addEventListener('click', (e) => { store.dispatch(openSign(e)) } );
  
    firebase.auth().onAuthStateChanged( (firebaseUser) => {
      if (firebaseUser) { /* INCLUDE */ this._photoURL = profileURL(); }
      else              { /* EXCLUDE */ }
      store.dispatch( setImage( this._photoURL ) );
    });
  }
  
  stateChanged(state) {
    this._user        = state.user.currentUser;
    this._photoURL    = state.user.photoURL;
  }  


  static get styles() {
    return [
      userStyles,
      css`
        :host { margin: auto; display: block; }

        #subscribe:hover { background-color: lightgrey; }
        #subscribe {
          display:          block;
          margin:           auto;
          padding:          0;
          background:       #fff;
          border-radius:    50%;
          clip-path:        circle(50%);
          overflow:         hidden;
          width:            36px;
          height:           36px;
        }
        userImage {object-fit: cover;}
        .iconArea {
          border-radius:  50%;
          overflow:       hidden;
          width:          32px;
          height:         32px;
          margin:         auto;
        }
        svg{ margin:auto;}
        `
    ]}
  
  render() {
    return html`

      <button id="subscribe" aria-label="login">
        ${this._user
          ? html`
          <div class="iconArea">
          <input
            type="image"
            class="userImage"
            id="image"
            alt="Login"
            height="32px"
            width="32px"
            src="${this._photoURL}">
        </div>
          `
          : html`${faceIcon}` }
      </button>

    `;
  }
}
window.customElements.define('user-icon', UserIcon);