import { createSlice } from "@reduxjs/toolkit";
export const initialState = {
    settings: 'profile',
    login: false,
    drawer: false,
    register: true,
    userId: "user",
    customer: "John Doe",
    profileChoice: 'unChosen',
    name: 'Modern Business',
    photoURL: '',
    phone: '(...) ... - ....',
    email: ''
};
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        navigateAuth: (state, action) => {
            switch (action.payload) {
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
        userAuth: (state, action) => {
            state.login = action.payload;
        },
        toggleSign: (state) => {
            if (state.drawer === true) {
                state.drawer = false;
            }
            else {
                state.drawer = true;
            }
        },
        closeSign: (state) => {
            state.drawer = false;
        },
        signUpAction: (state) => {
            if (state.register === false) {
                state.register = true;
            }
            else {
                state.register = false;
            }
        },
        signUpClose: (state, action) => {
            state.register = action.payload;
        },
        iconAuth: (state, action) => {
            state.photoURL = action.payload;
        },
        nameAuth: (state, action) => {
            state.name = action.payload;
        }
    }
});
export const { navigateAuth, iconAuth, nameAuth, userAuth, toggleSign, closeSign, signUpAction, signUpClose } = userSlice.actions;
export default userSlice.reducer;
