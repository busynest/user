export interface PwaUser {
    uid: string;
    displayName: string | null;
    email: string | null;
    photoURL: string | null;
}
export interface PwaAuthChangedDetail {
    user: PwaUser | null;
}
export interface PwaLoginDetail {
    user: PwaUser;
}
export interface PwaLogoutDetail {
    user: null;
}
export interface PwaSignupDetail {
    user: PwaUser;
}
export interface PwaAccountDeletedDetail {
    uid: string;
}
export interface PwaProfileUpdatedDetail {
    uid: string;
    displayName: string | null;
    photoURL: string | null;
}
export interface PwaEmailChangedDetail {
    email: string;
}
export interface PwaPasswordChangedDetail {
    uid: string;
}
export interface PwaResetSentDetail {
    email: string;
}
export interface PwaDrawerToggleDetail {
    open: boolean;
}
export interface PwaAuthErrorDetail {
    code: string;
    message: string;
}
export interface PwaEventMap {
    'pwa-auth-changed': CustomEvent<PwaAuthChangedDetail>;
    'pwa-login': CustomEvent<PwaLoginDetail>;
    'pwa-logout': CustomEvent<PwaLogoutDetail>;
    'pwa-signup': CustomEvent<PwaSignupDetail>;
    'pwa-account-deleted': CustomEvent<PwaAccountDeletedDetail>;
    'pwa-profile-updated': CustomEvent<PwaProfileUpdatedDetail>;
    'pwa-email-changed': CustomEvent<PwaEmailChangedDetail>;
    'pwa-password-changed': CustomEvent<PwaPasswordChangedDetail>;
    'pwa-reset-sent': CustomEvent<PwaResetSentDetail>;
    'pwa-drawer-toggle': CustomEvent<PwaDrawerToggleDetail>;
    'pwa-auth-error': CustomEvent<PwaAuthErrorDetail>;
}
