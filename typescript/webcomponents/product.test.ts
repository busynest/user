import { beforeEach, describe, expect, it, vi } from 'vitest';

const firebase = vi.hoisted(() => {
  const user = {
    uid: '1',
    displayName: null as string | null,
    email: 'ada@example.com',
    photoURL: null as string | null,
    emailVerified: false
  };
  return {
    user,
    currentUser: null as null | typeof user,
    signInWithEmailAndPassword: vi.fn(),
    createUserWithEmailAndPassword: vi.fn(),
    sendPasswordResetEmail: vi.fn(async () => undefined),
    sendEmailVerification: vi.fn(async () => undefined),
    updateProfile: vi.fn(async (person: typeof user, profile: { displayName?: string | null; photoURL?: string | null }) => {
      Object.assign(person, profile);
    }),
    updatePassword: vi.fn(async () => undefined),
    signOut: vi.fn(async () => undefined)
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
  signInWithEmailAndPassword: firebase.signInWithEmailAndPassword,
  createUserWithEmailAndPassword: firebase.createUserWithEmailAndPassword,
  sendPasswordResetEmail: firebase.sendPasswordResetEmail,
  sendEmailVerification: firebase.sendEmailVerification,
  updateProfile: firebase.updateProfile,
  signOut: firebase.signOut,
  updatePassword: firebase.updatePassword,
  EmailAuthProvider: { credential: vi.fn() },
  reauthenticateWithCredential: vi.fn(),
  GoogleAuthProvider: class GoogleAuthProvider {},
  signInWithPopup: vi.fn(),
  signInWithRedirect: vi.fn(async () => undefined),
  getRedirectResult: vi.fn(async () => null)
}));

vi.mock('firebase/firestore', () => ({
  getFirestore: vi.fn(() => ({})),
  doc: vi.fn(),
  deleteDoc: vi.fn()
}));

vi.mock('firebase/storage', () => ({
  getStorage: vi.fn(() => ({})),
  ref: vi.fn(),
  uploadBytesResumable: vi.fn(),
  getDownloadURL: vi.fn(),
  updateMetadata: vi.fn(),
  deleteObject: vi.fn(),
  listAll: vi.fn(async () => ({ items: [], prefixes: [] }))
}));

vi.mock('firebase/analytics', () => ({
  getAnalytics: vi.fn(() => ({})),
  isSupported: vi.fn(async () => false),
  logEvent: vi.fn()
}));

import { initialize } from '../../base/firebase/authentication.js';
import store from '../../base/store.js';
import { accEmail, accImage, accName, userAuth } from '../../base/redux/session.js';
import { openDrawer } from '../../base/api/drawer.js';
import { focusable } from './drawer/keys.js';
import { lettersFor, accountTitle } from './form/letters.js';
import { pwaAuthError, pwaResetSent, pwaSettings } from '../events/names.js';
import { userMessage } from '../firebase/message.js';
import { passwordHint, passwordMismatch, passwordShort } from '../firebase/password.js';
import '../../base/webcomponents/form/login.js';
import '../../base/webcomponents/form/signup.js';
import '../../base/webcomponents/drawer/drawer.js';
import '../../base/webcomponents/icon/icon.js';
import '../../base/webcomponents/settings/settings.js';
import '../../base/webcomponents/settings/input/name.js';

function firebaseError(code: string) {
  return Object.assign(new Error('Firebase: Error (' + code + ').'), { code });
}

async function flush(el: { updateComplete: Promise<unknown> }) {
  await el.updateComplete;
  await new Promise((resolve) => setTimeout(resolve, 0));
  await el.updateComplete;
}

describe('account product', () => {

  beforeEach(() => {
    firebase.signInWithEmailAndPassword.mockReset();
    firebase.createUserWithEmailAndPassword.mockReset();
    firebase.sendPasswordResetEmail.mockReset();
    firebase.sendPasswordResetEmail.mockResolvedValue(undefined);
    firebase.sendEmailVerification.mockReset();
    firebase.sendEmailVerification.mockResolvedValue(undefined);
    firebase.updateProfile.mockClear();
    firebase.currentUser = null;
    window.alert = vi.fn();
    document.body.replaceChildren();
    store.dispatch(userAuth(false));
    store.dispatch(accName(''));
    store.dispatch(accEmail(''));
    store.dispatch(accImage(''));
    initialize({
      config: {
        apiKey: 'test',
        authDomain: 'test.firebaseapp.com',
        projectId: 'test'
      }
    });
  });

  it('names a person from their name or email, never a stand-in', () => {
    expect(lettersFor('Ada Lovelace', 'ada@example.com')).toBe('AL');
    expect(lettersFor('', 'ada@example.com')).toBe('A');
    expect(lettersFor('', '')).toBe('');
    expect(accountTitle('', 'ada@example.com')).toBe('ada@example.com');
    expect(accountTitle('Ada', '')).toBe('Ada');
    expect(accountTitle('', '')).not.toBe('John Doe');
  });

  it('maps wrong password, a missing account, and a disabled account', () => {
    expect(userMessage(firebaseError('auth/wrong-password'))).toBe('That password is wrong.');
    expect(userMessage(firebaseError('auth/invalid-credential'))).toBe('That email or password is wrong.');
    expect(userMessage(firebaseError('auth/user-not-found'))).toBe('No account uses that email.');
    expect(userMessage(firebaseError('auth/user-disabled'))).toBe('This account is disabled.');
    expect(userMessage(firebaseError('auth/user-token-expired'))).toBe('This account is no longer available.');
    expect(userMessage(firebaseError('auth/email-already-in-use'))).toBe('An account already uses that email.');
  });

  it('shows a wrong password in the form and disables the button while it waits', async () => {
    let release: (value: never) => void = () => undefined;
    const gate = new Promise((_resolve, reject) => { release = reject; });
    firebase.signInWithEmailAndPassword.mockReturnValue(gate);
    const errors: CustomEvent[] = [];
    window.addEventListener(pwaAuthError, (event) => { errors.push(event as CustomEvent); });

    const el = document.createElement('form-login') as HTMLElement & { updateComplete: Promise<unknown> };
    document.body.append(el);
    await el.updateComplete;

    const email = el.shadowRoot!.querySelector('input[type="email"]') as HTMLInputElement;
    const password = el.shadowRoot!.querySelector('input[name="password"]') as HTMLInputElement;
    expect(email.getAttribute('autocomplete')).toBe('username');
    expect(password.getAttribute('autocomplete')).toBe('current-password');
    expect(el.shadowRoot!.querySelector('label[for]')!.getAttribute('for')).toBe(email.id);

    email.value = 'ada@example.com';
    password.value = 'secret12';
    el.shadowRoot!.querySelector('form')!.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    await el.updateComplete;

    const button = el.shadowRoot!.querySelector('button[type="submit"]') as HTMLButtonElement;
    expect(button.disabled).toBe(true);
    expect(button.textContent).toContain('Signing in');
    expect(button.getAttribute('aria-busy')).toBe('true');

    release(firebaseError('auth/wrong-password'));
    await flush(el);

    expect(el.shadowRoot!.querySelector('[role="status"]')!.textContent).toBe('That password is wrong.');
    expect(el.shadowRoot!.querySelector('[role="status"]')!.getAttribute('aria-live')).toBe('polite');
    expect(window.alert).not.toHaveBeenCalled();
    expect(errors.at(-1)!.detail.code).toBe('auth/wrong-password');
    expect(button.disabled).toBe(false);
  });

  it('toggles the password and sends a reset from the sign-in form', async () => {
    const sent: CustomEvent[] = [];
    window.addEventListener(pwaResetSent, (event) => { sent.push(event as CustomEvent); });
    const el = document.createElement('form-login') as HTMLElement & { updateComplete: Promise<unknown> };
    document.body.append(el);
    await el.updateComplete;

    const password = el.shadowRoot!.querySelector('input[name="password"]') as HTMLInputElement;
    const reveal = el.shadowRoot!.querySelector('button.reveal') as HTMLButtonElement;
    expect(reveal.getAttribute('aria-label')).toBe('Show password');
    reveal.click();
    await el.updateComplete;
    expect(password.type).toBe('text');
    expect(reveal.getAttribute('aria-pressed')).toBe('true');

    const email = el.shadowRoot!.querySelector('input[type="email"]') as HTMLInputElement;
    email.value = 'ada@example.com';
    (el.shadowRoot!.querySelector('[part="forgot"]') as HTMLButtonElement).click();
    await flush(el);

    expect(firebase.sendPasswordResetEmail).toHaveBeenCalledOnce();
    expect(el.shadowRoot!.querySelector('[role="status"]')!.textContent).toBe('If an account uses that email, a reset link is on its way.');
    expect(sent.at(-1)!.detail).toEqual({ email: 'ada@example.com' });
    expect(window.alert).not.toHaveBeenCalled();
  });

  it('shows the verification notice after sign-up', async () => {
    firebase.createUserWithEmailAndPassword.mockImplementation(async () => {
      firebase.currentUser = {
        uid: '1',
        displayName: null,
        email: 'ada@example.com',
        photoURL: null,
        emailVerified: false
      };
      return { user: firebase.currentUser };
    });
    const el = document.createElement('form-signup') as HTMLElement & { updateComplete: Promise<unknown> };
    document.body.append(el);
    await el.updateComplete;

    const email = el.shadowRoot!.querySelector('input[type="email"]') as HTMLInputElement;
    const password = el.shadowRoot!.querySelector('input[name="new-password"]') as HTMLInputElement;
    expect(email.getAttribute('autocomplete')).toBe('email');
    expect(password.getAttribute('autocomplete')).toBe('new-password');
    email.value = 'ada@example.com';
    password.value = 'secret12';
    el.shadowRoot!.querySelector('form')!.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    await flush(el);

    expect(el.shadowRoot!.textContent).toContain('Check your inbox for the verification email.');
    expect(el.shadowRoot!.querySelector('[part="notice"]')).toBeTruthy();
    expect(window.alert).not.toHaveBeenCalled();
  });

  it('keeps Settings on this page unless url is set', async () => {
    const heard: CustomEvent[] = [];
    window.addEventListener(pwaSettings, (event) => { heard.push(event as CustomEvent); });
    const drawer = document.createElement('user-drawer') as HTMLElement & { updateComplete: Promise<unknown> };
    document.body.append(drawer);
    await drawer.updateComplete;

    const button = drawer.shadowRoot!.querySelector('[part="settings"]') as HTMLButtonElement;
    expect(button.tagName).toBe('BUTTON');
    expect(button.getAttribute('href')).toBeNull();
    const beforeSlot = drawer.shadowRoot!.querySelector('slot[name="before"]') as HTMLSlotElement;
    const defaultSlot = drawer.shadowRoot!.querySelector('slot:not([name])') as HTMLSlotElement;
    expect(beforeSlot.assignedNodes()).toHaveLength(0);
    expect(beforeSlot.textContent).toContain('slotted - before');
    expect(defaultSlot.assignedNodes()).toHaveLength(0);
    expect(defaultSlot.textContent).toContain('slotted - default');

    button.click();
    expect(heard.at(-1)!.detail).toEqual({ url: '' });
    expect(heard.at(-1)!.cancelable).toBe(true);

    drawer.setAttribute('url', '/account');
    await drawer.updateComplete;
    const link = drawer.shadowRoot!.querySelector('[part="settings"]') as HTMLAnchorElement;
    expect(link.tagName).toBe('A');
    expect(link.getAttribute('href')).toBe('/account');
  });

  it('replaces the slot markers, keeps them in the tab order, and closes unless prevented', async () => {
    store.dispatch(userAuth(true));
    const drawer = document.createElement('user-drawer') as HTMLElement & { updateComplete: Promise<unknown> };
    const account = document.createElement('a');
    account.slot = 'before';
    account.href = '#account';
    account.textContent = 'Account';
    const archive = document.createElement('button');
    archive.type = 'button';
    archive.textContent = 'Archive';
    archive.setAttribute('aria-current', 'page');
    drawer.append(account, archive);
    document.body.append(drawer);
    await drawer.updateComplete;

    const beforeSlot = drawer.shadowRoot!.querySelector('slot[name="before"]') as HTMLSlotElement;
    const defaultSlot = drawer.shadowRoot!.querySelector('slot:not([name])') as HTMLSlotElement;
    expect(beforeSlot.assignedNodes()[0]).toBe(account);
    expect(defaultSlot.assignedNodes()[0]).toBe(archive);
    expect(focusable(drawer)).toContain(account);
    expect(focusable(drawer)).toContain(archive);

    openDrawer();
    await drawer.updateComplete;
    expect(drawer.hasAttribute('drawer')).toBe(true);

    account.addEventListener('click', (event) => event.preventDefault());
    account.click();
    await drawer.updateComplete;
    expect(drawer.hasAttribute('drawer')).toBe(true);

    archive.click();
    await drawer.updateComplete;
    expect(drawer.hasAttribute('drawer')).toBe(false);
  });

  it('shows initials and a signed-out settings panel', async () => {
    store.dispatch(userAuth(true));
    store.dispatch(accName('Ada Lovelace'));
    store.dispatch(accEmail('ada@example.com'));

    const icon = document.createElement('user-icon') as HTMLElement & { updateComplete: Promise<unknown> };
    icon.setAttribute('empty', './images/empty.jpg');
    document.body.append(icon);
    await icon.updateComplete;

    expect(icon.shadowRoot!.textContent).toContain('AL');
    expect(icon.shadowRoot!.querySelector('img')).toBeNull();
    expect(icon.shadowRoot!.textContent).not.toContain('Empty Dataset');
    expect(icon.shadowRoot!.textContent).not.toContain('John Doe');

    store.dispatch(userAuth(false));
    const settings = document.createElement('user-settings') as HTMLElement & { updateComplete: Promise<unknown> };
    document.body.append(settings);
    await settings.updateComplete;
    expect(settings.shadowRoot!.textContent).toContain('Sign in to change');
    expect(settings.shadowRoot!.textContent).not.toContain('John Doe');
    expect(settings.shadowRoot!.querySelector('input')).toBeNull();
  });

  it('saves the display name from the field', async () => {
    firebase.currentUser = firebase.user;
    store.dispatch(userAuth(true));
    store.dispatch(accName(''));
    const el = document.createElement('input-name') as HTMLElement & { updateComplete: Promise<unknown> };
    document.body.append(el);
    await el.updateComplete;

    const input = el.shadowRoot!.querySelector('input') as HTMLInputElement;
    expect(input.value).toBe('');
    expect(input.getAttribute('autocomplete')).toBe('name');
    input.value = 'Ada Lovelace';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    el.shadowRoot!.querySelector('form')!.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    await flush(el);

    expect(firebase.updateProfile).toHaveBeenCalledWith(firebase.user, { displayName: 'Ada Lovelace' });
    expect(el.shadowRoot!.textContent).toContain('Name saved.');
    expect(window.alert).not.toHaveBeenCalled();
  });

  it('shows the sign-up hint and rejects a short password without cutting it', async () => {
    const el = document.createElement('form-signup') as HTMLElement & { updateComplete: Promise<unknown> };
    document.body.append(el);
    await el.updateComplete;

    const field = el.shadowRoot!.querySelector('input[name="new-password"]') as HTMLInputElement;
    const hint = el.shadowRoot!.querySelector('.hint') as HTMLElement;
    expect(hint.textContent).toBe(passwordHint);
    expect(field.getAttribute('minlength')).toBe('8');
    expect(field.getAttribute('maxlength')).toBe('128');
    expect(field.getAttribute('autocomplete')).toBe('new-password');
    expect(el.shadowRoot!.querySelector('button.reveal')).toBeTruthy();

    const phrase = 'correct horse';
    const email = el.shadowRoot!.querySelector('input[type="email"]') as HTMLInputElement;
    email.value = 'ada@example.com';
    field.value = 'seven!!';
    el.shadowRoot!.querySelector('form')!.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    await flush(el);

    expect(firebase.createUserWithEmailAndPassword).not.toHaveBeenCalled();
    expect(el.shadowRoot!.querySelector('[role="status"]')!.textContent).toBe(passwordShort);
    expect(field.value).toBe('seven!!');

    field.value = phrase;
    email.value = 'ada@example.com';
    firebase.createUserWithEmailAndPassword.mockResolvedValue({
      user: { uid: '1', displayName: null, email: 'ada@example.com', photoURL: null, emailVerified: false }
    });
    firebase.currentUser = firebase.user;
    el.shadowRoot!.querySelector('form')!.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    await flush(el);

    expect(firebase.createUserWithEmailAndPassword).toHaveBeenCalledWith(expect.anything(), 'ada@example.com', phrase);
  });

  it('rejects a short new password and a mismatch in settings', async () => {
    firebase.currentUser = firebase.user;
    store.dispatch(userAuth(true));
    const el = document.createElement('input-password') as HTMLElement & { updateComplete: Promise<unknown> };
    document.body.append(el);
    await el.updateComplete;

    const next = el.shadowRoot!.querySelector('#pwa-new-password') as HTMLInputElement;
    const verify = el.shadowRoot!.querySelector('#pwa-verify-password') as HTMLInputElement;
    const current = el.shadowRoot!.querySelector('#pwa-current-password') as HTMLInputElement;
    expect(el.shadowRoot!.querySelector('.hint')!.textContent).toBe(passwordHint);
    expect(next.getAttribute('autocomplete')).toBe('new-password');
    expect(next.getAttribute('minlength')).toBe('8');
    expect(next.getAttribute('maxlength')).toBe('128');
    expect(el.shadowRoot!.querySelectorAll('button.reveal').length).toBe(3);

    current.value = 'secret12';
    next.value = 'seven!!';
    verify.value = 'seven!!';
    el.shadowRoot!.querySelector('form')!.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    await flush(el);
    expect(el.shadowRoot!.querySelector('[role="status"]')!.textContent).toBe(passwordShort);
    expect(firebase.updatePassword).not.toHaveBeenCalled();
    expect(next.value).toBe('seven!!');

    next.value = 'correct horse';
    verify.value = 'correct horse.';
    el.shadowRoot!.querySelector('form')!.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    await flush(el);
    expect(el.shadowRoot!.querySelector('[role="status"]')!.textContent).toBe(passwordMismatch);
    expect(firebase.updatePassword).not.toHaveBeenCalled();
  });

});
