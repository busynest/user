import { createSlice } from '@reduxjs/toolkit';
export const initialState = {
    login: false,
    drawer: false,
    registerOne: false,
    registerTwo: false,
    settings: 'profile',
    verified: false,
    name: '',
    email: '',
    photoURL: ''
};
const settingsTabs = new Set(['profile', 'verification', 'password', 'delete']);
export const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        navigateAuth(state, action) {
            state.settings = settingsTabs.has(action.payload) ? action.payload : 'profile';
        },
        userAuth(state, action) {
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
        universalToggle(state, action) {
            if (action.payload === 'drawer')
                state.registerOne = !state.registerOne;
            else
                state.registerTwo = !state.registerTwo;
        },
        accName(state, action) {
            state.name = action.payload;
        },
        accEmail(state, action) {
            state.email = action.payload;
        },
        accImage(state, action) {
            state.photoURL = action.payload;
        },
        accVerified(state, action) {
            state.verified = action.payload;
        }
    }
});
export const { navigateAuth, userAuth, toggleSign, openSign, closeSign, universalToggle, accName, accEmail, accImage, accVerified } = sessionSlice.actions;
export default sessionSlice.reducer;
//# sourceMappingURL=session.js.map