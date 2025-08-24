import { css, CSSResult } from "lit"

export const inputStyles : CSSResult = css`

  input[type="text"],
  input[type="password"] {
    box-sizing:               border-box;
    -webkit-box-sizing:       border-box;
    height:                   50px;
    text-align:               left;
    margin:                   0 3px 0 3px;
    padding:                  14px 20px;
    background-color:         var(--pwa_input_background);
    border:                   0;
    border-radius:            4px;
    -webkit-border-radius:    4px;
    font-size:                smaller;
    box-shadow:               1px 1px 1px grey;
  } 

`;

export const labelStyles : CSSResult = css`

  label {
    display:              grid;
    color:                var(--pwa_label_text_color);
    box-sizing:           border-box;
    width:                100%;
    font-size:            smaller;
    margin:               auto;
    margin-bottom:        0;
    font-weight:          bold;
    height:               36px;
    line-height:          36px; 
}

`;

export const actionButton = css`

.action-button:focus { outline:0; }

.action-button {
  display:              inline-block;
  box-sizing:           border-box;
  white-space:          nowrap;
  margin:               10px 3px 10px auto;
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
  color:                var(--pwa_action_text_color);
  background-color:     var(--pwa_action_background_color);
  border-color:         var(--pwa_action_border_color);
  box-shadow:           1px 1px 1px grey;
}

`;



export const buttonStyles : CSSResult = css`

  .saving{
    transition: background-color 0.3s; /* Smooth transition for hover effect */
    background-color:   #D6EBD3;
    border:             0.5px solid black;
    border-radius:      4px;
    height:             50px;
    width:              100%;
    margin:             auto;
    box-shadow:         1px 1px 1px grey;
  }

`;
