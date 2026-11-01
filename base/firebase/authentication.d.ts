import { FirebaseApp, FirebaseOptions } from 'firebase/app';
import { Firestore } from 'firebase/firestore';
import { FirebaseStorage } from 'firebase/storage';
import { Auth, type ActionCodeSettings } from 'firebase/auth';
export interface InitializeOptions {
    app?: FirebaseApp;
    config?: FirebaseOptions;
    actionCodeSettings?: ActionCodeSettings;
}
export declare let firebaseConfig: FirebaseOptions;
export declare let application: FirebaseApp;
export declare let db: Firestore;
export declare let storage: FirebaseStorage;
export declare let auth: Auth;
export declare function emailActionCodeSettings(): ActionCodeSettings | undefined;
export declare function isReady(): boolean;
export declare function onReady(fn: () => void): void;
export declare function initialize(options?: InitializeOptions): FirebaseApp;
//# sourceMappingURL=authentication.d.ts.map