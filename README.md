
A User Management Component is designed with 3 HTML Tags, and 1 Boilerplate Function to sign up, sign in, log out, change account details, delete account.

pwa-auth includes Firebase's Cloud Firestore, Cloud Storage, and User Management that require Firebase setup to use this component.

Application Authentication
======================
* `<user-icon>`
  - 1 photo
  - fetch social login photo
  - Upload / Change Profile Photo
  - logged in Photo
  - logged out Photo
  - unavailable Photo
* `<user-drawer>`
  - Drop-down 
  - One click Google Login
  - Email Addresses and Passwords
* `<user-settings>` page:
  - Profile
  - Email
  - Password
  - Delete
* We use lit-Element + Redux + Firebase to eliminate boilerplate code and promote best practices.

## Please send Feedback
All feedback, comments, bugs, and requests are welcome.

## Google & Firebase setup
* Add Google Analytics to Website `<head>`
* Setup Firebase Project
* Initialize Firebase Authentication
  - email
  - anonymous / For testing
  - google
* Initialize Firestore Database

## Website Setup:
* `import { runFirebase } from 'pwa-auth/src/user-functions';`
* `constructor() { runFirebase(); }`
* `import 'pwa-auth';`
* `<header>`
*   `<user-icon></user-icon>`
* `</header>`
* `<user-drawer></user-drawer>`
* `<main>`
*   `<user-settings></user-settings>`
* `</main>`

## Load any Pollyfills your browser needs
* `<script src="./node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js" async ></script>`

## Command Line Interface Tools
* polymer-cli
* firebase-tools

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/owner/my-element)

[![Published on npm](https://https://www.jackspublishing.com/npm007.svg)](https://www.npmjs.com/package/pwa-auth)

[Jack's Publishing](https://www.jackspublishing.com)
pwa-auth use case example: [contractor's centre](https://www.contractorscentre.com)