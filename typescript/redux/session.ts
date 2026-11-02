import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/** Required - one tree. UI flags and the account fields the elements read. */
export const initialState = {
  login:        false,
  drawer:       false,
  registerOne:  false,
  registerTwo:  false,
  settings:     'profile',
  verified:     false,
  name:         '',
  email:        '',
  photoURL:     ''
};

const settingsTabs = new Set(['profile', 'verification', 'password', 'delete']);

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {

    navigateAuth(state, action: PayloadAction<string>) {
      state.settings = settingsTabs.has(action.payload) ? action.payload : 'profile';
    },

    userAuth(state, action: PayloadAction<boolean>) {
      state.login = action.payload;
    },

    toggleSign(state) {
      state.drawer = !state.drawer;
    },

    openSign(state) {
      state.drawer = true;
    },

    closeSign(state) {
      state.drawer = false;
    },

    universalToggle(state, action: PayloadAction<string>) {
      if (action.payload === 'drawer') state.registerOne = !state.registerOne;
      else state.registerTwo = !state.registerTwo;
    },

    accName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },

    accEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },

    accImage(state, action: PayloadAction<string>) {
      state.photoURL = action.payload;
    },

    accVerified(state, action: PayloadAction<boolean>) {
      state.verified = action.payload;
    }

  }
});

export const {
  navigateAuth,
  userAuth,
  toggleSign,
  openSign,
  closeSign,
  universalToggle,
  accName,
  accEmail,
  accImage,
  accVerified
} = sessionSlice.actions;

export default sessionSlice.reducer;
