/* Optional - retired. .closed used to drop out of the grid, so the swap was instant. */

import { css } from 'lit';

export const closedCollapse = css`

.closed {
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
