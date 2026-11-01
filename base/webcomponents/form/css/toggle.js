import { css } from "lit";
export const toggleStyle = css `
  
  .new {
    display:            block;
    box-sizing:         border-box;
    /* Required - same 16px column as the inputs and the Google button. */
    width:              calc(100% - 32px);
    max-width:          calc(100% - 32px);
    min-width:          0;
    margin-left:        16px;
    margin-right:       16px;
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

  .reveal {
    appearance:         none;
    border:             0;
    background:         transparent;
    color:              var(--pwa_action_background_color, #2a6b45);
    cursor:             pointer;
    text-decoration:    underline;
    text-underline-offset: 3px;
    font:               inherit;
    font-size:          0.85rem;
    min-height:         var(--pwa_tap, 44px); /* Required - minimum tap target */
    padding:            0 4px;
  }

  .reveal:focus { outline: 0; }

  .reveal:focus-visible {
    outline:            2px solid var(--pwa_action_border_color, #214f34);
    outline-offset:     2px;
  }

  button.action-button:disabled {
    cursor:             default;
    opacity:            0.72;
  }

`;
//# sourceMappingURL=toggle.js.map