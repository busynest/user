import { css } from "lit";
export const lineStyle = css `
  
  .setLog > a,
  .setLog > button.settings {
    min-height:     var(--pwa_tap, 44px); /* Required - minimum tap target */
    display:        block;
    box-sizing:     border-box;
    width:          auto;
    padding:        12px 16px;
    margin:         12px 16px;
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
    padding:        12px 16px;
    margin:         8px 16px 16px;
    border:         1px solid var(--pwa_line_color, #e3daca);
    border-radius:  10px;
    background:     transparent;
    color:          inherit;
    font:           inherit;
  }


`;
//# sourceMappingURL=paragraph.js.map