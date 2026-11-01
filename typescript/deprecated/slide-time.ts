/* Optional - retired. Not imported. Jack's older literal durations, including a transform token on .in and .out. */

import { css } from 'lit';

export const literalSlide = css`

  :host { transition: max-height 1.4s ease-in-out; }

  .in {
    transition: max-height 1.4s ease-in-out, visibility 0s linear 1.4s, transform 1.4s;
  }

  .spec-in { transition: transform 1.5s; }

  .out {
    transition: max-height 1.4s ease-in-out, visibility 0s, transform 1.4s;
  }

  .spec-out { transition: transform 2.2s; }

  .content {
    transition: transform 0.8s ease-in-out, visibility 0s linear 0.8s;
  }

  .opened {
    transition: transform 0.8s ease-in-out, visibility 0s linear 0s;
  }

`;
