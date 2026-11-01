import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    verified: false,
    name: '',
    email: '',
    photoURL: ''
};
export const accountSlice = createSlice({
    name: 'backend',
    initialState,
    reducers: {
        accVerified: (state, action) => {
            state.verified = action.payload;
        },
        accName: (state, action) => {
            state.name = action.payload;
        },
        accEmail: (state, action) => {
            state.email = action.payload;
        },
        accImage: (state, action) => {
            state.photoURL = action.payload;
        },
    }
});
export const { accVerified, accName, accEmail, accImage } = accountSlice.actions;
export default accountSlice.reducer;
//# sourceMappingURL=backend.js.map