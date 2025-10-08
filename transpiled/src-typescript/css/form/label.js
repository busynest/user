import { css } from "lit";
export const labelStyle = css `

  label         { font-size: .9em; }
  label {
    display:              grid;
    color:                var(--pwa_label_text_color, black);
    box-sizing:           border-box;
    font-size:            smaller;
    margin-bottom:        0;
    font-weight:          bold;
    line-height:          36px;
    padding:              0 16px;
  }

  @media (max-width: 460px) {

    label { font-size: .8em; }

  }

`;
