import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('firebase/app', () => ({
  initializeApp: vi.fn((config: object) => ({ name: '[DEFAULT]', options: config }))
}));

vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(() => ({
    get currentUser() { return null; },
    useDeviceLanguage() { return undefined; }
  })),
  onAuthStateChanged: vi.fn((_auth: unknown, callback: (user: unknown) => void) => {
    callback(null);
    return () => undefined;
  }),
  signInWithEmailAndPassword: vi.fn(),
  sendPasswordResetEmail: vi.fn(),
  signOut: vi.fn(),
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
  deleteObject: vi.fn(),
  listAll: vi.fn(async () => ({ items: [], prefixes: [] })),
  ref: vi.fn()
}));

vi.mock('firebase/analytics', () => ({
  getAnalytics: vi.fn(() => ({})),
  isSupported: vi.fn(async () => false),
  logEvent: vi.fn()
}));

import { initialize } from '../../base/firebase/authentication.js';
import { userAuth } from '../../base/redux/frontend.js';
import store from '../../base/store.js';
import '../../base/webcomponents/icon/icon.js';
import '../../base/webcomponents/drawer/drawer.js';
import '../../base/webcomponents/login/page.js';
import '../../base/webcomponents/settings/settings.js';
import '../../base/webcomponents/form/forgot.js';

type LitEl = HTMLElement & { updateComplete: Promise<unknown> };

describe('keyboard and names', () => {

  beforeEach(() => {
    document.body.replaceChildren();
    initialize({
      config: {
        apiKey: 'test',
        authDomain: 'test.firebaseapp.com',
        projectId: 'test'
      }
    });
  });

  it('ties the button to the drawer and returns focus on Escape', async () => {
    const drawer = document.createElement('user-drawer') as LitEl;
    const icon = document.createElement('user-icon') as LitEl;
    document.body.append(drawer, icon);
    await drawer.updateComplete;
    await icon.updateComplete;

    const button = icon.shadowRoot!.querySelector('button')!;
    const sheet = drawer.shadowRoot!.querySelector('.userDrawer')!;
    expect(button.tagName).toBe('BUTTON');
    expect(button.getAttribute('aria-expanded')).toBe('false');
    expect(button.getAttribute('aria-controls')).toBe('pwa-user-drawer');
    expect(drawer.id).toBe('pwa-user-drawer');
    expect(sheet.getAttribute('aria-hidden')).toBe('true');
    expect(sheet.hasAttribute('inert')).toBe(true);
    expect(drawer.shadowRoot!.querySelector('form-signup')!.getAttribute('aria-hidden')).toBe('true');

    button.focus();
    button.click();
    await drawer.updateComplete;
    await icon.updateComplete;

    expect(button.getAttribute('aria-expanded')).toBe('true');
    expect(sheet.getAttribute('aria-hidden')).toBe('false');
    expect(drawer.shadowRoot!.activeElement).toBe(drawer.shadowRoot!.querySelector('.close'));

    drawer.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await drawer.updateComplete;
    await icon.updateComplete;

    expect(button.getAttribute('aria-expanded')).toBe('false');
    expect(sheet.getAttribute('aria-hidden')).toBe('true');
    expect(sheet.hasAttribute('inert')).toBe(true);
    expect(icon.shadowRoot!.activeElement).toBe(button);
  });

  it('names the page login and keeps the show button out of the label', async () => {
    const login = document.createElement('user-login') as LitEl;
    document.body.append(login);
    await login.updateComplete;
    expect(login.getAttribute('role')).toBe('region');
    expect(login.getAttribute('aria-label')).toBe('Account');
    const form = login.shadowRoot!.querySelector('form-login')!;
    await (form as LitEl).updateComplete;
    const reveal = form.shadowRoot!.querySelector('.reveal')!;
    expect(reveal.getAttribute('aria-label')).toBe('Show password');
    expect(reveal.closest('label')).toBeNull();
    const password = form.shadowRoot!.querySelector('input[part="password"]') as HTMLInputElement;
    expect(form.shadowRoot!.querySelector(`label[for="${password.id}"]`)).toBeTruthy();
  });

  it('hides the other settings tabs and announces the reset form', async () => {
    store.dispatch(userAuth(true));
    const settings = document.createElement('user-settings') as LitEl;
    const reset = document.createElement('email-reset') as LitEl & { active: boolean };
    reset.active = true;
    document.body.append(settings, reset);
    await settings.updateComplete;
    await reset.updateComplete;
    expect(settings.getAttribute('aria-label')).toBe('Account settings');
    const tabs = [...settings.shadowRoot!.querySelectorAll('[role="tab"]')];
    expect(tabs.map((tab) => tab.getAttribute('tabindex'))).toEqual(['0', '-1', '-1', '-1']);
    expect(settings.shadowRoot!.querySelector('#pwa-panel-password')!.hasAttribute('hidden')).toBe(true);
    expect(reset.getAttribute('aria-label')).toBe('Reset password');
    const email = reset.shadowRoot!.querySelector('input')!;
    expect(email.getAttribute('aria-describedby')).toBe('pwa-reset-status');
    expect(reset.shadowRoot!.querySelector('#pwa-reset-status')!.getAttribute('aria-live')).toBe('polite');
  });

});
