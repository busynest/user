import type { PwaEmailChangedDetail } from './types.js';

/** @deprecated Listen for pwa-email-changed. Removed in 4.0.0. */
export const userEmailChanged = 'userEmailChanged';

/** @deprecated Kept so pages that already listen keep working. Removed in 4.0.0. */
export function emitLegacyEmailChanged(detail: PwaEmailChangedDetail): void {

  window.dispatchEvent(new CustomEvent(userEmailChanged, {
    detail,
    bubbles:  true,
    composed: true
  }));

}
