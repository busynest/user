import { css, html } from 'lit';
export const statusStyle = css `

  .status {
    margin:                 0 16px 8px;
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
    display:                grid;
    grid-template-columns:  minmax(0, 1fr) auto;
    gap:                    8px;
    align-items:            center;
  }

`;
export function liveStatus(id, text, tone) {
    return html `
    <p
      id="${id}"
      part="status"
      class="status ${text ? 'on' : ''} ${tone}"
      role="status"
      aria-live="polite"
      aria-atomic="true">${text}</p>
  `;
}
//# sourceMappingURL=status.js.map