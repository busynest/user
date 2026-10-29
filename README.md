# pwa-auth

Jack's Publishing maintains sign-in and account components so a site can stay on its own interface. [Live demo](https://pwa-authentic.firebaseapp.com).

Five custom elements sign a person up, sign them in, and let them change their name, email, password, and photo, or delete the account. Email and password only. One Firebase app, one Redux store, shared by every tag on the page.

Place the tags, set the Firebase config before the module loads, and optionally restyle with `--pwa_` variables.

## Prerequisites

- Firebase Authentication with email and password
- Cloud Storage bucket
- Google Analytics, if you call `logAccount` or `logAccountDelete`

Storage rules must allow the signed-in user to read and write only `pwa-auth/{uid}/**`.

## Install

```bash
npm install pwa-auth
```

Two entries:

```javascript
// Required - dev graph. tsc output. The app supplies lit, firebase, and redux.
import 'pwa-auth';

// Optional - one file. Rollup bundle for a page or for npm production.
import 'pwa-auth/production';
```

`pwa-auth` and `pwa-auth/production` both resolve to `source/pwa-auth.js`, the Rollup bundle. Types resolve to `base/export/pwa-auth.d.ts`.

A plain script tag uses the bundle:

```html
<script type="module" src="./path_to/pwa-auth.js"></script>
```

## Firebase

Required. Set this in a classic script before the module runs. One assignment. A second `window.process = …` replaces the first and drops keys you already set.

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

`authentication.ts` reads `process.env.FIREBASE_CONFIG` and calls `initializeApp`. An empty config throws, and then none of the tags upgrade.

## Elements

Importing the package defines all five.

### `<user-icon>`

The button that opens the drawer.

| Attribute | |
|---|---|
| `subscribe` | Logged-out label is Subscribe. Without it, the label is Login. |
| `empty` | Image URL used when the account has no photo. |

Logged in, the button shows the photo. The click dispatches `toggleSign`.

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

Profile updates the display name. Email and password changes, and delete, ask for the current password and reauthenticate first. Email then calls `verifyBeforeUpdateEmail`. On success the page dispatches `userEmailChanged` on `window` with `detail.email`. Password requires the verify field to match. Delete removes this user's files under `pwa-auth/{uid}`, deletes the Firestore document `users/{uid}` when that delete is allowed, calls `logAccountDelete`, then deletes the auth user.

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
| `application` | The Firebase app created at load. |
| `firebaseConfig` | The parsed config object. |
| `user` | Deprecated. Snapshot of `auth.currentUser` from module load. It stays `null`. |
| `logOut()` | `signOut(auth)`. |
| `logAccount()` | Analytics event `create_account`, after Analytics is ready. No event when Analytics is unsupported. |
| `logAccountDelete()` | Analytics event `delete_account`. It does not delete the account. |
| `deleteDocument(collect, item)` | Deletes one Firestore document. |
| `pwaDrawerToggle()` | Closes the drawer. It does not toggle. |
| `reauthenticate(password)` | Confirms the current password before email, password, and delete. |

The store is not exported. Account fields (`userId`, `name`, `email`, `photoURL`) stay inside the package.

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

`npm publish` runs both before it uploads.

Pushing `master` runs `.github/workflows/publish.yml`. The action builds, then publishes when `package.json` has a version that is not already on npm. The repository secret `NPM_TOKEN` must be an npm automation token. A push that does not change the version is skipped.

`base/` is the TypeScript emit. Rollup reads that emit and writes the npm bundle to `source/` and the site bundle to `website/javascript/`. Do not hand-edit those outputs.

`npm run demo` serves `demonstration/index.html`. `npm run website` serves `website/index.html`.

## Feedback

* [Jack's Publishing](https://www.jackspublishing.com)
* [contractor's centre](https://www.contractorscentre.com)
* [npm](https://www.npmjs.com/package/pwa-auth)
* [Sponsor Jacek Markiewicz](https://github.com/sponsors/busynest)
* [Issues](https://github.com/busynest/user/issues)
