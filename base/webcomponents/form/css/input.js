import { css } from "lit";
export const inputStyle = css `

  input[type=text],
  input[type=email],
  input[type=password],
  select {
    box-sizing:               border-box;
    -webkit-box-sizing:       border-box;
    width:                    100%; /* Required - fit 320px */
    max-width:                100%;
    height:                   48px;
    text-align:               left;
    padding:                  8px 14px;
    color:                    var(--pwa_drawer_text_color, #1c2430);
    background-color:         var(--pwa_input_background_color, var(--pwa_background, #fff));
    border:                   1px solid var(--pwa_line_color, #e3daca);
    border-radius:            10px;
    font-size:                1rem;
  }

  input.invalid { background-color: #ffdddd; }

  /* Required - Chrome paints a yellow autofill. Keep the field on the component background. */
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus {
    -webkit-text-fill-color:  var(--pwa_drawer_text_color, #1c2430);
    caret-color:              var(--pwa_drawer_text_color, #1c2430);
    box-shadow:               0 0 0 1000px var(--pwa_input_background_color, var(--pwa_background, #fff)) inset;
  }

`;
//# sourceMappingURL=input.js.map