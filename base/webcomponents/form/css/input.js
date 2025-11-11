import { css } from "lit";
export const inputStyle = css `

  input[type=text],
  input[type=email],
  input[type=password],
  select {
    box-sizing:               border-box;
    -webkit-box-sizing:       border-box;
    height:                   50px;
    text-align:               left;
    padding:                  8px 16px;
    background-color:         var(--pwa_input_background_color, #E1E5EB);
    border:                   1px solid grey;
    border-radius:            4px;
    -webkit-border-radius:    4px;
    font-size:                smaller;
    box-shadow:               0px 6px 6px -6px;
  }

  input.invalid { background-color: #ffdddd; }

`;
//# sourceMappingURL=input.js.map