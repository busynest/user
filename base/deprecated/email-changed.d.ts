import type { PwaEmailChangedDetail } from '../events/types';
/** @deprecated Optional - window event userEmailChanged. Required - listen for pwa-email-changed. */
export declare const userEmailChanged = "userEmailChanged";
export declare function emitLegacyEmailChanged(detail: PwaEmailChangedDetail): void;
