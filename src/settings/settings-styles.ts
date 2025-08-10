
import { css } from 'lit';

export const Settings = css`

/* Navigation Menu */
nav > ul {
  display:          grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap:         8px;
  margin:           0px;
  padding:          0px;
}

/* Navigation Button */
nav > ul > li > button {
  color:            grey;
  border:           0;
  width:            100%;
  height:           36px;
  margin:           auto;
  padding:          0px;
  font-weight:      800;
  font-size:        .8em;
  border-radius:    5px;
  background-color: transparent;
}

/* Navigation Button - Active */
nav > ul > li > button[on] {
  color:            white;
}

/* Navigation Button - Hover */
nav > ul > li > button:hover {
  cursor:           pointer;
}

/* Page Section */
:host {
  padding: 0 3px 0 3px;
}

/* Page Title */
.pageTitle { margin: 0; }
.welcome {
  text-align:       center;
  text-shadow:      1px 1px 2px black, 0 0 15px grey, 0 0 5px #fff;
}
.formTitle {
  display:                grid;
  grid-auto-flow:         column;
  grid-gap:               8px;
  grid-template-columns:  min-content;
}

/* Page Form */
form {
  box-sizing:       border-box;
  max-width:        600px;
  margin:           auto;
  border:           0;
}

/* Page - Input */
.max {
  max-width:        600px;
  margin:           auto;
}

/* Uploader - Page Border Divider */
.profile {
  width:            200px;
  margin:           auto;
}

/* Uploader - */
#uploader {
  position:         absolute;
  right:            0;
  width:            28px;
  height:           28px;
  border:           2px solid #303030;
  border-radius:    50%;
  transform:        rotateZ(90deg);
  overflow:         hidden;
  box-shadow:       1px 1px 2px black, 0 0 25px grey, 0 0 5px #fff;
}

/* Uploader - Display Photo */
.userImage {
  border-radius:    50%;
  overflow:         hidden;
  margin:           auto;
  border:           2px solid #303030;
  box-shadow:       1px 1px 2px black, 0 0 25px grey, 0 0 5px #fff;
}

/* Uploader - */
.trigger {
  position:         relative;
  width:            200px;
  display:          block;
  text-shadow:      1px 1px 12px black, 0 0 35px grey, 0 0 15px #fff;
  font-size:        1em;
  transition:       all .4s;
  cursor:           pointer;
  text-align:       center;
}

/* Uploader - */
#fileupload {
  width:            200px;
  height:           100%;
  position:         absolute;
  top:              0;
  left:             0;
  opacity:          0;
  cursor:           pointer;
}

/* Navigation Button - Media Text Justification */
@media  (max-width: 460px) {

  #profile, #email {

    text-align:     left;

  }

  #account, #password {

    text-align:     right;

  }
}

/* Uploader - button Visual Indicator Outline
button:focus  { outline: none; } */

/* Uploader - 
.file-container { }*/

`;