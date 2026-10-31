import type { PwaEmailChangedDetail } from '../events/types.js';

/** @deprecated Optional - window event userEmailChanged. Required - listen for pwa-email-changed. */
export const userEmailChanged = 'userEmailChanged';

/** @deprecated Optional - kept so pages that already listen keep working. */
export function emitLegacyEmailChanged(detail: PwaEmailChangedDetail): void {

  window.dispatchEvent(new CustomEvent(userEmailChanged, {
    detail,
    bubbles:  true,
    composed: true
  }));

}
