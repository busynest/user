import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    verified: false,
    anon: false,
    userId: '',
    name: 'John Doe',
    email: '',
    photoURL: '',
    phone: '',
    msgToken: ''
};
export const accountSlice = createSlice({
    name: 'backend',
    initialState,
    reducers: {
        accVerified: (state, action) => {
            state.verified = action.payload;
        },
        accAnon: (state, action) => {
            state.anon = action.payload;
        },
        accID: (state, action) => {
            state.userId = action.payload;
        },
        accName: (state, action) => {
            state.name = action.payload;
        },
        accPhone: (state, action) => {
            state.phone = action.payload;
        },
        accEmail: (state, action) => {
            state.email = action.payload;
        },
        accImage: (state, action) => {
            state.photoURL = action.payload;
        },
        messageId: (state, action) => {
            state.msgToken = action.payload;
        },
    }
});
export const { accVerified, accID, accName, accPhone, accEmail, accImage, accAnon, messageId } = accountSlice.actions;
export default accountSlice.reducer;
//# sourceMappingURL=backend.js.map