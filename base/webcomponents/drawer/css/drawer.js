import { css } from "lit";
export const drawerStyle = css `

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
    transition-duration:    1.4s;
    max-height:             100%;
    transition:             max-height 1.4s ease-out;
  }

  .userDrawer {
    position:               fixed;
    top:                    0;
    left:                   0;
    right:                  0;
    transition-duration:    1.4s;
    overflow:               hidden;
    box-sizing:             border-box;
    height:                 auto;
    transition-property:    visibility, max-height;

    border:                 var(--pwa_drawer_border, 3px #303030 solid);
    z-index:                var(--pwa_drawer_z-index, 2);
    background-color:       var(--pwa_drawer_background_color, #fff);
    color:                  var(--pwa_drawer_text_color, #303030);
    border-radius:          var(--pwa_drawer_border-radius, 20px);
  }

  .out {
    max-height:             0px;
    transition: max-height  1.4s ease-out;
    visibility:             hidden;
    transition-property:    visibility, max-height;
  }

  .in {
    max-height:             100%;
    transition: max-height  1.4s ease-out;
    visibility:             visible;
    transition-property:    visibility, max-height;
  }

`;
//# sourceMappingURL=drawer.js.map