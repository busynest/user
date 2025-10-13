import { createSlice } from "@reduxjs/toolkit";
export const initialState = {
    settings: 'profile',
    login: false,
    drawer: false,
    registerOne: false,
    registerTwo: false,
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
            if (state.registerOne === false) {
                state.registerOne = true;
            }
            else {
                state.registerOne = false;
            }
        },
        universalToggle: (state, action) => {
            if (action.payload === 'drawer') {
                if (state.registerOne === false) {
                    state.registerOne = true;
                }
                else {
                    state.registerOne = false;
                }
            }
            else {
                if (state.registerTwo === false) {
                    state.registerTwo = true;
                }
                else {
                    state.registerTwo = false;
                }
            }
        },
        signUpClose: (state, action) => {
            state.registerOne = action.payload;
        },
        iconAuth: (state, action) => {
            state.photoURL = action.payload;
        },
        nameAuth: (state, action) => {
            state.name = action.payload;
        }
    }
});
export const { universalToggle, navigateAuth, iconAuth, nameAuth, userAuth, toggleSign, closeSign, signUpAction, signUpClose } = userSlice.actions;
export default userSlice.reducer;
//# sourceMappingURL=frontend.js.map