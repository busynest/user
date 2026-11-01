import { css, html } from 'lit';

/** Required - one mark. Colour comes from --pwa_verified_color. */
export const verifiedMark = html`
  <span class="verified" part="verified" role="img" aria-label="Email verified">
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
    </svg>
  </span>
`;

export const verifiedStyle = css`

  .verified {
    display:                 inline-grid;
    place-items:             center;
    flex:                    0 0 auto;
    width:                   1.25rem;
    height:                  1.25rem;
    color:                   var(--pwa_verified_color, var(--pwa_action_background_color, #2a6b45));
    fill:                    currentColor;
  }

  .verified svg {
    width:                   1.25rem;
    height:                  1.25rem;
    display:                 block;
  }

  .unverified {
    margin:                  0;
    color:                   var(--pwa_nav_button_color, #4e5b6a);
    font-size:               0.85rem;
    font-weight:             600;
    line-height:             1.3;
  }

  .who {
    display:                 inline-flex;
    align-items:             center;
    justify-content:         center;
    gap:                     8px;
    flex-wrap:               wrap;
    min-width:               0;
  }

`;
