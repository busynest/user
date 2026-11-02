import { css, CSSResult } from "lit"

export const buttonStyle: CSSResult = css`

  .action-button:focus { outline: 0; }

  .action-button:focus-visible {
    outline:              2px solid var(--pwa_focus, #1c2430);
    outline-offset:       2px;
  }

  .action-button {
    display:              block;
    box-sizing:           border-box;
    white-space:          normal;
    /* Required - flush to the host. The page sets --pwa_inset when it wants a gap. */
    width:                100%;
    max-width:            100%;
    min-width:            0;
    margin:               8px 0 20px;
    font-weight:          600;
    text-align:           center;
    vertical-align:       middle;
    touch-action:         manipulation;
    -webkit-appearance:   button;
    cursor:               pointer;
    font-size:            16px;
    min-height:           var(--pwa_tap, 44px); /* Required - minimum tap target */
    height:               auto;
    line-height:          1.2;
    padding:              10px 18px;
    border-radius:        10px;
    border-style:         solid;
    border-width:         1px;
    color:                var(--pwa_action_text_color, #fff);
    background-color:     var(--pwa_action_background_color, #2a6b45);
    border-color:         var(--pwa_action_border_color, #214f34);
    align-self:           stretch;
    justify-self:         stretch;
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

  .google {
    display:              flex;
    align-items:          center;
    justify-content:      center;
    gap:                  10px;
    box-sizing:           border-box;
    /* Required - full width of the host. The G mark does not set the width. */
    width:                100%;
    max-width:            100%;
    min-width:            0;
    min-height:           var(--pwa_tap, 44px);
    margin:               0 0 8px;
    padding:              10px 18px;
    border-radius:        10px;
    border:               1px solid #747775;
    background:           #fff;
    color:                #1f1f1f;
    font:                 inherit;
    font-weight:          600;
    font-size:            16px;
    line-height:          1.2;
    cursor:               pointer;
  }

  .google:focus { outline: 0; }

  .google:focus-visible {
    outline:              2px solid var(--pwa_focus, #1c2430);
    outline-offset:       2px;
  }

  .google:disabled {
    cursor:               default;
    opacity:              0.72;
  }

  .google .g {
    width:                18px;
    height:               18px;
    flex:                 0 0 auto;
  }

  .submit:hover  { background-color: #214f34; }

  .submit {
    box-sizing:         border-box;
    width:              100%;
    max-width:          100%;
    min-width:          0;
    background-color:   var(--pwa_action_background_color, #2a6b45);
    color:              white;
    padding:            14px 20px;
    margin:             8px 0;
    border:             none;
    border-radius:      4px;
    cursor:             pointer;
  }

`;
