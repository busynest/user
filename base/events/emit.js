const travel = { bubbles: true, composed: true };
export function toPwaUser(user) {
    if (!user)
        return null;
    return {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified === true
    };
}
export function emitWindow(name, detail) {
    window.dispatchEvent(new CustomEvent(name, { ...travel, detail }));
}
export function emitElement(target, name, detail) {
    target.dispatchEvent(new CustomEvent(name, { ...travel, detail }));
}
export function toAuthError(error) {
    if (typeof error === 'object' && error !== null && 'code' in error) {
        const code = String(error.code);
        const message = error instanceof Error ? error.message : code;
        return { code, message };
    }
    return {
        code: 'pwa/unknown',
        message: error instanceof Error ? error.message : 'Authentication failed'
    };
}
//# sourceMappingURL=emit.js.map