import { css, CSSResult } from "lit";

export const drawerStyle: CSSResult = css`

  :host {
    position:               absolute;
    max-height:             0px;
    transition:             max-height 1.4s ease-out;
    overflow:               hidden;
    height:                 auto;
    display:                grid;
    padding-top:            env(safe-area-inset-top);
  }

  :host([drawer]) {       
    /* transition-duration:    1.4s; */
    max-height:             100%;
    transition:             max-height 1.4s ease-in-out;
  }

  .userDrawer > .spec > .wrapper {
    margin: 16px;
  }

  .userDrawer {
    display:                grid;
    position:               fixed;
    top:                    0;
    left:                   0;
    right:                  0;
    transition-duration:    1.4s;
    overflow:               hidden;
    box-sizing:             border-box;
    height:                 auto;
/*
    transition-property:    visibility, max-height;
    animation-name:         animay;
    animation-duration:     1.4s;
*/
    border-bottom:          var(--pwa_drawer_border, 3px #303030 solid);
    z-index:                var(--pwa_drawer_z-index, 2);
    background-color:       var(--pwa_drawer_background_color, #fff);
    color:                  var(--pwa_drawer_text_color, #303030);
    border-radius:          var(--pwa_drawer_border-radius, 0px);
  }

  .in {
    max-height:             0px;
    visibility:             hidden;
    transition:             max-height 1.4s ease-out, visibility 0s linear 1.4s, transform 1.4s; 
  }

  .spec-in {
    transform:              translate3d(0, -150%, 0);
    transition:             transform 2.4s; 
    z-index:                -1;
  }

  .out {
    max-height:             100%;
    visibility:             visible;
    transition:             max-height 1.4s ease-out, visibility 0s, transform 1.4s; 
  }
  
  .spec-out {
    transform:              translate3d(0, 0, 0);
    transition:             transform 1.6s;
    z-index:                -1;
    animation-timing-function: ease-out;
  }

`;

/*
visibility:             hidden;
will-change:            transform;
transform:              translate3d(0, -150%, 0);
transition-property:    visibility, transform;
transform:              translate3d(0, 0, 0);
*/