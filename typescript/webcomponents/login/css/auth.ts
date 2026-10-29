import { css, CSSResult } from "lit";

export const authStyles: CSSResult = css`

  :host {
    transition:             max-height 1.4s ease-out;
    overflow:               hidden;
    display:                grid;
  }

  .spec[on] {
    display:                grid;
  }

  .spec {
    display:                none;
  }

  .service {
    display:                grid;
    overflow:               hidden;
    color:                  var(--pwa_drawer_text_color, #1c2430);
    background-color:       var(--section_background_color, #fffdf8);
  }

  :host([animation]) {       
    transition-duration:    1.4s;
    max-height:             100%;
    transition:             max-height 1.4s ease-out;
  }

  h3 {
    margin:                 0;
    padding:                18px 16px 14px;
    font-size:              1.15rem;
    font-weight:            600;
    border-bottom:          1px solid var(--pwa_line_color, #e3daca);
  }

`;

/*
padding-top:            env(safe-area-inset-top);
*/