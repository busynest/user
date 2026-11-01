# Firebase

## Project

- Firebase Authentication with email and password
- Google sign-in, if you leave Continue with Google on (the default)
- Cloud Storage bucket
- Google Analytics, if you call `logAccount` or `logAccountDelete`

## Storage rules

Storage rules must allow the signed-in user to read and write only `pwa-auth/{uid}/**`.

## Firestore rules

Firestore rules allow `users/{uid}` and `contractors/{uid}`, and any other document `deleteDocument` removes, only when the signed-in uid is the document id or the `owner` field. Everything else is denied. The host owns those documents. See [Data ownership](README.md#data-ownership).

## FIREBASE_CONFIG

Required. Call `initialize({ config })`, or set `window.process.env.FIREBASE_CONFIG` in a classic script before the module runs. One assignment. A second `window.process = …` replaces the first and drops keys you already set.

```html
<script>
  window.process = { env: { FIREBASE_CONFIG: JSON.stringify({
    apiKey:            "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    authDomain:        "xxxxxxx.xxxxxxx.xxx",
    databaseURL:       "https://xxxxxxx.xxxxxxx.xxx",
    projectId:         "xxxxxxx",
    storageBucket:     "xxxxxxx.xxxxxxx.xxx",
    messagingSenderId: "xxxxxxxxxxx",
    appId:             "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    measurementId:     "xxxxxxxxxxx"
  }) } };
</script>
```

`authentication.ts` reads `process.env.FIREBASE_CONFIG` when `apiKey` is present and calls `initialize`. An empty config does not throw. Call `initialize` instead.

## initialize

```javascript
import { initialize } from 'pwa-auth';
import { getApp } from 'firebase/app';

// Optional - your config
initialize({
  config: {
    apiKey:            "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    authDomain:        "xxxxxxx.xxxxxxx.xxx",
    projectId:         "xxxxxxx",
    storageBucket:     "xxxxxxx.xxxxxxx.xxx",
    messagingSenderId: "xxxxxxxxxxx",
    appId:             "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  }
});

// Optional - an app you already created. Omit FIREBASE_CONFIG when you do this.
initialize({ app: getApp() });
```

| Export | |
|---|---|
| `initialize({ app, config, actionCodeSettings })` | Boot Firebase. `app` is a host app. `config` is a host config. `actionCodeSettings` is optional and is passed to the verification email. The legacy `FIREBASE_CONFIG` script still works. |

## firebase-config attribute

Optional. A tag can carry the same JSON. The first element to connect wins, and only when the app is not up yet.

```html
<user-icon firebase-config='{"apiKey":"...","authDomain":"...","projectId":"..."}'></user-icon>
```

The first `initialize` wins. A later call with a different app throws.

## actionCodeSettings

Optional. `actionCodeSettings` is passed to `sendEmailVerification`. Put the continue URL in `url`. A later `initialize({ actionCodeSettings })` still stores it after the app is up.

```javascript
initialize({
  config,
  actionCodeSettings: { url: 'https://example.com/continue' }
});
```

## Auth, Firestore, and Storage

| Export | |
|---|---|
| `auth` | Firebase Auth for this app. Read `auth.currentUser` at call time. |
| `db` | Firestore. |
| `storage` | Cloud Storage. |
| `application` | The Firebase app from `initialize` or from `FIREBASE_CONFIG`. |
| `firebaseConfig` | The parsed config object. |

## Password

Firebase Auth's own minimum is 6 characters. Sign-up and a password change in `<user-settings>` ask for 8 to 128. Spaces and other characters are allowed. There is no requirement for a number or a symbol. The sentence under the field is "At least 8 characters. A passphrase works well." A short password reads "Use at least 8 characters."

In the Firebase console, open Authentication and turn on the password policy. Set the minimum to 8 so the server uses the same rule. This package does not change that policy.

## Google sign-in

Continue with Google uses Firebase `signInWithPopup`. A blocked popup, or a phone, uses `signInWithRedirect`. The first success creates the Firebase user.

On [pwa-authentic.firebaseapp.com](https://pwa-authentic.firebaseapp.com) the redirect works, because that host is Firebase Hosting and `authDomain` is the same site. A host on another domain should keep the popup. Redirect there needs the [Firebase redirect guidance](https://firebase.google.com/docs/auth/web/redirect-best-practices): `authDomain` must be that site, or the sign-in must be proxied through Firebase Hosting. Browsers block the third-party storage the redirect handler uses.

Enable Google in the Firebase console:

1. Open the project. Go to Build, Authentication.
2. Open Sign-in method.
3. Choose Google. Turn on Enable.
4. Set a public-facing support email. Save.
5. Open Settings, then Authorized domains.
6. `localhost` and your `firebaseapp.com` / `web.app` domains are already there. Add every other domain that embeds the component. Save.

`hide-google` on `<user-login>` or `<user-drawer>` removes the button.

## Emulators

```bash
npm run test:emulator  # Auth, Firestore, and Storage emulators, then the browser checks
```

`npm run test:emulator` uses `firebase-tools` 14.24.0. Firestore and Storage need Java 21 or newer on `PATH`.
