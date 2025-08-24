
import { css } from 'lit';

export const drawerStyles = css`

  .visibility[on]  {
    visibility:             visible;
    transform:              translate3d(0, 0, 0);
  }

  .visibility {
    position:               fixed;
    right:                  0;
    visibility:             hidden;
    will-change:            transform;
    transform:              translate3d(0, -150%, 0);
    transition-property:    visibility, transform;
    transition-duration:    1.4s;
    display:                block;
  }

  .userDrawer {
    z-index: 1;
    max-width:              600px;
    margin:                 auto;
    background-color:       var(--pwa_drawer_background_color);
    color:                  var(--pwa_drawer_text_color);
    padding:                8px 18px;
    box-sizing:             border-box;
    border:                 3px #303030 solid;
    border-radius:          20px;
  }

  .exit {
    display:                grid;
    grid-template-columns:  80px 1fr 80px;
  }

  .exit > h3 {
    font-weight:            800;
    font-size:              .9em;
    margin:                 0px auto;
    opacity:                .8;
    line-height:            36px;
  }

  .exit > .remove {
    background-color:       transparent;
    border:                 0px;
    color:                  red;
    font-weight:            800;
    font-size:              .7em;
    text-transform:         uppercase;
    opacity:                .6;
  }

  .exit > .refresh {
    background-color:       transparent;
    border:                 0px;
    fill:                   blue;
    height:                 36px;
    width:                  36px;
    padding:                0px;
  }

  .close {
    height:                 36px;
    width:                  36px;
    margin:                 auto;
    background-color:       transparent;
    border:                 0px;
    fill:                   red;
    opacity:                .8;
  }

  .setLog > p   { margin: 12px; box-sizing: border-box; }
  .divide       { border: 2px solid #606060; margin: 6px 0 0 0; border-radius: 50%; }

  a {
    text-transform:           uppercase;
    font-size:                .6em;
    color:                    rgb(105,105,105);
    font-weight:              800;
    text-decoration:          none;
  }

  p {
    text-align: center;
  }

`;
