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
    padding:                                8px 0 20px; /* Required - room under the heading */

    box-sizing:                             border-box;
    -webkit-box-sizing:                     border-box;

    will-change:                            transform;

    backface-visibility:                    hidden;

    /* Optional - --pwa_slide_time: 1.4s. Optional - --pwa_slide_ease: ease-in-out. */
    /* Required - form swap is 1.4s * 1.429, about 2s. Hide after the slide. */
    transition:
      transform calc(var(--pwa_slide_time, 1.4s) * 1.429) var(--pwa_slide_ease, ease-in-out),
      visibility 0s linear calc(var(--pwa_slide_time, 1.4s) * 1.429);

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
    z-index:                                3;
    transition:
      transform calc(var(--pwa_slide_time, 1.4s) * 1.429) var(--pwa_slide_ease, ease-in-out),
      visibility 0s linear 0s;
}

.closed {
    /* Required - same cell, full width, slid up. Absolute so it does not stretch the row. */
    transform:                              translate3d(0, -100%, 0);
    visibility:                             hidden;
    pointer-events:                         none;
    position:                               absolute;
    top:                                    0;
    left:                                   0;
    width:                                  100%;
    z-index:                                2;
}

@media (prefers-reduced-motion: reduce) {
    :host { --pwa_slide_time: 0s; }
}

`;
//# sourceMappingURL=animation.js.map