/** Required - NIST SP 800-63B. Length only. No composition rules. No trim. No truncation. */
export declare const passwordMin = 8;
/** Required - at least 64. 128 is the field cap. */
export declare const passwordMax = 128;
export declare const passwordHint = "At least 8 characters. A passphrase works well.";
export declare const passwordShort = "Use at least 8 characters.";
export declare const passwordLong = "Use at most 128 characters.";
export declare const passwordMismatch = "Passwords don't match.";
/** Required - a new password. Spaces and other characters count. The string is not cut. */
export declare function newPasswordIssue(value: string): {
    code: string;
    message: string;
} | null;
//# sourceMappingURL=password.d.ts.map