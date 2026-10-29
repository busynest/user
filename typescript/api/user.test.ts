import { describe, expect, it, vi } from 'vitest';

const firebase = vi.hoisted(() => {
  const listeners = new Set<(user: unknown) => void>();
  const state: {
    currentUser: null | {
      uid: string;
      displayName: string | null;
      email: string | null;
      photoURL: string | null;
    };
  } = { currentUser: null };

  return {
    listeners,
    state,
    emit(user: typeof state.currentUser) {
      state.currentUser = user;
      listeners.forEach((callback) => callback(user));
    }
  };
});

vi.mock('firebase/app', () => ({
  initializeApp: vi.fn((config: object) => ({ name: '[DEFAULT]', options: config }))
}));

vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(() => ({
    get currentUser() { return firebase.state.currentUser; }
  })),
  onAuthStateChanged: vi.fn((_auth: unknown, callback: (user: unknown) => void) => {
    firebase.listeners.add(callback);
    callback(firebase.state.currentUser);
    return () => { firebase.listeners.delete(callback); };
  })
}));

vi.mock('firebase/firestore', () => ({
  getFirestore: vi.fn(() => ({}))
}));

vi.mock('firebase/storage', () => ({
  getStorage: vi.fn(() => ({}))
}));

import { initialize } from '../firebase/authentication';
import { getCurrentUser, onUserChanged } from './user';

describe('onUserChanged', () => {

  it('unsubscribe drops the listener', () => {
    const early: unknown[] = [];
    const stopEarly = onUserChanged((user) => { early.push(user); });
    stopEarly();

    initialize({
      config: {
        apiKey:     'test',
        authDomain: 'test.firebaseapp.com',
        projectId:  'test'
      }
    });

    expect(early).toEqual([]);
    expect(getCurrentUser()).toBeNull();

    const seen: unknown[] = [];
    const stop = onUserChanged((user) => { seen.push(user); });
    expect(seen).toEqual([null]);

    stop();
    firebase.emit({
      uid:          '1',
      displayName:  'Ada',
      email:        'ada@example.com',
      photoURL:     null
    });

    expect(seen).toEqual([null]);
    expect(firebase.listeners.size).toBe(0);
  });

});
