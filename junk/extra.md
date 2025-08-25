
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
