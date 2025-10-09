import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// import { frontendAuth } from "./object";
/*
interface frontendAuth {
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
}*/
// Object Initializer Notation
export const initialState/*: frontendAuth*/ = {

  settings:         'profile',            // Page Navigation

  login:            false,                // Login State
  drawer:           false,                // Drawer State
  
  register:         true,                 // Registration State




  userId:           "user",               // User Name Holder

  

  customer:         "John Doe",           // Customer Name Holder

  profileChoice:    'unChosen',           // Profile Initialization State

  name:             'Modern Business',    // Customer Name Loaded
  photoURL:         '',   // User Photo Loaded
  
  phone:            '(...) ... - ....',   // User Phone Loaded
  email:            ''                    // User E-mail Loaded

}

// Create a slice for the AppState
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      
      navigateAuth:    ( state, action: PayloadAction<string> ) => {

        switch(action.payload) {

          case 'profile':
            break;
          case 'verification':
            break;
          case 'password':
            break;
          case 'delete':
            break;
        
          default: action.payload = 'profile';
        
        }
      
        state.settings = action.payload;

      },

      // Login State
      userAuth:     ( state, action: PayloadAction<boolean> ) => { 
        state.login = action.payload;
       },

      // Drawer State - Alternative CSS Pattern to Show / Hide
      toggleSign: ( state ) => {
        if ( state.drawer === true) { state.drawer = false; }
        else                        { state.drawer = true; }
       },

      closeSign: ( state ) => {  
        state.drawer = false;
      },

      // Sign-up State
      signUpAction: ( state ) => {

         if ( state.register === false)   { state.register = true; }
        else                              { state.register = false; }

       },

        // Sign-up State
     // initialSignUp: ( state, action: PayloadAction<boolean>  ) => {

        // state.register = action.payload ? !state.register : state.register;

        /*

        function toggleBoolean(initialState, toggle) {
          return toggle ? !initialState : initialState;
        }

        toggleBoolean(true, false)  returns true
        toggleBoolean(true, true)   returns false
        toggleBoolean(false, false) returns false
        toggleBoolean(false, true)  returns true

        */

       //},

      signUpClose: ( state, action: PayloadAction<boolean> ) => { 
        state.register = action.payload;
       }, 
        
      // Profile Image
      iconAuth:    ( state, action: PayloadAction<string> ) => { 
        state.photoURL = action.payload
       },

      // Username
      nameAuth:     ( state, action: PayloadAction<string> ) => { 
        state.name = action.payload;
       }

          }
});

export const { navigateAuth, iconAuth, nameAuth, userAuth, toggleSign, closeSign, signUpAction, signUpClose } = userSlice.actions;

export default userSlice.reducer;



/*
      setUserX:     ( state, action: PayloadAction<string> ) => { 
        state.setUser = action.payload;
       },

      profileX:     ( state, action: PayloadAction<string> ) => { 
        state.settings = action.payload
       },     { profileType:  string };
*/