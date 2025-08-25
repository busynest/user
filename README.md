Progressive Website Application Authentication
======================

# The library [Demo](https://pwa-authentic.firebaseapp.com)
Three HTML Custom Elements for Firebase Authentication:
- user-icon:  State 1: Login Button / State 2: User Icon
- user-drawer: Logged -out State: Login / sign-up
- user-settings:

This library provides Identity Access Managementy to securely store user's backend data in Google Cloud: [Firebase](), through a predicate state behavior: [Redux](), and the front-end: [Lit]().

# Technological Stack
- Node JavaScript
- Firebase SDK v12, 2025,
- Redux v5.0.1, 2024,
- Lit v3.2.1, 2024

## Library Features:
- Register through Email and Password
- Log-in
- Log-out
- Change Username
- Change Profile Picture
- Change Email
- Change Phone Number
- Change Password
- Delete Account

## Library Boilerplate
- Tag Placement(Custom HTML Elements)
- Cascading Style Sheets (CSS)
- ECMA Script (JavaScript)

## Library Custom Elements

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
  <user-icon></user-icon>
</header>

<user-drawer></user-drawer>

<main>
  <user-settings></user-settings>
</main>

<script>/* Initialize ECMA Script Properties */</script>
<style>/* CSS Custom Properties */</style>
<script src="pwa-auth.js"></script>
```
## Google Setup
- Add Google Analytics
- Setup Firebase Project
- Initialize Firebase Authentication - email, anonymous, google
- Initialize Firestore Database

## Firebase Setup
- User Management
- Cloud Firestore
- Cloud Storage

## Javascript Setup
- Add Google Analytics
- Setup Firebase Project
- Initialize Firebase Authentication - email, anonymous, google
- Initialize Firestore Database

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
| | | | |
| --pwa_nav | Navigation | grey; | Settings |
| --pwa_nav_select | Navigation | black; | Settings |
| | | | |
| --pwa_input_background | Input | #E1E5EB; | Settings |
| --pwa_label_text_color | Input | black; | Settings |
| | | | |
| --pwa_section_header | Header | black; | Settings |
| | | | |
| --pwa_divider | Divider | grey; | Settings |
| | | | |
| --pwa_action_text_color | Button | #fff;| Settings |
| --pwa_action_background_color | Button | #6cc04a; | Settings |
| --pwa_action_border_color | Button | #60b23e; | Settings |
| | | | |
| --pwa_drawer_text_color | Input | #303030; | Drawer |
| --pwa_drawer_background_color | Input | #fff; | Drawer |

## Logged-in State Drawer Menu Items
```html
  <user-drawer>
    <p><a href="/page1">Page 1</a></p>
    <p><a href="/page2">Page 2</a></p>
    <p><a href="/page3">Page 3</a></p>
  </user-drawer>
```

## Loading Artwork
```html
  <user-settings>
    
  </user-settings>
```

# Footnotes

## Feedback
All feedback, comments, bugs, and requests are welcome.
* [Jack's Publishing](https://www.jackspublishing.com)
* [contractor's centre](https://www.contractorscentre.com)