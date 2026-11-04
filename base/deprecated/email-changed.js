/** @deprecated Optional - window event userEmailChanged. Required - listen for pwa-email-changed. */
export const userEmailChanged = 'userEmailChanged';
/** @deprecated Optional - kept so pages that already listen keep working. */
export function emitLegacyEmailChanged(detail) {
    window.dispatchEvent(new CustomEvent(userEmailChanged, {
        detail,
        bubbles: true,
        composed: true
    }));
}
//# sourceMappingURL=email-changed.js.map