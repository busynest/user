/*
 * Planned removal: 4.0.0. Date: 2026-11-01.
 Optional - retired. The host owns users/{uid}. It deletes that doc on pwa-account-deleted. */

import { deleteDocument } from '../firebase/interface.js';

export async function deleteUserDoc(uid: string) {

  try {
    await deleteDocument('users', uid);
  } catch (error) {
    const code = error && typeof error === 'object' && 'code' in error ? String(error.code) : '';
    if (!code.includes('permission-denied')) throw error;
  }

}
