export declare function takeGoogleNotice(): {
    code: string;
    message: string;
} | null;
export declare function prefersGoogleRedirect(ua: string): boolean;
export type GoogleSignInResult = 'ok' | 'quiet' | 'redirect';
export declare function signInWithGoogle(ua?: string): Promise<GoogleSignInResult>;
export declare function watchGoogleRedirect(): void;
//# sourceMappingURL=google.d.ts.map