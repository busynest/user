import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// Object Initializer Notation
export interface user {

  snackState:       boolean,        // Drawer State
  register:         boolean,        // Registration State
  settings:         string,         // Page Navigation
  currentUser:      boolean,        // Signed in/out State
  setUser:          string,         // Profile Name Holder
  customer:         string,         // Customer Name Holder
  name:             string,         // Customer Name Loaded
  photoURL:         string,         // User Photo Loaded
  phone:            string,         // User Phone Loaded
  email:            string,         // User E-mail Loaded
  profileChoice:    string          // Profile Initialization State

}

// Object Initializer Notation
const initialState: user = {

  snackState:       false,                // Drawer State
  register:         true,                 // Registration State
  settings:         'profile',            // Page Navigation
  currentUser:      false,                // Signed in/out User State
  setUser:          "user",               // User Name Holder
  customer:         "someone",            // Customer Name Holder
  name:             'Simon',              // Customer Name Loaded
  photoURL:         'demo.png',           // User Photo Loaded
  phone:            '(555) 555-5555',     // User Phone Loaded
  email:            'lorium@ipsum.com',   // User E-mail Loaded
  profileChoice:    'unChosen'            // Profile Initialization State

}

// Create a slice for the AppState
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      
      navigateX:    ( state, action: PayloadAction<string> ) => {

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
        
      setImageX:    ( state, action: PayloadAction<string> ) => { 
        state.photoURL = action.payload
       },

      setNameX:     ( state, action: PayloadAction<string> ) => { 
        state.name = action.payload;
       },

      // State Return Bootup / Change
      setAuthX:     ( state, action: PayloadAction<boolean> ) => { 
        state.currentUser = action.payload;
       },

      setUserX:     ( state, action: PayloadAction<string> ) => { 
        state.setUser = action.payload;
       },
/*
      profileX:     ( state, action: PayloadAction<string> ) => { 
        state.settings = action.payload
       },     { profileType:  string };
*/
      
      // Alternative CSS Pattern to Show / Hide
      toggleSign: ( state ) => {
        if ( state.snackState === true) { state.snackState = false; }
        else                            { state.snackState = true; }
       },

      closeSignX: ( state ) => {  
        state.snackState = false;
      },

      signUpAction: ( state ) => {
        if ( state.register === false)  { state.register = true; }
        else                            { state.register = false; }
       },

      signUpClose: ( state, action: PayloadAction<boolean> ) => { 
        state.register = action.payload;
       }, 
          }
});





export const { navigateX, setImageX, setNameX, setAuthX, setUserX, toggleSign, closeSignX, signUpAction, signUpClose } = userSlice.actions;

export default userSlice.reducer;