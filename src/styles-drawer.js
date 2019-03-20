
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

import { css } from 'lit-element';

export const User = css`

/* Google Icon Load */
.icon {
  background:       url('https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/28px-Google_%22G%22_Logo.svg.png') transparent 5px 50% no-repeat;
  display:          inline-block;
  vertical-align:   middle;
  width:            42px;
  height:           42px;
}

.visibility[on]  {
  visibility: visible;
  transform: translate3d(0, 0, 0);
}

.visibility {
  position:             fixed;
  top:                  64px;
  right:                0;
  visibility:           hidden;
  will-change:          transform;
  transform: translate3d(0, -100%, 0);
  transition-property:  visibility, transform;
  transition-duration:  1.4s;
  display:              block;
}

.userDrawer {
  max-width:            600px;
  margin:               auto;
  background-image:     url("images/backgroundsvg.svg");
  background-size:      cover;
  color:                #303030;
  padding:              8px 18px;
  box-sizing:           border-box;
  border:               3px #303030 solid;
  border-radius:        20px;
}

.exit {
  display:                grid;
  grid-template-columns:  80px 1fr 80px;
}

.exit > h3 {
  font-weight:            800;
  font-size:              .9em;
  margin:                 0px auto;
  opacity:                .8;
  line-height:            36px;
}

.exit > .remove {
  background-color:       transparent;
  border:                 0px;
  color:                  red;
  font-weight:            800;
  font-size:              .7em;
  text-transform:         uppercase;
  opacity:                .6;
}

.exit > .refresh {
  background-color:       transparent;
  border:                 0px;
  fill:                   blue;
  height:                 36px;
  width:                  36px;
  padding:                0px;
}

.sign-right {
  height:           36px;
  width:            36px;
  margin:           auto;
  background-color: transparent;
  border:           0px;
  fill:             red;
  opacity:          .8;
}

.google {
  margin:           auto;
  color:            #444;
  width:            210px;
  border-radius:    5px;
  border:           thin solid #888;
  box-shadow:       1px 1px 1px grey;
  white-space:      nowrap;

  background-color:         #ffffff;
  size:                     14px;
  font:                     Roboto-Medium;
  line-height:              26px;
  padding:                  8dp;
  border-color:             #4267b2;
  border-radius:            10px;
  -webkit-font-smoothing:   antialiased;
  font-weight:              bold;
  justify-content:          center;
  text-align:               center;
  text-shadow:              none;
}

.google:hover {
  cursor: pointer;
}

.imageGoogle  { height: 18dp; width:  18xp; }
label         { font-size: .9em; }
.setLog > p   { margin: 12px; box-sizing: border-box; }
.divide       { border: 2px solid #606060; margin: 6px 0 0 0; border-radius: 50%; }
@media        (max-width: 460px) { .google, label, #bat { font-size: .8em; } }

input {
  box-sizing:               border-box;
  width:                    100%;
  padding:                  12px 20px;
  margin:                   8px 0 0 0;
  display:                  inline-block;
  border:                   1px solid #ccc;
  border-radius:            4px;
}

a { text-transform: uppercase;  font-size: .6em; color: rgb(105,105,105); font-weight: 800; }
p {text-align: center;}
.inpat { display:grid; grid-template-columns: 60% 40%;}
`;