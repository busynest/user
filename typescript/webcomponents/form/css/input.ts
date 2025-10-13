import { css, CSSResult } from "lit";

export const inputStyle : CSSResult = css`

  input[type=text],
  input[type=email],
  input[type=password],
  select {
    box-sizing:               border-box;
    -webkit-box-sizing:       border-box;
    height:                   50px;
    text-align:               left;
    padding:                  8px 16px;
    background-color:         var(--pwa_input_background, #E1E5EB);
    border:                   0;
    border-radius:            4px;
    -webkit-border-radius:    4px;
    font-size:                smaller;
    box-shadow:               1px 1px 1px grey;
  }

  input.invalid { background-color: #ffdddd; }

`;