/* Planned removal: 4.0.0. Date: 2026-11-01. */
import type { PwaEmailChangedDetail } from '../events/types.js';

/** @deprecated Listen for pwa-email-changed. Removed in 4.0.0. */
export const userEmailChanged = 'userEmailChanged';

/** @deprecated Optional - kept so pages that already listen keep working. */
export function emitLegacyEmailChanged(detail: PwaEmailChangedDetail): void {

  window.dispatchEvent(new CustomEvent(userEmailChanged, {
    detail,
    bubbles:  true,
    composed: true
  }));

}
