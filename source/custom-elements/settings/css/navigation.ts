import { css } from 'lit';

export const navigation = css`

  nav { overflow: hidden; }

  /* Navigation Menu */
  nav > ul {
    
    list-style-type:  none;
    margin:           0px;
    padding:          0px;
    display:          grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap:         8px;

  }

  /* Navigation Button */
  nav > ul > li > button {

    color:            var(--pwa_nav_button, grey);
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

    color: var(--pwa_nav_select, black);

  }

  /* Navigation Button - Hover */
  nav > ul > li > button:hover {

    cursor:           pointer;

  }

  section[on]     { display:           grid; }
  section         { display:           none; }

`;


/* Navigation Button - Media Text Justification 
@media  (max-width: 460px) {

  button[value=profile], button[value=email]      { text-align: left; }
  button[value=delete], button[value=password]   { text-align: right; }

}

.formTitle {
  display:                grid;
  grid-auto-flow:         column;
  grid-gap:               8px;
  grid-template-columns:  min-content;
}*/

/* Uploader - Page Border Divider 
.profile {
  width:            200px;
  margin:           auto;
}*/

/* Uploader - Display Photo
.userImage {
  border-radius:    50%;
  overflow:         hidden;
  margin:           auto;
  border:           2px solid #303030;
  box-shadow:       1px 1px 2px black, 0 0 25px grey, 0 0 5px #fff;
} 

/* Uploader - button Visual Indicator Outline
button:focus  { outline: none; } 

/* Uploader - 
.file-container { }


*/