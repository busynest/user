import { css } from "lit";
export const drawerStyle = css `

  :host {
    position:               var(--pwa_drawer_position, absolute);
    z-index:                4;
    max-height:             0px;
    transition:             max-height 1.4s ease-in-out;
    overflow:               hidden;
    height:                 auto;
    width:                  100%;
    box-sizing:             border-box;
    -webkit-box-sizing:     border-box;
    display:                grid;
    padding-top:            env(safe-area-inset-top);
    max-width:              100%; /* Required - fit 320px */
    min-width:              0;
  }

  :host([drawer]) {
    /* Required - opaque sheet at 320px so the page does not show through */
    left:                   0;
    right:                  0;
    z-index:                5;
    max-height:             100%;
    background-color:       var(--pwa_drawer_background_color, #fffdf8);
    box-shadow:             0 18px 40px rgba(28, 36, 48, 0.16);
    transition:             max-height 1.4s ease-in-out;
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
    transition-duration:    1.4s;
    overflow:               hidden;
    box-sizing:             border-box;
    height:                 auto;
/*
    transition-property:    visibility, max-height;
    animation-name:         animay;
    animation-duration:     1.4s;
*/
    border-bottom:          var(--pwa_drawer_border, 0);
    z-index:                var(--pwa_drawer_z-index, 3);
    background-color:       var(--pwa_drawer_background_color, #fffdf8);
    color:                  var(--pwa_drawer_text_color, #1c2430);
    border-radius:          var(--pwa_drawer_border-radius, 0 0 18px 18px);
  }

  .in {
    max-height:             0px;
    visibility:             hidden;
    transition:             max-height 1.4s ease-in-out, visibility 0s linear 1.4s, transform 1.4s; 
  }

  .spec-in {
    transform:              translate3d(0, -100%, 0);
    transition:             transform 1.5s; 
    z-index:                -1;
    animation-timing-function: linear;
  }

  .out {
    max-height:             100%;
    visibility:             visible;
    transition:             max-height 1.4s ease-in-out, visibility 0s, transform 1.4s; 
  }
  
  .spec-out {
    transform:              translate3d(0, 0, 0);
    transition:             transform 2.2s;
    z-index:                -1;
    animation-timing-function: linear;
  }

`;
//# sourceMappingURL=drawer.js.map