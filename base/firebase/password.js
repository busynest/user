export const passwordMin = 8;
export const passwordMax = 128;
export const passwordHint = 'At least 8 characters. A passphrase works well.';
export const passwordShort = 'Use at least 8 characters.';
export const passwordLong = 'Use at most 128 characters.';
export const passwordMismatch = "Passwords don't match.";
export function newPasswordIssue(value) {
    if (value.length < passwordMin) {
        return { code: 'pwa/short-password', message: passwordShort };
    }
    if (value.length > passwordMax) {
        return { code: 'pwa/long-password', message: passwordLong };
    }
    return null;
}
//# sourceMappingURL=password.js.map