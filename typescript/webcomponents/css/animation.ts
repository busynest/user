import { css, CSSResult } from "lit";

/* --pwa_slide is the only duration. The drawer unrolls with max-height over its
   measured height. Forms still translate inside the cell. slide-out is not used. */

export const animation : CSSResult = css`

:host {
    --pwa_slide:                            2s; /* Required - one duration for every slide */
}

.wrapper {
    display:                                grid;
    border-radius:                          8px;
    /* margin:                                 16px; */
    /* overflow:                               hidden;*/
}

.inner {
    display:                                grid;
    position:                               relative;
    grid-template-areas:                    'pages';
    overflow:                               hidden; /* Required - clip the slide under the header */
    border-bottom:                          1px solid var(--pwa_line_color, #e3daca);
    border-radius:                          0 0 14px 14px;
    scrollbar-width:                        thin;
    z-index:                                1;
}

.content {
    display:                                grid;
    grid-gap:                               20px;
    grid-area:                              pages;
    padding:                                8px 0 0; /* Required - room under the heading */

    box-sizing:                             border-box;
    -webkit-box-sizing:                     border-box;

    will-change:                            transform;

    backface-visibility:                    hidden;

    /* Required - same duration as the drawer. Hide the leaving form when the transform ends. */
    transition:                             transform var(--pwa_slide, 2s) ease-in-out, visibility 0s linear var(--pwa_slide, 2s);
    -webkit-transition:                     transform var(--pwa_slide, 2s) ease-in-out, visibility 0s linear var(--pwa_slide, 2s);

    position:relative;
    z-index: 1;
    width:                                  100%;
}

@keyframes slide-out {
    from    { max-height:                   100%; }
    to      { max-height:                   100dvh; }
}

.opened {
    transform:                              translate3d(0, 0, 0);
    visibility:                             visible;
    position:                               relative; /* Required - this form sets the panel height */
    align-self:                             start; /* Required - keep the Update button under its field */
    z-index:                                3;
    /* Required - show the arriving form immediately. The duration matches --pwa_slide. */
    transition:                             transform var(--pwa_slide, 2s) ease-in-out, visibility 0s linear 0s;
    -webkit-transition:                     transform var(--pwa_slide, 2s) ease-in-out, visibility 0s linear 0s;
}

.closed {
    /* Required - same cell, full width, slid up. Absolute so the row does not stretch and the transform can run. */
    transform:                              translate3d(0, -100%, 0);
    visibility:                             hidden;
    pointer-events:                         none;
    position:                               absolute;
    top:                                    0;
    left:                                   0;
    width:                                  100%;
    height:                                 auto; /* Required - a stretched row pulls Update to the top */
    align-self:                             start;
    justify-self:                           start;
    z-index:                                2;
}

@media (prefers-reduced-motion: reduce) {
    :host {
        --pwa_slide:                        0s;
    }
}

`;

/* Drawer shell. Imported by user-drawer only.
   JS writes max-height in px (0 ↔ measured content). The range is the real height, so ease-in-out is not skewed. */
export const drawerShell : CSSResult = css`

  :host {
    max-height:             0px;
    min-height:             0px; /* Required - the grid must be allowed to unroll from 0 */
    visibility:             hidden;
    pointer-events:         none;
    transition:             max-height var(--pwa_slide, 2s) ease-in-out;
    -webkit-transition:     max-height var(--pwa_slide, 2s) ease-in-out;
  }

  :host([sliding]) {
    visibility:             visible;
    pointer-events:         auto;
  }

`;

/* user-login host. The animation attribute is not set. No max-height ease. */
export const hostCollapse : CSSResult = css`

  :host([animation]) {
    max-height:             100%;
  }

`;
