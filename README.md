Progressive Website Application - Authentication
======================
Jack's Publishing maintains Website Authentication Components where developers can focus on their User interface, rather than low-level API calls. Visit the [Live Demo](https://pwa-authentic.firebaseapp.com).

pwa-auth.js is a bundle of 5 Custom HTML Elements for Firebase (IAM) Authenication using email and password, with the ability to change username, icon, email, password, or delete your own account and it's content all together.

Quickly sign-up, log-in, log-out, modify, or delete your firebase account.

Place 5 Custom HTML Tags, reference CSS, and Initialize a Firebase Instance. By either <b>Standard</b> or <b>Modular</b> ECMA Script.

Continue reading to understand how to install this project:

## Prerequisites
- Google
  - Analytics
- Firebase Authentication
  - Email Login
- Firebase Cloud Storage
  - Storage Bucket

## Outline
- Register through Email and Password
  - Log-in
  - Log-out
- Change Username
- Change Email
- Change Password
- Upload Profile Picture
- Delete Account

## Library
- script-context
- module-context
```javascript
// Import ES Modules
import 'pwa-auth';
// Import Firebase Objects
import { auth, db, user, storage, application, firebaseConfig } from "pwa-auth";
// Import Functions
import { logOut, logAccount, logAccountDelete, deleteDocument, pwaDrawerToggle } from "pwa-auth";

// Optional - copy CoreJS files
'./npm/pwa-auth/source/**/*'

// Global Login Object
window.process = { env: { FIREBASE_CONFIG: JSON.stringify({
    apiKey:             "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    authDomain:         "xxxxxxx.xxxxxxx.xxx",
    databaseURL:        "https://xxxxxxx.xxxxxxx.xxx",
    projectId:          "xxxxxxx",
    storageBucket:      "xxxxxxx.xxxxxxx.xxx",
    messagingSenderId:  "xxxxxxxxxxx",
    appId:              "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    measurementId:      "xxxxxxxxxxx"
  })
}};

if (localhost) { window.process = { env: { FIREBASE_CONFIG: 'etc.' } } }

```

## Technical Summary
- Type Strong with [TypeScript](https://www.typescriptlang.org)
- Stylable with [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_cascading_variables/Using_CSS_custom_properties)
- State Management with [ReduxJS](https://redux.js.org/)
- Authentication with Google's [Firebase](https://www.firebase.com)
- Firebase Initialization Object: `window.process = { env: { FIREBASE_CONFIG: `

## Atomic Engineering
- Development (Server-side) Environment: [Node JavaScript](https://nodejs.org)
- Backend: Google Cloud: [Firebase](https://firebase.google.com/)
- Predicate State Behavior: [Redux](https://redux.js.org/)
- Frontend (Client-side): [Lit](https://lit.dev)

## Enrichment
- Development
  - Redux State Connection
  - Global Functions
- Optional
  - Custom Properties

## Website Components
- Button
  - `<user-icon>`
    - Email Log-in
    - Email Subscribe
    - Icon
- Drop-down Drawer
  - `<user-drawer>`
    - Email Log-in
    - Email Subscribe
    - Menu with Log-out
    - Logged-in Menu Content `<slot>`'s
      - name: before
      - name: within
- Pages
  - `<user-settings>`
    - Account Settings Page
  - `<user-login>`
    - Email Log-in Page
    - Email Subscribe Page
    - Logged-in Page Content `<slot>`'s
      - name: content
  - `<email-reset>`
    - Password Reset Page

## Observer Patterns
- `<user-icon>`
  - property: subscribe: (Initial State): Subscribe
  - property: subscribe: else (Initial State): Login
  - property: empty: location of empty image
- `<user-drawer>`
  - feature: Top-down drawer: 1.4 seconds
  - property: **url**: location of `<pwa-settings>` Tag
  - property: subscribe: (Initial State): Subscribe
  - property: subscribe: else (Initial State): Login
- `<user-login>`
  - feature: regular visible page component
- `<user-settings>`
  - 1 Photo Upload Feature, view uploaded bucket of photos, photo ediotr
  - empty property: location of empty image
  - Unavailable Photo
  - Update Username
  - Update Email / Verify
  - Update Password
  - Delete Account, Photos, Information

## Logical States
- `<user-icon>`
  - Logged-out: txt: Login Button
  - Logged-out: txt: Subscribe Button
  - Logged-in, photo: Icon Button
- `<user-drawer>`
  - logged-out: Sign-up by Email Addresses and Password
  - logged-out: Sign-in by Email Addresses and Password
  - logged-in: Settings Page Link, Log-out Button
- `<user-login>`
  - logged-out: Sign-up by Email Addresses and Password
  - logged-out: Sign-in by Email Addresses and Password
  - logged-in, content: `<slot></slot>`

## Firebase Instance Configuration
pwa-auth.js is built upon the Firebase SDK (Software Development Kit).
The entire bundle is one instance of firebase that takes in the configuration information, internally.

## Boilerplate
```html
<head>

  <!-- Optional - CSS Custom Variables-->
  <link type="stylesheet" href="./path_to/pwa-styles.css">

  <!-- Required - Configure Firebase Instance -->
  <script>
    window.process = { env: { FIREBASE_CONFIG: JSON.stringify({
            apiKey: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            authDomain: "xxxxxxx.xxxxxxx.xxx",
            databaseURL: "https://xxxxxxx.xxxxxxx.xxx",
            projectId: "xxxxxxx",
            storageBucket: "xxxxxxx.xxxxxxx.xxx",
            messagingSenderId: "xxxxxxxxxxx",
            appId: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            measurementId: "xxxxxxxxxxx"
        })
      }
    };

    if (lolalhost) { window.process = { env: { FIREBASE_CONFIG: 'etc.' } } }
  </script>

  <!-- Optional: Copy the Project Files from 'source' Folder -->
  <script type="module" src="./path_to/pwa-auth.js"></script>

  <!-- Optional: Custom CSS Properties -->
  <style>

    /* <user-icon> */
    :root {
    --pwa_icon_background_color:        #2a6b45;
    --pwa_icon_radius:                  10px;
    --pwa_icon_border:                  0;
    --pwa_icon_padding:                 0 18px;
    --pwa_icon_hover_color:             #214f34;
    --pwa_icon_font:                    "Avenir Next", "Segoe UI", system-ui, sans-serif;
    --pwa_icon_height:                  44px; /* state: Logged-out (sync) */
    --pwa_icon_diameter:                44px; /* state: Logged-in (sync) */
    }

    /* <user-drawer> */
    :root {
    --pwa_drawer_background_color:      #fffdf8;
    --pwa_drawer_border-radius:         0 0 18px 18px;
    --pwa_drawer_border:                0;
    --pwa_drawer_z-index:               3;
    --pwa_drawer_text_color:            #1c2430;
    --pwa_drawer_position:              absolute;
    --pwa_line_color:                   #e3daca;
    --pwa_close_color:                  #9a3b32;
    }

    /* <user-settings> */
    :root {
    --pwa_settings_background_color:    #fffdf8;

    --pwa_nav_button_color:             #4e5b6a;
    --pwa_nav_highlight_color:          #1c2430;
    --pwa_nav_on_background:            #f3efe6;

    --pwa_divider_color:                #e3daca;
    --pwa_header_color:                 #1c2430;

    --pwa_input_background_color:       #f3efe6;

    --pwa_label_text_color:             #1c2430;

    --pwa_action_text_color:            #fff;
    --pwa_action_background_color:      #2a6b45;
    --pwa_action_border_color:          #214f34;
    }

    /* shared core elements */
    :root {
    --pwa_tap:                          44px; /* Required - minimum tap target */
    --section_background_color:         #fffdf8;
    }
    
  </style>

</head>
```

## Project Type: ECMA Script Modules
Eports: classes and objects
```javascript
// Custom HTML Element Classes
import 'pwa-auth';
`<user-icon>`             // subscribe  |  empty= "./images/empty.jpg"
`<user-drawer>`           // subscribe  |  url=   "./settings"
`<user-settings>`         //               empty= "./images/empty.jpg"
`<user-login>`            // subscribe  | 

// Firebase Objects
import { db, storage, auth, user } from 'pwa-auth';
// db           - firestore database reference
// storage      - firebase storage reference
// auth         - user object reference
// user         - deprecated load-time snapshot. Read auth.currentUser at call time.

// Firebase-Redux States
import { store } from 'pwa-auth';
// store.verified
// store.userId
// store.name
// store.email
// store.photoURL

export { logOut, logAccount, logAccountDelete, deleteDocument } from "pwa-auth";
// logOut()             - Firebase Authentication: log user out
// logAccount()         - Google Analytics Signal: logEvent(analytics, 'create_account');
// logAccountDelete()   - Firebase Authentication: delete account
// deleteDocument()     - Firebase Storage and Firestore:
```

## Drawer Implementation
```html
<body>

  <header>
    <user-icon subscribe empty="./images/empty.jpg"></user-icon>
  </header>

  <user-drawer subscribe url="./settings">
    <!-- before content slot -->
    <div slot="before">
      <a>Link Name</a>
    </div>
    <!-- default slot -->
  </user-drawer>

  <main>
    <user-settings empty="./images/empty.jpg"></user-settings>
  </main>

</body>
```

## Page Implementation
```html
<body>

  <header>
    <user-icon empty="./images/empty.jpg" subscribe ></user-icon>
  </header>

  <main>

    <user-login subscribe>
      <div slot="content">
        <p>Page Content</p>
      </div>
    </user-login>

    <user-settings empty="./images/empty.jpg"></user-settings>

  </main>

</body>
```

## Feedback
All feedback, comments, bugs, and requests are welcome.
* [Jack's Publishing](https://www.jackspublishing.com)
* [contractor's centre](https://www.contractorscentre.com)
* [Node Package Manager](https://www.npmjs.com/package/pwa-auth)
* [Sponsor Jacek Markiewicz](https://github.com/sponsors/busynest/button) 