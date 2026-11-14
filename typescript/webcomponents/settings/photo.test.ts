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
import { accImage, userAuth } from '../../../base/redux/session.js';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import '../../../base/webcomponents/settings/input/uploader.js';

type LitEl = HTMLElement & { updateComplete: Promise<unknown> };

function fileOf(bytes: number, type: string, name = 'pic.png') {
  return new File([new Uint8Array(bytes)], name, { type });
}

const encoded = {
  width: 0,
  height: 0,
  type: '',
  quality: 0
};

function installEncoder(width: number, height: number) {
  vi.unstubAllGlobals();
  const proto = HTMLCanvasElement.prototype as HTMLCanvasElement & {
    getContext: { mockRestore?: () => void };
    toBlob?: { mockRestore?: () => void };
  };
  proto.getContext.mockRestore?.();
  proto.toBlob?.mockRestore?.();
  vi.stubGlobal('createImageBitmap', vi.fn(async () => ({
    width,
    height,
    close: vi.fn()
  })));
  if (typeof HTMLCanvasElement.prototype.toBlob !== 'function') {
    HTMLCanvasElement.prototype.toBlob = () => undefined;
  }
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockImplementation(function (this: HTMLCanvasElement) {
    encoded.width = this.width;
    encoded.height = this.height;
    return { drawImage: vi.fn() } as unknown as CanvasRenderingContext2D;
  });
  vi.spyOn(HTMLCanvasElement.prototype, 'toBlob').mockImplementation(((
    callback: BlobCallback,
    type?: string,
    quality?: number
  ) => {
    encoded.type = type || '';
    encoded.quality = quality ?? 0;
    callback(new Blob([new Uint8Array([9])], { type: type || 'image/jpeg' }));
  }) as HTMLCanvasElement['toBlob']);
}

async function settle(el: LitEl) {
  await vi.waitFor(async () => {
    await el.updateComplete;
    await Promise.resolve();
    const text = el.shadowRoot!.querySelector('[role="status"]')!.textContent || '';
    expect(text === '' || text === 'Preparing…' || text.startsWith('Uploading')).toBe(false);
  });
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
    installEncoder(800, 600);
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
    expect(createImageBitmap).not.toHaveBeenCalled();
    expect(el.shadowRoot!.querySelector('[role="status"]')!.textContent).toBe('Choose an image file.');
    expect(text.value).toBe('');

    pick(el, fileOf(5 * 1024 * 1024 + 1, 'image/png', 'big.png'));
    await el.updateComplete;
    expect(uploadBytesResumable).not.toHaveBeenCalled();
    expect(createImageBitmap).not.toHaveBeenCalled();
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
    const original = fileOf(32, 'image/png', 'holiday.png');
    const input = pick(el, original);
    await settle(el);

    expect(createImageBitmap).toHaveBeenCalledWith(original, { imageOrientation: 'from-image' });
    expect(encoded).toMatchObject({ width: 800, height: 600, type: 'image/jpeg', quality: 0.8 });
    const uploaded = vi.mocked(uploadBytesResumable).mock.calls[0][1] as Blob;
    expect(uploaded).toBeInstanceOf(Blob);
    expect(uploaded).not.toBeInstanceOf(File);
    expect(uploaded.type).toBe('image/jpeg');
    expect(ref).toHaveBeenCalledWith(expect.anything(), 'pwa-auth/1/photo');
    expect(uploadBytesResumable).toHaveBeenCalledWith(
      expect.anything(),
      uploaded,
      expect.objectContaining({ contentType: 'image/jpeg' })
    );
    expect(firebase.updateProfile).toHaveBeenCalledWith(firebase.user, { photoURL: 'https://cdn.example/photo' });
    expect(store.getState().session.photoURL).toBe('https://cdn.example/photo');
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
    await settle(el);

    expect(deleteObject).toHaveBeenCalled();
    expect(store.getState().session.photoURL).toBe('');
    expect(el.shadowRoot!.querySelector('[role="status"]')!.textContent).toBe('Network problem. Try again.');
  });

  it('scales the long side to 1024 and keeps the aspect ratio', async () => {
    installEncoder(4000, 2000);
    vi.mocked(uploadBytesResumable).mockImplementation((location, file) => {
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
    pick(el, fileOf(16, 'image/png', 'wide.png'));
    await settle(el);

    expect(encoded).toMatchObject({ width: 1024, height: 512, type: 'image/jpeg', quality: 0.8 });
    expect(uploadBytesResumable).toHaveBeenCalledWith(
      expect.anything(),
      expect.any(Blob),
      expect.objectContaining({ contentType: 'image/jpeg' })
    );
  });

  it('re-encodes at a lower quality when the first jpeg is 500 KB or more', async () => {
    installEncoder(800, 600);
    vi.spyOn(HTMLCanvasElement.prototype, 'toBlob').mockImplementation(function (
      this: HTMLCanvasElement,
      callback: BlobCallback,
      type?: string,
      quality?: number
    ) {
      encoded.width = this.width;
      encoded.height = this.height;
      encoded.type = type || '';
      encoded.quality = quality ?? 0;
      const bytes = quality === 0.8 ? 500 * 1024 : 120;
      callback(new Blob([new Uint8Array(bytes)], { type: type || 'image/jpeg' }));
    } as HTMLCanvasElement['toBlob']);
    vi.mocked(uploadBytesResumable).mockImplementation((location, file) => ({
      snapshot: { ref: location },
      on(_event: string, next: (snap: unknown) => void, _error: unknown, done: () => void) {
        next({ bytesTransferred: file.size, totalBytes: file.size, state: 'running' });
        queueMicrotask(() => { void done(); });
      }
    }) as never);
    vi.mocked(getDownloadURL).mockResolvedValue('https://cdn.example/photo');

    const el = await mount(true);
    pick(el, fileOf(16, 'image/png', 'busy.png'));
    await settle(el);

    expect(encoded).toMatchObject({ width: 800, height: 600, type: 'image/jpeg', quality: 0.72 });
    const uploaded = vi.mocked(uploadBytesResumable).mock.calls[0][1] as Blob;
    expect(uploaded.size).toBeLessThan(500 * 1024);
    expect(ref).toHaveBeenCalledWith(expect.anything(), 'pwa-auth/1/photo');
  });

  it('shortens the long edge when every quality at 1024 stays too large', async () => {
    installEncoder(4000, 2000);
    vi.spyOn(HTMLCanvasElement.prototype, 'toBlob').mockImplementation(function (
      this: HTMLCanvasElement,
      callback: BlobCallback,
      type?: string,
      quality?: number
    ) {
      encoded.width = this.width;
      encoded.height = this.height;
      encoded.type = type || '';
      encoded.quality = quality ?? 0;
      const bytes = this.width === 1024 ? 500 * 1024 : 80;
      callback(new Blob([new Uint8Array(bytes)], { type: type || 'image/jpeg' }));
    } as HTMLCanvasElement['toBlob']);
    vi.mocked(uploadBytesResumable).mockImplementation((location, file) => ({
      snapshot: { ref: location },
      on(_event: string, _next: unknown, _error: unknown, done: () => void) {
        queueMicrotask(() => { void done(); });
      }
    }) as never);
    vi.mocked(getDownloadURL).mockResolvedValue('https://cdn.example/photo');

    const el = await mount(true);
    pick(el, fileOf(16, 'image/png', 'wide.png'));
    await settle(el);

    expect(encoded).toMatchObject({ width: 800, height: 400, type: 'image/jpeg', quality: 0.8 });
    expect(uploadBytesResumable).toHaveBeenCalled();
  });

  it('does not upload when the photo stays at 500 KB', async () => {
    installEncoder(4000, 3000);
    vi.spyOn(HTMLCanvasElement.prototype, 'toBlob').mockImplementation(function (
      this: HTMLCanvasElement,
      callback: BlobCallback,
      type?: string,
      quality?: number
    ) {
      encoded.width = this.width;
      encoded.quality = quality ?? 0;
      encoded.type = type || '';
      callback(new Blob([new Uint8Array(500 * 1024)], { type: type || 'image/jpeg' }));
    } as HTMLCanvasElement['toBlob']);

    const el = await mount(true);
    const input = pick(el, fileOf(16, 'image/png', 'huge.png'));
    await settle(el);

    expect(encoded).toMatchObject({ width: 640, quality: 0.56, type: 'image/jpeg' });
    expect(uploadBytesResumable).not.toHaveBeenCalled();
    expect(el.shadowRoot!.querySelector('[role="status"]')!.textContent).toBe('That photo is still over 500 KB. Try another.');
    expect(input.value).toBe('');
    expect(el.shadowRoot!.querySelector('progress')!.hasAttribute('hidden')).toBe(true);
  });

  it('reports an image that cannot be decoded and does not upload it', async () => {
    vi.stubGlobal('createImageBitmap', vi.fn(async () => {
      throw new Error('decode');
    }));
    const el = await mount(true);
    const input = pick(el, fileOf(16, 'image/png', 'broken.png'));
    await settle(el);

    expect(uploadBytesResumable).not.toHaveBeenCalled();
    expect(el.shadowRoot!.querySelector('[role="status"]')!.textContent).toBe('That image could not be prepared. Try another.');
    expect(input.value).toBe('');
    expect(el.shadowRoot!.querySelector('progress')!.hasAttribute('hidden')).toBe(true);
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
    expect(store.getState().session.photoURL).toBe('');
    expect(el.shadowRoot!.querySelector('[role="status"]')!.textContent).toBe('Photo removed.');
  });

});
