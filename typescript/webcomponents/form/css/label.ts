import { css, CSSResult } from "lit";

export const labelStyle : CSSResult = css`

  :host {
    box-sizing:           border-box;
    width:                100%;
    min-width:            0;
    max-width:            100%;
  }

  /* Required - the column fills a narrow host and stops at --pwa_max_width on a wide one. Centered. */
  form {
    box-sizing:           border-box;
    width:                100%;
    max-width:            min(100%, var(--pwa_max_width, 400px));
    min-width:            0;
    margin-inline:        auto;
    margin-block:         0;
    padding-inline:       var(--pwa_inset, 0px);
  }

  /* Required - the show button sits beside the field, not inside the label. */
  label:has(+ .pair) {
    padding-bottom:      6px;
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