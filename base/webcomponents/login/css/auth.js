import { css } from "lit";
import { hostCollapse } from "../../css/animation.js";
export const authStyles = [hostCollapse, css `

  :host {
    overflow:               hidden; /* Required - clip the roll. Height eases on the host. */
    display:                block;
    box-sizing:             border-box;
    width:                  100%;
    min-width:              0; /* Required - shrink inside a flex or grid track */
    max-width:              100%;
    background-color:       var(--pwa_background, var(--section_background_color, #fff));
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
    background-color:       var(--pwa_background, var(--section_background_color, #fff));
  }

  h2 {
    margin:                 0;
    padding:                18px var(--pwa_inset, 0px) 14px;
    font-size:              1.15rem;
    font-weight:            600;
    border-bottom:          1px solid var(--pwa_line_color, #e3daca);
  }

`];
//# sourceMappingURL=auth.js.map