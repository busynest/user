import { FirebaseApp, FirebaseOptions } from 'firebase/app';
import { Firestore } from 'firebase/firestore';
import { FirebaseStorage } from 'firebase/storage';
import { User, Auth } from 'firebase/auth';
export interface InitializeOptions {
    app?: FirebaseApp;
    config?: FirebaseOptions;
}
export declare let firebaseConfig: FirebaseOptions;
export declare let application: FirebaseApp;
export declare let db: Firestore;
export declare let storage: FirebaseStorage;
export declare let auth: Auth;
/** @deprecated Optional - load-time snapshot. Required - read auth.currentUser at call time. */
export declare let user: User | null;
export declare function isReady(): boolean;
export declare function onReady(fn: () => void): void;
export declare function initialize(options?: InitializeOptions): FirebaseApp;
