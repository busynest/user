import { css } from "lit";
export const exitStyle = css `

  .exit {
    display:                grid;
    grid-template-columns:  80px 1fr 80px;
    padding:                16px;
  }

  .exit > h3 {
    font-weight:            800;
    font-size:              .9em;
    margin:                 0px auto;
    opacity:                .8;
    line-height:            36px;
  }

  .exit > .remove {
    cursor:                 pointer;
    background-color:       transparent;
    border:                 0px;
    color:                  red;
    font-weight:            800;
    font-size:              .7em;
    text-transform:         uppercase;
    opacity:                .6;
  }
/*
  .exit > .refresh {
    background-color:       transparent;
    border:                 0px;
    fill:                   blue;
    height:                 36px;
    width:                  36px;
    padding:                0px;
  }
*/
  .close {
    height:                 30px;
    width:                  42px;
    margin:                 auto;
    background-color:       transparent;
    border:                 0px;
    fill:                   red;
    opacity:                .8;
  }

`;
