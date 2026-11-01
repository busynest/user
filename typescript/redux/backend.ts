
import { createSlice, PayloadAction }    from "@reduxjs/toolkit";
const initialState = {
  verified:         false,
  name:             '',
  email:            '',
  photoURL:         ''
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

      accName: ( state, action:PayloadAction<string> )  => {
        state.name = action.payload;
      },

      accEmail: ( state, action:PayloadAction<string> )  => {
        state.email = action.payload;
      },

      // 7. Account Profile Image
      accImage: ( state, action:PayloadAction<string> )  => {
        state.photoURL = action.payload;
      },

    }
});

export const { accVerified, accName, accEmail, accImage } = accountSlice.actions;

export default accountSlice.reducer;