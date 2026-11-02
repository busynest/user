import { beforeEach, describe, expect, it, vi } from 'vitest';

const firebase = vi.hoisted(() => {
  const user = {
    uid: '1',
    displayName: 'Ada Lovelace' as string | null,
    email: 'ada@example.com',
    photoURL: null as string | null,
    emailVerified: true
  };
  return {
    user,
    currentUser: null as null | typeof user,
    updateProfile: vi.fn(async (person: typeof user, profile: { photoURL?: string | null }) => {
      Object.assign(person, profile);
    })
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
  updateProfile: firebase.updateProfile,
  signInWithEmailAndPassword: vi.fn(),
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
  ref: vi.fn((_storage: unknown, path: string) => ({ path })),
  uploadBytesResumable: vi.fn(),
  getDownloadURL: vi.fn(),
  deleteObject: vi.fn(async () => undefined),
  listAll: vi.fn(async () => ({ items: [], prefixes: [] }))
}));

vi.mock('firebase/analytics', () => ({
  getAnalytics: vi.fn(() => ({})),
  isSupported: vi.fn(async () => false),
  logEvent: vi.fn()
}));

import { initialize } from '../../../base/firebase/authentication.js';
import store from '../../../base/store.js';
import { userAuth } from '../../../base/redux/frontend.js';
import { accImage } from '../../../base/redux/backend.js';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import '../../../base/webcomponents/settings/input/uploader.js';

type LitEl = HTMLElement & { updateComplete: Promise<unknown> };

function fileOf(bytes: number, type: string, name = 'pic.png') {
  return new File([new Uint8Array(bytes)], name, { type });
}

async function mount(signedIn: boolean) {
  firebase.currentUser = signedIn ? firebase.user : null;
  store.dispatch(userAuth(true));
  const el = document.createElement('contact-photo') as LitEl;
  document.body.append(el);
  await el.updateComplete;
  return el;
}

function pick(el: HTMLElement, file: File) {
  const input = el.shadowRoot!.querySelector('input[type="file"]') as HTMLInputElement;
  Object.defineProperty(input, 'files', { configurable: true, value: [file] });
  input.dispatchEvent(new Event('change'));
  return input;
}

describe('profile photo', () => {

  beforeEach(() => {
    firebase.updateProfile.mockClear();
    firebase.currentUser = null;
    firebase.user.photoURL = null;
    vi.mocked(uploadBytesResumable).mockReset();
    vi.mocked(getDownloadURL).mockReset();
    vi.mocked(deleteObject).mockClear();
    vi.mocked(ref).mockClear();
    document.body.replaceChildren();
    store.dispatch(accImage(''));
    initialize({
      config: {
        apiKey: 'test',
        authDomain: 'test.firebaseapp.com',
        projectId: 'test'
      }
    });
  });

  it('stays disabled with an honest note when Firebase has no user', async () => {
    const el = await mount(false);
    const input = el.shadowRoot!.querySelector('input[type="file"]') as HTMLInputElement;
    expect(input.disabled).toBe(true);
    expect(input.classList.contains('file')).toBe(true);
    expect(input.getAttribute('style') ?? '').not.toContain('display: none');
    expect(el.shadowRoot!.querySelector('[role="status"]')!.textContent).toBe('Sign in to upload a photo.');
    expect(el.shadowRoot!.querySelector('progress')!.hasAttribute('hidden')).toBe(true);
    expect(uploadBytesResumable).not.toHaveBeenCalled();
  });

  it('rejects a non-image and a file over 5 MB before upload', async () => {
    const el = await mount(true);

    const text = pick(el, fileOf(4, 'text/plain', 'notes.txt'));
    await el.updateComplete;
    expect(uploadBytesResumable).not.toHaveBeenCalled();
    expect(el.shadowRoot!.querySelector('[role="status"]')!.textContent).toBe('Choose an image file.');
    expect(text.value).toBe('');

    pick(el, fileOf(5 * 1024 * 1024 + 1, 'image/png', 'big.png'));
    await el.updateComplete;
    expect(uploadBytesResumable).not.toHaveBeenCalled();
    expect(el.shadowRoot!.querySelector('[role="status"]')!.textContent).toBe('Choose an image under 5 MB.');
  });

  it('uploads one stable object and stores the url on the account photo', async () => {
    vi.mocked(uploadBytesResumable).mockImplementation((location, file, metadata) => {
      const task = {
        snapshot: { ref: location },
        on(_event: string, next: (snap: unknown) => void, _error: unknown, done: () => void) {
          next({ bytesTransferred: file.size, totalBytes: file.size, state: 'running' });
          queueMicrotask(() => { void done(); });
        }
      };
      return task as never;
    });
    vi.mocked(getDownloadURL).mockResolvedValue('https://cdn.example/photo');

    const el = await mount(true);
    const input = pick(el, fileOf(32, 'image/png', 'holiday.png'));
    await el.updateComplete;
    await new Promise((resolve) => setTimeout(resolve, 0));
    await el.updateComplete;

    expect(ref).toHaveBeenCalledWith(expect.anything(), 'pwa-auth/1/photo');
    expect(uploadBytesResumable).toHaveBeenCalledWith(
      expect.anything(),
      expect.any(File),
      expect.objectContaining({ contentType: 'image/png' })
    );
    expect(firebase.updateProfile).toHaveBeenCalledWith(firebase.user, { photoURL: 'https://cdn.example/photo' });
    expect(store.getState().backend!.photoURL).toBe('https://cdn.example/photo');
    expect(store.getState().frontend!.photoURL).toBe('');
    expect(el.shadowRoot!.querySelector('img')!.getAttribute('alt')).toBe('Profile photo');
    expect(el.shadowRoot!.querySelector('[role="status"]')!.textContent).toBe('Photo saved.');
    expect(input.value).toBe('');
    expect(el.shadowRoot!.querySelector('progress')!.hasAttribute('hidden')).toBe(true);
  });

  it('deletes the new object when the profile update fails', async () => {
    vi.mocked(uploadBytesResumable).mockImplementation((location) => ({
      snapshot: { ref: location },
      on(_event: string, _next: unknown, _error: unknown, done: () => void) {
        queueMicrotask(() => { void done(); });
      }
    }) as never);
    vi.mocked(getDownloadURL).mockResolvedValue('https://cdn.example/photo');
    firebase.updateProfile.mockRejectedValueOnce({ code: 'auth/network-request-failed', message: 'offline' });

    const el = await mount(true);
    pick(el, fileOf(8, 'image/jpeg', 'me.jpg'));
    await el.updateComplete;
    await new Promise((resolve) => setTimeout(resolve, 0));
    await el.updateComplete;

    expect(deleteObject).toHaveBeenCalled();
    expect(store.getState().backend!.photoURL).toBe('');
    expect(el.shadowRoot!.querySelector('[role="status"]')!.textContent).toBe('Network problem. Try again.');
  });

  it('clears the profile photo', async () => {
    firebase.currentUser = firebase.user;
    store.dispatch(userAuth(true));
    store.dispatch(accImage('https://cdn.example/old'));
    const el = document.createElement('contact-photo') as LitEl;
    document.body.append(el);
    await el.updateComplete;

    const button = [...el.shadowRoot!.querySelectorAll('button')].find((item) => item.textContent === 'Remove photo');
    button!.click();
    await el.updateComplete;
    await new Promise((resolve) => setTimeout(resolve, 0));
    await el.updateComplete;

    expect(firebase.updateProfile).toHaveBeenCalledWith(firebase.user, { photoURL: null });
    expect(store.getState().backend!.photoURL).toBe('');
    expect(el.shadowRoot!.querySelector('[role="status"]')!.textContent).toBe('Photo removed.');
  });

});
