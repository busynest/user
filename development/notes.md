
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




// store        - Redux States: 
    // store.backend.verified     - verified email: true/false
    // store.backend.userId       - user ID
    // store.backend.name         - user name
    // store.backend.email        - user email
    // store.backend.photoURL     - user profile photo







"./development": {
    "default":    "./source/development/pwa-auth.js",
    "types":      "./source/development/pwa-auth.d.ts"
},



{
    dir:              './source/development',
    entryFileNames:   '[name].js',
    chunkFileNames:   '[name]-[hash].js',
    format:           'es',
    name:             'pwaAuth',
    sourcemap:        true,
    globals:          { lodash: '_' },
    interop:          'compat'
  },


  /*,
  {
    dir:              'base/pwa-auth.d.ts',
    entryFileNames:   'project/esm/[name].d.ts',
    chunkFileNames:   'project/esm/[name]-[hash].d.ts',
    format:           'es',

    // sourcemap:        true,
    // preserveModules: false
    // Externals: Assume CDN; avoids bundling large libs.

    sourcemap:        true,
    interop:          'compat'
  }*/







  <user-icon>
<!-- property: subscribe: (Initial State): Subscribe -->
<!-- property: subscribe: else (Initial State): Login -->
<!-- property: empty: location of empty image -->
<!-- state: Logged-out: txt: Login Button -->
<!-- state: Logged-out: txt: Subscribe Button -->
<!-- state: Logged-in: photo: Icon Button -->
<user-drawer>
<!-- feature: Top-down drawer: 1.4 seconds -->
<!-- property: url: location of <pwa-settings> Tag -->
<!-- property: subscribe: (Initial State): Subscribe -->
<!-- property: subscribe: else (Initial State): Login -->
<!-- state: logged-out: Sign-up by Email Addresses and Password -->
<!-- state: logged-out: Sign-in by Email Addresses and Password -->
<!-- state: logged-in: Settings Page Link, Log-out Button -->
<user-login>
<!-- feature: regular visible page component -->
<!-- state: logged-out: Sign-up by Email Addresses and Password -->
<!-- state: logged-out: Sign-in by Email Addresses and Password -->
<!-- state: logged-in: content: <slot></slot> -->
<user-settings>
<!-- 1 Photo Upload Feature, view uploaded bucket of photos, photo ediotr -->
<!-- empty property: location of empty image -->
<!-- Unavailable Photo -->
<!-- Update Username -->
<!-- Update Email / Verify -->
<!-- Update Password -->
<!-- Delete Account, Photos, Information -->
<email-reset>
<!-- Coming Soon -->




<!--
## Event emitters
## Custom Events
-->

<!--
- Modules:
- Unique Identifiers: 
- Links and Hashes:
- Semantics:
- Descriptions
-->
