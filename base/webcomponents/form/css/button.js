import { css } from "lit";
export const buttonStyle = css `

  .action-button:focus { outline: 0; }

  .action-button:focus-visible {
    outline:              2px solid var(--pwa_action_border_color, #214f34);
    outline-offset:       2px;
  }

  .action-button {
    display:              block;
    box-sizing:           border-box;
    white-space:          normal;
    /* Required - same 16px column as the inputs. Margin box stays inside the host. */
    width:                calc(100% - 32px);
    max-width:            calc(100% - 32px);
    min-width:            0;
    margin:               8px 16px 20px;
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
    /* Required - same left and right as the inputs. The G mark does not set the width. */
    width:                calc(100% - 32px);
    max-width:            calc(100% - 32px);
    min-width:            0;
    min-height:           var(--pwa_tap, 44px);
    margin:               0 16px 8px;
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
    outline:              2px solid #1f1f1f;
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
    width:              calc(100% - 32px);
    max-width:          calc(100% - 32px);
    min-width:          0;
    background-color:   var(--pwa_action_background_color, #2a6b45);
    color:              white;
    padding:            14px 20px;
    margin:             8px 16px;
    border:             none;
    border-radius:      4px;
    cursor:             pointer;
  }

`;
//# sourceMappingURL=button.js.map