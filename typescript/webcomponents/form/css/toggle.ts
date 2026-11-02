import { css, CSSResult } from "lit";

export const toggleStyle: CSSResult = css`
  
  .new {
    display:            block;
    box-sizing:         border-box;
    width:              100%;
    max-width:          100%;
    min-width:          0;
    margin-left:        0;
    margin-right:       0;
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

  .new:focus-visible {
    outline:            2px solid var(--pwa_focus, #1c2430);
    outline-offset:     2px;
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
    outline:            2px solid var(--pwa_focus, #1c2430);
    outline-offset:     2px;
  }

  button.action-button:disabled {
    cursor:             default;
    opacity:            0.72;
  }

`;
