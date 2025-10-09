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
    margin:                   0 16px 0 16px;
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
//# sourceMappingURL=input.js.map