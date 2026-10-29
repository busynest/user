import { css } from "lit";
export const exitStyle = css `

  .exit {
    display:                grid;
    grid-template-columns:  minmax(var(--pwa_tap, 44px), 80px) minmax(0, 1fr) minmax(var(--pwa_tap, 44px), 80px); /* Required - fit 320px */
    padding:                12px 8px;
    z-index:                2;
    background-color:       var(--pwa_drawer_background_color, #fffdf8);
    border-bottom:          1px solid var(--pwa_line_color, #e3daca);
  }

  .exit > h3 {
    font-weight:            600;
    font-size:              1rem;
    margin:                 0 auto;
    line-height:            1.2;
    padding:                12px 0; /* Required - keep the title inside 320px */
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
    fill:                   var(--pwa_close_color, #9a3b32);
  }

  .close svg {
    width:                  24px;
    height:                 24px;
    display:                block;
  }



`;
//# sourceMappingURL=exit.js.map