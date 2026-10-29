# pwa-auth

Jack's Publishing maintains sign-in and account components so a site can stay on its own interface. [Live demo](https://pwa-authentic.firebaseapp.com).

Five custom elements sign a person up, sign them in, and let them change their name, email, password, and photo, or delete the account. Email and password only. One Firebase app, one Redux store, shared by every tag on the page.

Place the tags, set the Firebase config before the module loads or call `initialize`, and optionally restyle with `--pwa_` variables. Host pages listen for `pwa-` events instead of reading the Redux store.

## Prerequisites

- Firebase Authentication with email and password
- Cloud Storage bucket
- Google Analytics, if you call `logAccount` or `logAccountDelete`

Storage rules must allow the signed-in user to read and write only `pwa-auth/{uid}/**`.

Firestore rules allow `users/{uid}` and `contractors/{uid}`, and any other document `deleteDocument` removes, only when the signed-in uid is the document id or the `owner` field. Everything else is denied.

## Install

```bash
npm install pwa-auth
```

Two entries:

```javascript
// Required - dev graph. tsc output. Install the lit and firebase peers.
import 'pwa-auth';

// Optional - one file. Rollup bundle for a page or for npm production.
import 'pwa-auth/production';
```

`pwa-auth` resolves to `base/export/pwa-auth.js`. `pwa-auth/production` resolves to `source/pwa-auth.js`.

A plain script tag uses the bundle:

```html
<script type="module" src="./path_to/pwa-auth.js"></script>
```

## Firebase

Required. Either set this in a classic script before the module runs, or call `initialize` from the host. One assignment. A second `window.process = …` replaces the first and drops keys you already set.

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

Optional. A tag can carry the same JSON. The first element to connect wins, and only when the app is not up yet.

```html
<user-icon firebase-config='{"apiKey":"...","authDomain":"...","projectId":"..."}'></user-icon>
```

The first `initialize` wins. A later call with a different app throws.

## Elements

Importing the package defines all five.

### `<user-icon>`

The button that opens the drawer.

| Attribute | |
|---|---|
| `subscribe` | Logged-out label is Subscribe. Without it, the label is Login. |
| `empty` | Image URL used when the account has no photo. |

Logged in, the button shows the photo. The click opens or closes the drawer. Style it with `user-icon::part(button)` and `user-icon::part(photo)`.

### `<user-drawer>`

Drops open from the top in 1.4 seconds.

| Attribute | |
|---|---|
| `subscribe` | Starts on the sign-up form. Without it, starts on sign-in. |
| `url` | `href` of the Settings link shown after sign-in. Point it at the page that hosts `<user-settings>`. |
| `drawer` | Reflects the open state. Redux overwrites it. Do not treat it as an input. |

Logged out, the header reads Subscribe or Login to match the form. Logged in, the header shows the display name, then:

- slot `before`
- the Settings link
- the default slot
- Log out

There is no slot named `within`. The second slot is the default slot.

### `<user-login>`

The same forms, in the page instead of the drawer.

| Attribute | |
|---|---|
| `subscribe` | Starts on sign-up. Without it, starts on sign-in. |

Logged in, the forms are replaced by slot `content`.

```html
<user-login>
  <div slot="content">
    <p>Page content</p>
  </div>
</user-login>
```

### `<user-settings>`

Four tabs: Icon, Profile, Password, Delete.

| Attribute | |
|---|---|
| `empty` | Fallback photo, passed through to the uploader as `emptyArtwork`. |

Profile updates the display name and starts an email change with `verifyBeforeUpdateEmail`. On success the page dispatches `pwa-email-changed` on `window` with `{ email }`. The old `userEmailChanged` event still fires and is deprecated. Password requires the verify field to match. Delete removes this user's files under `pwa-auth/{uid}`, calls `logAccountDelete`, then deletes the auth user. A failed action alerts a short sentence and dispatches `pwa-auth-error`.

### `<email-reset>`

Sends a password reset for the address in the field.

| Attribute | |
|---|---|
| `active` | Required. The element renders nothing until `active` is set. |

```html
<email-reset active></email-reset>
```

## Drawer page

```html
<body>
  <header>
    <user-icon subscribe empty="./images/empty.jpg"></user-icon>
  </header>

  <user-drawer subscribe url="./settings">
    <a slot="before" href="./settings">Settings</a>
    <a href="./elsewhere">Another link</a>
  </user-drawer>

  <main>
    <user-settings empty="./images/empty.jpg"></user-settings>
  </main>
</body>
```

## Sign-in page

```html
<body>
  <header>
    <user-icon empty="./images/empty.jpg" subscribe></user-icon>
  </header>

  <main>
    <user-login subscribe>
      <div slot="content">
        <p>Page content</p>
      </div>
    </user-login>

    <user-settings empty="./images/empty.jpg"></user-settings>
  </main>
</body>
```

## Events

Global events fire on `window`. `pwa-drawer-toggle` fires on `<user-drawer>`, bubbles, and is `composed`. Every event is a `CustomEvent` with `bubbles: true` and `composed: true`. Names and detail types live in `typescript/events/names.ts` and `typescript/events/types.ts`.

- `pwa-auth-changed` — every `onAuthStateChanged`. Detail: `{ user: { uid, displayName, email, photoURL } | null }`
- `pwa-login` — email sign-in succeeded. Detail: `{ user: { uid, displayName, email, photoURL } }`
- `pwa-logout` — `logOut()` finished. Detail: `{ user: null }`
- `pwa-signup` — `createUserWithEmailAndPassword` succeeded. Detail: `{ user: { uid, displayName, email, photoURL } }`
- `pwa-account-deleted` — the auth user was deleted. Detail: `{ uid }`
- `pwa-profile-updated` — display name or photo saved. Detail: `{ uid, displayName, photoURL }`
- `pwa-email-changed` — `verifyBeforeUpdateEmail` accepted the address. Detail: `{ email }`
- `pwa-drawer-toggle` — the drawer open flag changed. Detail: `{ open }`
- `pwa-auth-error` — an account action failed. Detail: `{ code, message }`

`userEmailChanged` still fires on `window` with `{ email }`. Deprecated. Listen for `pwa-email-changed`.

```javascript
import { pwaAuthChanged, pwaDrawerToggleName } from 'pwa-auth';

window.addEventListener(pwaAuthChanged, (event) => {
  const user = event.detail.user;
  console.log(user && user.uid);
});

window.addEventListener(pwaDrawerToggleName, (event) => {
  console.log(event.detail.open);
});
```

## API

```javascript
import {
  initialize,
  getCurrentUser,
  onUserChanged,
  openDrawer,
  closeDrawer,
  toggleDrawer,
  eventName
} from 'pwa-auth';

initialize({ config });

const stop = onUserChanged((user) => {
  console.log(user);
});
stop();

getCurrentUser();
openDrawer();
closeDrawer();
toggleDrawer();

window.addEventListener(eventName.login, (event) => {
  console.log(event.detail.user.email);
});
```

| Export | |
|---|---|
| `initialize({ app, config })` | Boot Firebase. `app` is a host app. `config` is a host config. The legacy `FIREBASE_CONFIG` script still works. |
| `getCurrentUser()` | `{ uid, displayName, email, photoURL }` or `null`. |
| `onUserChanged(callback)` | Calls back with that same shape. Returns `unsubscribe`. |
| `openDrawer()` | Opens the drawer. |
| `closeDrawer()` | Closes the drawer. |
| `toggleDrawer()` | Flips the drawer. |
| `eventName` | The `pwa-` strings. `eventName.drawerToggle` is `pwa-drawer-toggle`. |
| `pwaAuthChanged`, `pwaLogin`, `pwaLogout`, `pwaSignup`, `pwaAccountDeleted`, `pwaProfileUpdated`, `pwaEmailChanged`, `pwaDrawerToggleName`, `pwaAuthError` | The same strings, one constant each. `pwaDrawerToggleName` is the event. `pwaDrawerToggle()` is the older close function. |

`import { store } from 'pwa-auth'` is not a public export. Use `getCurrentUser`, `onUserChanged`, and the events. Account fields stay inside the package.

## Exports

```javascript
import 'pwa-auth';

import {
  auth, db, storage, application, firebaseConfig, user
} from 'pwa-auth';

import {
  logOut, logAccount, logAccountDelete, deleteDocument, pwaDrawerToggle
} from 'pwa-auth';
```

| Export | |
|---|---|
| `auth` | Firebase Auth for this app. Read `auth.currentUser` at call time. |
| `db` | Firestore. |
| `storage` | Cloud Storage. |
| `application` | The Firebase app from `initialize` or from `FIREBASE_CONFIG`. |
| `firebaseConfig` | The parsed config object. |
| `user` | Deprecated. Snapshot of `auth.currentUser` taken when `initialize` runs. It stays `null`. Read `getCurrentUser()` at call time. |
| `logOut()` | `signOut(auth)`. Then `pwa-logout`. |
| `logAccount()` | Analytics event `create_account`, after Analytics is ready. No event when Analytics is unsupported. |
| `logAccountDelete()` | Analytics event `delete_account`. It does not delete the account. |
| `deleteDocument(collect, item)` | Deletes one Firestore document. |
| `pwaDrawerToggle()` | Closes the drawer. It does not toggle. Prefer `closeDrawer()`. |

`pwa-auth` and `pwa-auth/production` both resolve types to `base/export/pwa-auth.d.ts`. The production entry is the rollup bundle. `lit` and `firebase` are peer dependencies. Redux ships inside the package. `sideEffects` is true because the entry registers the elements. The published `files` list is `base/`, the production bundle, `source/pwa-styles.css`, `source/empty.jpg`, the readme, and the licenses.

## Parts

Hosts style the controls with `::part`. Nested fields are forwarded with `exportparts`, so the host does not enter a shadow root.

- `user-icon`: `button`, `photo`
- `user-drawer`: `panel`, `header`, `title`, `close`, `settings`, `logout`, `login-email`, `login-password`, `login-submit`, `login-switch`, `signup-email`, `signup-password`, `signup-submit`, `signup-switch`
- `user-login`: `panel`, `header`, `title`, and the same `login-*` and `signup-*` field parts
- `user-settings`: `tab`, `panel`, `name`, `name-submit`, `email`, `email-submit`, `password`, `verify`, `password-submit`, `progress`, `file`, `preview`, `delete`
- `email-reset`: `email`, `submit`

```css
user-icon::part(button) { border-radius: 8px; }
user-drawer::part(panel) { background: #fff; }
user-drawer::part(login-submit) { letter-spacing: 0.02em; }
```

The drawer is a dialog. Escape closes it, Tab stays inside while it is open, and focus returns to the control that opened it. Off-screen forms are `inert`.

## Theme

Optional. Link the sheet or set the variables on `:root`. Names below are the ones the components read.

```html
<link rel="stylesheet" href="./path_to/pwa-styles.css">
```

```css
:root {
  /* Required - minimum tap target */
  --pwa_tap: 44px;

  /* <user-icon> */
  --pwa_icon_background_color: #2a6b45;
  --pwa_icon_hover_color:      #214f34;
  --pwa_icon_border:           0;
  --pwa_icon_radius:           10px;
  --pwa_icon_padding:          0 18px;
  --pwa_icon_font:             "Avenir Next", "Segoe UI", system-ui, sans-serif;
  --pwa_icon_height:           44px; /* logged out, sync to diameter */
  --pwa_icon_diameter:         44px; /* logged in, sync to height */

  /* <user-drawer> */
  --pwa_drawer_position:         absolute;
  --pwa_drawer_background_color: #fffdf8;
  --pwa_drawer_text_color:       #1c2430;
  --pwa_drawer_border:           0;
  --pwa_drawer_border-radius:    0 0 18px 18px;
  --pwa_drawer_z-index:          3;
  --pwa_close_color:             #9a3b32;

  /* <user-settings> and <user-login> */
  --pwa_settings_background_color: #fffdf8;
  --section_background_color:      #fffdf8;
  --pwa_header_color:              #1c2430;
  --pwa_nav_button_color:          #4e5b6a;
  --pwa_nav_highlight_color:       #1c2430;
  --pwa_nav_on_background:         #f3efe6;
  --pwa_divider_color:             #e3daca;
  --pwa_line_color:                #e3daca;
  --pwa_label_text_color:          #1c2430;
  --pwa_input_background_color:    #f3efe6;
  --pwa_action_text_color:         #fff;
  --pwa_action_background_color:   #2a6b45;
  --pwa_action_border_color:       #214f34;
}
```

`--pwa_tap` is the minimum size of the drawer close control, the sign-in and sign-up buttons, the settings tabs, and the delete control.

## Build

Edit `typescript/` only.

```bash
npm run build    # tsc writes base/
npm run rollup   # writes source/pwa-auth.js and website/javascript/pwa-auth.js
```

`base/` is the TypeScript emit. Rollup reads that emit and writes the npm bundle to `source/` and the site bundle to `website/javascript/`. Do not hand-edit those outputs.

`npm run demo` serves `demonstration/index.html`. `npm run website` serves `website/index.html`.

## Feedback

* [Jack's Publishing](https://www.jackspublishing.com)
* [contractor's centre](https://www.contractorscentre.com)
* [npm](https://www.npmjs.com/package/pwa-auth)
* [Sponsor Jacek Markiewicz](https://github.com/sponsors/busynest)
* [Issues](https://github.com/busynest/user/issues)
