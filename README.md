# pwa-auth

Sign-in elements for a site that keeps its own interface. [Demo](https://pwa-authentic.firebaseapp.com).

Five tags: `user-icon`, `user-drawer`, `user-login`, `user-settings`, `email-reset`. One Firebase session. MIT.

## Install

```bash
npm install pwa-auth lit firebase
```

`lit` and `firebase` are peers. Redux ships with the package.

```javascript
import 'pwa-auth';
```

That registers all five. One tag at a time:

```javascript
import 'pwa-auth/icon';
import 'pwa-auth/drawer';
import 'pwa-auth/login';
import 'pwa-auth/settings';
import 'pwa-auth/reset';
```

Each of those loads only that element. The drawer's roll does not load the page login or the settings roll.

A page with no bundler uses the single file. Lit and Firebase are already in it.

```html
<script type="module" src="./node_modules/pwa-auth/source/pwa-auth.js"></script>
```

`import 'pwa-auth/production'` is that file.

## Usage

```html
<user-icon subscribe></user-icon>
<user-drawer subscribe></user-drawer>
<user-login>
  <p slot="content">Signed in.</p>
</user-login>
<user-settings></user-settings>
<email-reset active></email-reset>
```

`subscribe` starts the icon label, and the drawer or page form, on sign-up. Leave it off to start on sign-in.

`user-drawer` opens from `user-icon`. After sign-in it shows the name, a Settings control, and Log out. Put the host's own links in the `before` slot and the default slot.

`user-login` is the same pair of forms in the page. Slot `content` replaces them after sign-in. `hide-google` removes Continue with Google.

`user-settings` is four tabs: Icon, Profile, Password, Delete. Signed out, it shows one line and no fields.

`email-reset` renders nothing until `active` is set. It sends the reset mail for the address in the field.

```javascript
import { initialize, getCurrentUser, onUserChanged, openDrawer, closeDrawer } from 'pwa-auth';
```

`getCurrentUser()` returns `{ uid, displayName, email, photoURL, emailVerified }` or `null`. `onUserChanged` calls back with that shape and returns `unsubscribe`. `openDrawer` and `closeDrawer` move the drawer.

## Firebase

Call `initialize` before anyone signs in. Email and password, plus Google if the button stays on. Storage is used for the photo at `pwa-auth/{uid}/`.

```javascript
import { initialize } from 'pwa-auth';

initialize({
  config: {
    apiKey:            'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    authDomain:        'xxxxxxx.xxxxxxx.xxx',
    projectId:         'xxxxxxx',
    storageBucket:     'xxxxxxx.xxxxxxx.xxx',
    messagingSenderId: 'xxxxxxxxxxx',
    appId:             'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
  }
});
```

Or set the same JSON on `window.process.env.FIREBASE_CONFIG` in a classic script before the module runs. One assignment. A second `window.process = …` replaces the first.

An element can also carry `firebase-config='{"apiKey":"…"}'`. The first value to connect wins.

## Roll animation

`--pwa_slide` is `2s` `ease-in-out` on each component's own host. `prefers-reduced-motion: reduce` sets that variable to `0s`.

The first paint is already at rest. The drawer is shut. The page card and the settings panel are at their current height. Nothing eases until a later change: opening the drawer, swapping login and sign-up, or changing a settings tab. One component's roll does not start another's.

[The roll](docs/drawer-slide.md).

## License

MIT. See [license](license). Third-party notices are in [LICENSES.txt](LICENSES.txt).
