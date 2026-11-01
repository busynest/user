import { describe, expect, it } from 'vitest';

import { userMessage } from './message.js';
import {
  newPasswordIssue,
  passwordHint,
  passwordLong,
  passwordMax,
  passwordMin,
  passwordMismatch,
  passwordShort
} from './password.js';

function firebaseError(code: string) {
  return Object.assign(new Error('Firebase: Error (' + code + ').'), { code });
}

describe('new password', () => {

  it('uses one sentence for the hint, the short password, and auth/weak-password', () => {
    expect(passwordMin).toBe(8);
    expect(passwordMax).toBeGreaterThanOrEqual(64);
    expect(passwordMax).toBe(128);
    expect(passwordHint).toBe('At least 8 characters. A passphrase works well.');
    expect(passwordShort).toBe('Use at least 8 characters.');
    expect(passwordMismatch).toBe("Passwords don't match.");
    expect(userMessage({ code: 'pwa/short-password', message: passwordShort })).toBe(passwordShort);
    expect(userMessage({ code: 'pwa/weak-password', message: passwordShort })).toBe(passwordShort);
    expect(userMessage(firebaseError('auth/weak-password'))).toBe(passwordShort);
    expect(userMessage({ code: 'pwa/long-password', message: passwordLong })).toBe(passwordLong);
    expect(userMessage({ code: 'pwa/password-mismatch', message: passwordMismatch })).toBe(passwordMismatch);
  });

  it('allows spaces and other characters and does not cut the string', () => {
    const phrase = 'correct horse battery staple';
    const spaced = '  café pass  ';
    const letters = 'пароль12';
    expect(newPasswordIssue(phrase)).toBeNull();
    expect(newPasswordIssue(spaced)).toBeNull();
    expect(newPasswordIssue(letters)).toBeNull();
    expect(newPasswordIssue('aaaaaaaa')).toBeNull();
    expect(spaced).toBe('  café pass  ');
    expect(phrase.length).toBeGreaterThan(8);
  });

  it('rejects under 8 and over 128', () => {
    expect(newPasswordIssue('seven!!')).toEqual({ code: 'pwa/short-password', message: passwordShort });
    expect(newPasswordIssue('')).toEqual({ code: 'pwa/short-password', message: passwordShort });
    expect(newPasswordIssue('a'.repeat(128))).toBeNull();
    expect(newPasswordIssue('a'.repeat(129))).toEqual({ code: 'pwa/long-password', message: passwordLong });
  });

});
