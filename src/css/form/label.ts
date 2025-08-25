import { css, CSSResult } from "lit";

export const labelStyle : CSSResult = css`

  label         { font-size: .9em; }
  label {
    display:              grid;
    color:                var(--pwa_label_text_color);
    box-sizing:           border-box;
    width:                100%;
    font-size:            smaller;
    margin:               auto;
    margin-bottom:        0;
    font-weight:          bold;
    height:               36px;
    line-height:          36px; 
  }

  @media (max-width: 460px) {

    label { font-size: .8em; }

  }

`;