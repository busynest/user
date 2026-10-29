/* Optional - retired. initialize() in firebase/authentication.ts replaces import-time setup. */

import { initializeApp }    from 'firebase/app';
import { getFirestore }     from 'firebase/firestore';
import { getStorage }       from 'firebase/storage';
import { getAuth }          from 'firebase/auth';

/** @deprecated Optional - threw when FIREBASE_CONFIG was empty. */
export function immediateFirebaseInit() {

  const firebaseConfig  = JSON.parse(process.env.FIREBASE_CONFIG || '{}');
  const application     = initializeApp(firebaseConfig);
  const db              = getFirestore(application);
  const storage         = getStorage(application);
  const auth            = getAuth(application);
  const user            = auth.currentUser;

  return { firebaseConfig, application, db, storage, auth, user };

}
