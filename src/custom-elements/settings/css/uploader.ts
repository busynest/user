import { css } from "lit";


export const uploader = css`

  /* Uploader - */
  #uploader {
    position:         absolute;
    right:            0;
    width:            28px;
    height:           28px;
    border:           2px solid #303030;
    border-radius:    50%;
    transform:        rotateZ(90deg);
    overflow:         hidden;
    box-shadow:       1px 1px 2px black, 0 0 25px grey, 0 0 5px #fff;
  }

  /* Uploader - */
  .trigger {
    position:         relative;
    width:            200px;
    display:          block;
    text-shadow:      1px 1px 12px black, 0 0 35px grey, 0 0 15px #fff;
    font-size:        1em;
    transition:       all .4s;
    cursor:           pointer;
    text-align:       center;
  }

  /* Uploader - */
  #fileupload {
    width:            200px;
    height:           100%;
    position:         absolute;
    top:              0;
    left:             0;
    opacity:          0;
    cursor:           pointer;
  }

`;

