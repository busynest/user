Application Authentication
======================
![workflow](https://www.inmostfire.com/images/workflow.png) [Demo](https://www.inmostfire.com)

User Management Component with 3 HTML Tags, and 1 Boilerplate Function to display user icon, sign up, sign in, log out, change account details, delete account.

![Subscribe](https://www.inmostfire.com/images/settings.png)

PWA-AUTH includes Firebase's Cloud Firestore, Cloud Storage, and User Management that require Firebase setup to use this component.

## Google & Firebase setup
* Add Google Analytics
* Setup Firebase Project
* Initialize Firebase Authentication - email, anonymous, google
* Initialize Firestore Database
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

| `<user-icon>` | `<user-drawer>` | `<user-settings>` |
| ------------- |:-------------:| -----:|
| 1 photo | Drop-down | Profile |
| fetch social login photo | One click Google Login | Email |
| Upload / Change Profile Photo | Email Addresses and Passwords | Password |
| logged in Photo | | Delete |
| logged out Photo |
| unavailable Photo |

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
| Property      | Description   | Default |
| ------------- |:-------------:| -----:|
| --drawer-position:   | Static or Still during scrolling fixed / absolute | fixed |
| --drawer-background-color:   | change background | #fff |
| --drawer-border:   | border thinckness | 3px |

## Load any Pollyfills your browser needs
* `<script src="./node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js" async ></script>`

## Command Line Interface Tools
* polymer-cli
* firebase-tools

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/owner/my-element)

[![Published on npm](https://https://www.jackspublishing.com/npm007.svg)](https://www.npmjs.com/package/pwa-auth)

[Jack's Publishing](https://www.jackspublishing.com)
pwa-auth use case example: [contractor's centre](https://www.contractorscentre.com)

## Please send Feedback
All feedback, comments, bugs, and requests are welcome.

