/** Required - window. Every onAuthStateChanged. */
export const pwaAuthChanged = 'pwa-auth-changed';

/** Required - window. Email and password sign-in succeeded. */
export const pwaLogin = 'pwa-login';

/** Required - window. signOut finished. */
export const pwaLogout = 'pwa-logout';

/** Required - window. createUser succeeded. */
export const pwaSignup = 'pwa-signup';

/** Required - window. The auth user was deleted. */
export const pwaAccountDeleted = 'pwa-account-deleted';

/** Required - window. Display name or photo saved. */
export const pwaProfileUpdated = 'pwa-profile-updated';

/** Required - window. verifyBeforeUpdateEmail accepted the address. */
export const pwaEmailChanged = 'pwa-email-changed';

/** Required - window. updatePassword succeeded. Detail is the uid only. */
export const pwaPasswordChanged = 'pwa-password-changed';

/** Required - window. Password reset accepted. Same event when no account uses the address. */
export const pwaResetSent = 'pwa-reset-sent';

/** Required - element. Drawer open flag changed. The string is pwa-drawer-toggle. */
export const pwaDrawerToggleName = 'pwa-drawer-toggle';

/** Required - window. An account action failed. */
export const pwaAuthError = 'pwa-auth-error';

/** Required - one object so emitters share these strings. */
export const eventName = {
  authChanged:      pwaAuthChanged,
  login:            pwaLogin,
  logout:           pwaLogout,
  signup:           pwaSignup,
  accountDeleted:   pwaAccountDeleted,
  profileUpdated:   pwaProfileUpdated,
  emailChanged:     pwaEmailChanged,
  passwordChanged:  pwaPasswordChanged,
  resetSent:        pwaResetSent,
  drawerToggle:     pwaDrawerToggleName,
  authError:        pwaAuthError
} as const;
