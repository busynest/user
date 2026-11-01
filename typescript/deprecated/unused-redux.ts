/**
 * What it was: Redux fields and actions nothing in the live elements read.
 * Why deprecated: sign-up toggle, phone, anon, message token, uid copy, and a second copy of the name and photo were written and never shown.
 * Date: 2026-11-01
 * Planned removal: 4.0.0
 *
 * Not imported. The live slices are redux/frontend.ts and redux/backend.ts.
 */

export const retiredFrontendFields = ['userId', 'customer', 'profileChoice', 'name', 'photoURL', 'phone', 'email'] as const;
export const retiredFrontendActions = ['signUpAction', 'signUpClose', 'iconAuth', 'nameAuth'] as const;
export const retiredBackendFields = ['anon', 'userId', 'phone', 'msgToken'] as const;
export const retiredBackendActions = ['accAnon', 'accID', 'accPhone', 'messageId'] as const;
