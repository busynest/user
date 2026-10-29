import { css, CSSResult } from "lit"

export const buttonStyle: CSSResult = css`

  .action-button:focus { outline: 0; }

  .action-button:focus-visible {
    outline:              2px solid var(--pwa_action_border_color, #214f34);
    outline-offset:       2px;
  }

  .action-button {
    display:              inline-block;
    box-sizing:           border-box;
    white-space:          nowrap;
    margin:               8px 16px 20px auto;
    font-weight:          600;
    text-align:           center;
    vertical-align:       middle;
    touch-action:         manipulation;
    -webkit-appearance:   button;
    cursor:               pointer;
    font-size:            16px;
    min-height:           var(--pwa_tap, 44px); /* Required - minimum tap target */
    height:               auto;
    max-width:            calc(100% - 32px); /* Required - fit 320px */
    line-height:          1.2;
    padding:              10px 18px;
    border-radius:        10px;
    border-style:         solid;
    border-width:         1px;
    color:                var(--pwa_action_text_color, #fff);
    background-color:     var(--pwa_action_background_color, #2a6b45);
    border-color:         var(--pwa_action_border_color, #214f34);
  }

  /* Required - fit 320px */
  @media (max-width: 320px) {
    .action-button {
      white-space:        normal;
      margin-left:        16px;
      margin-right:       16px;
    }
  }

  .saving{
    transition: background-color 0.3s;
    background-color:   #d7ebe0;
    border:             1px solid var(--pwa_line_color, #e3daca);
    border-radius:      4px;
    height:             50px;
    width:              100%;
    margin:             auto;
  }

  .submit:hover  { background-color: #214f34; }

  .submit {
    box-sizing:         border-box;
    width:              100%;
    background-color:   var(--pwa_action_background_color, #2a6b45);
    color:              white;
    padding:            14px 20px;
    margin:             8px 0;
    border:             none;
    border-radius:      4px;
    cursor:             pointer;
  }

`;
