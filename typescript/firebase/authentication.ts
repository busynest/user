import { initializeApp, FirebaseApp }            from 'firebase/app';
import { getFirestore, Firestore}             from "firebase/firestore";
import { getStorage, FirebaseStorage}               from "@firebase/storage";
import { getAuth, User, Auth }            from 'firebase/auth';
// Memory Reference to Services - Object Type
/*
export const firebaseConfig                     = JSON.parse(process.env.FIREBASE_CONFIG || "{}");
export const application                        = initializeApp(firebaseConfig);
export const db                                 = getFirestore(application);
export const storage                            = getStorage(application);
export const auth                               = getAuth(application);
export const user                               = auth.currentUser;
*/
export const firebaseConfig                     = JSON.parse(process.env.FIREBASE_CONFIG || "{}");
export const application : FirebaseApp          = initializeApp(firebaseConfig);
export const db : Firestore                     = getFirestore(application);
export const storage : FirebaseStorage          = getStorage(application);
export const auth : Auth                        = getAuth(application);
export const user : User | null                 = auth.currentUser;
