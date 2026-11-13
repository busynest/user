# Google sign-in on iPhone and Safari (Firebase Auth PWAs)

This guide is for any Firebase Auth app. `<your-domain>` is the site people open. `<project-id>` is the Firebase project id. The same steps apply to `www.<your-domain>` when that host is in use.

## 1. Why

Safari's tracking prevention blocks the cross-site storage Firebase redirect sign-in uses. That storage lives on `authDomain`. When `authDomain` is `<project-id>.firebaseapp.com` and the app runs on `<your-domain>`, those are different sites. The person signs in at Google, comes back, and is signed out.

A desktop popup often stays on your origin, so the same setup can look fine there. iPhone Safari and a home-screen app leave the page and come back. They need the handler on `<your-domain>`.

## 2. Google Cloud: the web client

1. Open [APIs & Services, Credentials](https://console.cloud.google.com/apis/credentials).
2. Select the project for `<project-id>`.
3. Under OAuth 2.0 Client IDs, open the client whose Type is Web application. The name may vary.
4. Add an Authorized JavaScript origin: `https://<your-domain>`.
5. Add an Authorized redirect URI: `https://<your-domain>/__/auth/handler`.
6. Keep the existing `firebaseapp.com` origins and redirect URIs.
7. Save. Allow a few minutes.

Credentials is in the left menu. The Enabled APIs list is a different page.

## 3. Firebase: authorized domains

1. Open the Firebase console. Go to Authentication, then Settings, then Authorized domains.
2. Confirm `<your-domain>` is listed. Choose Add domain when it is missing.

Repeat sections 2 and 3 for `www.<your-domain>` when the site uses that host. The origin is `https://www.<your-domain>`. The redirect URI is `https://www.<your-domain>/__/auth/handler`.

## 4. Code

On the production domain, set `authDomain` to the page's own host. On localhost and on preview channels, keep `<project-id>.firebaseapp.com`.

Use `signInWithPopup` in a normal browser tab. Use `signInWithRedirect` and `getRedirectResult` in the installed standalone PWA. Detect that with `matchMedia('(display-mode: standalone)')` or `navigator.standalone`. When the popup fails with `auth/popup-blocked`, use the redirect.

```javascript
import {
  GoogleAuthProvider,
  getRedirectResult,
  signInWithPopup,
  signInWithRedirect
} from 'firebase/auth';

const host = location.hostname;
const preview = host === 'localhost'
  || host === '127.0.0.1'
  || host.endsWith('.firebaseapp.com')
  || host.endsWith('.web.app');

const authDomain = preview ? '<project-id>.firebaseapp.com' : host;

function installedApp() {
  return window.matchMedia('(display-mode: standalone)').matches
    || navigator.standalone === true;
}

export async function signInWithGoogle(auth) {
  const provider = new GoogleAuthProvider();
  if (installedApp()) {
    await signInWithRedirect(auth, provider);
    return;
  }
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    if (error && error.code === 'auth/popup-blocked') {
      await signInWithRedirect(auth, provider);
      return;
    }
    throw error;
  }
}

// Call once after Auth is ready. A normal page load returns null.
export function resumeGoogleRedirect(auth) {
  return getRedirectResult(auth);
}
```

Pass `authDomain` in the Firebase config the page already uses.

Keep the service worker from caching or rewriting `/__/auth` and `/__/firebase`. A worker that sends every navigation to `index.html` must leave those paths alone.

```javascript
self.addEventListener('fetch', (event) => {
  const path = new URL(event.request.url).pathname;
  if (path.startsWith('/__/auth') || path.startsWith('/__/firebase')) return;
  // Cache and respond for the rest of the app.
});
```

Firebase Hosting serves `/__/auth/handler` on a connected custom domain. Another host proxies `/__/auth` and `/__/firebase` to `https://<project-id>.firebaseapp.com`. The proxy steps are in [Firebase's redirect best practices](https://firebase.google.com/docs/auth/web/redirect-best-practices).

## 5. Test after you deploy

Wait a few minutes after the console saves, then deploy the `authDomain` change.

1. iPhone Safari tab. Open `https://<your-domain>`, continue with Google, and come back signed in.
2. Home-screen icon. Open the installed app and sign in the same way.
3. Desktop Safari. The popup signs you in. When the browser blocks the popup, the redirect still returns you signed in.

## 6. Troubleshooting

| What you see | Fix |
| --- | --- |
| `redirect_uri_mismatch` | Add Authorized redirect URI `https://<your-domain>/__/auth/handler` on the Web application client. Include `www` when that host is in use. |
| `auth/unauthorized-domain` | Add `<your-domain>` under Firebase Authentication, Settings, Authorized domains. |
| Signed out after returning from Google | On the production page, `authDomain` is still `<project-id>.firebaseapp.com`, or a service worker is caching or rewriting `/__/auth`. |

## With pwa-auth

pwa-auth does not set `authDomain`. Pass the host from section 4 in `initialize({ config })`, in the `firebase-config` attribute, or in `window.process.env.FIREBASE_CONFIG`.

Continue with Google calls `signInWithGoogle` in `typescript/firebase/google.ts`.

- A phone user agent (iPhone, iPad, iPod, or Android) uses `signInWithRedirect`. That includes a normal iPhone Safari tab. The check is the user agent. It does not read `display-mode: standalone` or `navigator.standalone`.
- Any other browser uses `signInWithPopup`. `auth/popup-blocked` falls back to `signInWithRedirect`.
- `watchGoogleRedirect` calls `getRedirectResult` once, after `initialize` has an app.

The package does not register a service worker. Skip `/__/auth` and `/__/firebase` in the worker that ships with the page. An iPhone Safari tab in this package already uses the redirect, so sections 2–4 apply to that tab and to the home-screen icon.
