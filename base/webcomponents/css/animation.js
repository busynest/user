import { css } from "lit";
export const animation = css `

.wrapper {
    display:                                grid;
    margin:                                 16px;
    border-radius:                          8px;
    border:                                 2px solid #0a2840;
    overflow:                               hidden;
}

.inner {
    display:                                grid;
    grid-template-areas:                    'pages';
    overflow-y:                             auto;
    border-bottom:                          6px solid #0a2840;
    border-radius:                          6px;
    scrollbar-width:                        thin;
    z-index:                                1;
}

.content {
    display:                                grid;
    grid-area:                              pages;

    border-bottom:                          2px solid grey;

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
//# sourceMappingURL=animation.js.map