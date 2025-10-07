import { initializeApp, FirebaseApp }           from 'firebase/app';
import { getFirestore, Firestore }              from "firebase/firestore";
import { getStorage, FirebaseStorage }          from "@firebase/storage";
import { getAuth, Auth, User }                  from 'firebase/auth';
// Memory Reference to Services - Object Type
export const firebaseConfig                     = JSON.parse(process.env.FIREBASE_CONFIG || "{}");
export const application : FirebaseApp          = initializeApp(firebaseConfig);
export const db : Firestore                     = getFirestore(application);
export const storage : FirebaseStorage          = getStorage(application);
export const auth : Auth                        = getAuth(application);
export const user : User | null                 = auth.currentUser;