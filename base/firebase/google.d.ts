/** Required - the opened form reads this once after a redirect. */
export declare function takeGoogleNotice(): {
    code: string;
    message: string;
} | null;
/** Required - phones use a full-page redirect. Popups are blocked there. */
export declare function prefersGoogleRedirect(ua: string): boolean;
export type GoogleSignInResult = 'ok' | 'quiet' | 'redirect';
/** Required - popup first. Redirect when the browser blocks it, or on a phone. */
export declare function signInWithGoogle(ua?: string): Promise<GoogleSignInResult>;
/** Required - read the redirect once the app exists. Null means there was none. */
export declare function watchGoogleRedirect(): void;
//# sourceMappingURL=google.d.ts.map