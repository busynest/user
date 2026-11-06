import { FirebaseApp, FirebaseOptions } from 'firebase/app';
import { Firestore } from 'firebase/firestore';
import { FirebaseStorage } from 'firebase/storage';
import { User, Auth, type ActionCodeSettings } from 'firebase/auth';
export interface InitializeOptions {
    /** Optional - an app the host already created. */
    app?: FirebaseApp;
    /** Optional - config used when the host has no app yet. */
    config?: FirebaseOptions;
    /** Optional - passed to sendEmailVerification. url is the continue URL. */
    actionCodeSettings?: ActionCodeSettings;
}
export declare let firebaseConfig: FirebaseOptions;
export declare let application: FirebaseApp;
export declare let db: Firestore;
export declare let storage: FirebaseStorage;
export declare let auth: Auth;
/** @deprecated Optional - load-time snapshot. Required - read auth.currentUser at call time. */
export declare let user: User | null;
/** Required - continue URL and other email action settings. Undefined until set. */
export declare function emailActionCodeSettings(): ActionCodeSettings | undefined;
/** Required - true after initialize() has an app. */
export declare function isReady(): boolean;
/** Required - run once the app exists. Runs now when it already does. */
export declare function onReady(fn: () => void): void;
/** Required - host app, host config, or the legacy FIREBASE_CONFIG. First call wins. */
export declare function initialize(options?: InitializeOptions): FirebaseApp;
//# sourceMappingURL=authentication.d.ts.map