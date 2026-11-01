import { html, TemplateResult } from 'lit';

/** Required - show or hide one password field. */
export function revealControl(showing: boolean, onClick: (event: Event) => void): TemplateResult {

  const label = showing ? 'Hide password' : 'Show password';

  return html`
    <button
      type="button"
      class="reveal"
      part="reveal"
      aria-pressed="${showing ? 'true' : 'false'}"
      aria-label="${label}"
      @click="${onClick}">${showing ? 'Hide' : 'Show'}</button>
  `;

}
