import { css, CSSResult } from "lit";

export const drawerStyle: CSSResult = css`

  :host {
    position:               var(--pwa_drawer_position, absolute);
    z-index:                4;
    overflow:               hidden;
    height:                 auto;
    width:                  100%;
    box-sizing:             border-box;
    -webkit-box-sizing:     border-box;
    display:                block; /* Required - a grid item overflows upward and clips the header */
    padding-top:            env(safe-area-inset-top);
    max-width:              100%; /* Required - fit 320px */
    min-width:              0;
  }

  :host([drawer]),
  :host([sliding]) {
    /* Required - the growing box. Top stays put; radius and shadow follow the bottom edge. */
    left:                   0;
    right:                  0;
    z-index:                5;
    background-color:       var(--pwa_drawer_background_color, #fffdf8);
    border-radius:          var(--pwa_drawer_border-radius, 0 0 18px 18px);
    box-shadow:             0 18px 40px rgba(28, 36, 48, 0.16);
  }

  .userDrawer > .spec > .wrapper {
    margin: 20px 8px 12px; /* Required - space under the drawer header */
  }

  .userDrawer,
  .userDrawer > .spec,
  .wrapper,
  .inner {
    min-width:              0; /* Required - fit 320px */
    max-width:              100%;
  }

  .userDrawer {
    display:                grid;
    position:               relative;
 /* top:                    0;
    left:                   0;
    right:                  0; */
    overflow:               hidden;
    box-sizing:             border-box;
    height:                 auto;
    border-bottom:          var(--pwa_drawer_border, 0);
    z-index:                var(--pwa_drawer_z-index, 3);
    background-color:       var(--pwa_drawer_background_color, #fffdf8);
    color:                  var(--pwa_drawer_text_color, #1c2430);
    border-radius:          var(--pwa_drawer_border-radius, 0 0 18px 18px);
  }

`;