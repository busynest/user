import { css } from "lit";
export const drawerStyle = css `

  :host {
    /* Required - stay where the tag is. Height 0 so a closed drawer takes no space. */
    position:               var(--pwa_drawer_position, relative);
    display:                block;
    height:                 0;
    overflow:               visible;
    width:                  100%;
    box-sizing:             border-box;
    -webkit-box-sizing:     border-box;
    max-width:              100%; /* Required - fit 320px */
    min-width:              0;
    background-color:       var(--pwa_background, var(--pwa_drawer_background_color, #fff));
  }

  :host([drawer]),
  :host([sliding]) {
    /* Required - the overlay beats the content that follows the tag. */
    z-index:                5;
  }

  .userDrawer > .spec > .wrapper {
    margin: 20px 0 12px; /* Required - space under the header. Side gap is --pwa_inset on the form. */
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
    background-color:       var(--pwa_background, var(--pwa_drawer_background_color, #fff));
    color:                  var(--pwa_drawer_text_color, #1c2430);
    border-radius:          var(--pwa_drawer_border-radius, 0 0 18px 18px);
    padding-top:            env(safe-area-inset-top);
  }

`;
//# sourceMappingURL=drawer.js.map