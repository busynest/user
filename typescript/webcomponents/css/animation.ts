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
    overflow-y:                             auto;
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

    transition-property:                    transform, transition;
    -webkit-transition-property:            transform, transition;

    backface-visibility:                    hidden;

    transition-timing-function:             ease-in-out;
    -webkit-transition-timing-function:     ease-in-out;

    transition-duration:                    2s;
    -webkit-transition-duration:            2s;

    position:relative;
    z-index: 1;
}

@keyframes slide-out {
    from    { max-height:                   100%; }
    to      { max-height:                   100dvh; }
}

.opened {
    transform:                              translate3d(0, 0, 0);/*rotateY(0deg);*/
    position:relative;
    z-index: 3;
}

.closed {
    /* Required - stay out of the header and the tab order */
    visibility:                             hidden;
    pointer-events:                         none;
    position:                               absolute;
    height:                                 0;
    width:                                  0;
    overflow:                               hidden;
    transform:                              none;
    z-index:                                0;
}

`;