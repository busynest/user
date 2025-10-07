import { css } from "lit";
export const iconRoot = css `

/* CSS: Custom Variables: <head> tag */
 
:root {

  /* WebComponent 1 : User Icon
  <user-icon>
    <button> */
  --pwa_icon_hover:               lightgrey;        /* custom-elements Folder > icon Folder > CSS Folder > icon.ts */
  --pwa_icon_background:          #6cc04a;        /* custom-elements Folder > icon Folder > CSS Folder > icon.ts */
  --pwa_icon_border:              2px solid black;  /* custom-elements Folder > icon Folder > CSS Folder > icon.ts */

  /* WebComponent 1: logged-out
  <user-icon>
    <button class="login"> */
  --pwa_icon_height:              32px; /* sync to --pwa_icon_diameter */ /* custom-elements Folder > icon Folder > CSS Folder > icon.ts */
  --pwa_icon_padding:             0px 16px;               /* custom-elements Folder > icon Folder > CSS Folder > icon.ts */
  --pwa_icon_radius:              6px;                    /* custom-elements Folder > icon Folder > CSS Folder > icon.ts */
  --pwa_icon_font:                'Arial', sans-serif;    /* custom-elements Folder > icon Folder > CSS Folder > icon.ts */

  /* WebComponent 1: logged-in
  <user-icon>
    <button class="icon"> */
  --pwa_icon_diameter:            32px; /* sync to --pwa_icon_height */  /* custom-elements Folder > icon Folder > CSS Folder > icon.ts */

}

`;
export const drawerRoot = css `

/* CSS: Custom Variables: <head> tag */
 
:root {

  /* WebComponent 2: Drop-down Drawer
  <user-drawer>
    <section>
      <header></header>
      <div class="spec"> */
  --pwa_drawer_border:            3px #303030 solid;    /* custom-elements Folder > drawer Folder > CSS Folder > drawer.ts */
  --pwa_drawer_z-index:           2;                      /* custom-elements Folder > drawer Folder > CSS Folder > drawer.ts */
  --pwa_drawer_border-radius:     20px;                   /* custom-elements Folder > drawer Folder > CSS Folder > drawer.ts */

  /* WebComponent 2: Drop-down Drawer - logged-out
  <div class="spec"> */
  --pwa_drawer_text_color:        #303030;              /* custom-elements Folder > drawer Folder > CSS Folder > drawer.ts */
  --pwa_drawer_background_color:  #fff;                 /* custom-elements Folder > drawer Folder > CSS Folder > drawer.ts */

  /* WebComponent 2: Drop-down Drawer - logged-in
  <div class="spec" on> */

}

`;
export const settingsRoot = css `

/* CSS: Custom Variables: <head> tag */
 
:root {

  /* WebComponent 3: Settings Page
  <user-settings>
    <nav></nav>
    <section></section> */
  --pwa_settings_background:      white;      /* custom-elements Folder > settings Folder > settings.ts */
  --pwa_divider:                  black;      /* custom-elements Folder > settings Folder > settings.ts */

  /* Navigation */
  --pwa_nav_button:               grey;       /* custom-elements Folder > settings Folder > CSS Folder > navigation.ts */
  --pwa_nav_select:               black;      /* custom-elements Folder > settings Folder > CSS Folder > navigation.ts */

  /* Section Header */
  --pwa_section_header:           black;      /* custom-elements Folder > settings Folder > settings.ts */

  /* Label */
  --pwa_label_text_color:         black;      /* Form Folder > label.ts */

  /* Input */
  --pwa_input_background:         #E1E5EB;  /* Form Folder > input.ts */

  /* Button */
  --pwa_action_text_color:        #fff;     /* Form Folder > button.ts */
  --pwa_action_background_color:  #6cc04a;  /* Form Folder > button.ts */
  --pwa_action_border_color:      #60b23e;  /* Form Folder > button.ts */

}

`;
export const themeRoot = css `

  /* Dark Theme */
  @media (prefers-color-scheme: dark) { }

  /* Light Theme */
  @media (prefers-color-scheme: light) { }

`;
