
import { createSlice, PayloadAction }    from "@reduxjs/toolkit";
// import { backendAuth } from "./object";

// Object Initial State
const initialState/*: backendAuth*/ = {
  verified:         false,
  anon:             false,

  userId:           '',
  name:             'John Doe',
  email:            '',
  photoURL:         '',
  phone:            '',

  msgToken:         ''
}

// Create a slice for the AppState
export const accountSlice = createSlice({
    name: 'backend',
    initialState,
    reducers: {

      // 1. E-mail Verification State
      accVerified: ( state, action:PayloadAction<boolean> )  => {
        state.verified = action.payload;
      },

      // 2. Anonymous Account
      accAnon: ( state, action:PayloadAction<boolean> )  => {
        state.anon = action.payload;
      },

      // 3. Account User ID
      accID: ( state, action:PayloadAction<string> )  => {
        state.userId = action.payload;
      },

      // 4. Account User Name
      accName: ( state, action:PayloadAction<string> )  => {
        state.name = action.payload;
      },

      // 5. Account Phone Number
      accPhone: ( state, action:PayloadAction<string> )  => {
        state.phone = action.payload;
      },

      // 6. Account Public Contact Email
      accEmail: ( state, action:PayloadAction<string> )  => {
        state.email = action.payload;
      },

      // 7. Account Profile Image
      accImage: ( state, action:PayloadAction<string> )  => {
        state.photoURL = action.payload;
      },

      // 8. Reducer for MSG_TOKEN action
      messageId: (state, action: PayloadAction<string>) => {
        state.msgToken = action.payload;
      },

    }
});

export const { accVerified, accID, accName, accPhone, accEmail, accImage, accAnon, messageId } = accountSlice.actions;

export default accountSlice.reducer;

/*
      // 1. Page Navigation State
      accNavigate: ( state, action: PayloadAction<string> ) => {

        switch(action.payload) {

          case 'profile':
            break;
          case 'email':
            break;
          case 'password':
            break;
          case 'delete':
            break;
        
          default: action.payload = 'profile';
        
          }

        state.page = action.payload

      },
*/