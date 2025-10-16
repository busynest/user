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
    overflow:               hidden;
    color:                  var(--pwa_drawer_text_color, #303030);
    background-color:       var(--section_background_color, white);
  }

  :host([animation]) {       
    transition-duration:    1.4s;
    max-height:             100%;
    transition:             max-height 1.4s ease-out;
  }

  h3 {
    margin:                 16px;
    padding-bottom:         16px;
    border-bottom:          2px solid black;
  }

`;

/*
padding-top:            env(safe-area-inset-top);
*/