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
    grid-template-areas:                    'pages';
    overflow-y:                             auto;
    box-shadow:                             0px 6px 6px -6px;
    border-bottom:                          6px solid #0a2840;
    border-radius:                          0 0 6px 6px;
    scrollbar-width:                        thin;
    z-index:                                1;
}

.content {
    display:                                grid;
    grid-gap:                               16px;
    grid-area:                              pages;

    border-bottom:                          2px solid grey;
    box-shadow:                             inset 0px -6px 6px -8px;

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
    transform:                              translate3d(0, -102%, 0);/*rotateY(-180deg);*/
    animation:                              slide-out 2s ease-out forwards;
    overflow:                               hidden;
    position:relative;
    z-index: 2;
}

`;