import { css, CSSResult } from "lit";

export const labelStyle : CSSResult = css`

  label         { font-size: .9em; }
  label {
    display:              grid;
    color:                var(--pwa_label_text_color, black);
    box-sizing:           border-box;
    width:                100%;
    font-size:            smaller;
    margin:               auto;
    margin-bottom:        0;
    font-weight:          bold;
    line-height:          36px;
    padding:              0 16px;
  }

  @media (max-width: 460px) {

    label { font-size: .8em; }

  }

`;