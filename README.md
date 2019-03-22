Website Authentication
======================
* Web components for Application Authentication.
* An Icon Button dipalying user's photo, provided by social login or upload.
* A drop-down Drawer to display login box, once logged in, the drawer displays a links to the settings page, a log out button, while any personal ancor list could be added by nesting the HTML ELement.
* A User Settings page with 4 account settings:
  - Profile
  - Email
  - Password
  - Delete
  - Account
* We use lit-Element + Redux + Firebase to eliminate boilerplate code and promote best practices.
* with Common Firebase boilerplate functions.
* Signing in users with email addresses and passwords, or 1 click Social Login.

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
* Run Firebase Boilerplates
    - `import { runFirebase } from 'pwa-auth/src/user-functions';`
    - `constructor() { runFirebase(); }`
* `import 'pwa-auth';`
* `<user-icon></user-icon>` icon / button
* `<user-drawer></user-drawer>` drawer
* `<user-settings></user-settings>` page

## Load any Pollyfills your browser needs
* `<script src="./node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js" async ></script>`

## Usage
* Icon Photo
    - Get Social Login Photo
    - 1 photo
    - Upload / Change Profile Photo
    - logged in Photo
    - logged out Photo
    - unavailable Photo
* Change Profile Information
* Delete user Account
* Change Password
* Change Email

`<user-icon>`
* _user: Icon Boolean, logged out / logged in
* _photoURL: Icon String: Google PhotoURL, logged out PhotoURL, N/A PhotoURL

`<user-drawer>`
* _subscribe: Drawer Boolean, open / closed
* _log: is User logged in Boolean, logged out / logged in
* Adjust drawer height: .visibility { top: 64px; }

`<user-settings>`
* profileTopic: Topic String --> URL coming in future update URL# style
* person: logged in user name

`<!DOCTYPE html>`
`<html>`
  `<head>`
    `<meta charset="UTF-8">`
    `<script type="text/javascript">`
      `</script>`
  `</head>`
  `<body>`
    `<user-icon></user-icon>`
    `<user-drawer></user-drawer>`
    `<user-settings></user-settings>`
  `</body>`
`</html>`

## Firebase Authentication Functions
* runFirebase
* firebaseUser
* firebaseID
* logOut
* isUser
* profileURL
* userName
* userEmail
* deleteUser
* saveImage
* deviceToken

## Redux Actions
* navigate
* setAuth
* setUser
* updateLogin
* openSign
* closeSign
* profile

## Redux Reducers
* SET_IMAGE

## Redux State
* snackState
* currentUser
* setUser
* profileChoice
* settings

## Command Line Interface Tools
* polymer-cli
* firebase-tools

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/owner/my-element)

[Jack's Publishing](https://www.jackspublishing.com)
