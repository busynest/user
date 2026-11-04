/** Required - window. Every onAuthStateChanged. */
export declare const pwaAuthChanged = "pwa-auth-changed";
/** Required - window. Email and password sign-in succeeded. */
export declare const pwaLogin = "pwa-login";
/** Required - window. signOut finished. */
export declare const pwaLogout = "pwa-logout";
/** Required - window. createUser succeeded. */
export declare const pwaSignup = "pwa-signup";
/** Required - window. The auth user was deleted. */
export declare const pwaAccountDeleted = "pwa-account-deleted";
/** Required - window. Display name or photo saved. */
export declare const pwaProfileUpdated = "pwa-profile-updated";
/** Required - window. verifyBeforeUpdateEmail accepted the address. */
export declare const pwaEmailChanged = "pwa-email-changed";
/** Required - window. updatePassword succeeded. Detail is the uid only. */
export declare const pwaPasswordChanged = "pwa-password-changed";
/** Required - window. Password reset accepted. Same event when no account uses the address. */
export declare const pwaResetSent = "pwa-reset-sent";
/** Required - element. Drawer open flag changed. The string is pwa-drawer-toggle. */
export declare const pwaDrawerToggleName = "pwa-drawer-toggle";
/** Required - element. Settings was chosen. url is empty when the host has no route. */
export declare const pwaSettings = "pwa-settings";
/** Required - window. An account action failed. */
export declare const pwaAuthError = "pwa-auth-error";
/** Required - window. sendEmailVerification accepted the message. */
export declare const pwaVerificationSent = "pwa-verification-sent";
/** Required - window. A reload saw emailVerified become true. */
export declare const pwaEmailVerified = "pwa-email-verified";
/** Required - one object so emitters share these strings. */
export declare const eventName: {
    readonly authChanged: "pwa-auth-changed";
    readonly login: "pwa-login";
    readonly logout: "pwa-logout";
    readonly signup: "pwa-signup";
    readonly accountDeleted: "pwa-account-deleted";
    readonly profileUpdated: "pwa-profile-updated";
    readonly emailChanged: "pwa-email-changed";
    readonly passwordChanged: "pwa-password-changed";
    readonly resetSent: "pwa-reset-sent";
    readonly drawerToggle: "pwa-drawer-toggle";
    readonly settings: "pwa-settings";
    readonly authError: "pwa-auth-error";
    readonly verificationSent: "pwa-verification-sent";
    readonly emailVerified: "pwa-email-verified";
};
//# sourceMappingURL=names.d.ts.map