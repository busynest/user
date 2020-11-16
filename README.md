General-purpose User Authentication and Management
======================
## Check out the library in action 
![workflow](https://www.inmostfire.com/images/workflow.png) [Demo](https://www.inmostfire.com)

To offer a personalized experience, apps need to have a user management center, a place where users can register and personalize their account. This library, pwa-auth, provides a secure way to store user's data in the cloud. The library uses Google's Firebase in the backend, through a predicate state behavior using Redux, and the front-end with Polymer's Lit-Element. Users can register through Gmail, Phone, Facebook, Twitter or their special Email and password, log in, log out, reset their information, and delete their account when they like, all through this library.
With this library, your app will have the ability to turn into a real network where additional services like rating, liking, commenting, storing, and all kinds of user interactivity can be easily implemented.
This small library consists of three HTML Tags, and one boilerplate function to display the user icon, sign up, log in, log out, change account details, and delete user's account.

<!-- To provide a personalized experience, Apps need to know the identity of a user to securely store data in the cloud. pwa-auth is powered by The Firebase Authentication backend, consistently providing a centralized and predictable state behaviour with Redux, and declaratively render the DOM with Google Polymer's fast and light Lit-Element. This Component includes 3 HTML Tags, and 1 Boilerplate Function to display the user icon, sign up, login, log out, change account details, and delete the user's account. -->

![Subscribe](https://www.inmostfire.com/images/settings.png)

PWA-AUTH includes Firebase's Cloud Firestore, Cloud Storage, and User Management that require Firebase setup to use this component.

| `<user-icon>` | `<user-drawer>` | `<user-settings>` |
| :-----------: | :-------------: | :---------------: |
| 1 photo | Drop-down | Profile |
| fetch social login photo | One click Google Login | Email |
| Upload / Change Profile Photo | Email Addresses and Passwords | Password |
| logged in Photo | Email Login |
| logged out Photo |
| unavailable Photo |

## Pollyfills CDN
```html
<script src="./node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js" async ></script>
```
## Pollyfills NPM 
```javascript
npm i polyfills
```
## Google & Firebase setup
* Add Google Analytics
* Setup Firebase Project
* Initialize Firebase Authentication - email, anonymous, google
* Initialize Firestore Database

## Firebase CDN
```html
<!-- FIREBASE -->
<script src="https://www.gstatic.com/firebasejs/5.9.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/5.9.0/firebase-auth.js"></script>
<script src="https://www.gstatic.com/firebasejs/5.9.0/firebase-firestore.js"></script>
<script src="https://www.gstatic.com/firebasejs/5.9.0/firebase-storage.js"></script> 
```
## Firebase NPM
```javascript
npm i firebase firestore @firebase/storage @getstation/use-firebase-auth
```

## Javascript Config
```javascript
// Initialize Firebase
const admin = {
    apiKey: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    authDomain: "xxxxxxx.firebaseapp.com",
    databaseURL: "https://xxxxxxx.firebaseio.com",
    projectId: "xxxxxxx",
    storageBucket: "xxxxxxx.appspot.com",
    messagingSenderId: "xxxxxxxxxxx"
};
// REFERENCE TO SERVICES - Global
const application           = firebase.initializeApp(admin);
const firestore             = application.firestore();
const storage               = firebase.storage();
const storageRef            = storage.ref();
```

## Website Setup:
```javascript
import 'pwa-auth';
import { runFirebase } from 'pwa-auth/src/user-functions';
constructor() { runFirebase(); }
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

## Properties (in Development)
| Property | Description | Default |
| :------: | :---------: | :------:|
| --drawer-position:   | Static or Still during scrolling fixed / absolute | fixed |
| --drawer-background-color:   | change background | #fff |
| --drawer-border:   | border thinckness | 3px |

## Command Line Interface Tools
* polymer-cli
* firebase-tools

## Please send Feedback
All feedback, comments, bugs, and requests are welcome.
* [Jack's Publishing](https://www.jackspublishing.com)
* [contractor's centre](https://www.contractorscentre.com)