import { css, CSSResult } from "lit";

export const inputStyle : CSSResult = css`

  input {
    box-sizing:               border-box;
    width:                    100%;
    padding:                  12px 20px;
    margin:                   8px 0 0 0;
    display:                  inline-block;
    border:                   1px solid #ccc;
    border-radius:            4px;
  }

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

    
  input.invalid { background-color: #ffdddd; }

  input[type=text],
  input[type=email],
  input[type=password], select  {
    box-sizing:               border-box;
    width:                    100%;
    padding:                  8px 16px;
    border-radius:            4px;
    background-color:         rgba(228, 241, 254, 1);
    border:                   1px #ccc solid;
    border-bottom:            2px var(--app-black-color) solid;
    border-radius:            5px;
    text-align:               center;
  }

`;