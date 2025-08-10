
import { createSlice, PayloadAction }    from "@reduxjs/toolkit";

// Object Initializer Notation
export interface accountState {
  page:             string,
  verified:         boolean,
  editSettings:     boolean,
  user:             string,
  name:             string,
  email:            string,
  image:            string,
  anon:             boolean,
  phone:            string
}

// Object Initial State
const initialState: accountState = {
  page:             '',
  verified:         false,
  editSettings:     false,
  user:             '',
  name:             '',
  email:            '',
  image:            '',
  anon:             false,
  phone:            ''
}

// Create a slice for the AppState
export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {

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

      // 1. Account User ID
      accUser: ( state, action:PayloadAction<string> )  => {
        state.user = action.payload;
      },

      // 2. Account User Name
      accName: ( state, action:PayloadAction<string> )  => {
        state.name = action.payload;
      },

      // 3. E-mail Verification State
      accVerified: ( state, action:PayloadAction<boolean> )  => {
        state.verified = action.payload;
      },

      // 3. E-mail Verification State
      accSettings: ( state, action:PayloadAction<boolean> )  => {
        state.editSettings = action.payload;
      },

      // 6. Account Phone Number
      accPhone: ( state, action:PayloadAction<string> )  => {
        state.phone = action.payload;
      },

      // 7. Account Public Contact Email
      accEmail: ( state, action:PayloadAction<string> )  => {
        state.email = action.payload;
      },

      // 8. Account Profile Image
      accImage: ( state, action:PayloadAction<string> )  => {
        state.image = action.payload;
      },

      // 9. Anonymous Account
      accAnon: ( state, action:PayloadAction<boolean> )  => {
        state.anon = action.payload;
      }

    }
});

export const { accNavigate, accVerified, accSettings, accUser, accName, accPhone, accEmail, accImage, accAnon } = accountSlice.actions;

export default accountSlice.reducer;
