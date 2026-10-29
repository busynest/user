import { css, CSSResult } from "lit";

export const toggleStyle: CSSResult = css`
  
  .new {
    border:             0;
    border-top:         1px solid var(--pwa_line_color, #e3daca);
    padding:            14px 16px;
    appearance:         none;
    background-color:   transparent;
    color:              var(--pwa_action_background_color, #2a6b45);
    cursor:             pointer;
    text-decoration:    underline;
    text-underline-offset: 3px;
    font-size:          0.95rem;
    line-height:        1.4;
    min-height:         var(--pwa_tap, 44px); /* Required - minimum tap target */
  }

`