Progressive Website Application
======================
User Authentication and Management
======================

## Check out the library in action 
[Demo](https://www.pwa-authentic.firebaseapp.com)

To offer a personalized experience, apps need to have a user management center, a place where users can register and personalize their account.

This library, pwa-auth, provides a secure way to store user's data in the cloud. The library uses Google's Firebase in the backend, through a predicate state behavior using Redux, and the front-end with Lit.

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

## Technology Stack
- Node JavaScript
- Firebase SDK v12, 2025,
- Redux v5.0.1, 2024,
- Lit v3.2.1, 2024

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
* Add Google Analytics
* Setup Firebase Project
* Initialize Firebase Authentication - email, anonymous, google
* Initialize Firestore Database
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

if (lolalhost) {
    connect = {
        apiKey: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        authDomain: "xxxxxxx.xxxxxxx.xxx",
        databaseURL: "https://xxxxxxx.xxxxxxx.xxx",
        projectId: "xxxxxxx",
        storageBucket: "xxxxxxx.xxxxxxx.xxx",
        messagingSenderId: "xxxxxxxxxxx",
        appId: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        measurementId: "xxxxxxxxxxx" 
    }
}
```
## firebase-messaging-sw.js Setup
```javascript
// Initialize Firebase
importScripts("https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/9.6.0/firebase-auth.js");
importScripts("https://www.gstatic.com/firebasejs/9.6.0/firebase-storage.js");
importScripts("https://www.gstatic.com/firebasejs/9.6.0/firebase-firestore.js");
importScripts("https://www.gstatic.com/firebasejs/9.6.0/firebase-analytics.js");
importScripts("https://www.gstatic.com/firebasejs/9.6.0/firebase-messaging.js");

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

// REFERENCE TO SERVICES
firebase.initializeApp(admin);

// REFERENCE TO SERVICES
firebase.initializeApp(admin);                                           
// firebase.messaging();
// const messaging = getMessaging(admin);

// Add the public key generated from the console.
firebase.messaging().usePublicVapidKey("xxxxxxxxx");
```

## Website Setup:
```javascript
import 'pwa-auth';
import { runFirebase } from 'pwa-auth/src/user-functions';
runFirebase();
```
```html
<header>
  <user-icon></user-icon>
</header>

<user-drawer></user-drawer>

<main>
  <user-settings></user-settings>
</main>
```

## CSS Default Custom Properties
| Property | Description | Default | Custom Element

| :------: | :---------: | :------:|

| --pwa_nav                             |   Navigation  |   grey;       | Settings
| --pwa_nav_select                      |   Navigation  |   black;      | Settings
| :------: | :---------: | :------:|
| --pwa_input_background                |   Input       | #E1E5EB;    | Settings
| --pwa_label_text_color                |   Input       |   black;      | Settings
| :------: | :---------: | :------:|
| --pwa_section_header                  |   Header      |   black;      | Settings
| :------: | :---------: | :------:|
| --pwa_divider                         |   Divider     |   grey;       | Settings
| :------: | :---------: | :------:|
| --pwa_action_text_color               |   Button      | #fff;       | Settings
| --pwa_action_background_color         |   Button      | #6cc04a;    | Settings
| --pwa_action_border_color             |   Button      | #60b23e;    | Settings

| :------: | :---------: | :------:|

| --pwa_drawer_text_color               |   Input       | #303030;    | Drawer
| --pwa_drawer_background_color         |   Input       | #fff;       | Drawer

## Form id's
- userName
  - 
- userVerify
  - 
- userPassword
  - 
- userDelete
  - 

## Please send Feedback
All feedback, comments, bugs, and requests are welcome.
* [Jack's Publishing](https://www.jackspublishing.com)
* [contractor's centre](https://www.contractorscentre.com)