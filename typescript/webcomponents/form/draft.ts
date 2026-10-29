/** Optional - last address typed on a sign-in form. email-reset reads it. */

let draft = '';

const listeners = new Set<() => void>();

/** Required - remember a sign-in address for email-reset. */
export function rememberEmail(value: string): void {

  const next = value.trim();

  if (next === draft) return;

  draft = next;

  if (!next) return;

  listeners.forEach((hear) => hear());

}

/** Required - the remembered address, or an empty string. */
export function draftedEmail(): string {
  return draft;
}

/** Required - hear the next remembered address. Returns unsubscribe. */
export function onDraftEmail(hear: () => void): () => void {
  listeners.add(hear);
  return () => { listeners.delete(hear); };
}

/** Optional - tests drop the remembered address. */
export function clearDraftEmail(): void {
  draft = '';
}
