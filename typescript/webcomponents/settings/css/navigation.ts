import { css } from 'lit';

export const navigation = css`

  nav {
    overflow:         hidden;
   /* box-shadow:       0 0 6px 0;*/
    z-index:          3;
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

    color:            var(--pwa_nav_button_color, grey);
    border:           0;
    width:            100%;
    margin:           auto;
    padding:          0px;
    font-weight:      800;
    font-size:        .8em;
    min-height:       var(--pwa_tap, 44px); /* Required - minimum tap target */
    height:           auto;
    border-radius:    6px 6px 0 0;
    background-color: transparent;

  }

  nav > ul > li > button[on] {

    color: var(--pwa_nav_highlight_color, black);
    background-color: lightgrey;

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
    background-color:       var( --section_background_color, white);
  }


  h2 {
    color:            var(--pwa_header_color, black);
    text-align:       center;
    text-shadow:      1px 1px 2px black, 0 0 15px grey, 0 0 5px #fff;
    
    /* border-bottom:    2px solid var(--pwa_divider_color, black); */
    /* border-top:       2px solid var(--pwa_divider_color, black); */

    margin:           6px 0 0 0;
    padding:          16px 0;

    box-shadow:       0px 6px 6px -6px;
  }

`;