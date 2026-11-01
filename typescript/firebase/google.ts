import {
  GoogleAuthProvider,
  getRedirectResult,
  signInWithPopup,
  signInWithRedirect
} from 'firebase/auth';

import { auth, onReady } from './authentication.js';
import { toAuthError } from '../events/emit.js';

const quiet = new Set([
  'auth/popup-closed-by-user',
  'auth/cancelled-popup-request',
  'auth/user-cancelled'
]);

let notice: { code: string; message: string } | null = null;
let watching = false;

/** Required - the opened form reads this once after a redirect. */
export function takeGoogleNotice(): { code: string; message: string } | null {
  const found = notice;
  notice = null;
  return found;
}

/** Required - phones use a full-page redirect. Popups are blocked there. */
export function prefersGoogleRedirect(ua: string): boolean {
  return /Android|iPhone|iPad|iPod/i.test(ua);
}

function provider(): GoogleAuthProvider {
  return new GoogleAuthProvider();
}

function remember(error: unknown) {
  notice = toAuthError(error);
}

export type GoogleSignInResult = 'ok' | 'quiet' | 'redirect';

/** Required - popup first. Redirect when the browser blocks it, or on a phone. */
export async function signInWithGoogle(ua?: string): Promise<GoogleSignInResult> {
  const agent = ua ?? (typeof navigator === 'undefined' ? '' : navigator.userAgent);
  if (prefersGoogleRedirect(agent)) {
    await signInWithRedirect(auth, provider());
    return 'redirect';
  }
  try {
    await signInWithPopup(auth, provider());
    return 'ok';
  } catch (error) {
    const code = toAuthError(error).code;
    if (quiet.has(code)) return 'quiet';
    if (code === 'auth/popup-blocked') {
      await signInWithRedirect(auth, provider());
      return 'redirect';
    }
    throw error;
  }
}

/** Required - read the redirect once the app exists. Null means there was none. */
export function watchGoogleRedirect(): void {
  if (watching) return;
  watching = true;
  onReady(() => {
    void getRedirectResult(auth).catch((error: unknown) => {
      remember(error);
    });
  });
}
