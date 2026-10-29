import { css } from 'lit';
export const navigation = css `

  nav {
    overflow:         hidden;
    z-index:          3;
    padding:          8px 8px 0; /* Required - space around the tabs */
  }

  nav > ul {
    
    list-style-type:  none;
    margin:           0px;
    padding:          0px;
    display:          grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr);
    grid-gap:         8px;

  }

  nav > ul > li > button {

    color:            var(--pwa_nav_button_color, #4e5b6a);
    border:           0;
    width:            100%;
    margin:           auto;
    padding:          0px;
    font-weight:      600;
    font-size:        0.85rem;
    min-height:       var(--pwa_tap, 44px); /* Required - minimum tap target */
    height:           auto;
    border-radius:    6px 6px 0 0;
    background-color: transparent;

  }

  nav > ul > li > button[on] {

    color: var(--pwa_nav_highlight_color, #1c2430);
    background-color: var(--pwa_nav_on_background, #f3efe6);

  }


  nav > ul > li > button:hover {

    cursor:           pointer;

  }

  /* Required - fit 320px */
  @media (max-width: 320px) {

    nav > ul {
      grid-gap:       4px;
    }

    nav > ul > li > button {
      white-space:    normal;
      font-size:      .7em;
    }

  }

  section {
    grid-template-rows:     auto 1fr;
    background-color:       var(--section_background_color, #fffdf8);
  }


  h2 {
    color:            var(--pwa_header_color, #1c2430);
    text-align:       center;
    font-weight:      600;
    font-size:        1.35rem;
    margin:           0;
    padding:          20px 16px 4px;
  }

`;
//# sourceMappingURL=navigation.js.map