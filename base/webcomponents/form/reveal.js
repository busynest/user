import { html } from 'lit';
export function revealControl(showing, onClick) {
    const label = showing ? 'Hide password' : 'Show password';
    return html `
    <button
      type="button"
      class="reveal"
      part="reveal"
      aria-pressed="${showing ? 'true' : 'false'}"
      aria-label="${label}"
      @click="${onClick}">${showing ? 'Hide' : 'Show'}</button>
  `;
}
//# sourceMappingURL=reveal.js.map