import { css, CSSResult } from "lit";

export const listStyle: CSSResult = css`

  ul {
    list-style-type:          none;
    padding:                  0;
    margin:                   0;
  }

  li {
    display:                  grid;
  }

  .divider {
    border-top:     2px dotted black;
    border-bottom:  2px dotted black;
    text-align:     center;
    margin:         0 16px;
  }

`;