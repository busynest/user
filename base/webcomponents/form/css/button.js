import { css } from "lit";
export const buttonStyle = css `

  .action-button:focus { outline:0; }

  .action-button {
    display:              inline-block;
    box-sizing:           border-box;
    white-space:          nowrap;
    margin:               16px 16px 16px auto;
    font-weight:          400;
    text-align:           center;
    vertical-align:       middle;
    touch-action:         manipulation;
    -webkit-appearance:   button;
    cursor:               pointer;
    font-size:            16px;
    height:               38px;
    line-height:          16px;
    padding:              10px 16px;
    border-radius:        6px;
    color:                var(--pwa_action_text_color, #fff);
    background-color:     var(--pwa_action_background_color, #6cc04a);
    border-color:         var(--pwa_action_border_color, #60b23e);
    box-shadow:           1px 1px 1px grey;
  }

  .saving{
    transition: background-color 0.3s;
    background-color:   #D6EBD3;
    border:             0.5px solid black;
    border-radius:      4px;
    height:             50px;
    width:              100%;
    margin:             auto;
    box-shadow:         1px 1px 1px grey;
  }

  .submit:hover  { background-color: #45a049; }

  .submit {
    box-sizing:         border-box;
    width:              100%;
    background-color:   #4CAF50;
    color:              white;
    padding:            14px 20px;
    margin:             8px 0;
    border:             none;
    border-radius:      4px;
    cursor:             pointer;
  }

`;
//# sourceMappingURL=button.js.map