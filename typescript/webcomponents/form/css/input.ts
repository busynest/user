import { css, CSSResult } from "lit";

export const inputStyle : CSSResult = css`

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
    background-color:         var(--pwa_input_background_color, #f3efe6);
    border:                   1px solid var(--pwa_line_color, #e3daca);
    border-radius:            10px;
    font-size:                1rem;
  }

  input.invalid { background-color: #ffdddd; }

`;