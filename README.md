Progressive Website Application - Authentication
======================
Jack's Publishing maintains Custom HTML Elements where developers can focus on UX rather than low-level API calls.

Visit the [Live Demo](https://pwa-authentic.firebaseapp.com)

pwa-auth.js is a bundle of 3 Custom HTML Elements for Firebase (IAM) Authenication using email and password, with the ability to change username, icon, email, password, or delete your own account and it's content all together.

pwa-auth.js (Authentication Webcomponents) are for anyone who is looking for a quick and simple way to sign-up, log-in, log-out, modify, or delete a firebase account information from thier own personal domain.

pwa-auth.js meets basic user needs with the interplay of:
- Icon Button
- Drop-down Drawer
- Settings Page

You will learn how to place 3 Custom HTML Tags, reference CSS, and How to Initialize an Firebase Instance. By either <b>Standard</b> or <b>Modular</b> ECMA Script.

Continue reading to understand how to install the project:

## Choose Project Type

ECMA Script Modules
```javascript
import 'pwa-auth';
import { store, db, storage, auth, user } from 'pwa-auth';
```

Global Scope Management
```html
<!-- Optional: Copy the Project Files from 'src' Folder -->
<script type="module" src="./pwa-auth.js"></script>
```
## Library
- 3 Tag Placement
- Color Scheme: CSS Custom Properties
- Firebase Initialization Object

## Features
- Register through Email and Password
  - Log-in
  - Log-out
- Change Username
- Change Profile Picture
- Change Email
- Change Password
  - Delete Account
- Global Functions
- Redux State Connection

## Modules
- db - firestore database reference
  - getFirestore(pwa-env)
- storage - firebase storage reference
  - getStorage(pwa-env)
- auth - user object reference
  - getAuth(pwa-env)
- user - active user boolean reference
  - auth.currentUser

## HTML Webcomponents
- user-icon
- user-drawer
- user-settings

## CSS
- Custom Properties

## Prerequisites
- Google:
  - Google Analytics
  - Firebase Project

- Firebase:
  - Authentication  - email login
  - Cloud Storage   - storage bucket

## Boilerplate

For simple projects, copy project bundle to disk
- source/esm/
  - pwa-auth.js
  - pwa-auth.js.map
  - pwa-styles.css
  - empty.jpg

### ECMA Script Modules
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

  <!--  Webcomponent Library -->
  <script type="module" src="./path_to/pwa-auth.js"></script>

</head>
```
## Boilerplate

### TypeScript Library for Bundlers
The Start File exports: classes and objects
```javascript
import 'pwa-auth';
// <user-icon subscribe emptyArtwork="./images/empty.jpg"></user-icon>
// <user-drawer subscribe settingsURL="./settings"></user-drawer>
// <user-settings emptyArtwork="./images/empty.jpg"></user-settings>
import { store, db, storage, auth, user } from 'pwa-auth';
// db           - firestore database reference
// storage      - firebase storage reference
// auth         - user object reference
// user         - active user boolean reference

// store        - Redux States: 
    // store.backend.verified     - verified email: true/false
    // store.backend.userId       - user ID
    // store.backend.name         - user name
    // store.backend.email        - user email
    // store.backend.photoURL     - user profile photo
```

## Implementation
```html
<body>

  <header>
    <!-- subscribe property: (Initial State): Subscribe -->
    <!-- subscribe property: else (Initial State): Login -->
    <!-- empty property: location of empty image -->
    <!-- Logged-out (State): txt: Login Button -->
    <!-- Logged-out (State): txt: Subscribe Button -->
    <!-- Logged-in (State): photo: Icon Button -->
    <user-icon subscribe empty="./images/empty.jpg"></user-icon>
  </header>

  <!-- url property: location of <pwa-settings> Tag -->
  <!-- subscribe property: (Initial State): Subscribe -->
  <!-- subscribe property: else (Initial State): Login -->
  <!-- Top-down, Drop-down Feature: height, 1.4 seconds -->
  <!-- logged-out (State): Sign-up by Email Addresses and Password -->
  <!-- logged-out (State): Sign-in by Email Addresses and Password -->
  <!-- logged-in (State): Settings Page Link, Log-out Button -->
  <user-drawer subscribe url="./settings"></user-drawer>

  <main>
    <!-- 1 Photo Upload Feature, view uploaded bucket of photos, photo ediotr -->
    <!-- empty property: location of empty image -->
    <!-- Unavailable Photo --> 
    <!-- Update Username -->
    <!-- Update Email / Verify -->
    <!-- Update Password -->
    <!-- Delete Account, Photos, Information -->
    <user-settings empty="./images/empty.jpg"></user-settings>
  </main>

</body>
```

## CSS Custom Properties
```css
:root {
/* <user-icon> - Button Design */
--pwa_icon_background:            #6cc04a;
--pwa_icon_hover:                   lightgrey;
--pwa_icon_border:                  2px solid black;
--pwa_icon_padding:                 0px 16px;
--pwa_icon_radius:                  6px;
--pwa_icon_font:                    'Arial', sans-serif;

/* <user-icon> (state) - login / logout */
--pwa_icon_height:                  32px; /* Logged-out (sync) */
--pwa_icon_diameter:                32px; /* Logged-in (sync) */

/* <user-drawer> - Drawer Design */
--pwa_drawer_border:                3px #303030 solid;
--pwa_drawer_z-index:               2;
--pwa_drawer_border-radius:         20px;

/* <user-drawer> - Input Design */
--pwa_drawer_text_color:          #303030;
--pwa_drawer_background_color:    #fff;

/* <user-settings> - Navigation Design */
--pwa_settings_background:          grey;
--pwa_nav_button:                   grey;
--pwa_nav_select:                   black;
--pwa_divider:                      grey;
--pwa_section_header:               black;

/* <user-settings> - Input Design */
--pwa_input_background:           #E1E5EB;
--pwa_label_text_color:             black;

/* <user-settings> - Button Design */
--pwa_action_text_color:          #fff;
--pwa_action_background_color:    #6cc04a;
--pwa_action_border_color:        #60b23e;
}
```

## Global Namespaced Firebase Instance Configuration
pwa-auth.js is built upon the Firebase SDK (Software Development Kit).
The entire bundle is one instance of firebase that takes in the configuration information, internally.

If you are looking for a Namespaced Firebase Configuration, please send it as feedback, and will make that version for you.

## Technological Engineering
- Development (Server-side) Environment: [Node JavaScript](https://nodejs.org)
- Backend: Google Cloud: [Firebase](https://firebase.google.com/)
- Predicate State Behavior: [Redux](https://redux.js.org/)
- Frontend (Client-side): [Lit](https://lit.dev)

## Feedback
All feedback, comments, bugs, and requests are welcome.
* [Jack's Publishing](https://www.jackspublishing.com)
* [contractor's centre](https://www.contractorscentre.com)
* [Node Package Manager](https://www.npmjs.com/package/pwa-auth)
* [Sponsor Jacek Markiewicz](https://github.com/sponsors/busynest/button) 