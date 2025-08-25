import { css, CSSResult } from "lit";

export const drawerStyle: CSSResult = css`

  .userDrawer {
    z-index: 1;
    max-width:              600px;
    margin:                 16px auto auto auto;
    background-color:       var(--pwa_drawer_background_color);
    color:                  var(--pwa_drawer_text_color);
    padding:                8px 18px;
    box-sizing:             border-box;
    border:                 3px #303030 solid;
    border-radius:          20px;
  }

`;