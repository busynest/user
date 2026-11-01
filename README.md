# pwa-auth

Sign-in elements for a site that keeps its own pages. [Demo](https://pwa-authentic.firebaseapp.com).

Five tags. They share one sign-in. MIT.

## Install

Install `lit` and `firebase` alongside pwa-auth.

```bash
npm install pwa-auth lit firebase
```

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

A page with no build step. Lit and Firebase are already in this file.

```html
<script type="module" src="./node_modules/pwa-auth/source/pwa-auth.js"></script>
```

`import 'pwa-auth/production'` is that same file.

| Import | What you get |
| --- | --- |
| `pwa-auth` | All five tags, and the functions below |
| `pwa-auth/icon` | `<user-icon>` only. Class `UserIcon` |
| `pwa-auth/drawer` | `<user-drawer>` only. Class `UserDrawer` |
| `pwa-auth/login` | `<user-login>` only. Class `UserLogin` |
| `pwa-auth/settings` | `<user-settings>` only. Class `UserSettings` |
| `pwa-auth/reset` | `<email-reset>` only. Class `EmailReset` |
| `pwa-auth/production` | The single file. Same functions as `pwa-auth` |

Works in current Chrome, Edge, Firefox, and Safari. The fields fit any layout, from a phone to a desktop.

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

| Tag | What you set | What it sets | Slots |
| --- | --- | --- | --- |
| `user-icon` | `subscribe` starts the label on Subscribe. `empty` is the picture when there is no photo and no initials. `firebase-config` is the Firebase JSON | | |
| `user-drawer` | `subscribe` starts on sign-up. `hide-google` removes Continue with Google. `url` is the Settings link; leave it off to stay on this page. `firebase-config` as above | `drawer` while open. `sliding` while it moves | `before`, and the default slot, for your own links |
| `user-login` | `subscribe` and `hide-google`, same as the drawer. `firebase-config` as above | | `content` replaces the form after sign-in |
| `user-settings` | `empty` is the picture when the account has none. `firebase-config` as above. Signed out, one line and no fields | | |
| `email-reset` | `active`, or the form stays blank. Then it emails a reset link for the address in the field | | |

## Events

Listen on `window`. `pwa-drawer-toggle` and `pwa-settings` also fire on `user-drawer`. Cancel `pwa-settings` to keep the drawer open. `userEmailChanged` is the old name for `pwa-email-changed`.

A user is `{ uid, displayName, email, photoURL, emailVerified }` or `null`.

| Event | Detail |
| --- | --- |
| `pwa-auth-changed` | `{ user }` on every sign-in change. `user` is `null` when signed out |
| `pwa-login` | `{ user }` |
| `pwa-logout` | `{ user: null }` |
| `pwa-signup` | `{ user }` |
| `pwa-account-deleted` | `{ uid }` |
| `pwa-profile-updated` | `{ uid, displayName, photoURL }` |
| `pwa-email-changed` | `{ email }` |
| `pwa-password-changed` | `{ uid }` |
| `pwa-reset-sent` | `{ email }`. Same event if no account uses that address |
| `pwa-verification-sent` | `{ email }` |
| `pwa-email-verified` | `{ user }` when the address becomes verified |
| `pwa-auth-error` | `{ code, message }` |
| `pwa-drawer-toggle` | `{ open }` |
| `pwa-settings` | `{ url }`. `url` is empty when Settings stays on this page |
| `userEmailChanged` | `{ email }`. Old name |

`eventName` is those strings in one object. `PwaEventMap` pairs each name with its event.

## Functions

```javascript
import { initialize, getCurrentUser, onUserChanged, openDrawer, closeDrawer } from 'pwa-auth';
```

| Function | Returns |
| --- | --- |
| `initialize({ config, app, actionCodeSettings })` | The Firebase app. Pass `config`, or an `app` you already started. `actionCodeSettings` is the link in the verification email |
| `getCurrentUser()` | The user object, or `null` |
| `onUserChanged(fn)` | Calls `fn` with the user object. Returns a function that stops the calls |
| `openDrawer()` | Opens the drawer |
| `closeDrawer()` | Closes the drawer |
| `toggleDrawer()` | Opens it if shut, closes it if open |
| `sendVerification()` | `true` if the verification email went out, `false` if it was already verified |
| `isEmailVerified()` | `true` or `false` after a reload |
| `logOut()` | Signs out |
| `reauthenticate(password)` | `true` if that password matches the current account |
| `logAccount()` | Counts a new account, if Analytics is on |
| `logAccountDelete()` | Counts a deleted account, if Analytics is on |
| `deleteDocument(collection, id)` | Deletes that Firestore document |
| `pwaDrawerToggle()` | Closes the drawer |

Also exported: `firebaseConfig`, `application`, `db`, `storage`, `auth`. `user` is only a snapshot from startup. Use `getCurrentUser()`.

## Look

Set these on the element. `--pwa_background` replaces the older background names `--pwa_drawer_background_color`, `--pwa_settings_background_color`, and `--section_background_color`.

| Variable | What it does | Default |
| --- | --- | --- |
| `--pwa_inset` | Space between the element's edge and its fields | `0` |
| `--pwa_max_width` | Widest the form gets. Centered | `400px` |
| `--pwa_slide` | Animation length. `0s` when the visitor prefers less motion | `2s` |
| `--pwa_background` | Background | white |
| `--pwa_input_background_color` | Field fill | white |
| `--pwa_drawer_text_color` | Text | `#1c2430` |
| `--pwa_label_text_color` | Labels | `#1c2430` |
| `--pwa_header_color` | Settings title | `#1c2430` |
| `--pwa_line_color` | Borders | `#e3daca` |
| `--pwa_nav_button_color` | Quiet text | `#4e5b6a` |
| `--pwa_nav_highlight_color` | Selected tab text | `#1c2430` |
| `--pwa_nav_on_background` | Selected tab and notice | `#f2f2f2` |
| `--pwa_action_text_color` | Button text | white |
| `--pwa_action_background_color` | Green buttons and links | `#2a6b45` |
| `--pwa_action_border_color` | Button border | `#214f34` |
| `--pwa_close_color` | Close mark and errors | `#9a3b32` |
| `--pwa_verified_color` | Verified check | the button green |
| `--pwa_tap` | Shortest a control can be | `44px` |
| `--pwa_icon_background_color` | Icon button | `#2a6b45` |
| `--pwa_icon_hover_color` | Icon button, pointer over it | `#214f34` |
| `--pwa_icon_border` | Icon button border | `0` |
| `--pwa_icon_height` | Signed-out button height | `44px` |
| `--pwa_icon_padding` | Signed-out button padding | `0 18px` |
| `--pwa_icon_radius` | Signed-out button corners | `10px` |
| `--pwa_icon_font` | Signed-out button font | `"Avenir Next", "Segoe UI", system-ui, sans-serif` |
| `--pwa_icon_diameter` | Signed-in button size | `44px` |
| `--pwa_drawer_position` | Drawer placement | `absolute` |
| `--pwa_drawer_border` | Line under the drawer | `0` |
| `--pwa_drawer_z-index` | Drawer stacking | `3` |
| `--pwa_drawer_border-radius` | Drawer corners | `0 0 18px 18px` |

```css
user-drawer, user-login, user-settings, email-reset {
  --pwa_inset: 16px;
  --pwa_max_width: 400px;
}
```

The drawer unrolls downward and its buttons ride the bottom edge. Nothing animates on page load. Less motion makes that instant. [The roll](docs/drawer-slide.md).

## Firebase

Turn on Email/Password. Turn on Google if that button stays. Photos go to Storage at `pwa-auth/{uid}/`. Let the signed-in person read and write that folder. The elements do not write Firestore.

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

## License

MIT. See [license](license). Third-party notices are in [LICENSES.txt](LICENSES.txt).
