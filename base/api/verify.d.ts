/** Required - reload, then report. Network errors stay quiet unless the host asked. */
export declare function refreshEmailVerified(reportError: boolean): Promise<boolean>;
/** Required - sendEmailVerification for the signed-in user. Fires pwa-verification-sent. */
export declare function sendVerification(): Promise<boolean>;
/** Required - reload the signed-in user. Fires pwa-email-verified when it becomes true. */
export declare function isEmailVerified(): Promise<boolean>;
//# sourceMappingURL=verify.d.ts.map