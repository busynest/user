import { css } from "lit";

export const inputStyles = css`
/*  */
input[type=submit]:hover  { background-color: #45a049; }
input[type=submit] {
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

input.invalid             { background-color: #ffdddd; }
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