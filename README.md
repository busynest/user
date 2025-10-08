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

- (Import or Copy) the Project Files

- Library Features
- Library Modules

- Webcomponents
  - 3 Tag Placement
  - Color Scheme: CSS Custom Properties
  - Firebase Initialization

## Features
- Register through Email and Password
  - Log-in
  - Log-out
- Change Username
- Change Profile Picture
- Change Email
- Change Password
  - Delete Account

## Copy Project Files
For simple projects, you can copy to disk
- src/compiled/pwa-auth/
  - pwa-auth.js
  - pwa-styles.css
  - empty.jpg

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

## Modules
- db - firestore database reference
  - getFirestore(pwa-env)
- storage - firebase storage reference
  - getStorage(pwa-env)
- auth - user object reference
  - getAuth(pwa-env)
- user - active user boolean reference
  - auth.currentUser


## Boilerplate: ECMA Script Module
```html
<head>

  <!-- Step 1 of 3: Optional - CSS Custom Variables-->
  <link type="stylesheet" href="./path_to/pwa-styles.css">

  <!-- Step 2 of 3: Required - Configure Firebase Instance -->
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

  <!-- Step 3 of 3: Required - Load Webcomponent Library -->
  <script type="module" src="./path_to/pwa-auth.js"></script>

</head>
```

## Boilerplate: TypeScript Library for Bundlers
```javascript
import 'pwa-auth';
// <user-icon subscribe emptyArtwork="./images/empty.jpg"></user-icon>
// <user-drawer subscribe settingsURL="./settings"></user-drawer>
// <user-settings emptyArtwork="./images/empty.jpg"></user-settings>
import { db, storage, auth, user } from 'pwa-auth';
// db           - firestore database reference
// storage      - firebase storage reference
// auth         - user object reference
// user         - active user boolean reference
```

## Boilerplate Implementation
```html
<body>

  <header>
    <!-- subscribe property: (Initial State): Subscribe -->
    <!-- subscribe property: else (Initial State): Login -->
    <!-- Logged-out (State): txt: Login Button -->
    <!-- Logged-out (State): txt: Subscribe Button -->
    <!-- Logged-in (State): photo: Icon Button -->
    <!-- emptyArtwork property: location of empty image -->
    <user-icon subscribe emptyArtwork="./images/empty.jpg"></user-icon>
  </header>

  <!-- settingsURL property: location of <pwa-settings> Tag -->
  <!-- subscribe property: (Initial State): Subscribe -->
  <!-- subscribe property: else (Initial State): Login -->
  <!-- Top-down, Drop-down Feature: height, 1.4 seconds -->
  <!-- logged-out (State): Sign-up by Email Addresses and Password -->
  <!-- logged-out (State): Sign-in by Email Addresses and Password -->
  <!-- logged-in (State): Settings Page Link, Log-out Button -->
  <user-drawer subscribe settingsURL="./settings"></user-drawer>

  <main>
    <!-- 1 Photo Upload Feature, view uploaded bucket of photos, photo ediotr -->
    <!-- Unavailable Photo --> 
    <!-- Update Username -->
    <!-- Update Email / Verify -->
    <!-- Update Password -->
    <!-- Delete Account, Photos, Information -->
    <!-- emptyArtwork property: location of empty image -->
    <user-settings emptyArtwork="./images/empty.jpg"></user-settings>
  </main>

</body>
```
## CSS Custom Properties
| Custom Namespace | Description | Default | Custom Element |
| :--- | ---: | :---: | :--- |
| --pwa_icon_background           | Button  | #6cc04a; | user-icon |
| --pwa_icon_hover                | Button      | lightgrey     | user-icon |
| --pwa_icon_border               | Button      | 2px solid black | user-icon |
| --pwa_icon_height (sync)        | Login State      | 32px      | user-icon |
| --pwa_icon_padding              | Login State      | 0px 16px | user-icon |
| --pwa_icon_radius               | Login State      | 6px      | user-icon |
| --pwa_icon_font         | Login State   | 'Arial', sans-serif | user-icon |
| --pwa_icon_diameter (sync)      | Icon State  | 32px        | user-icon |
| --pwa_drawer_border             | Drawer      | 3px #303030 solid | user-drawer |
| --pwa_drawer_z-index            | Drawer      | 2         | user-drawer |
| --pwa_drawer_border-radius      | Drawer      | 20px        | user-drawer |
| --pwa_drawer_text_color         | Input txt   | #303030    | user-drawer |
| --pwa_drawer_background_color   | Input txt   | #fff       | user-drawer |
| --pwa_settings_background       | Navigation  | grey       | user-settings |
| --pwa_nav_button                | Navigation  | grey       | user-settings |
| --pwa_nav_select                | Navigation  | black      | user-settings |
| --pwa_divider                   | Divider     | grey       | user-settings |
| --pwa_input_background          | Input       | #E1E5EB  | user-settings |
| --pwa_label_text_color          | Input       | black      | user-settings |
| --pwa_section_header            | Header      | black      | user-settings |
| --pwa_action_text_color         | Button      | #fff     | user-settings |
| --pwa_action_background_color   | Button      | #6cc04a  | user-settings |
| --pwa_action_border_color       | Button      | #60b23e  | user-settings |

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