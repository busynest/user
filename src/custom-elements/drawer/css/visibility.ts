import { css, CSSResult } from "lit";

export const visibility: CSSResult = css`

  .visibility[on]  {
    visibility:             visible;
    transform:              translate3d(0, 0, 0);
  }

  .visibility {
    position:               fixed;
    right:                  0;
    visibility:             hidden;
    will-change:            transform;
    transform:              translate3d(0, -150%, 0);
    transition-property:    visibility, transform;
    transition-duration:    1.4s;
    display:                block;
  }

`;