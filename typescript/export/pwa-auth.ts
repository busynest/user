export { UserLogin }            from '../webcomponents/login/page.js';
export { UserDrawer }           from '../webcomponents/drawer/drawer.js';
export { UserSettings }         from '../webcomponents/settings/settings.js';
export { UserIcon }             from '../webcomponents/icon/icon.js';
export { EmailReset }           from '../webcomponents/form/forgot.js';
export { firebaseConfig, application, db, storage, auth, user, initialize } from '../firebase/authentication.js';
export type { InitializeOptions } from '../firebase/authentication.js';
export { logOut, logAccount, logAccountDelete, deleteDocument, pwaDrawerToggle, reauthenticate } from "../firebase/interface.js";
export { getCurrentUser, onUserChanged } from '../api/user.js';
export { sendVerification, isEmailVerified } from '../api/verify.js';
export { openDrawer, closeDrawer, toggleDrawer } from '../api/drawer.js';
export {
  pwaAuthChanged,
  pwaLogin,
  pwaLogout,
  pwaSignup,
  pwaAccountDeleted,
  pwaProfileUpdated,
  pwaEmailChanged,
  pwaPasswordChanged,
  pwaResetSent,
  pwaDrawerToggleName,
  pwaSettings,
  pwaAuthError,
  eventName
} from '../events/names.js';
export type {
  PwaUser,
  PwaAuthChangedDetail,
  PwaLoginDetail,
  PwaLogoutDetail,
  PwaSignupDetail,
  PwaAccountDeletedDetail,
  PwaProfileUpdatedDetail,
  PwaEmailChangedDetail,
  PwaPasswordChangedDetail,
  PwaResetSentDetail,
  PwaDrawerToggleDetail,
  PwaSettingsDetail,
  PwaAuthErrorDetail,
  PwaEventMap
} from '../events/types.js';
export { userEmailChanged } from '../events/legacy-email.js';
export { pwaVerificationSent, pwaEmailVerified } from '../events/names.js';
export type { PwaVerificationSentDetail, PwaEmailVerifiedDetail } from '../events/types.js';
