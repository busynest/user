import { initializeApp, FirebaseApp, FirebaseOptions }  from 'firebase/app';
import { getFirestore, Firestore }                      from 'firebase/firestore';
import { getStorage, FirebaseStorage }                  from 'firebase/storage';
import { getAuth, Auth, type ActionCodeSettings } from 'firebase/auth';

export interface InitializeOptions {
  /** Optional - an app the host already created. */
  app?:     FirebaseApp;
  /** Optional - config used when the host has no app yet. */
  config?:  FirebaseOptions;
  /** Optional - passed to sendEmailVerification. url is the continue URL. */
  actionCodeSettings?: ActionCodeSettings;
}

export let firebaseConfig: FirebaseOptions = {};
export let application!: FirebaseApp;
export let db!: Firestore;
export let storage!: FirebaseStorage;
export let auth!: Auth;

let started = false;
const waiters: Array<() => void> = [];
let actionCodeSettings: ActionCodeSettings | undefined;

/** Required - continue URL and other email action settings. Undefined until set. */
export function emailActionCodeSettings(): ActionCodeSettings | undefined {
  return actionCodeSettings;
}

/** Required - true after initialize() has an app. */
export function isReady(): boolean {
  return started;
}

/** Required - run once the app exists. Runs now when it already does. */
export function onReady(fn: () => void): void {
  if (started) fn();
  else waiters.push(fn);
}

/** Optional - window.process.env.FIREBASE_CONFIG, read before the module runs. */
function envConfig(): FirebaseOptions | null {

  const env = typeof process === 'undefined' ? undefined : process.env;
  const raw = env?.FIREBASE_CONFIG;

  if (!raw) return null;

  const parsed = JSON.parse(raw) as FirebaseOptions;

  if (!parsed || !parsed.apiKey) return null;

  return parsed;

}

/** Required - host app, host config, or FIREBASE_CONFIG. First call wins. */
export function initialize(options?: InitializeOptions): FirebaseApp {

  if (options && Object.prototype.hasOwnProperty.call(options, 'actionCodeSettings')) {
    actionCodeSettings = options.actionCodeSettings;
  }

  if (started) {
    if (options?.app && options.app !== application) {
      throw new Error('pwa-auth: Firebase app is already set');
    }
    return application;
  }

  if (options?.app) {
    application     = options.app;
    firebaseConfig  = application.options;
  } else {
    const config = options?.config ?? envConfig();
    if (!config) throw new Error('pwa-auth: pass initialize({ config }) or set window.process.env.FIREBASE_CONFIG');
    firebaseConfig  = config;
    application     = initializeApp(firebaseConfig);
  }

  db        = getFirestore(application);
  storage   = getStorage(application);
  auth      = getAuth(application);
  started   = true;

  waiters.splice(0).forEach((fn) => fn());

  return application;

}

// Required - window.process.env.FIREBASE_CONFIG still boots the app at import
const fromEnv = envConfig();
if (fromEnv) initialize({ config: fromEnv });
