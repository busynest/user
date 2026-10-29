import { onAuthStateChanged, sendEmailVerification } from 'firebase/auth';

import { auth, emailActionCodeSettings, isReady, onReady } from '../firebase/authentication';
import { pwaAuthError, pwaEmailVerified, pwaVerificationSent } from '../events/names';
import { emitWindow, toAuthError, toPwaUser } from '../events/emit';
import store from '../store';
import { accVerified } from '../redux/backend';

/** Required - last uid we have already announced, so a reload does not repeat the event. */
let trackedUid = '';

/** Required - emailVerified for that uid the last time we looked. */
let trackedVerified = false;

let watching = false;

/** Required - true only when this same account moves from unverified to verified. */
function remember(user: { uid: string; emailVerified?: boolean } | null): boolean {

  if (!user) {
    trackedUid = '';
    trackedVerified = false;
    return false;
  }

  const verified = user.emailVerified === true;

  if (user.uid !== trackedUid) {
    trackedUid = user.uid;
    trackedVerified = verified;
    return false;
  }

  if (!trackedVerified && verified) {
    trackedVerified = true;
    return true;
  }

  trackedVerified = verified;
  return false;

}

function announce(user: {
  uid:            string;
  displayName:    string | null;
  email:          string | null;
  photoURL:       string | null;
  emailVerified?: boolean;
}): void {

  store.dispatch(accVerified(true));
  const person = toPwaUser({ ...user, emailVerified: true });
  if (person) emitWindow(pwaEmailVerified, { user: person });

}

/** Required - reload, then report. Network errors stay quiet unless the host asked. */
export async function refreshEmailVerified(reportError: boolean): Promise<boolean> {

  if (!isReady()) return false;

  const current = auth.currentUser;

  if (!current) {
    remember(null);
    return false;
  }

  try {
    await current.reload();
  } catch (error) {
    if (reportError) emitWindow(pwaAuthError, toAuthError(error));
    return current.emailVerified === true;
  }

  store.dispatch(accVerified(current.emailVerified === true));

  if (remember(current)) announce(current);

  return current.emailVerified === true;

}

function onFocus(): void {
  void refreshEmailVerified(false);
}

function onVisible(): void {
  if (document.visibilityState === 'visible') void refreshEmailVerified(false);
}

/** Required - focus and visibility, for a link opened in another tab. */
function watchEmailVerified(): void {

  if (watching) return;
  watching = true;

  onReady(() => {

    onAuthStateChanged(auth, (user) => {
      if (user && remember(user)) announce(user);
      if (!user) remember(null);
    });

    if (typeof window === 'undefined') return;

    window.addEventListener('focus', onFocus);
    document.addEventListener('visibilitychange', onVisible);

  });

}

watchEmailVerified();

function fail(code: string, message: string): never {
  const detail = { code, message };
  emitWindow(pwaAuthError, detail);
  throw Object.assign(new Error(message), detail);
}

/** Required - sendEmailVerification for the signed-in user. Fires pwa-verification-sent. */
export async function sendVerification(): Promise<boolean> {

  if (!isReady()) fail('pwa/not-ready', 'Sign-in is not ready yet.');

  const current = auth.currentUser;

  if (!current) fail('pwa/signed-out', 'Sign in first.');

  if (!current.email) fail('pwa/missing-email', 'Enter an email address.');

  if (current.emailVerified) return false;

  const settings = emailActionCodeSettings();

  try {
    if (settings) await sendEmailVerification(current, settings);
    else await sendEmailVerification(current);
  } catch (error) {
    emitWindow(pwaAuthError, toAuthError(error));
    throw error;
  }

  emitWindow(pwaVerificationSent, { email: current.email });
  return true;

}

/** Required - reload the signed-in user. Fires pwa-email-verified when it becomes true. */
export async function isEmailVerified(): Promise<boolean> {
  return refreshEmailVerified(true);
}
