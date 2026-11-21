import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('firebase/app', () => ({
  initializeApp: vi.fn((config: object) => ({ name: '[DEFAULT]', options: config }))
}));

vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(() => ({
    currentUser: null,
    useDeviceLanguage() { return undefined; }
  })),
  onAuthStateChanged: vi.fn(() => () => undefined),
  signInWithEmailAndPassword: vi.fn(),
  sendPasswordResetEmail: vi.fn(),
  signOut: vi.fn(),
  GoogleAuthProvider: class GoogleAuthProvider {},
  signInWithPopup: vi.fn(),
  signInWithRedirect: vi.fn(async () => undefined),
  getRedirectResult: vi.fn(async () => null)
}));

vi.mock('firebase/firestore', () => ({ getFirestore: vi.fn(() => ({})) }));
vi.mock('firebase/storage', () => ({ getStorage: vi.fn(() => ({})) }));
vi.mock('firebase/analytics', () => ({
  getAnalytics: vi.fn(() => ({})),
  isSupported: vi.fn(async () => false),
  logEvent: vi.fn()
}));

import { initialize } from '../../../base/firebase/authentication.js';
import store from '../../../base/store.js';
import { accEmail, accName, closeSign, openSign, userAuth } from '../../../base/redux/session.js';
import '../../../base/webcomponents/drawer/drawer.js';

type DrawerEl = HTMLElement & {
  updateComplete: Promise<unknown>;
  clipStyle: () => { transition?: string; height?: string; maxHeight?: string };
};

function expectNoHeightEase(style: { transition?: string }) {
  const transition = style.transition ?? '';
  expect(transition.includes('height')).toBe(false);
  expect(transition.includes('max-height')).toBe(false);
}

describe('drawer clip', () => {

  beforeEach(() => {
    document.body.replaceChildren();
  });

  it('never transitions height or max-height', async () => {
    const drawer = document.createElement('user-drawer') as DrawerEl;
    document.body.append(drawer);
    await drawer.updateComplete;

    expectNoHeightEase(drawer.clipStyle());

    const host = drawer as DrawerEl & { clipHeight: string; clipPad: string; rollMotion: boolean };
    host.rollMotion = true;
    host.clipHeight = '240px';
    host.clipPad = '0px';
    expectNoHeightEase(host.clipStyle());

    host.rollMotion = false;
    host.clipHeight = 'auto';
    host.clipPad = '60px';
    const open = host.clipStyle();
    expectNoHeightEase(open);
    expect(open.transition).toBe('none');
    expect(open.height).toBe('auto');
    expect(open.maxHeight).toBe('none');

    const clip = drawer.shadowRoot?.querySelector('.drawer-clip');
    const style = clip?.getAttribute('style') ?? '';
    expect(style.includes('height var(--pwa_slide')).toBe(false);
    expect(style.includes('max-height var(--pwa_slide')).toBe(false);

    drawer.remove();
  });

  it('pins the header when an open sheet changes height', async () => {
    const drawer = document.createElement('user-drawer') as DrawerEl & {
      resizeBetween: (clip: HTMLElement, sheet: HTMLElement, from: number, to: number) => void;
    };
    document.body.append(drawer);
    await drawer.updateComplete;
    const clip = drawer.shadowRoot!.querySelector('.drawer-clip') as HTMLElement;
    const sheet = drawer.shadowRoot!.querySelector('.userDrawer') as HTMLElement;
    const face = drawer.shadowRoot!.querySelector('.drawer-face') as HTMLElement;
    const title = drawer.shadowRoot!.querySelector('#pwa-drawer-title') as HTMLElement;

    drawer.resizeBetween(clip, sheet, 497.9, 472.7);

    const shiftY = (value: string) => {
      const match = value.match(/,\s*(-?[\d.]+)px/);
      return match ? parseFloat(match[1]) : 0;
    };
    const sheetY = shiftY(sheet.style.transform);
    const faceY = shiftY(face.style.transform);
    expect(sheetY + faceY).toBeCloseTo(0, 5);
    expect(faceY).not.toBe(0);
    expect(sheet.style.minHeight).toBe('497.9px');
    expect(title.closest('.drawer-face')).toBe(face);

    drawer.remove();
  });

  it('hides the drawer after sign-in even when the menu grows', async () => {
    initialize({
      config: { apiKey: 'test', authDomain: 'test.firebaseapp.com', projectId: 'test' }
    });
    const drawer = document.createElement('user-drawer') as DrawerEl;
    document.body.append(drawer);
    store.dispatch(openSign());
    await drawer.updateComplete;

    store.dispatch(userAuth(true));
    store.dispatch(closeSign());
    store.dispatch(accName('Ada Lovelace'));
    store.dispatch(accEmail('ada@example.com'));
    await drawer.updateComplete;

    const sheet = drawer.shadowRoot!.querySelector('.userDrawer') as HTMLElement;
    const clip = drawer.shadowRoot!.querySelector('.drawer-clip') as HTMLElement;
    const laid = sheet.getBoundingClientRect().height;
    sheet.style.minHeight = `${laid + 180}px`;
    await new Promise((resolve) => requestAnimationFrame(() => resolve(undefined)));
    await drawer.updateComplete;

    for (let i = 0; i < 3; i++) {
      sheet.dispatchEvent(new TransitionEvent('transitionend', { propertyName: 'transform', bubbles: true }));
      await drawer.updateComplete;
      await new Promise((resolve) => requestAnimationFrame(() => resolve(undefined)));
    }

    expect(clip.style.height).toBe('0px');
    expect(sheet.style.minHeight).toBe('');
    const leave = drawer.shadowRoot!.querySelector('.leave') as HTMLElement;
    const clipBox = clip.getBoundingClientRect();
    const leaveBox = leave.getBoundingClientRect();
    expect(leaveBox.bottom <= clipBox.top + 1 || clipBox.height <= 1).toBe(true);

    drawer.remove();
  });

});
