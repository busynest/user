import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';

const firebase = vi.hoisted(() => {
  return {
    sendPasswordResetEmail: vi.fn(async () => undefined),
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
  signInWithEmailAndPassword: vi.fn(),
  createUserWithEmailAndPassword: vi.fn(),
  sendEmailVerification: vi.fn(),
  sendPasswordResetEmail: firebase.sendPasswordResetEmail,
  signOut: vi.fn(),
  EmailAuthProvider: { credential: vi.fn() },
  reauthenticateWithCredential: vi.fn()
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
import { closeDrawer } from '../../../base/api/drawer.js';
import store from '../../../base/store.js';
import { universalToggle } from '../../../base/redux/frontend.js';
import { clearDraftEmail } from '../../../base/webcomponents/form/draft.js';
import { pwaAuthError, pwaResetSent } from '../../events/names';
import '../../../base/webcomponents/form/login.js';
import '../../../base/webcomponents/form/forgot.js';
import '../../../base/webcomponents/drawer/drawer.js';

const sentMessage = 'If an account uses that email, a reset link is on its way.';

type ResetEl = HTMLElement & { active: boolean; updateComplete: Promise<unknown> };

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

function resetEl() {
  const el = document.createElement('email-reset') as ResetEl;
  el.active = true;
  document.body.append(el);
  return el;
}

function emailField(el: HTMLElement) {
  return el.shadowRoot!.querySelector('input[type="email"]') as HTMLInputElement;
}

function submitButton(el: HTMLElement) {
  return el.shadowRoot!.querySelector('button[type="submit"]') as HTMLButtonElement;
}

function status(el: HTMLElement) {
  return el.shadowRoot!.querySelector('#pwa-reset-status') as HTMLElement;
}

function submitForm(el: HTMLElement) {
  const form = el.shadowRoot!.querySelector('form') as HTMLFormElement;
  if (typeof form.requestSubmit === 'function') form.requestSubmit();
  else form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
}

async function flush(el: { updateComplete: Promise<unknown> }) {
  await el.updateComplete;
  await new Promise((resolve) => setTimeout(resolve, 0));
  await el.updateComplete;
}

function quietForms() {
  const state = store.getState().frontend;
  if (state?.registerOne) store.dispatch(universalToggle('drawer'));
  if (state?.registerTwo) store.dispatch(universalToggle('page'));
  closeDrawer();
}

describe('email-reset', () => {

  beforeEach(() => {
    firebase.sendPasswordResetEmail.mockReset();
    firebase.sendPasswordResetEmail.mockResolvedValue(undefined);
    window.alert = vi.fn();
    document.body.replaceChildren();
    clearDraftEmail();
    initialize({
      config: {
        apiKey: 'test',
        authDomain: 'test.firebaseapp.com',
        projectId: 'test'
      }
    });
    quietForms();
  });

  afterEach(() => {
    document.body.replaceChildren();
    vi.useRealTimers();
  });

  it('renders nothing until active is set', async () => {
    const el = document.createElement('email-reset') as ResetEl;
    document.body.append(el);
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('form')).toBeNull();

    el.active = true;
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('form')).toBeTruthy();
    expect(submitButton(el).textContent).toContain('Send reset email');
    expect(submitButton(el).classList.contains('action-button')).toBe(true);
    expect(submitButton(el).disabled).toBe(false);
  });

  it('names the field, announces status, and submits with Enter', async () => {
    const el = resetEl();
    await el.updateComplete;

    const label = el.shadowRoot!.querySelector('label') as HTMLLabelElement;
    const input = emailField(el);
    const live = status(el);
    const button = submitButton(el);

    expect(label.htmlFor).toBe('pwa-reset-email');
    expect(input.id).toBe('pwa-reset-email');
    expect(input.getAttribute('aria-describedby')).toBe('pwa-reset-status');
    expect(live.getAttribute('aria-live')).toBe('polite');
    expect(live.getAttribute('role')).toBe('status');
    expect(button.type).toBe('submit');
    expect(input.form).toBe(el.shadowRoot!.querySelector('form'));

    input.value = 'ada@example.com';
    submitForm(el);
    await flush(el);

    expect(firebase.sendPasswordResetEmail).toHaveBeenCalledOnce();
  });

  it('rejects a missing email without calling Firebase', async () => {
    const errors = heard(pwaAuthError);
    const sent = heard(pwaResetSent);
    const el = resetEl();
    await el.updateComplete;
    const input = emailField(el);
    const focus = vi.spyOn(input, 'focus');

    input.value = 'a';
    submitForm(el);
    await flush(el);

    expect(firebase.sendPasswordResetEmail).not.toHaveBeenCalled();
    expect(sent.seen).toHaveLength(0);
    expect(errors.seen[0].detail).toEqual({
      code: 'pwa/missing-email',
      message: 'Enter an email address.'
    });
    expect(window.alert).toHaveBeenCalledWith('Enter an email address.');
    expect(status(el).textContent).toBe('Enter an email address.');
    expect(input.getAttribute('aria-invalid')).toBe('true');
    expect(focus).toHaveBeenCalled();
    errors.stop();
    sent.stop();
  });

  it('rejects a malformed email without calling Firebase', async () => {
    const errors = heard(pwaAuthError);
    const el = resetEl();
    await el.updateComplete;

    emailField(el).value = 'not-an-email';
    submitForm(el);
    await flush(el);

    expect(firebase.sendPasswordResetEmail).not.toHaveBeenCalled();
    expect(errors.seen[0].detail).toEqual({
      code: 'pwa/invalid-email',
      message: 'Enter a valid email address.'
    });
    expect(status(el).textContent).toBe('Enter a valid email address.');
    expect(submitButton(el).disabled).toBe(false);
    errors.stop();
  });

  it('disables the button while the reset is in flight', async () => {
    let release: () => void = () => undefined;
    const gate = new Promise<void>((resolve) => { release = resolve; });
    firebase.sendPasswordResetEmail.mockReturnValue(gate);

    const el = resetEl();
    await el.updateComplete;
    emailField(el).value = 'ada@example.com';
    submitForm(el);
    await el.updateComplete;

    const button = submitButton(el);
    expect(button.disabled).toBe(true);
    expect(button.textContent).toContain('Sending');
    expect(button.getAttribute('aria-busy')).toBe('true');
    expect(firebase.sendPasswordResetEmail).toHaveBeenCalledOnce();

    release();
    await gate;
    await flush(el);
    expect(button.textContent).toContain('Send again in 45s');
  });

  it('sends, emits pwa-reset-sent, and uses one sentence', async () => {
    const sent = heard(pwaResetSent);
    const errors = heard(pwaAuthError);
    const el = resetEl();
    await el.updateComplete;
    const live = status(el);
    const focus = vi.spyOn(live, 'focus');

    emailField(el).value = '  ada@example.com  ';
    submitForm(el);
    await flush(el);

    expect(firebase.sendPasswordResetEmail).toHaveBeenCalledWith(expect.anything(), 'ada@example.com');
    expect(sent.seen).toHaveLength(1);
    expect(sent.seen[0].detail).toEqual({ email: 'ada@example.com' });
    expect(sent.seen[0].bubbles).toBe(true);
    expect(sent.seen[0].composed).toBe(true);
    expect(errors.seen).toHaveLength(0);
    expect(live.textContent).toBe(sentMessage);
    expect(window.alert).toHaveBeenCalledWith(sentMessage);
    expect(focus).toHaveBeenCalled();
    expect(submitButton(el).disabled).toBe(true);
    sent.stop();
    errors.stop();
  });

  it('treats a missing account as the same success', async () => {
    firebase.sendPasswordResetEmail.mockRejectedValue(firebaseError('auth/user-not-found'));
    const sent = heard(pwaResetSent);
    const errors = heard(pwaAuthError);
    const el = resetEl();
    await el.updateComplete;

    emailField(el).value = 'missing@example.com';
    submitForm(el);
    await flush(el);

    expect(sent.seen[0].detail).toEqual({ email: 'missing@example.com' });
    expect(errors.seen).toHaveLength(0);
    expect(status(el).textContent).toBe(sentMessage);
    expect(window.alert).toHaveBeenCalledWith(sentMessage);
    expect(window.alert).not.toHaveBeenCalledWith('No account uses that email.');
    sent.stop();
    errors.stop();
  });

  it('maps invalid email, too many requests, and network failures', async () => {
    const errors = heard(pwaAuthError);
    const sent = heard(pwaResetSent);
    const cases = [
      ['auth/invalid-email', 'Enter a valid email address.', true],
      ['auth/too-many-requests', 'Too many tries. Wait and try again.', false],
      ['auth/network-request-failed', 'Network problem. Try again.', false]
    ] as const;

    for (const [code, sentence, invalid] of cases) {
      firebase.sendPasswordResetEmail.mockRejectedValue(firebaseError(code));
      const el = resetEl();
      await el.updateComplete;
      emailField(el).value = 'ada@example.com';
      submitForm(el);
      await flush(el);

      const detail = errors.seen.at(-1)!.detail;
      expect(detail.code).toBe(code);
      expect(detail.message).toContain(code);
      expect(status(el).textContent).toBe(sentence);
      expect(window.alert).toHaveBeenCalledWith(sentence);
      expect(emailField(el).getAttribute('aria-invalid')).toBe(invalid ? 'true' : 'false');
      expect(submitButton(el).disabled).toBe(false);
      el.remove();
    }

    expect(sent.seen).toHaveLength(0);
    errors.stop();
    sent.stop();
  });

  it('waits 45 seconds before another send', async () => {
    vi.useFakeTimers({ toFake: ['setInterval', 'clearInterval'] });
    const el = resetEl();
    await el.updateComplete;
    emailField(el).value = 'ada@example.com';
    submitForm(el);
    await flush(el);

    expect(firebase.sendPasswordResetEmail).toHaveBeenCalledOnce();
    expect(submitButton(el).disabled).toBe(true);

    submitForm(el);
    await flush(el);
    expect(firebase.sendPasswordResetEmail).toHaveBeenCalledOnce();

    await vi.advanceTimersByTimeAsync(44000);
    await el.updateComplete;
    expect(submitButton(el).disabled).toBe(true);
    expect(submitButton(el).textContent).toContain('Send again in 1s');

    await vi.advanceTimersByTimeAsync(1000);
    await el.updateComplete;
    expect(submitButton(el).disabled).toBe(false);
    expect(submitButton(el).textContent).toContain('Send reset email');

    submitForm(el);
    await flush(el);
    expect(firebase.sendPasswordResetEmail).toHaveBeenCalledTimes(2);
  });

  it('prefills from the sign-in form until the reset field is typed in', async () => {
    const login = document.createElement('form-login') as HTMLElement & { updateComplete: Promise<unknown> };
    document.body.append(login);
    await login.updateComplete;

    const el = resetEl();
    await el.updateComplete;
    expect(emailField(el).value).toBe('');

    const typed = login.shadowRoot!.querySelector('input[type="email"]') as HTMLInputElement;
    typed.value = 'ada@example.com';
    typed.dispatchEvent(new Event('change', { bubbles: true }));
    await el.updateComplete;

    expect(emailField(el).value).toBe('ada@example.com');

    const reset = emailField(el);
    reset.value = 'other@example.com';
    reset.dispatchEvent(new Event('input', { bubbles: true }));
    typed.value = 'later@example.com';
    typed.dispatchEvent(new Event('change', { bubbles: true }));
    await el.updateComplete;

    expect(emailField(el).value).toBe('other@example.com');
  });

  it('opens the drawer on the sign-in form', async () => {
    const drawer = document.createElement('user-drawer') as HTMLElement & { updateComplete: Promise<unknown> };
    drawer.setAttribute('subscribe', '');
    document.body.append(drawer);
    await drawer.updateComplete;

    const login = drawer.shadowRoot!.querySelector('form-login') as HTMLElement;
    expect(login.classList.contains('opened')).toBe(false);

    const el = resetEl();
    await el.updateComplete;
    (el.shadowRoot!.querySelector('button.new') as HTMLButtonElement).click();
    await drawer.updateComplete;

    expect(drawer.hasAttribute('drawer')).toBe(true);
    expect(login.classList.contains('opened')).toBe(true);
    expect(login.hasAttribute('inert')).toBe(false);
  });

});
