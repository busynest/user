Progressive Website Application - Authentication
======================
Hello, and welcome to Jack's Publishing of Custom HTML Elements.

pwa-auth.js is a bundle of 3 Custom HTML Elements for Firebase (IAM) Authenication using email and password, with the ability to change username, icon, email, password, or delete your own account and it's content all together. 

You will learn how to reference, initialize, and place 3 Custom HTML Tags for use. By either <b>Standard</b> or <b>Modular</b> ECMA Script.

pwa-auth.js (Authentication Components) are for anyone who is looking for a quick and simple way to sign-up, log-in, log-out, modify, or delete a firebase account information from thier own personal domain.

Jack's Publishing is dedicated to maintaining components for your projects. This specific project is designed to be simple, by meeting basic user needs with the interplay of an Icon Button, Drop-down Drawer, and a Settings Page.

Continue reading to start installing the bundle:
- Pick the JavaScript File Type to Reference
- Understand the Library Features
- Understand the Library Boilerplate
  - 3 Tag Placement
  - Color Scheme: CSS Custom Properties
  - Firebase Initialization

## [Visit: Live Demo](https://pwa-authentic.firebaseapp.com)

## pwa-auth.js Features:
- Register through Email and Password
  - Log-in
  - Log-out
- Change Username
- Change Profile Picture
- Change Email
- Change Password
  - Delete Account

## Standard JavaScript
- copy the bundle
  - node_modules/pwa-auth/npm/pwa-auth.js

## Modular JavaScript
```javascript
import 'pwa-auth';
```

## Boilerplate
- 3 Tag Placements (HTML - Custom Elements)
  - user-icon
  - user-drawer
  - user-settings
- Cascading Style Sheets (CSS - Custom Properties)
- ECMA Script (JavaScript)

## HTML Custom Elements
```html
<head>

  <!-- CSS Custom Properties - Choice 1: Link Tag -->
  <link type="stylesheet" href="pwa-styles.css">

</head>

<body>

  <header>
    <!-- subscribe property: (Initial State): Subscribe -->
    <!-- subscribe property: else (Initial State): Login -->
    <!-- Logged-out (State): txt: Login Button -->
    <!-- Logged-out (State): txt: Subscribe Button -->
    <!-- Logged-in (State): photo: Icon Button -->
    <user-icon subscribe></user-icon>
  </header>

  <!-- settingsURL property: location of <pwa-settings> Tag -->
  <!-- subscribe property: (Initial State): Subscribe -->
  <!-- subscribe property: else (Initial State): Login -->
  <!-- Top-down, Drop-down Feature: height, 1.4 seconds -->
  <!-- logged-out (State): Sign-up by Email Addresses and Password -->
  <!-- logged-out (State): Sign-in by Email Addresses and Password -->
  <!-- logged-in (State): Settings Page Link, Log-out Button -->
  <user-drawer subscribe settingsURL="/settings"></user-drawer>

  <main>
    <!-- 1 Photo Upload Feature, view uploaded bucket of photos, photo ediotr -->
    <!-- Unavailable Photo --> 
    <!-- Update Username -->
    <!-- Update Email / Verify -->
    <!-- Update Password -->
    <!-- Delete Account, Photos, Information -->
    <user-settings></user-settings>
  </main>

  <script>/* Initialize ECMA Script Properties */</script>
  <style>/* CSS Custom Properties - Choice 2: Style Tag */</style>
  <script src="pwa-auth.js"></script>

</body>
```
## CSS Custom Properties
| Custom Namespace | Description | Default | Custom Element |
| :--- | ---: | :---: | :--- |
| --pwa_icon_background           | Button  | #6cc04a; | user-icon |
| --pwa_icon_hover                | Button      | lightgrey     | user-icon |
| --pwa_icon_border               | Button      | 2px solid black | user-icon |
| --pwa_icon_height (sync)        | Login State      | 32px      | user-icon |
| --pwa_icon_padding              | Login State      | 0px 16px | user-icon |
| --pwa_icon_radius               | Login State      | 6px      | user-icon |
| --pwa_icon_font         | Login State   | 'Arial', sans-serif | user-icon |
| --pwa_icon_diameter (sync)      | Icon State  | 32px        | user-icon |
| --pwa_drawer_border             | Drawer      | 3px #303030 solid | user-drawer |
| --pwa_drawer_z-index            | Drawer      | 2         | user-drawer |
| --pwa_drawer_border-radius      | Drawer      | 20px        | user-drawer |
| --pwa_drawer_text_color         | Input txt   | #303030    | user-drawer |
| --pwa_drawer_background_color   | Input txt   | #fff       | user-drawer |
| --pwa_settings_background       | Navigation  | grey       | user-settings |
| --pwa_nav_button                | Navigation  | grey       | user-settings |
| --pwa_nav_select                | Navigation  | black      | user-settings |
| --pwa_divider                   | Divider     | grey       | user-settings |
| --pwa_input_background          | Input       | #E1E5EB  | user-settings |
| --pwa_label_text_color          | Input       | black      | user-settings |
| --pwa_section_header            | Header      | black      | user-settings |
| --pwa_action_text_color         | Button      | #fff     | user-settings |
| --pwa_action_background_color   | Button      | #6cc04a  | user-settings |
| --pwa_action_border_color       | Button      | #60b23e  | user-settings |

## CSS Setup
```html
<!-- CSS: Custom Variables -->
<!-- Place this txt into your document -->
<style>

:root {

  /* WebComponent 1 : User Icon
  <user-icon>
    <button> */
  --pwa_icon_hover:               lightgrey;
  --pwa_icon_background:          #6cc04a;
  --pwa_icon_border:              2px solid black;

  /* WebComponent 1: logged-out
  <user-icon>
    <button class="login"> */
  --pwa_icon_height:              32px; /* sync to --pwa_icon_diameter */
  --pwa_icon_padding:             0px 16px;
  --pwa_icon_radius:              6px;
  --pwa_icon_font:                'Arial', sans-serif;

  /* WebComponent 1: logged-in
  <user-icon>
    <button class="icon"> */
  --pwa_icon_diameter:            32px; /* sync to --pwa_icon_height */



  /* WebComponent 2: Drop-down Drawer
  <user-drawer>
    <section>
      <header></header>
      <div class="spec"> */
  --pwa_drawer_border:            3px #303030 solid;
  --pwa_drawer_z-index:           2;
  --pwa_drawer_border-radius:     20px;

  /* WebComponent 2: Drop-down Drawer - logged-out
  <div class="spec"> */
  --pwa_drawer_text_color:        #303030;
  --pwa_drawer_background_color:  #fff;



  /* WebComponent 3: Settings Page
  <user-settings>
    <nav></nav>
    <section></section> */
  --pwa_settings_background:      white;
  --pwa_divider:                  black;

  /* Navigation */
  --pwa_nav_button:               grey;
  --pwa_nav_select:               black;

  /* Section Header */
  --pwa_section_header:           black;

  /* Label */
  --pwa_label_text_color:         black;

  /* Input */
  --pwa_input_background:         #E1E5EB;

  /* Button */
  --pwa_action_text_color:        #fff;
  --pwa_action_background_color:  #6cc04a;
  --pwa_action_border_color:      #60b23e;

}

</style>
```
# JavaScript Setup

## Google
- Google Analytics
- Firebase Project

## Firebase
- Authentication - email login
- Cloud Storage - icon save location

### Initialize Modular Firebase Instance Configuration
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

### Global Namespaced Firebase Configuration
pwa-auth.js is built upon the Firebase SDK (Software Development Kit).
The entire bundle is one instance of firebase that takes in the configuration information, internally.

If you are looking for a Namespaced Firebase Configuration, please send it as feedback, and will make that version for you.

# Technological Engineering
- Development Environment: [Node JavaScript](https://nodejs.org)
- Backend: Google Cloud: [Firebase](https://firebase.google.com/)
- Predicate State Behavior: [Redux](https://redux.js.org/)
- Frontend: [Lit](https://lit.dev)

# Feedback
All feedback, comments, bugs, and requests are welcome.
* [Jack's Publishing](https://www.jackspublishing.com)
* [contractor's centre](https://www.contractorscentre.com)
* [Node Package Manager](https://www.npmjs.com/package/pwa-auth)
* [Sponsor Jacek Markiewicz](https://github.com/sponsors/busynest/button)