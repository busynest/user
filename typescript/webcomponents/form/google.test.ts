import { beforeEach, describe, expect, it, vi } from 'vitest';

const firebase = vi.hoisted(() => ({
  currentUser: null as null | {
    uid: string;
    displayName: string | null;
    email: string | null;
    photoURL: string | null;
    emailVerified: boolean;
  },
  listeners: [] as Array<(user: unknown) => void>,
  signInWithPopup: vi.fn(),
  signInWithRedirect: vi.fn(async () => undefined),
  getRedirectResult: vi.fn(async () => null)
}));

vi.mock('firebase/app', () => ({
  initializeApp: vi.fn((config: object) => ({ name: '[DEFAULT]', options: config }))
}));

vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(() => ({
    get currentUser() { return firebase.currentUser; },
    useDeviceLanguage() { return undefined; }
  })),
  onAuthStateChanged: vi.fn((_auth: unknown, callback: (user: unknown) => void) => {
    firebase.listeners.push(callback);
    callback(firebase.currentUser);
    return () => undefined;
  }),
  signInWithEmailAndPassword: vi.fn(),
  createUserWithEmailAndPassword: vi.fn(),
  sendPasswordResetEmail: vi.fn(),
  sendEmailVerification: vi.fn(),
  signOut: vi.fn(),
  updateProfile: vi.fn(),
  updatePassword: vi.fn(),
  EmailAuthProvider: { credential: vi.fn() },
  reauthenticateWithCredential: vi.fn(),
  GoogleAuthProvider: class GoogleAuthProvider {},
  signInWithPopup: firebase.signInWithPopup,
  signInWithRedirect: firebase.signInWithRedirect,
  getRedirectResult: firebase.getRedirectResult
}));

vi.mock('firebase/firestore', () => ({
  getFirestore: vi.fn(() => ({})),
  doc: vi.fn(),
  deleteDoc: vi.fn()
}));

vi.mock('firebase/storage', () => ({
  getStorage: vi.fn(() => ({})),
  ref: vi.fn(),
  deleteObject: vi.fn(),
  listAll: vi.fn(async () => ({ items: [], prefixes: [] }))
}));

vi.mock('firebase/analytics', () => ({
  getAnalytics: vi.fn(() => ({})),
  isSupported: vi.fn(async () => false),
  logEvent: vi.fn()
}));

import { initialize } from '../../../base/firebase/authentication.js';
import store from '../../../base/store.js';
import '../../../base/webcomponents/form/login.js';
import '../../../base/webcomponents/form/signup.js';
import '../../../base/webcomponents/drawer/drawer.js';

function firebaseError(code: string) {
  const error = new Error(code) as Error & { code: string };
  error.code = code;
  return error;
}

describe('Continue with Google button', () => {

  beforeEach(() => {
    document.body.replaceChildren();
    firebase.currentUser = null;
    firebase.signInWithPopup.mockReset();
    initialize({ config: { apiKey: 'test', projectId: 'test' } });
  });

  it('shows the button on both forms and hides it with hide-google', async () => {
    const login = document.createElement('form-login') as HTMLElement & { updateComplete: Promise<unknown>; hideGoogle: boolean };
    const signup = document.createElement('form-signup') as HTMLElement & { updateComplete: Promise<unknown>; hideGoogle: boolean };
    login.className = 'opened';
    signup.className = 'opened';
    document.body.append(login, signup);
    await login.updateComplete;
    await signup.updateComplete;
    expect(login.shadowRoot!.querySelector('[part="google"]')!.textContent).toContain('Continue with Google');
    expect(signup.shadowRoot!.querySelector('[part="google"] svg')).toBeTruthy();

    login.hideGoogle = true;
    signup.hideGoogle = true;
    await login.updateComplete;
    await signup.updateComplete;
    expect(login.shadowRoot!.querySelector('[part="google"]')).toBeNull();
    expect(signup.shadowRoot!.querySelector('[part="google"]')).toBeNull();
  });

  it('writes the other-credential sentence and stays quiet when the popup closes', async () => {
    const login = document.createElement('form-login') as HTMLElement & { updateComplete: Promise<unknown> };
    login.className = 'opened';
    document.body.append(login);
    await login.updateComplete;

    firebase.signInWithPopup.mockRejectedValueOnce(firebaseError('auth/account-exists-with-different-credential'));
    (login.shadowRoot!.querySelector('[part="google"]') as HTMLButtonElement).click();
    await login.updateComplete;
    await vi.waitFor(() => {
      expect(login.shadowRoot!.querySelector('[role="status"]')!.textContent)
        .toBe('That email already has an account. Sign in with email and password.');
    });

    firebase.signInWithPopup.mockRejectedValueOnce(firebaseError('auth/popup-closed-by-user'));
    (login.shadowRoot!.querySelector('[part="google"]') as HTMLButtonElement).click();
    await login.updateComplete;
    await vi.waitFor(() => {
      expect(login.shadowRoot!.querySelector('[role="status"]')!.textContent).toBe('');
    });
  });

  it('shows the verified mark for a Google account', async () => {
    firebase.currentUser = {
      uid: 'g1',
      displayName: 'Ada',
      email: 'ada@gmail.com',
      photoURL: null,
      emailVerified: true
    };
    firebase.listeners.forEach((callback) => callback(firebase.currentUser));
    const state = store.getState();
    expect(firebase.listeners.length).toBeGreaterThan(0);
    expect(state.session.login).toBe(true);
    expect(state.session.verified).toBe(true);
    const drawer = document.createElement('user-drawer') as HTMLElement & { updateComplete: Promise<unknown> };
    document.body.append(drawer);
    await drawer.updateComplete;
    expect(drawer.shadowRoot!.querySelector('[part="verified"]')).toBeTruthy();
    expect(drawer.shadowRoot!.textContent).not.toContain('Not verified');
  });

});
