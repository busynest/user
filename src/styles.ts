
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

import { html, css } from 'lit-element';

export const userStyles = css`

.spec[on]     { display:           block; }
.spec         { display:           none; }

.x-font {
  font-family:              Roboto, Arial, sans-serif; /* 'Montserrat' */
  line-height:              1.1;
  letter-spacing:           .007em;
  font-size:                14px;
  font-weight:              500;
  text-align:               center;
  text-decoration-style:    solid;
  text-transform:           uppercase;
}

ul {
  list-style-type:          none;
  padding:                  0;
  margin:                   0;
}

input[type=submit]:hover  { background-color: #45a049; }
input[type=submit] {
  box-sizing:         border-box;
  width:              100%;
  background-color:   #4CAF50;
  color:              white;
  padding:            14px 20px;
  margin:             8px 0;
  border:             none;
  border-radius:      4px;
  cursor:             pointer;
}

input.invalid             { background-color: #ffdddd; }
input[type=text],
input[type=email],
input[type=password], select  {
  box-sizing:               border-box;
  width:                    100%;
  padding:                  8px 16px;
  border-radius:            4px;
  background-color:         rgba(228, 241, 254, 1);
  border:                   1px #ccc solid;
  border-bottom:            2px var(--app-black-color) solid;
  border-radius:            5px;
  text-align:               center;
}

.action-button:focus, .topButton:focus {outline:0;}
.action-button {
  display:              inline-block;
  box-sizing:           border-box;
  white-space:          nowrap;
  margin:               10px 0 10px 0;
  font-weight:          400;
  text-align:           center;
  vertical-align:       middle;
  touch-action:         manipulation;
  -webkit-appearance:   button;
  cursor:               pointer;
  font-size:            16px;
  height:               38px;
  line-height:          16px;
  width:                100%;
  padding:              10px 16px;
  border-radius:        6px;
  color:                #fff;
  background-color:     #6cc04a;
  border-color:         #60b23e;
  box-shadow:           1px 1px 1px grey;
}

`;

export const settings               = html`<svg viewBox="0 0 24 24"><path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"></path></svg>`;
export const close                  = html`<svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>`;


