General-purpose User Authentication and Management
======================
## Check out the library in action 
![workflow](https://www.inmostfire.com/images/workflow.png) [Demo](https://www.inmostfire.com)

To offer a personalized experience, apps need to have a user management center, a place where users can register and personalize their account.

This library, pwa-auth, provides a secure way to store user's data in the cloud. The library uses Google's Firebase in the backend, through a predicate state behavior using Redux, and the front-end with Polymer's Lit-Element.

Users could register through Gmail, Phone, Facebook, Twitter or their special Email and password, log in, log out, reset their information, and delete their account when they like, all through this library.

With this library, your app will have the ability to turn into a real network where additional services like rating, liking, commenting, storing, and all kinds of user interactivity can be easily implemented.

This small library consists of three HTML Tags, and one boilerplate function to display the user icon, sign up, log in, log out, change account details, and delete user's account.

## Technology Stack
- Firebase SDK v10, 2023,
- Redux v5.0.1, 2024,
- Lit v3.2.1, 2024

<!-- To provide a personalized experience, Apps need to know the identity of a user to securely store data in the cloud. pwa-auth is powered by The Firebase Authentication backend, consistently providing a centralized and predictable state behaviour with Redux, and declaratively render the DOM with Google Polymer's fast and light Lit-Element. This Component includes 3 HTML Tags, and 1 Boilerplate Function to display the user icon, sign up, login, log out, change account details, and delete the user's account. -->

![Subscribe](https://www.inmostfire.com/images/settings.png)

PWA-AUTH includes Firebase's Cloud Firestore, Cloud Storage, and User Management that require Firebase setup to use this component.

| `<user-icon>` | `<user-drawer>` | `<user-settings>` |
| :-----------: | :-------------: | :---------------: |
| 1 photo | Drop-down | Profile |
| fetch social login photo | One click Google Login | Email |
| Upload / Change Profile Photo | Email Addresses and Passwords | Password |
| logged in Photo | Email Login | Delete |
| logged out Photo |
| unavailable Photo |

## Google & Firebase setup
* Add Google Analytics
* Setup Firebase Project
* Initialize Firebase Authentication - email, anonymous, google
* Initialize Firestore Database

## Firebase NPM
```javascript
npm i firebase firestore @firebase/storage @getstation/use-firebase-auth
```

## Javascript
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
## firebase-messaging-sw.js
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

## CSS Custom Properties
| Property | Description | Default |
| :------: | :---------: | :------:|
| --drawer-position:   | Static or Still during scrolling fixed / absolute | fixed |
| --drawer-background-color:   | change background | #fff |
| --drawer-border:   | border thinckness | 3px |

## Form id's
- userName
  - 
- userVerify
  - 
- userPassword
  - 
- userDelete
  - 

## Command Line Interface Tools
* firebase-tools

## Firebase Cloud Setup
- Create App
- Register App / reCAPTCHA Enterprise API
- Cloud IAM - Permissionss
- CORS
- firebase.json - headers
- Analytics
- Authenication
- Storage
- CORS
- CORS and Firebase: The Firebase SDK handles CORS for most services. Emulators or proxies solve dev issues; Storage and custom APIs need explicit configs.

## Please send Feedback
All feedback, comments, bugs, and requests are welcome.
* [Jack's Publishing](https://www.jackspublishing.com)
* [contractor's centre](https://www.contractorscentre.com)