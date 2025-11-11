Progressive Website Application - Authentication
======================
Jack's Publishing maintains Website Authentication Components where developers can focus on their User interface, rather than low-level API calls. Visit the [Live Demo](https://pwa-authentic.firebaseapp.com)

pwa-auth.js is a bundle of 5 Custom HTML Elements for Firebase (IAM) Authenication using email and password, with the ability to change username, icon, email, password, or delete your own account and it's content all together.

Quickly sign-up, log-in, log-out, modify, or delete your firebase account.

Place 5 Custom HTML Tags, reference CSS, and Initialize a Firebase Instance. By either <b>Standard</b> or <b>Modular</b> ECMA Script.

Continue reading to understand how to install this project:

## Library
```javascript
// ES - import Modules
import './pwa-auth';

// Optional - copy CoreJS
'npm/pwa-auth/source/**/*'
// - source/
//   - pwa-auth.js
//   - pwa-styles.css
//   - empty.jpg
//   - Third Party License .txt
```

## Prerequisites
- Google
  - Analytics
- Firebase Authentication
  - Email Login
- Firebase Cloud Storage
  - Storage Bucket

## Technical Summary
- Type Strong with [TypeScript](https://www.typescriptlang.org)
- Stylable with [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_cascading_variables/Using_CSS_custom_properties)
- State Management with [ReduxJS](https://redux.js.org/)
- Authentication with Google's [Firebase](https://www.firebase.com)
- Firebase Initialization Object: `window.process = { env: { FIREBASE_CONFIG: `

## Atomic Engineering
- Development (Server-side) Environment: [Node JavaScript](https://nodejs.org)
- Backend: Google Cloud: [Firebase](https://firebase.google.com/)
- Predicate State Behavior: [Redux](https://redux.js.org/)
- Frontend (Client-side): [Lit](https://lit.dev)

Outline:
- Register through Email and Password
  - Log-in
  - Log-out
- Change Username
- Change Email
- Change Password
- Upload Profile Picture
- Delete Account

## Enrichment
- Development
  - Redux State Connection
  - Global Functions
- Optional
  - Custom Properties

## Website Components
- Button
  - `<user-icon>`
    - Email Log-in
    - Email Subscribe
    - Icon
- Drop-down Drawer
  - `<user-drawer>`
    - Email Log-in
    - Email Subscribe
    - Menu with Log-out
- Pages
  - `<user-settings>`
    - Account Settings Page
  - `<user-login>`
    - Email Log-in Page
    - Email Subscribe Page
  - `<email-reset>`
    - Password Reset Page

## Observer Patterns
- `<user-icon>`
  - property: subscribe: (Initial State): Subscribe
  - property: subscribe: else (Initial State): Login
  - property: empty: location of empty image
- `<user-drawer>`
  - feature: Top-down drawer: 1.4 seconds
  - property: url: location of `<pwa-settings>` Tag
  - property: subscribe: (Initial State): Subscribe
  - property: subscribe: else (Initial State): Login
- `<user-login>`
  - feature: regular visible page component
- `<user-settings>`
  - 1 Photo Upload Feature, view uploaded bucket of photos, photo ediotr
  - empty property: location of empty image
  - Unavailable Photo
  - Update Username
  - Update Email / Verify
  - Update Password
  - Delete Account, Photos, Information

## Logical States
- `<user-icon>`
  - Logged-out: txt: Login Button
  - Logged-out: txt: Subscribe Button
  - Logged-in, photo: Icon Button
- `<user-drawer>`
  - logged-out: Sign-up by Email Addresses and Password
  - logged-out: Sign-in by Email Addresses and Password
  - logged-in: Settings Page Link, Log-out Button
- `<user-login>`
  - logged-out: Sign-up by Email Addresses and Password
  - logged-out: Sign-in by Email Addresses and Password
  - logged-in, content: `<slot></slot>`

Implementation
===

## Firebase Instance Configuration
pwa-auth.js is built upon the Firebase SDK (Software Development Kit).
The entire bundle is one instance of firebase that takes in the configuration information, internally.

## Boilerplate
```html
<head>

  <!-- Optional - CSS Custom Variables-->
  <link type="stylesheet" href="./path_to/pwa-styles.css">

  <!-- Required - Configure Firebase Instance -->
  <script>
    window.process = { env: { FIREBASE_CONFIG: JSON.stringify({
            apiKey: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            authDomain: "xxxxxxx.xxxxxxx.xxx",
            databaseURL: "https://xxxxxxx.xxxxxxx.xxx",
            projectId: "xxxxxxx",
            storageBucket: "xxxxxxx.xxxxxxx.xxx",
            messagingSenderId: "xxxxxxxxxxx",
            appId: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            measurementId: "xxxxxxxxxxx"
        })
      }
    };

    if (lolalhost) { window.process = { env: { FIREBASE_CONFIG: 'etc.' } } }
  </script>

  <!-- Optional: Copy the Project Files from 'source' Folder -->
  <script type="module" src="./path_to/pwa-auth.js"></script>

  <!-- Optional: Custom CSS Properties -->
  <style>

    /* <user-icon> */
    :root {
    --pwa_icon_background_color:        #6cc04a;
    --pwa_icon_radius:                  6px;
    --pwa_icon_border:                  2px solid black;
    --pwa_icon_padding:                 0px 16px;
    --pwa_icon_hover_color:             lightgrey;
    --pwa_icon_font:                    'Arial', sans-serif;
    --pwa_icon_height:                  32px; /* state: Logged-out (sync) */
    --pwa_icon_diameter:                32px; /* state: Logged-in (sync) */
    }

    /* <user-drawer> */
    :root {
    --pwa_drawer_background_color:      #fff;
    --pwa_drawer_border-radius:         0px;
    --pwa_drawer_border:                3px #303030 solid;
    --pwa_drawer_z-index:               2;
    --pwa_drawer_text_color:            #303030;
    }

    /* <user-settings> */
    :root {
    --pwa_settings_background_color:    grey;

    --pwa_nav_button_color:             grey;
    --pwa_nav_highlight_color:          black;

    --pwa_divider_color:                grey;
    --pwa_header_color:                 black;

    --pwa_input_background_color:       #E1E5EB;

    --pwa_label_text_color:             black;

    --pwa_button_text_color:            #fff;
    --pwa_button_background_color:      #6cc04a;
    --pwa_button_border_color:          #60b23e;
    }

    /* shared core elements */
    :root {
    --section_background_color:         white;
    }
    
  </style>

</head>

<body>
  <user-icon>
  <user-drawer>
  <user-login>
  <user-settings>
  <email-reset>
</body>
```

## Project Type: ECMA Script Modules
Eports: classes and objects
```javascript
// Custom HTML Element Classes
import 'pwa-auth';
// <user-icon subscribe emptyArtwork="./images/empty.jpg"></user-icon>
// <user-drawer subscribe settingsURL="./settings"></user-drawer>
// <user-settings emptyArtwork="./images/empty.jpg"></user-settings>

// Firebase Objects
import { db, storage, auth, user } from 'pwa-auth';
// db           - firestore database reference
// storage      - firebase storage reference
// auth         - user object reference
// user         - active user boolean reference

// Firebase-Redux States
import { store } from 'pwa-auth';
// store.verified
// store.userId
// store.name
// store.email
// store.photoURL
```

## Implementation - Drawer
```html
<body>

  <header>
    <user-icon subscribe empty="./images/empty.jpg"></user-icon>
  </header>

  <user-drawer subscribe url="./settings"></user-drawer>

  <main>
    <user-settings empty="./images/empty.jpg"></user-settings>
  </main>

</body>
```

## Implementation - Page
```html
<body>

  <header>
    <user-icon        empty="./images/empty.jpg"     subscribe    ></user-icon>
  </header>

  <main>
    <user-login       subscribe     ></user-login>
    <user-settings    empty="./images/empty.jpg"></user-settings>
  </main>

</body>
```

## Feedback
All feedback, comments, bugs, and requests are welcome.
* [Jack's Publishing](https://www.jackspublishing.com)
* [contractor's centre](https://www.contractorscentre.com)
* [Node Package Manager](https://www.npmjs.com/package/pwa-auth)
* [Sponsor Jacek Markiewicz](https://github.com/sponsors/busynest/button) 