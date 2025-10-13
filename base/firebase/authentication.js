import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "@firebase/storage";
import { getAuth } from 'firebase/auth';
export const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG || "{}");
export const application = initializeApp(firebaseConfig);
export const db = getFirestore(application);
export const storage = getStorage(application);
export const auth = getAuth(application);
export const user = auth.currentUser;
//# sourceMappingURL=authentication.js.map