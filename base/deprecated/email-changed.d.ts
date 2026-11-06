import type { PwaEmailChangedDetail } from '../events/types.js';
/** @deprecated Optional - window event userEmailChanged. Required - listen for pwa-email-changed. */
export declare const userEmailChanged = "userEmailChanged";
/** @deprecated Optional - kept so pages that already listen keep working. */
export declare function emitLegacyEmailChanged(detail: PwaEmailChangedDetail): void;
//# sourceMappingURL=email-changed.d.ts.map