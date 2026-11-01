import { beforeEach, describe, expect, it, vi } from 'vitest';

const firebase = vi.hoisted(() => ({
  signInWithPopup: vi.fn(),
  signInWithRedirect: vi.fn(async () => undefined),
  getRedirectResult: vi.fn(async () => null)
}));

vi.mock('firebase/app', () => ({
  initializeApp: vi.fn((config: object) => ({ name: '[DEFAULT]', options: config }))
}));

vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(() => ({ currentUser: null })),
  onAuthStateChanged: vi.fn(() => () => undefined),
  GoogleAuthProvider: class GoogleAuthProvider {},
  signInWithPopup: firebase.signInWithPopup,
  signInWithRedirect: firebase.signInWithRedirect,
  getRedirectResult: firebase.getRedirectResult
}));

vi.mock('firebase/firestore', () => ({ getFirestore: vi.fn(() => ({})) }));
vi.mock('firebase/storage', () => ({ getStorage: vi.fn(() => ({})) }));

import { initialize } from './authentication.js';
import { prefersGoogleRedirect, signInWithGoogle, takeGoogleNotice, watchGoogleRedirect } from './google.js';
import { userMessage } from './message.js';

function firebaseError(code: string) {
  const error = new Error(code) as Error & { code: string };
  error.code = code;
  return error;
}

describe('Google sign-in', () => {

  beforeEach(() => {
    firebase.signInWithPopup.mockReset();
    firebase.signInWithRedirect.mockReset();
    firebase.signInWithRedirect.mockResolvedValue(undefined);
    firebase.getRedirectResult.mockReset();
    firebase.getRedirectResult.mockResolvedValue(null);
    takeGoogleNotice();
    initialize({ config: { apiKey: 'test', projectId: 'test' } });
  });

  it('uses a redirect on a phone and does not open a popup', async () => {
    expect(prefersGoogleRedirect('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)')).toBe(true);
    await expect(signInWithGoogle('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)')).resolves.toBe('redirect');
    expect(firebase.signInWithRedirect).toHaveBeenCalledOnce();
    expect(firebase.signInWithPopup).not.toHaveBeenCalled();
  });

  it('signs in with a popup on a desktop', async () => {
    firebase.signInWithPopup.mockResolvedValue({
      user: { uid: 'g1', email: 'ada@gmail.com', emailVerified: true, displayName: 'Ada', photoURL: null }
    });
    await expect(signInWithGoogle('Mozilla/5.0 (X11; Linux x86_64)')).resolves.toBe('ok');
    expect(firebase.signInWithPopup).toHaveBeenCalledOnce();
  });

  it('stays quiet when the person closes the popup', async () => {
    firebase.signInWithPopup.mockRejectedValue(firebaseError('auth/popup-closed-by-user'));
    await expect(signInWithGoogle('Mozilla/5.0 (X11; Linux x86_64)')).resolves.toBe('quiet');
    expect(takeGoogleNotice()).toBeNull();
  });

  it('falls back to redirect when the popup is blocked', async () => {
    firebase.signInWithPopup.mockRejectedValue(firebaseError('auth/popup-blocked'));
    await expect(signInWithGoogle('Mozilla/5.0 (X11; Linux x86_64)')).resolves.toBe('redirect');
    expect(firebase.signInWithRedirect).toHaveBeenCalledOnce();
  });

  it('names the email-password account when Google is the other credential', () => {
    expect(userMessage(firebaseError('auth/account-exists-with-different-credential')))
      .toBe('That email already has an account. Sign in with email and password.');
  });

  it('keeps a redirect error for the opened form', async () => {
    firebase.getRedirectResult.mockRejectedValue(firebaseError('auth/account-exists-with-different-credential'));
    watchGoogleRedirect();
    await vi.waitFor(() => {
      expect(takeGoogleNotice()?.code).toBe('auth/account-exists-with-different-credential');
    });
  });

});
