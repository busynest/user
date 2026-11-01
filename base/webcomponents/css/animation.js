import { css } from "lit";
export const animation = css `

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

    /* Required - form swap is 2s. Hide the leaving form only after it has slid away. */
    transition:                             transform 2s ease-in-out, visibility 0s linear 2s;
    -webkit-transition:                     transform 2s ease-in-out, visibility 0s linear 2s;

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
    /* Required - show the arriving form immediately, then slide it for 2s. */
    transition:                             transform 2s ease-in-out, visibility 0s linear 0s;
    -webkit-transition:                     transform 2s ease-in-out, visibility 0s linear 0s;
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
    :host,
    .content,
    .opened,
    .closed {
        transition-duration:                0s;
        transition-delay:                   0s;
        -webkit-transition-duration:        0s;
        -webkit-transition-delay:           0s;
        animation-duration:                 0s;
    }
}

`;
export const drawerShell = css `

  :host {
    max-height:             0px;
    transition:             max-height 1.4s ease-in-out;
  }

  :host([drawer]) {
    max-height:             100%;
    transition:             max-height 1.4s ease-in-out;
  }

  .in {
    max-height:             0px;
    visibility:             hidden;
    transition:             max-height 1.4s ease-in-out, visibility 0s linear 1.4s;
  }

  .spec-in {
    transform:              translate3d(0, -100%, 0);
    transition:             transform 1.5s;
    z-index:                -1;
    animation-timing-function: linear;
  }

  .out {
    max-height:             100%;
    visibility:             visible;
    transition:             max-height 1.4s ease-in-out, visibility 0s;
  }

  .spec-out {
    transform:              translate3d(0, 0, 0);
    transition:             transform 2.2s;
    z-index:                -1;
    animation-timing-function: linear;
  }

  @media (prefers-reduced-motion: reduce) {
    :host,
    .in,
    .out,
    .spec-in,
    .spec-out {
      transition-duration:  0s;
      animation-duration:   0s;
    }
  }

`;
export const hostCollapse = css `

  :host {
    transition:             max-height 1.4s ease-in-out;
  }

  :host([animation]) {
    max-height:             100%;
    transition:             max-height 1.4s ease-in-out;
  }

`;
//# sourceMappingURL=animation.js.map