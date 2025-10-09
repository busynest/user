// Object Initializer Notation
export interface frontendAuth {
  login:            boolean,        // Login State
  drawer:           boolean,        // Drawer State
  register:         boolean,        // Registration State

  settings:         string,         // Page Navigation
  userId:           string,         // Profile Name Holder
  customer:         string,         // Customer Name Holder
  
  name:             string,         // Customer Name Loaded
  photoURL:         string,         // User Photo Loaded
  phone:            string,         // User Phone Loaded
  email:            string,         // User E-mail Loaded
  
  profileChoice:    string          // Profile Initialization State
}

// Object Initializer Notation
export interface backendAuth {
  verified:         boolean,        // Verified State
  anon:             boolean,        // Pre-Verified - Anonymous State
  userId:           string,         //

  name:             string,
  email:            string,
  photoURL:         string,
  phone:            string,
  
  msgToken:         string
}
