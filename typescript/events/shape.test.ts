import { describe, expect, it } from 'vitest';

import {
  eventName,
  pwaAccountDeleted,
  pwaAuthChanged,
  pwaAuthError,
  pwaDrawerToggleName,
  pwaEmailChanged,
  pwaPasswordChanged,
  pwaLogin,
  pwaLogout,
  pwaProfileUpdated,
  pwaSignup,
  pwaVerificationSent,
  pwaEmailVerified
} from './names';
import { emitElement, emitWindow } from './emit';
import { userEmailChanged } from '../deprecated/email-changed';

describe('event names', () => {

  it('keeps the pwa- strings in one module', () => {
    expect(pwaAuthChanged).toBe('pwa-auth-changed');
    expect(pwaLogin).toBe('pwa-login');
    expect(pwaLogout).toBe('pwa-logout');
    expect(pwaSignup).toBe('pwa-signup');
    expect(pwaAccountDeleted).toBe('pwa-account-deleted');
    expect(pwaProfileUpdated).toBe('pwa-profile-updated');
    expect(pwaEmailChanged).toBe('pwa-email-changed');
    expect(pwaPasswordChanged).toBe('pwa-password-changed');
    expect(eventName.passwordChanged).toBe(pwaPasswordChanged);
    expect(pwaDrawerToggleName).toBe('pwa-drawer-toggle');
    expect(pwaAuthError).toBe('pwa-auth-error');
    expect(eventName.drawerToggle).toBe(pwaDrawerToggleName);
    expect(userEmailChanged).toBe('userEmailChanged');
    expect(pwaVerificationSent).toBe('pwa-verification-sent');
    expect(pwaEmailVerified).toBe('pwa-email-verified');
    expect(eventName.verificationSent).toBe(pwaVerificationSent);
    expect(eventName.emailVerified).toBe(pwaEmailVerified);
  });

});

describe('event shape', () => {

  it('dispatches pwa-auth-changed with a user or null', () => {
    const seen: CustomEvent[] = [];
    const hear = (event: Event) => { seen.push(event as CustomEvent); };
    window.addEventListener(pwaAuthChanged, hear);

    const user = { uid: 'u1', displayName: 'Ada', email: 'ada@example.com', photoURL: null };
    emitWindow(pwaAuthChanged, { user });
    emitWindow(pwaAuthChanged, { user: null });

    window.removeEventListener(pwaAuthChanged, hear);

    expect(seen).toHaveLength(2);
    expect(seen[0].bubbles).toBe(true);
    expect(seen[0].composed).toBe(true);
    expect(seen[0].detail).toEqual({ user });
    expect(seen[1].detail).toEqual({ user: null });
  });

  it('dispatches pwa-auth-error with code and message', () => {
    const seen: CustomEvent[] = [];
    const hear = (event: Event) => { seen.push(event as CustomEvent); };
    window.addEventListener(pwaAuthError, hear);

    emitWindow(pwaAuthError, { code: 'auth/wrong-password', message: 'Wrong password' });

    window.removeEventListener(pwaAuthError, hear);

    expect(seen[0].detail).toEqual({ code: 'auth/wrong-password', message: 'Wrong password' });
    expect(seen[0].bubbles).toBe(true);
    expect(seen[0].composed).toBe(true);
  });

  it('dispatches pwa-drawer-toggle from the element', () => {
    const host = document.createElement('div');
    document.body.append(host);
    const seen: CustomEvent[] = [];
    host.addEventListener(pwaDrawerToggleName, (event) => {
      seen.push(event as CustomEvent);
    });

    emitElement(host, pwaDrawerToggleName, { open: true });

    expect(seen[0].detail).toEqual({ open: true });
    expect(seen[0].bubbles).toBe(true);
    expect(seen[0].composed).toBe(true);
    host.remove();
  });

  it('dispatches pwa-password-changed with the uid only', () => {
    const seen: CustomEvent[] = [];
    const hear = (event: Event) => { seen.push(event as CustomEvent); };
    window.addEventListener(pwaPasswordChanged, hear);

    emitWindow(pwaPasswordChanged, { uid: 'u1' });

    window.removeEventListener(pwaPasswordChanged, hear);

    expect(seen[0].detail).toEqual({ uid: 'u1' });
    expect(seen[0].detail.password).toBeUndefined();
    expect(seen[0].bubbles).toBe(true);
    expect(seen[0].composed).toBe(true);
  });

  it('dispatches pwa-verification-sent with the address', () => {
    const seen: CustomEvent[] = [];
    const hear = (event: Event) => { seen.push(event as CustomEvent); };
    window.addEventListener(pwaVerificationSent, hear);

    emitWindow(pwaVerificationSent, { email: 'ada@example.com' });

    window.removeEventListener(pwaVerificationSent, hear);

    expect(seen[0].detail).toEqual({ email: 'ada@example.com' });
    expect(seen[0].bubbles).toBe(true);
    expect(seen[0].composed).toBe(true);
  });

  it('dispatches pwa-email-verified with the user', () => {
    const seen: CustomEvent[] = [];
    const hear = (event: Event) => { seen.push(event as CustomEvent); };
    window.addEventListener(pwaEmailVerified, hear);

    const user = {
      uid: 'u1',
      displayName: 'Ada',
      email: 'ada@example.com',
      photoURL: null,
      emailVerified: true
    };
    emitWindow(pwaEmailVerified, { user });

    window.removeEventListener(pwaEmailVerified, hear);

    expect(seen[0].detail).toEqual({ user });
    expect(seen[0].detail.user.emailVerified).toBe(true);
    expect(seen[0].bubbles).toBe(true);
    expect(seen[0].composed).toBe(true);
  });

});
