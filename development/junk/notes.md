
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

```javascript
// CORS
[
  {
    "origin": ["https://inmostfire.firestoreapp.com", "http://localhost:8000"],
    "method": ["GET", "PUT", "POST", "DELETE"],
    "responseHeader": [
      "Content-Type",
      "Authorization",
      "x-goog-meta-*",
      "x-goog-acl",
      "x-goog-date",
      "x-goog-content-sha256",
      "x-goog-class"
    ],
    "maxAgeSeconds": 3600
  }
]
```

```javascript

// firebase-messaging-sw.js

importScripts("https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/9.6.0/firebase-auth.js");
importScripts("https://www.gstatic.com/firebasejs/9.6.0/firebase-storage.js");
importScripts("https://www.gstatic.com/firebasejs/9.6.0/firebase-firestore.js");
importScripts("https://www.gstatic.com/firebasejs/9.6.0/firebase-analytics.js");
importScripts("https://www.gstatic.com/firebasejs/9.6.0/firebase-messaging.js");

// Dynamically import Firebase from CDN
// const firebaseApp = await import('https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js');
// const firebaseAuth = await import('https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js');

const admin = {
  apiKey: "AIzaSyC1ZNYC9RAjSAE3syUBNi47AiqbAqkx99w",
  authDomain: "pwa-authentic.firebaseapp.com",
  projectId: "pwa-authentic",
  storageBucket: "pwa-authentic.firebasestorage.app",
  messagingSenderId: "749233996232",
  appId: "1:749233996232:web:bbc410d53b7d39bdfb80fd",
  measurementId: "G-G1GYM1HBJ4"
} ;

// const messaging = getMessaging(admin);

// REFERENCE TO SERVICES
firebase.initializeApp(admin);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
// firebase.messaging();

// Add the public key generated from the console.
// firebase.messaging().usePublicVapidKey("BAz2eUmJrgElexalB5GmQOXLxZ7yJC2Jp69fsUfnYM73hfGIhWkRxPi5PgRXr5oEWJ0yvJlQ7GVFGYP3AiIigl4");

// export const messaging = () => [] firebase.messaging();






```