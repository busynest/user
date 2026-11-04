import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
export let firebaseConfig = {};
export let application;
export let db;
export let storage;
export let auth;
/** @deprecated Optional - load-time snapshot. Required - read auth.currentUser at call time. */
export let user = null;
let started = false;
const waiters = [];
let actionCodeSettings;
/** Required - continue URL and other email action settings. Undefined until set. */
export function emailActionCodeSettings() {
    return actionCodeSettings;
}
/** Required - true after initialize() has an app. */
export function isReady() {
    return started;
}
/** Required - run once the app exists. Runs now when it already does. */
export function onReady(fn) {
    if (started)
        fn();
    else
        waiters.push(fn);
}
/** Optional - window.process.env.FIREBASE_CONFIG, the original boot path. */
function legacyConfig() {
    const env = typeof process === 'undefined' ? undefined : process.env;
    const raw = env?.FIREBASE_CONFIG;
    if (!raw)
        return null;
    const parsed = JSON.parse(raw);
    if (!parsed || !parsed.apiKey)
        return null;
    return parsed;
}
/** Required - host app, host config, or the legacy FIREBASE_CONFIG. First call wins. */
export function initialize(options) {
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
        application = options.app;
        firebaseConfig = application.options;
    }
    else {
        const config = options?.config ?? legacyConfig();
        if (!config)
            throw new Error('pwa-auth: pass initialize({ config }) or set window.process.env.FIREBASE_CONFIG');
        firebaseConfig = config;
        application = initializeApp(firebaseConfig);
    }
    db = getFirestore(application);
    storage = getStorage(application);
    auth = getAuth(application);
    user = auth.currentUser;
    started = true;
    waiters.splice(0).forEach((fn) => fn());
    return application;
}
// Required - window.process.env.FIREBASE_CONFIG still boots the app at import
const legacy = legacyConfig();
if (legacy)
    initialize({ config: legacy });
//# sourceMappingURL=authentication.js.map