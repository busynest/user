import { initializeApp, FirebaseApp, FirebaseOptions }  from 'firebase/app';
import { getFirestore, Firestore }                      from 'firebase/firestore';
import { getStorage, FirebaseStorage }                  from 'firebase/storage';
import { getAuth, User, Auth }                          from 'firebase/auth';

export interface InitializeOptions {
  /** Optional - an app the host already created. */
  app?:     FirebaseApp;
  /** Optional - config used when the host has no app yet. */
  config?:  FirebaseOptions;
}

export let firebaseConfig: FirebaseOptions = {};
export let application!: FirebaseApp;
export let db!: Firestore;
export let storage!: FirebaseStorage;
export let auth!: Auth;

/** @deprecated Optional - load-time snapshot. Required - read auth.currentUser at call time. */
export let user: User | null = null;

let started = false;
const waiters: Array<() => void> = [];

/** Required - true after initialize() has an app. */
export function isReady(): boolean {
  return started;
}

/** Required - run once the app exists. Runs now when it already does. */
export function onReady(fn: () => void): void {
  if (started) fn();
  else waiters.push(fn);
}

/** Optional - window.process.env.FIREBASE_CONFIG, the original boot path. */
function legacyConfig(): FirebaseOptions | null {

  const env = typeof process === 'undefined' ? undefined : process.env;
  const raw = env?.FIREBASE_CONFIG;

  if (!raw) return null;

  const parsed = JSON.parse(raw) as FirebaseOptions;

  if (!parsed || !parsed.apiKey) return null;

  return parsed;

}

/** Required - host app, host config, or the legacy FIREBASE_CONFIG. First call wins. */
export function initialize(options?: InitializeOptions): FirebaseApp {

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
    const config = options?.config ?? legacyConfig();
    if (!config) throw new Error('pwa-auth: pass initialize({ config }) or set window.process.env.FIREBASE_CONFIG');
    firebaseConfig  = config;
    application     = initializeApp(firebaseConfig);
  }

  db        = getFirestore(application);
  storage   = getStorage(application);
  auth      = getAuth(application);
  user      = auth.currentUser;
  started   = true;

  waiters.splice(0).forEach((fn) => fn());

  return application;

}

// Required - window.process.env.FIREBASE_CONFIG still boots the app at import
const legacy = legacyConfig();
if (legacy) initialize({ config: legacy });
