Change Log
==========
All notable changes to pwa-auth.js will be documented in this file.

## [Unreleased]
- Social Login Flow
- animated login and data

# [3.2.6] - 2025-10-12

## Added
- webcomponent: `<user-auth>`: static login page

## Changed
- transition animation to page change
- decouple login toggle from redux or duplicate

# [3.2.4] - 2025-10-08

## Added
- Export Redux State to Public
- webcomponent: Login Widget

# [3.2.3] - 2025-10-08

## Added
- Rollup Project Bundle

# [3.2.1] - 2025-10-07

## Changed
- Pipline Logic

# [3.1.1] - 2025-10-07

## Changed
- Two Source Options: ES Modules / Global Scope
- NPM Package Export Names

# [3.0.5] - 2025-10-07

## Changed
- NPM Package to publish from src-javascript with declaration files.

# [3.0.3] - 2025-10-07

## Changed
- NPM Package to publish from src-typescript with declaration files.

# [3.0.1] - 2025-10-06

## Changed
- Project Bundle set to ES Module 
- Eport Redux state from main application package

# [2.0.8] - 2025-09-08

## Changed
- Read Me Instructions Updated
- photo-uploader : design

# [2.0.7] - 2025-09-07

## Added
- Individual Custom Element Package Modules

## Changed
- CSS Custom Properties Default

## Notes
* Both - Client-side and Server-side - Object - Libraries
- in browser: window
- in node.js: global
- in web workers: self
- ECMA Script 2020+: globalThis

# [2.0.6] - 2025-09-07

## Changed
- start.js: default no-image storage, default no-image hyperlink
- default image changed to svg
- user-icon, user-settings: Empty Artwork URL, Property

# [2.0.5] - 2025-09-06

## Changed
- user-icon: login button - line-height configuration
- (Public) Folder to (Website) Project Folder

## Added
- Firebase Functions: - well-rounded, all use.
- Firebase Configuration Object Module
- Partial-Dynamic - an individual export, for each property, of configuration object
- window object

# [2.0.4] - 2025-08-31

## Changed
- updated readme file

## Goals
- Photo Editor
- Password Verifier
- Email Verifier

# [1.2.4] - 2025-08-31

## Changed
- user-icon: property namespace: subscribe
- user-drawer: property namespace: subscribe, settingsURL
- updated ReadMe File
- updated CSS Custom Properties

# [1.1.6] - 2025-08-25

## Changed
- Login Button Standard Height: Medium: 40px
- Drawer Animation: from 3d transition, to max-height mechanism

# [1.1.6] - 2025-08-25

## Changed
- Drawer - should be the custom element itself, not internal wrapper

# [1.0.8] - 2025-08-23

## Changed
- Read me file: updated information
- CSS Custom Variables: update color schemes
- Redux: check and update all connections
- Input: Password: update correctness

## Add
- Element Internals Standard
- Forgot Password Reset

## REMOVED
- Telephone Verification for version 1 simplicity

## [1.0.0] - 2025-08-04

## To Do
- Image Upload Minify
- Image Upload Save Mini-url

## Changed
- Redux/Toolkit Upgrade
- Lit Upgrade
- Demo Index Update
- Firebase Functions
- Custom Elements into Personal Folders
- Profile Section: Too many input, downsize
- Email Section to Verification Section
- Password Section to Security Section
- Remove id's, Replace with class
- CSS Custom Properties
- Drawer Input Design
- Firebase CDN or SDK
- firebase messaging service worker CDN
- Check Analytics Integration
- Input JavaScript Configuration - global let anywhere, or within slot
- Input CSS Custom Properties - global :root anywhere, or within slot
- Custom CSS Properties - namespase for each component
- Merge Duplicate Redux Files
- Visual Effects, CSS Active Content
- Folder Namespace as technology stack
- Redux Frontend / Backend State

### Added
- Firebase Element for Firebase SDK
- Google Firebase Analytics to Initialization
- Firebase Web App to Initialization
- Step Process #1 - Initialize Firebase Object
- Space Saving Freature: Menu Bar: Icon > Active > Text\
- Firebase TypeScript Object - Analytics
- Firebase TypeScript Object - Functions
- Analytics Bootup Logic Check, Fallback, Local, Offline
- Google Tag Manager Conversion - Integrateion
- Content-Photo-Element Uploader
- custom elements - input subdivision
- Firestore Database Structure
- Verify Email moved to custom event listener within firebase function onstate change
- Theme Color Detection
- CORS

### Removed
- Remove Storybook
- Remove Firebase Cloud Messaging (FCM) Integration

## [0.0.14] - 2019-03-24

### Added
- Upgraded to Typescript
- alert user to login when submitting form
- Verify user before submitting form
- Forms prevent default

### Changed
- `<user-drawer>`: create new account toggle,

## [0.0.13] - 2019-03-23

### Changed
- `<user-icon>`: background-color, margin
- `<user-settings>` > Profile Dashboard: new `<user-photo>` upload component, justified titles, 
- Demo updated

## [0.0.11] - 2019-03-22

### Changed
- `<user-drawer>`: drawer's top starts at 0px.
- `<user-icon>`: removed border to 0px.
- `<user-settings>` > Profile: display circular photo, upload photo design

## Fixed
- `<user-drawer>`: position, layers

## [0.0.6] - 2019-03-21

### Added
- update user's name
- update user's phone number
- update user's e-mail
- update user's photo
- email Verified Proccess, checkmark
- settings > profile: user dashbaord

### Removed
- `<user-drawer>`: Custom Drawer Header Text


# Footnotes
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) and this project adheres to [Semantic Versioning](https://semver.org/).

Added - for new features.
Changed - for changes in existing functionality.
Deprecated - for soon-to-be removed features.
Removed - for now removed features.
Fixed - for any bug fixes.
Security - in case of vulnerabilities.