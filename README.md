Progressive Website Application - Authentication
======================

# PWA-Auth Components [Demo](https://pwa-authentic.firebaseapp.com)
Hello, and welcome to Jack's Publishing of Custom HTML Elements.

PWA-AUTH is a bundle of 3 Custom HTML Elements for Firebase (IAM) Authenication using email and password, with the ability to change username, icon, email, password, or delete your own account and it's content all together. 

You will learn how to reference, initialize, and place 3 Custom HTML Tags for use. By either <b>Standard</b> or <b>Modular</b> ECMA Script.

Authentication Components are for anyone who is looking for a quick and simple way to sign-up, log-in, log-out, modify, or delete a firebase account from thier own personal domain.

Jack's Publishing is dedicated to maintaining components for your projects. This specific project is design to be simple, and meet basic user needs, with the interplay of an Icon Button, Drop-down Drawer, and a Settings Page.

Continue reading to start installing the bundle:
- Pick the JavaScript File Type to Reference
- Understand the Library Features
- Understand the Library Boilerplate
  - 3 Tag Placement
  - Color Scheme: CSS Custom Properties
  - Firebase Initialization

## Standard, Namespaced JavaScript
- copy the bundle: node_modules/pwa-auth/npm/pwa-auth.js

## Module JavaScript
```javascript
import 'pwa-auth';
```

## Technological Stack
- Development Environment: [Node JavaScript](https://nodejs.org)
- Backend: Google Cloud: [Firebase](https://firebase.google.com/)
- Predicate State Behavior: [Redux](https://redux.js.org/)
- Frontend: [Lit](https://lit.dev)

## PWA-AUTH Features:
- Register through Email and Password
- Log-in
- Log-out
- Change Username
- Change Profile Picture
- Change Email
- Change Password
- Delete Account

## Boilerplate
- 3 Tag Placements (Custom HTML Elements)
  - user-icon
  - user-drawer
  - user-settings
- Cascading Style Sheets (CSS)
- ECMA Script (JavaScript)

## Custom Elements

### `<user-icon>`
- Login Word Button - State
- 1 Photo Icon Display - State

### `<user-drawer>`
- Drop-down
- Sign-up by Email Addresses and Password
- Sign-in by Email Addresses and Password
- logged-in state
- logged-out state

### `<user-settings>`
- 1 Photo Upload
- Unavailable Photo
- Update Username
- Update Email / Verify
- Update Password
- Delete Account

# Website Setup:
```html
<header>
  <!-- register: Indicate the 'register' boolean for 'subscribe state' -->
  <!-- register: else 'login state' -->
  <user-icon register></user-icon>
</header>

<!-- url: Indicate where the <pwa-settings> Tag will be Paged-->
<!-- register: Indicate the 'register' boolean for 'subscribe state' -->
<!-- register: else 'login state' -->
<user-drawer register url="/settings"></user-drawer>

<main>
  <user-settings></user-settings>
</main>

<script>/* Initialize ECMA Script Properties */</script>
<style>/* CSS Custom Properties */</style>
<script src="pwa-auth.js"></script>
```

## CSS Default Custom Properties
| CSS Custom Property | Description | Default | Custom Element |
| :--- | ---: | :---: | :--- |
| --pwa_settings_background       | Navigation  | grey;         | Settings |
| --pwa_nav_button                | Navigation  | grey;         | Settings |
| --pwa_nav_select                | Navigation  | black;        | Settings |
| --pwa_input_background          | Input       | #E1E5EB;    | Settings |
| --pwa_label_text_color          | Input       | black;        | Settings |
| --pwa_section_header            | Header      | black;        | Settings |
| --pwa_divider                   | Divider     | grey;         | Settings |
| --pwa_action_text_color         | Button      | #fff;       | Settings |
| --pwa_action_background_color   | Button      | #6cc04a;    | Settings |
| --pwa_action_border_color       | Button      | #60b23e;    | Settings |
| --pwa_drawer_text_color         | Input       | #303030;    | Drawer |
| --pwa_drawer_background_color   | Input       | #fff;       | Drawer |
| --pwa_icon_background           | Input       | #6cc04a;    | Icon |
| --pwa_icon_hover                | Input       | lightgrey     | Icon |

```html
<!-- CSS: Custom Variables -->
<!-- Place this txt into your document -->
<style>
        
  :root {

    --pwa_settings_background:      white;

    /* Top Border Color */
    --pwa_divider:                  grey;

    /* Section Header Color */
    --pwa_section_header:           black;

    /* Navigation Colors */
    --pwa_nav_button:               grey;
    --pwa_nav_select:               black;

    /* Label Color */
    --pwa_label_text_color:         black;

    /* Input Colors */
    --pwa_input_background:         #E1E5EB;

    /* Button Colors */
    --pwa_action_text_color:        #fff;
    --pwa_action_background_color:  #6cc04a;
    --pwa_action_border_color:      #60b23e;

    /* Drawer Colors */
    --pwa_drawer_text_color:        #303030;
    --pwa_drawer_background_color:  #fff;

    /* Icon Colors */
    --pwa_icon_background:          #6cc04a;
    --pwa_icon_hover:               lightgrey;

  }

  /* Dark Theme */
  @media (prefers-color-scheme: dark) { /* etc. */ }

  /* Light Theme */
  @media (prefers-color-scheme: light) { /* etc. */ }

</style>
```

## Google Setup
- Google Analytics
- Firebase Project

## Firebase Setup
- Authentication - email login
- Cloud Storage - icon save location

## Firebase Instance Configuration
### Modular Firebase Initialization
```javascript
// Initialize Firebase
let connect = {
    apiKey: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    authDomain: "xxxxxxx.xxxxxxx.xxx",
    databaseURL: "https://xxxxxxx.xxxxxxx.xxx",
    projectId: "xxxxxxx",
    storageBucket: "xxxxxxx.xxxxxxx.xxx",
    messagingSenderId: "xxxxxxxxxxx",
    appId: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    measurementId: "xxxxxxxxxxx"
};

if (lolalhost) { connect = { /* etc. */ } }
```

### Global Namespaced Firebase Configuration
pwa-auth is built upon the Firebase SDK (Software Development Kit).
The entire bundle is one instance of firebase that takes in the configuration information, internally.

If you are looking for a Namespaced Firebase Configuration, please send it as feedback, and will make that version for you.

# Feedback
All feedback, comments, bugs, and requests are welcome.
* [Jack's Publishing](https://www.jackspublishing.com)
* [contractor's centre](https://www.contractorscentre.com)
* [Node Package Manager](https://www.npmjs.com/package/pwa-auth)
* [Sponsor Jacek Markiewicz](https://github.com/sponsors/busynest/button)