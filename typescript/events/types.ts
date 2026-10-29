/** Required - public user. No Firebase class leaks out. */
export interface PwaUser {
  uid:          string;
  displayName:  string | null;
  email:        string | null;
  photoURL:     string | null;
}

/** Required - pwa-auth-changed. user is null when signed out. */
export interface PwaAuthChangedDetail {
  user: PwaUser | null;
}

/** Required - pwa-login. */
export interface PwaLoginDetail {
  user: PwaUser;
}

/** Required - pwa-logout. */
export interface PwaLogoutDetail {
  user: null;
}

/** Required - pwa-signup. */
export interface PwaSignupDetail {
  user: PwaUser;
}

/** Required - pwa-account-deleted. */
export interface PwaAccountDeletedDetail {
  uid: string;
}

/** Required - pwa-profile-updated. */
export interface PwaProfileUpdatedDetail {
  uid:          string;
  displayName:  string | null;
  photoURL:     string | null;
}

/** Required - pwa-email-changed. Same shape as the legacy window event. */
export interface PwaEmailChangedDetail {
  email: string;
}

/** Required - pwa-password-changed. The new password stays off this event. */
export interface PwaPasswordChangedDetail {
  uid: string;
}

/** Required - pwa-reset-sent. Same detail whether or not the account exists. */
export interface PwaResetSentDetail {
  email: string;
}

/** Required - pwa-drawer-toggle. */
export interface PwaDrawerToggleDetail {
  open: boolean;
}

/** Required - pwa-auth-error. */
export interface PwaAuthErrorDetail {
  code:     string;
  message:  string;
}

/** Required - map a name to its CustomEvent. */
export interface PwaEventMap {
  'pwa-auth-changed':     CustomEvent<PwaAuthChangedDetail>;
  'pwa-login':            CustomEvent<PwaLoginDetail>;
  'pwa-logout':           CustomEvent<PwaLogoutDetail>;
  'pwa-signup':           CustomEvent<PwaSignupDetail>;
  'pwa-account-deleted':  CustomEvent<PwaAccountDeletedDetail>;
  'pwa-profile-updated':  CustomEvent<PwaProfileUpdatedDetail>;
  'pwa-email-changed':    CustomEvent<PwaEmailChangedDetail>;
  'pwa-password-changed': CustomEvent<PwaPasswordChangedDetail>;
  'pwa-reset-sent':       CustomEvent<PwaResetSentDetail>;
  'pwa-drawer-toggle':    CustomEvent<PwaDrawerToggleDetail>;
  'pwa-auth-error':       CustomEvent<PwaAuthErrorDetail>;
}
