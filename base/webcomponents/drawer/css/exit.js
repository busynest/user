import { css } from "lit";
export const exitStyle = css `

  .exit {
    display:                grid;
    grid-template-columns:  var(--pwa_close_size, 44px) minmax(0, 1fr) var(--pwa_close_size, 44px);
    align-items:            center;
    padding:                8px 12px;
    z-index:                2;
    background-color:       var(--pwa_background, var(--pwa_drawer_background_color, #fff));
    border-bottom:          1px solid var(--pwa_line_color, #e3daca);
  }

  .exit > h2 {
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
    appearance:             none;
    box-sizing:             border-box;
    display:                grid;
    place-items:            center;
    justify-self:           end;
    align-self:             center;
    width:                  var(--pwa_close_size, 44px);
    height:                 var(--pwa_close_size, 44px);
    min-width:              var(--pwa_tap, 44px);
    min-height:             var(--pwa_tap, 44px);
    margin:                 0;
    padding:                0;
    border-radius:          var(--pwa_close_radius, 10px);
    border:                 var(--pwa_close_border, 1px solid var(--pwa_line_color, #e3daca));
    background:             var(--pwa_close_background, #fff);
    color:                  var(--pwa_close_mark, var(--pwa_drawer_text_color, #1c2430));
    cursor:                 pointer;
  }

  .close svg {
    width:                  18px;
    height:                 18px;
    display:                block;
  }

  .close:hover {
    background:             var(--pwa_close_hover, var(--pwa_nav_on_background, #f2f2f2));
  }

  .close:active {
    background:             var(--pwa_close_active, #e7e2d6);
  }



`;
//# sourceMappingURL=exit.js.map