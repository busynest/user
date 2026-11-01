import { css, CSSResult } from "lit";

export const labelStyle : CSSResult = css`

  :host {
    box-sizing:           border-box;
    min-width:            0;
    max-width:            100%;
  }

  label {
    display:              grid;
    gap:                  6px;
    color:                var(--pwa_label_text_color, #1c2430);
    box-sizing:           border-box;
    font-size:            0.85rem;
    margin:               0;
    font-weight:          600;
    line-height:          1.3;
    padding:              0 0 14px;
  }

  .hint {
    margin:               6px 0 0;
    color:                var(--pwa_nav_button_color, #4e5b6a);
    font-size:            0.85rem;
    font-weight:          500;
    line-height:          1.4;
  }

`;