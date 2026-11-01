/** Required - sign-up told this address to check its inbox. */
let sentEmail = '';

const listeners = new Set<() => void>();

export function markVerificationNotice(email: string): void {
  sentEmail = email;
  listeners.forEach((fn) => fn());
}

export function verificationNotice(): string {
  return sentEmail;
}

export function onVerificationNotice(fn: () => void): () => void {
  listeners.add(fn);
  return () => { listeners.delete(fn); };
}
