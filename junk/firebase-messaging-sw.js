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


















//import { getMessaging, getToken } from "firebase/messaging";

// importScripts('https://www.gstatic.com/firebasejs/7.14.0/firebase/init.js');

// import { initializeApp } from "firebase/app";
// import { getMessaging } from "firebase/messaging/sw";

/*
const messaging = getMessaging();
getToken(messaging, { vapidKey: 'BAz2eUmJrgElexalB5GmQOXLxZ7yJC2Jp69fsUfnYM73hfGIhWkRxPi5PgRXr5oEWJ0yvJlQ7GVFGYP3AiIigl4' }).then((currentToken) => {
  if (currentToken) {
    // Send the token to your server and update the UI if necessary
    // ...
  } else {
    // Show permission request UI
    console.log('No registration token available. Request permission to generate one.');
    // ...
  }
}).catch((err) => {
  console.log('An error occurred while retrieving token. ', err);
  // ...
});

*/