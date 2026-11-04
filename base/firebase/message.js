import { toAuthError } from '../events/emit.js';
import { passwordLong, passwordMismatch, passwordShort } from './password.js';
/** Required - plain sentences for the codes the forms actually hit. */
const known = {
    'auth/invalid-email': 'Enter a valid email address.',
    'auth/user-not-found': 'No account uses that email.',
    'auth/wrong-password': 'That password is wrong.',
    'auth/invalid-credential': 'That email or password is wrong.',
    'auth/invalid-login-credentials': 'That email or password is wrong.',
    'auth/user-token-expired': 'This account is no longer available.',
    'auth/invalid-user-token': 'This account is no longer available.',
    'auth/user-disabled': 'This account is disabled.',
    'auth/email-already-in-use': 'An account already uses that email.',
    'auth/account-exists-with-different-credential': 'That email already has an account. Sign in with email and password.',
    'auth/weak-password': passwordShort,
    'auth/too-many-requests': 'Too many tries. Wait and try again.',
    'auth/network-request-failed': 'Network problem. Try again.',
    'auth/requires-recent-login': 'Sign in again, then retry.',
    'pwa/missing-email': 'Enter an email address.',
    'pwa/invalid-email': 'Enter a valid email address.',
    'pwa/missing-password': 'Enter a password.',
    'pwa/short-password': passwordShort,
    'pwa/long-password': passwordLong,
    'pwa/current-password': 'Enter your current password.',
    'pwa/password-mismatch': passwordMismatch,
    'pwa/weak-password': passwordShort,
    'pwa/signed-out': 'Sign in first.',
    'pwa/missing-file': 'Choose a photo first.',
    'pwa/not-image': 'Choose an image file.',
    'pwa/photo-too-large': 'Choose an image under 5 MB.',
    'pwa/photo-unreadable': 'That image could not be prepared. Try another.',
    'pwa/not-ready': 'Sign-in is not ready yet.',
    'pwa/unknown': 'Something went wrong. Try again.'
};
/** Required - sentence for the form. The event still carries the raw code. */
export function userMessage(error) {
    const detail = toAuthError(error);
    return known[detail.code] ?? 'Something went wrong. Try again.';
}
//# sourceMappingURL=message.js.map