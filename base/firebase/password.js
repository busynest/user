/** Required - NIST SP 800-63B. Length only. No composition rules. No trim. No truncation. */
export const passwordMin = 8;
/** Required - at least 64. 128 is the field cap. */
export const passwordMax = 128;
export const passwordHint = 'At least 8 characters. A passphrase works well.';
export const passwordShort = 'Use at least 8 characters.';
export const passwordLong = 'Use at most 128 characters.';
export const passwordMismatch = "Passwords don't match.";
/** Required - a new password. Spaces and other characters count. The string is not cut. */
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