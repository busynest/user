import { css, CSSResult } from "lit";

export const animation : CSSResult = css`

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

    /* Required - slide. Visibility waits out the transform, then hides. */
    transition:                             transform 0.8s ease-in-out, visibility 0s linear 0.8s;

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
    transition:                             transform 0.8s ease-in-out, visibility 0s linear 0s;
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
    .content,
    .opened,
    .closed {
        transition:                         none;
    }
}

`;