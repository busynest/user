import { css, CSSResult } from "lit";

export const exitStyle: CSSResult = css`

  .exit {
    display:                grid;
    grid-template-columns:  minmax(var(--pwa_tap, 44px), 80px) minmax(0, 1fr) minmax(var(--pwa_tap, 44px), 80px); /* Required - fit 320px */
    padding:                16px;
    z-index:                2;
    background-color:       white;
    border-bottom:          2px solid black;
    box-shadow:             0px 0px 6px;
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
    min-height:             var(--pwa_tap, 44px); /* Required - minimum tap target */
    min-width:              var(--pwa_tap, 44px);
    height:                 auto;
    width:                  auto;
    margin:                 auto;
    background-color:       transparent;
    border:                 0px;
    fill:                   red;
    opacity:                .8;
  }

  .close svg {
    width:                  24px;
    height:                 24px;
    display:                block;
  }



`;
