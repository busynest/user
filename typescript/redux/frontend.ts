import { PayloadAction, createSlice } from "@reduxjs/toolkit";
export const initialState = {
  settings:         'profile',            // Page Navigation
  login:            false,                // Login State
  drawer:           false,                // Drawer State
  registerOne:      false,                // Registration Drawer State
  registerTwo:      false                 // Registration Page State
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
        if ( state.drawer === true)       { state.drawer = false; }
        else                              { state.drawer = true; }
       },

      // Required - open stays open
      openSign: ( state ) => {
        state.drawer = true;
      },

      closeSign: ( state ) => {  
        state.drawer = false;
      },

      universalToggle: ( state, action: PayloadAction<string> ) => {

        if (action.payload === 'drawer') {

          if ( state.registerOne === false)     { state.registerOne = true; }
          else                                  { state.registerOne = false; }

        } else {

          if ( state.registerTwo === false)     { state.registerTwo = true; }
          else                                  { state.registerTwo = false; }

        }

       }

          }
});

export const { universalToggle, navigateAuth, userAuth, toggleSign, openSign, closeSign } = userSlice.actions;

export default userSlice.reducer;