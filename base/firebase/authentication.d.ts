import { FirebaseApp } from 'firebase/app';
import { Firestore } from "firebase/firestore";
import { FirebaseStorage } from "@firebase/storage";
import { User, Auth } from 'firebase/auth';
export declare const firebaseConfig: any;
export declare const application: FirebaseApp;
export declare const db: Firestore;
export declare const storage: FirebaseStorage;
export declare const auth: Auth;
/** @deprecated Optional - load-time snapshot. Required - read auth.currentUser at call time. */
export declare const user: User | null;
