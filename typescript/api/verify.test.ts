import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const firebase = vi.hoisted(() => {
  const listeners = new Set<(user: unknown) => void>();

  function make(email: string, emailVerified = false) {
    const user = {
      uid: '1',
      displayName: 'Ada',
      email,
      photoURL: null as string | null,
      emailVerified,
      reload: vi.fn(async () => undefined),
      delete: vi.fn(async () => undefined)
    };
    return user;
  }

  return {
    listeners,
    currentUser: null as null | ReturnType<typeof make>,
    sendEmailVerification: vi.fn(async () => undefined),
    createUserWithEmailAndPassword: vi.fn(async (_auth: unknown, email: string) => {
      const user = make(email, false);
      firebase.currentUser = user;
      firebase.listeners.forEach((callback) => callback(user));
      return { user };
    }),
    make,
    emit(user: null | ReturnType<typeof make>) {
      firebase.currentUser = user;
      firebase.listeners.forEach((callback) => callback(user));
    }
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
    firebase.listeners.add(callback);
    callback(firebase.currentUser);
    return () => { firebase.listeners.delete(callback); };
  }),
  createUserWithEmailAndPassword: firebase.createUserWithEmailAndPassword,
  sendEmailVerification: firebase.sendEmailVerification,
  signInWithEmailAndPassword: vi.fn(),
  sendPasswordResetEmail: vi.fn(),
  signOut: vi.fn(),
  updateProfile: vi.fn(),
  updatePassword: vi.fn(),
  verifyBeforeUpdateEmail: vi.fn(),
  reauthenticateWithCredential: vi.fn(),
  EmailAuthProvider: { credential: vi.fn() }
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
  ref: vi.fn(),
  updateMetadata: vi.fn(),
  getDownloadURL: vi.fn(),
  uploadBytesResumable: vi.fn()
}));

vi.mock('firebase/analytics', () => ({
  getAnalytics: vi.fn(() => ({})),
  isSupported: vi.fn(async () => false),
  logEvent: vi.fn()
}));

/* Required - the tsc emit. The test runner does not lower legacy decorators. */
import { initialize } from '../../base/firebase/authentication.js';
import { getCurrentUser } from '../../base/api/user.js';
import { isEmailVerified, sendVerification } from '../../base/api/verify.js';
import { pwaAuthError, pwaEmailVerified, pwaSignup, pwaVerificationSent } from '../../base/events/names.js';
import '../../base/firebase/interface.js';
import '../../base/webcomponents/form/signup.js';
import '../../base/webcomponents/settings/settings.js';

const sentMessage = 'Check your inbox for the verification email.';

type VerifyEl = HTMLElement & { updateComplete: Promise<unknown> };

function heard(name: string) {
  const seen: CustomEvent[] = [];
  const onEvent = (event: Event) => { seen.push(event as CustomEvent); };
  window.addEventListener(name, onEvent);
  return {
    seen,
    stop() { window.removeEventListener(name, onEvent); }
  };
}

function firebaseError(code: string) {
  return Object.assign(new Error('Firebase: Error (' + code + ').'), { code });
}

function config() {
  return {
    apiKey: 'test',
    authDomain: 'test.firebaseapp.com',
    projectId: 'test'
  };
}

async function flush(el?: { updateComplete: Promise<unknown> }) {
  if (el) await el.updateComplete;
  await new Promise((resolve) => setTimeout(resolve, 0));
  if (el) await el.updateComplete;
}

function verifyEl() {
  const el = document.createElement('email-verify') as VerifyEl;
  document.body.append(el);
  return el;
}

function submit(el: HTMLElement) {
  const form = el.shadowRoot!.querySelector('form') as HTMLFormElement;
  form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
}

function button(el: HTMLElement) {
  return el.shadowRoot!.querySelector('button') as HTMLButtonElement;
}

function status(el: HTMLElement) {
  return el.shadowRoot!.querySelector('#pwa-verify-status') as HTMLElement;
}

describe('email verification', () => {

  beforeEach(() => {
    firebase.sendEmailVerification.mockReset();
    firebase.sendEmailVerification.mockResolvedValue(undefined);
    firebase.createUserWithEmailAndPassword.mockClear();
    firebase.currentUser = null;
    window.alert = vi.fn();
    document.body.replaceChildren();
    initialize({
      config: config(),
      actionCodeSettings: undefined
    });
    firebase.emit(null);
  });

  afterEach(() => {
    document.body.replaceChildren();
    vi.useRealTimers();
  });

  it('sends after sign-up and does not block the account', async () => {
    const signups = heard(pwaSignup);
    const sent = heard(pwaVerificationSent);
    const errors = heard(pwaAuthError);
    const el = document.createElement('form-signup') as VerifyEl;
    document.body.append(el);
    await el.updateComplete;

    const email = el.shadowRoot!.querySelector('input[type="email"]') as HTMLInputElement;
    const password = el.shadowRoot!.querySelector('input[type="password"]') as HTMLInputElement;
    email.value = 'ada@example.com';
    password.value = 'secret12';
    el.shadowRoot!.querySelector('form')!.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    await flush(el);

    expect(firebase.createUserWithEmailAndPassword).toHaveBeenCalledOnce();
    expect(firebase.sendEmailVerification).toHaveBeenCalledOnce();
    expect(signups.seen).toHaveLength(1);
    expect(signups.seen[0].detail.user).toMatchObject({
      email: 'ada@example.com',
      emailVerified: false
    });
    expect(sent.seen).toHaveLength(1);
    expect(sent.seen[0].detail).toEqual({ email: 'ada@example.com' });
    expect(sent.seen[0].bubbles).toBe(true);
    expect(sent.seen[0].composed).toBe(true);
    expect(errors.seen).toHaveLength(0);
    expect(getCurrentUser()).toMatchObject({ email: 'ada@example.com', emailVerified: false });
    signups.stop();
    sent.stop();
    errors.stop();
  });

  it('still emits pwa-signup when the verification mail fails', async () => {
    firebase.sendEmailVerification.mockRejectedValue(firebaseError('auth/network-request-failed'));
    const signups = heard(pwaSignup);
    const sent = heard(pwaVerificationSent);
    const errors = heard(pwaAuthError);
    const el = document.createElement('form-signup') as VerifyEl;
    document.body.append(el);
    await el.updateComplete;

    const email = el.shadowRoot!.querySelector('input[type="email"]') as HTMLInputElement;
    const password = el.shadowRoot!.querySelector('input[type="password"]') as HTMLInputElement;
    email.value = 'ada@example.com';
    password.value = 'secret12';
    el.shadowRoot!.querySelector('form')!.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    await flush(el);

    expect(signups.seen).toHaveLength(1);
    expect(sent.seen).toHaveLength(0);
    expect(errors.seen[0].detail.code).toBe('auth/network-request-failed');
    expect(window.alert).toHaveBeenCalledWith('Network problem. Try again.');
    signups.stop();
    sent.stop();
    errors.stop();
  });

  it('passes actionCodeSettings from initialize', async () => {
    initialize({
      actionCodeSettings: { url: 'https://contractorscentre.com/verified' }
    });
    firebase.emit(firebase.make('ada@example.com', false));

    const sent = await sendVerification();

    expect(sent).toBe(true);
    expect(firebase.sendEmailVerification).toHaveBeenCalledWith(
      expect.objectContaining({ email: 'ada@example.com' }),
      { url: 'https://contractorscentre.com/verified' }
    );
  });

  it('sendVerification reports signed-out and skips a verified user', async () => {
    const errors = heard(pwaAuthError);
    const sent = heard(pwaVerificationSent);
    firebase.emit(null);

    await expect(sendVerification()).rejects.toMatchObject({ code: 'pwa/signed-out' });
    expect(errors.seen[0].detail.code).toBe('pwa/signed-out');
    expect(firebase.sendEmailVerification).not.toHaveBeenCalled();

    firebase.emit(firebase.make('ada@example.com', true));
    await expect(sendVerification()).resolves.toBe(false);
    expect(firebase.sendEmailVerification).not.toHaveBeenCalled();
    expect(sent.seen).toHaveLength(0);
    errors.stop();
    sent.stop();
  });

  it('isEmailVerified reloads and fires pwa-email-verified once', async () => {
    const user = firebase.make('ada@example.com', false);
    user.reload = vi.fn(async () => { user.emailVerified = true; });
    firebase.emit(user);
    const verified = heard(pwaEmailVerified);

    await expect(isEmailVerified()).resolves.toBe(true);
    await expect(isEmailVerified()).resolves.toBe(true);

    expect(user.reload).toHaveBeenCalledTimes(2);
    expect(verified.seen).toHaveLength(1);
    expect(verified.seen[0].detail.user).toMatchObject({
      email: 'ada@example.com',
      emailVerified: true
    });
    expect(verified.seen[0].bubbles).toBe(true);
    expect(getCurrentUser()?.emailVerified).toBe(true);
    verified.stop();
  });

  it('focus and visibility reload without shouting about the network', async () => {
    const user = firebase.make('ada@example.com', false);
    let online = false;
    user.reload = vi.fn(async () => {
      if (!online) throw firebaseError('auth/network-request-failed');
      user.emailVerified = true;
    });
    firebase.emit(user);
    const errors = heard(pwaAuthError);
    const verified = heard(pwaEmailVerified);

    window.dispatchEvent(new Event('focus'));
    await flush();
    expect(errors.seen).toHaveLength(0);
    expect(verified.seen).toHaveLength(0);

    online = true;
    Object.defineProperty(document, 'visibilityState', { configurable: true, get: () => 'visible' });
    document.dispatchEvent(new Event('visibilitychange'));
    await flush();

    expect(verified.seen).toHaveLength(1);
    expect(verified.seen[0].detail.user.emailVerified).toBe(true);
    errors.stop();
    verified.stop();
  });

  it('isEmailVerified emits pwa-auth-error when the reload fails', async () => {
    const user = firebase.make('ada@example.com', false);
    user.reload = vi.fn(async () => { throw firebaseError('auth/network-request-failed'); });
    firebase.emit(user);
    const errors = heard(pwaAuthError);

    await expect(isEmailVerified()).resolves.toBe(false);
    expect(errors.seen[0].detail.code).toBe('auth/network-request-failed');
    errors.stop();
  });

  it('shows the unverified notice inside user-settings', async () => {
    firebase.emit(firebase.make('ada@example.com', false));
    const settings = document.createElement('user-settings') as VerifyEl;
    document.body.append(settings);
    await settings.updateComplete;

    const notice = settings.shadowRoot!.querySelector('email-verify') as VerifyEl;
    expect(notice).toBeTruthy();
    await notice.updateComplete;

    expect(notice.shadowRoot!.textContent).toContain('ada@example.com is not verified yet. You can still sign in.');
    expect(button(notice).textContent).toContain('Resend verification email');
    expect(button(notice).classList.contains('action-button')).toBe(true);
    expect(status(notice).getAttribute('aria-live')).toBe('polite');
    expect(status(notice).getAttribute('role')).toBe('status');
  });

  it('hides the notice when signed out and shows the verified line', async () => {
    firebase.emit(null);
    const signedOut = verifyEl();
    await signedOut.updateComplete;
    expect(signedOut.shadowRoot!.textContent?.trim()).toBe('');

    firebase.emit(firebase.make('ada@example.com', true));
    const verified = verifyEl();
    await verified.updateComplete;
    expect(verified.shadowRoot!.textContent).toContain('Email verified.');
    expect(verified.shadowRoot!.querySelector('button')).toBeNull();
  });

  it('resends, emits pwa-verification-sent, and disables while sending', async () => {
    let release: () => void = () => undefined;
    const gate = new Promise<void>((resolve) => { release = resolve; });
    firebase.sendEmailVerification.mockReturnValue(gate);
    firebase.emit(firebase.make('ada@example.com', false));

    const sent = heard(pwaVerificationSent);
    const el = verifyEl();
    await el.updateComplete;
    const live = status(el);
    const focus = vi.spyOn(live, 'focus');

    submit(el);
    await el.updateComplete;

    expect(button(el).disabled).toBe(true);
    expect(button(el).textContent).toContain('Sending');
    expect(button(el).getAttribute('aria-busy')).toBe('true');

    release();
    await gate;
    await flush(el);

    expect(firebase.sendEmailVerification).toHaveBeenCalledOnce();
    expect(sent.seen[0].detail).toEqual({ email: 'ada@example.com' });
    expect(live.textContent).toBe(sentMessage);
    expect(window.alert).toHaveBeenCalledWith(sentMessage);
    expect(focus).toHaveBeenCalled();
    expect(button(el).disabled).toBe(true);
    expect(button(el).textContent).toContain('Send again in 45s');
    sent.stop();
  });

  it('maps too many requests and network failures', async () => {
    const errors = heard(pwaAuthError);
    const sent = heard(pwaVerificationSent);
    const cases = [
      ['auth/too-many-requests', 'Too many tries. Wait and try again.'],
      ['auth/network-request-failed', 'Network problem. Try again.']
    ] as const;

    for (const [code, sentence] of cases) {
      firebase.sendEmailVerification.mockRejectedValue(firebaseError(code));
      firebase.emit(firebase.make('ada@example.com', false));
      const el = verifyEl();
      await el.updateComplete;
      submit(el);
      await flush(el);

      const detail = errors.seen.at(-1)!.detail;
      expect(detail.code).toBe(code);
      expect(detail.message).toContain(code);
      expect(status(el).textContent).toBe(sentence);
      expect(status(el).classList.contains('error')).toBe(true);
      expect(window.alert).toHaveBeenCalledWith(sentence);
      expect(button(el).disabled).toBe(false);
      expect(button(el).textContent).toContain('Resend verification email');
      el.remove();
    }

    expect(sent.seen).toHaveLength(0);
    errors.stop();
    sent.stop();
  });

  it('waits 45 seconds before another send', async () => {
    vi.useFakeTimers({ toFake: ['setInterval', 'clearInterval'] });
    firebase.emit(firebase.make('ada@example.com', false));
    const el = verifyEl();
    await el.updateComplete;

    submit(el);
    await flush(el);
    expect(firebase.sendEmailVerification).toHaveBeenCalledOnce();
    expect(button(el).disabled).toBe(true);

    submit(el);
    await flush(el);
    expect(firebase.sendEmailVerification).toHaveBeenCalledOnce();

    await vi.advanceTimersByTimeAsync(44000);
    await el.updateComplete;
    expect(button(el).disabled).toBe(true);
    expect(button(el).textContent).toContain('Send again in 1s');

    await vi.advanceTimersByTimeAsync(1000);
    await el.updateComplete;
    expect(button(el).disabled).toBe(false);
    expect(button(el).textContent).toContain('Resend verification email');

    submit(el);
    await flush(el);
    expect(firebase.sendEmailVerification).toHaveBeenCalledTimes(2);
  });

});
