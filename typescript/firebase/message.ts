import { toAuthError } from '../events/emit';

/** Required - plain sentences for the codes the forms actually hit. */
const known: Record<string, string> = {
  'auth/invalid-email':           'Enter a valid email address.',
  'auth/user-not-found':          'No account uses that email.',
  'auth/wrong-password':          'That password is wrong.',
  'auth/invalid-credential':      'That email or password is wrong.',
  'auth/email-already-in-use':    'An account already uses that email.',
  'auth/weak-password':           'Use at least 8 characters with letters and numbers.',
  'auth/too-many-requests':       'Too many tries. Wait and try again.',
  'auth/network-request-failed':  'Network problem. Try again.',
  'auth/requires-recent-login':   'Sign in again, then retry.',
  'auth/user-disabled':           'This account is disabled.',
  'pwa/missing-email':            'Enter an email address.',
  'pwa/missing-password':         'Enter a password.',
  'pwa/password-mismatch':        'Those passwords do not match.',
  'pwa/weak-password':            'Use at least 8 characters with letters and numbers.',
  'pwa/signed-out':               'Sign in first.',
  'pwa/missing-file':             'Choose a photo first.',
  'pwa/not-ready':                'Sign-in is not ready yet.',
  'pwa/unknown':                  'Something went wrong. Try again.'
};

/** Required - sentence for an alert. The event still carries the raw code. */
export function userMessage(error: unknown): string {
  const detail = toAuthError(error);
  return known[detail.code] ?? 'Something went wrong. Try again.';
}
