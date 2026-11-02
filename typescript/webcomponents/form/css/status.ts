import { css, CSSResult, html, TemplateResult } from 'lit';

/** Required - same live region as email-reset. Idle text does not move the form. */
export const statusStyle: CSSResult = css`

  .status {
    margin:                 0 0 8px;
    color:                  var(--pwa_label_text_color, #1c2430);
    font-size:              0.95rem;
    line-height:            1.4;
  }

  .status:not(.on) {
    position:               absolute;
    width:                  1px;
    height:                 1px;
    padding:                0;
    margin:                 -1px;
    overflow:               hidden;
    clip:                   rect(0, 0, 0, 0);
    white-space:            nowrap;
    border:                 0;
  }

  .status.error { color: var(--pwa_close_color, #9a3b32); }

  .pair {
    display:                block;
    position:               relative;
    min-width:              0;
    margin:                 0 0 14px;
  }

  /* Required - Show sits in the field so the input border matches the column. */
  .pair > input {
    padding-right:          4.75rem;
  }

  .pair > .reveal {
    position:               absolute;
    top:                    0;
    right:                  6px;
    height:                 48px;
    min-height:             0;
    margin:                 0;
  }

`;

/** Required - polite live region. tone is "" or "error". */
export function liveStatus(id: string, text: string, tone: string): TemplateResult {
  return html`
    <p
      id="${id}"
      part="status"
      class="status ${text ? 'on' : ''} ${tone}"
      role="status"
      aria-live="polite"
      aria-atomic="true">${text}</p>
  `;
}
