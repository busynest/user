import { css } from 'lit';
export const navigation = css `

  nav { overflow: hidden; padding-top: 16px; }

  nav > ul {
    
    list-style-type:  none;
    margin:           0px;
    padding:          0px;
    display:          grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap:         8px;

  }

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

  nav > ul > li > button[on] {

    color: var(--pwa_nav_select, black);

  }


  nav > ul > li > button:hover {

    cursor:           pointer;

  }

  section {
    grid-template-rows:     auto 1fr;
    background-color:       var( --section_background, white);
  }

`;
//# sourceMappingURL=navigation.js.map