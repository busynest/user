/* Optional - retired. email-reset no longer renders an unlabeled phone field. */
/* Optional - retired. The send below alerted success and did not emit pwa-reset-sent. */

import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase/authentication';
import { pwaAuthError } from '../events/names';
import { emitWindow, toAuthError } from '../events/emit';
import { userMessage } from '../firebase/message';

export const phoneField = `
<input
  class="phoneVerify"
  type="text" />
`;

/** Optional - previous reset. email-reset no longer calls this. */
export async function retiredResetPassword(userEmail: string): Promise<void> {

  if (userEmail.length < 4) {
    const detail = { code: 'pwa/missing-email', message: 'Enter an email address.' };
    emitWindow(pwaAuthError, detail);
    alert(userMessage(detail));
    return;
  }

  try {
    await sendPasswordResetEmail(auth, userEmail);
    alert('Check your inbox for the reset email.');
  } catch (error) {
    emitWindow(pwaAuthError, toAuthError(error));
    alert(userMessage(error));
  }

}
