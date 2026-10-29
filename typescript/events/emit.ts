import type { PwaAuthErrorDetail, PwaUser } from './types';

/** Required - cross the shadow root and bubble. */
const travel = { bubbles: true, composed: true };

/** Required - copy the fields a host is allowed to read. */
export function toPwaUser(user: {
  uid:            string;
  displayName:    string | null;
  email:          string | null;
  photoURL:       string | null;
  emailVerified?: boolean;
} | null): PwaUser | null {

  if (!user) return null;

  return {
    uid:            user.uid,
    displayName:    user.displayName,
    email:          user.email,
    photoURL:       user.photoURL,
    emailVerified:  user.emailVerified === true
  };

}

/** Required - global events go on window. */
export function emitWindow<T>(name: string, detail: T): void {
  window.dispatchEvent(new CustomEvent(name, { ...travel, detail }));
}

/** Required - UI events go on the element. */
export function emitElement<T>(target: EventTarget, name: string, detail: T): void {
  target.dispatchEvent(new CustomEvent(name, { ...travel, detail }));
}

/** Required - Firebase errors carry code. Other throws get pwa/unknown. */
export function toAuthError(error: unknown): PwaAuthErrorDetail {

  if (typeof error === 'object' && error !== null && 'code' in error) {
    const code = String((error as { code: unknown }).code);
    const message = error instanceof Error ? error.message : code;
    return { code, message };
  }

  return {
    code:     'pwa/unknown',
    message:  error instanceof Error ? error.message : 'Authentication failed'
  };

}
