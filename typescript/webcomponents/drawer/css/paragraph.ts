import { css, CSSResult } from "lit";

export const lineStyle: CSSResult = css`
  
  .setLog > a,
  .setLog > button.settings {
    min-height:     var(--pwa_tap, 44px); /* Required - minimum tap target */
    display:        block;
    box-sizing:     border-box;
    /* Required - same centered column as the form controls. */
    width:          max(0px, calc(min(100%, var(--pwa_max_width, 400px)) - 2 * var(--pwa_inset, 0px)));
    max-width:      100%;
    min-width:      0;
    padding:        12px 16px;
    margin:         12px auto;
    border:         1px solid var(--pwa_line_color, #e3daca);
    border-radius:  10px;
    color:          var(--pwa_drawer_text_color, #1c2430);
    background:     transparent;
    text-align:     center;
    text-decoration: none;
    font:           inherit;
    font-weight:    600;
    cursor:         pointer;
    appearance:     none;
  }

  .setLog > button {
    min-height:     var(--pwa_tap, 44px); /* Required - minimum tap target */
    display:        block;
    box-sizing:     border-box;
    cursor:         pointer;
    /* Required - same centered column as the form controls. */
    width:          max(0px, calc(min(100%, var(--pwa_max_width, 400px)) - 2 * var(--pwa_inset, 0px)));
    max-width:      100%;
    min-width:      0;
    padding:        12px 16px;
    margin:         8px auto 16px;
    border:         1px solid var(--pwa_line_color, #e3daca);
    border-radius:  10px;
    background:     transparent;
    color:          inherit;
    font:           inherit;
  }


`;