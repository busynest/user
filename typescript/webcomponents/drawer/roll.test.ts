import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('firebase/app', () => ({
  initializeApp: vi.fn((config: object) => ({ name: '[DEFAULT]', options: config }))
}));

vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(() => ({ currentUser: null })),
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

});
