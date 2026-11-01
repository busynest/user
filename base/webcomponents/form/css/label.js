import { css } from "lit";
export const labelStyle = css `

  label {
    display:              grid;
    gap:                  6px;
    color:                var(--pwa_label_text_color, #1c2430);
    box-sizing:           border-box;
    font-size:            0.85rem;
    margin:               0;
    font-weight:          600;
    line-height:          1.3;
    padding:              0 16px 14px; /* Required - field inset */
  }

  .hint {
    margin:               6px 0 0;
    color:                var(--pwa_nav_button_color, #4e5b6a);
    font-size:            0.85rem;
    font-weight:          500;
    line-height:          1.4;
  }

`;
//# sourceMappingURL=label.js.map