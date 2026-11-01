import { css } from "lit";
import { hostCollapse } from "../../css/animation.js";
export const authStyles = [hostCollapse, css `

  :host {
    overflow:               hidden; /* Required - clip the roll. Height eases on the host. */
    display:                block;
  }

  .wrapper {
    padding-inline:         var(--pwa_inset, 0px);
    box-sizing:             border-box;
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

  h3 {
    margin:                 0;
    padding:                18px var(--pwa_inset, 0px) 14px;
    font-size:              1.15rem;
    font-weight:            600;
    border-bottom:          1px solid var(--pwa_line_color, #e3daca);
  }

`];
//# sourceMappingURL=auth.js.map