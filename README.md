Progressive Website Application Authentication
======================

# The library [Demo](https://pwa-authentic.firebaseapp.com)
This library provides Identity Access Managementy to securely store user's data.

## Standard JavaScript
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

## Boilerplate
- 3 Tag Placements (Custom HTML Elements)
  - user-icon
  - user-drawer
  - user-settings
- Cascading Style Sheets (CSS)
- ECMA Script (JavaScript)

## Features:
- Register through Email and Password
- Log-in
- Log-out
- Change Username
- Change Profile Picture
- Change Email
- Change Password
- Delete Account

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
- Delete Account

# Website Setup:
```html
<header>
  <!-- Indicate the 'register' boolean for 'subscribe state' -->
  <!-- else 'login state' -->
  <user-icon register></user-icon>
</header>

<!-- Indicate where the <pwa-settings> Tag will be Paged-->
<user-drawer url="/settings"></user-drawer>

<main>
  <user-settings></user-settings>
</main>

<script>/* Initialize ECMA Script Properties */</script>
<style>/* CSS Custom Properties */</style>
<script src="pwa-auth.js"></script>
```

## Google Setup
- Google Analytics
- Firebase Project

## Firebase Setup
- Authentication - email
- Cloud Firestore - database
- Cloud Storage

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
<!-- CSS: Custom Variables: <head> tag -->
<style>
        
  :root {
    --pwa_divider: grey;
    /* etc. */
  }

  /* Dark Theme */
  @media (prefers-color-scheme: dark) { /* etc. */ }

  /* Light Theme */
  @media (prefers-color-scheme: light) { /* etc. */ }

</style>
```

# Feedback
All feedback, comments, bugs, and requests are welcome.
* [Jack's Publishing](https://www.jackspublishing.com)
* [contractor's centre](https://www.contractorscentre.com)