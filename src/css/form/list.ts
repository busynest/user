import { css, CSSResult } from "lit";

export const listStyle: CSSResult = css`

  ul {
    list-style-type:          none;
    padding:                  0;
    margin:                   0;
  }

  li { display: grid; }

`;