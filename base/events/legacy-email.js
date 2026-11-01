export const userEmailChanged = 'userEmailChanged';
export function emitLegacyEmailChanged(detail) {
    window.dispatchEvent(new CustomEvent(userEmailChanged, {
        detail,
        bubbles: true,
        composed: true
    }));
}
//# sourceMappingURL=legacy-email.js.map