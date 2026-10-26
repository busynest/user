import { css, CSSResult } from "lit";

export const lineStyle: CSSResult = css`
  
  .setLog > a {
    min-height:     var(--pwa_tap, 44px); /* Required - minimum tap target */
    display:        block;
    box-sizing:     border-box;
    padding:        16px;
    margin:         16px;
    border:         2px solid grey;
    border-radius:  6px;
    text-align:     center;
    cursor:         pointer;
  }

  .setLog > button {
    min-height:     var(--pwa_tap, 44px); /* Required - minimum tap target */
    display:        block;
    box-sizing:     border-box;
    cursor:         pointer;
    padding:        16px;
    margin:         16px;
    border-radius:  6px;
  }


`;