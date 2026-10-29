import { beforeEach, describe, expect, it, vi } from 'vitest';

const firebase = vi.hoisted(() => {
  return {
    signInWithCredential: vi.fn(async () => ({
      user: {
        uid: '1',
        displayName: 'Ada',
        email: 'ada@example.com',
        photoURL: null
      }
    })),
    signOut: vi.fn(async () => undefined),
    currentUser: null as null | { uid: string }
  };
});

vi.mock('firebase/app', () => ({
  initializeApp: vi.fn((config: object) => ({ name: '[DEFAULT]', options: config }))
}));

vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(() => ({
    get currentUser() { return firebase.currentUser; },
    useDeviceLanguage() { return undefined; }
  })),
  onAuthStateChanged: vi.fn((_auth: unknown, callback: (user: unknown) => void) => {
    callback(firebase.currentUser);
    return () => undefined;
  }),
  EmailAuthProvider: {
    credential: (email: string, password: string) => ({ email, password })
  },
  signInWithCredential: firebase.signInWithCredential,
  signOut: firebase.signOut
}));

vi.mock('firebase/firestore', () => ({
  getFirestore: vi.fn(() => ({})),
  doc: vi.fn(),
  deleteDoc: vi.fn()
}));

vi.mock('firebase/storage', () => ({
  getStorage: vi.fn(() => ({})),
  deleteObject: vi.fn(),
  listAll: vi.fn(async () => ({ items: [], prefixes: [] })),
  ref: vi.fn()
}));

vi.mock('firebase/analytics', () => ({
  getAnalytics: vi.fn(() => ({})),
  isSupported: vi.fn(async () => false),
  logEvent: vi.fn()
}));

/* Required - the tsc emit. The test runner does not lower legacy decorators. */
import { initialize } from '../../../base/firebase/authentication.js';
import { logOut } from '../../../base/firebase/interface.js';
import { openDrawer } from '../../../base/api/drawer.js';
import { pwaAuthError, pwaDrawerToggleName, pwaLogin, pwaLogout } from '../../../base/events/names.js';
import '../../../base/webcomponents/form/login.js';
import '../../../base/webcomponents/drawer/drawer.js';

function heard(name: string) {
  const seen: CustomEvent[] = [];
  const onEvent = (event: Event) => { seen.push(event as CustomEvent); };
  window.addEventListener(name, onEvent);
  return {
    seen,
    stop() { window.removeEventListener(name, onEvent); }
  };
}

describe('sign-in and sign-out', () => {

  beforeEach(() => {
    firebase.signInWithCredential.mockClear();
    firebase.signOut.mockClear();
    window.alert = vi.fn();
    document.body.replaceChildren();
    initialize({
      config: {
        apiKey: 'test',
        authDomain: 'test.firebaseapp.com',
        projectId: 'test'
      }
    });
  });

  it('rejects a short email without calling Firebase', async () => {
    const errors = heard(pwaAuthError);
    const el = document.createElement('form-login');
    document.body.append(el);
    await (el as unknown as { updateComplete: Promise<unknown> }).updateComplete;

    const email = el.shadowRoot!.querySelector('input[type="email"]') as HTMLInputElement;
    const password = el.shadowRoot!.querySelector('input[type="password"]') as HTMLInputElement;
    email.value = 'a';
    password.value = 'secret';
    el.shadowRoot!.querySelector('form')!.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));

    expect(firebase.signInWithCredential).not.toHaveBeenCalled();
    expect(errors.seen[0].detail).toEqual({ code: 'pwa/missing-email', message: 'Enter an email address.' });
    expect(window.alert).toHaveBeenCalledWith('Enter an email address.');
    errors.stop();
  });

  it('signs in and dispatches pwa-login', async () => {
    const logins = heard(pwaLogin);
    const el = document.createElement('form-login');
    document.body.append(el);
    await (el as unknown as { updateComplete: Promise<unknown> }).updateComplete;

    const email = el.shadowRoot!.querySelector('input[type="email"]') as HTMLInputElement;
    const password = el.shadowRoot!.querySelector('input[type="password"]') as HTMLInputElement;
    email.value = 'ada@example.com';
    password.value = 'secret';
    el.shadowRoot!.querySelector('form')!.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(firebase.signInWithCredential).toHaveBeenCalledOnce();
    expect(logins.seen[0].detail.user).toEqual({
      uid: '1',
      displayName: 'Ada',
      email: 'ada@example.com',
      photoURL: null
    });
    logins.stop();
  });

  it('signs out and dispatches pwa-logout', async () => {
    const outs = heard(pwaLogout);
    await logOut();
    expect(firebase.signOut).toHaveBeenCalledOnce();
    expect(outs.seen[0].detail).toEqual({ user: null });
    outs.stop();
  });

  it('closes the drawer on Escape', async () => {
    const toggles = heard(pwaDrawerToggleName);
    const drawer = document.createElement('user-drawer') as HTMLElement & { updateComplete: Promise<unknown> };
    document.body.append(drawer);
    await drawer.updateComplete;
    openDrawer();
    await drawer.updateComplete;
    expect(drawer.hasAttribute('drawer')).toBe(true);

    drawer.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await drawer.updateComplete;

    expect(drawer.hasAttribute('drawer')).toBe(false);
    expect(toggles.seen.some((event) => event.detail.open === false)).toBe(true);
    toggles.stop();
  });

});
