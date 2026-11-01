# pwa-auth

Sign-in elements for a site that keeps its own pages. [Demo](https://pwa-authentic.firebaseapp.com).

Five tags. They share one sign-in. MIT.

## Install

```bash
npm install pwa-auth lit firebase
```

Install `lit` and `firebase` alongside pwa-auth.

```javascript
import 'pwa-auth';
```

That turns on all five tags. One tag at a time:

```javascript
import 'pwa-auth/icon';
import 'pwa-auth/drawer';
import 'pwa-auth/login';
import 'pwa-auth/settings';
import 'pwa-auth/reset';
```

A page with no build step:

```html
<script type="module" src="./node_modules/pwa-auth/source/pwa-auth.js"></script>
```

`import 'pwa-auth/production'` is that same file. Lit and Firebase are already inside it.

## Tags

```html
<user-icon subscribe></user-icon>
<user-drawer subscribe></user-drawer>
<user-login>
  <p slot="content">Signed in.</p>
</user-login>
<user-settings></user-settings>
<email-reset active></email-reset>
```

`user-icon` is the button that opens the drawer. Signed out it says Login, or Subscribe when `subscribe` is set. Signed in it shows the photo, initials, or the picture in `empty`.

`user-drawer` is the sheet that drops down. `subscribe` starts on sign-up. `hide-google` removes Continue with Google. `url` is the Settings link; leave it off to stay on this page. Your own links go in the `before` slot and the default slot.

`user-login` is those same forms in the page. `subscribe` and `hide-google` work the same way. The `content` slot replaces the form after sign-in.

`user-settings` holds the photo, name, email, password, and delete tabs. Signed out, it shows one line and no fields. `empty` is the picture used when the account has none.

`email-reset` is the password-reset form. It stays blank until `active` is set, then sends a reset email for the address in the field.

## Layout

The fields work in any layout, phone to desktop.

`--pwa_inset` is the space between the element's edge and its fields. Default `0`.

`--pwa_max_width` is the widest the form gets. Default `400px`, centered.

`--pwa_slide` is the animation length. Default `2s`, and `0s` when the visitor prefers reduced motion.

`--pwa_background` is the element's background. Default white.

```css
user-drawer, user-login, user-settings, email-reset {
  --pwa_inset: 16px;
  --pwa_max_width: 400px;
}
```

```javascript
import { initialize, getCurrentUser, onUserChanged, openDrawer, closeDrawer } from 'pwa-auth';
```

`getCurrentUser()` returns `{ uid, displayName, email, photoURL, emailVerified }` or `null`. `onUserChanged` calls you with that same shape and returns a function that stops the calls. `openDrawer` and `closeDrawer` open and close the drawer.

## Firebase

Connect Firebase before anyone signs in. Email and password are required. Turn on Google if that button stays. Photos are stored at `pwa-auth/{uid}/`.

1. `initialize()` is the one to use.

```javascript
import { initialize } from 'pwa-auth';

initialize({
  config: {
    apiKey: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    authDomain: 'xxxxxxx.xxxxxxx.xxx',
    projectId: 'xxxxxxx',
    storageBucket: 'xxxxxxx.xxxxxxx.xxx',
    messagingSenderId: 'xxxxxxxxxxx',
    appId: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
  }
});
```

2. Or put that same JSON in `firebase-config` on `user-icon`, `user-drawer`, `user-login`, or `user-settings`.

3. Or set `window.process.env.FIREBASE_CONFIG` to that JSON string before pwa-auth loads. If `window.process` is already there, add the value on it.

Use one of these. Once Firebase is connected, another one leaves it as it is.

## Animation

The drawer unrolls downward and its buttons ride the bottom edge; nothing animates on page load.

[The roll](docs/drawer-slide.md).

## License

MIT. See [license](license). Third-party notices are in [LICENSES.txt](LICENSES.txt).
