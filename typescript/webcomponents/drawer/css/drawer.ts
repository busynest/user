import { css, CSSResult } from "lit";

export const drawerStyle: CSSResult = css`

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
    /* transition-duration:    1.4s; */
    max-height:             100%;
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

/*
visibility:             hidden;
will-change:            transform;
transform:              translate3d(0, -150%, 0);
transition-property:    visibility, transform;
transform:              translate3d(0, 0, 0);
*/