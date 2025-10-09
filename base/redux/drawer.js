import { createSlice } from "@reduxjs/toolkit";
const initialState = { drawer: false };
export const drawerSlice = createSlice({
    name: 'drawers',
    initialState,
    reducers: {
        setDrawer: (state) => {
            if (state.drawer === false) {
                state.drawer = true;
            }
            else {
                state.drawer = false;
            }
        },
        closeDrawer: (state) => {
            state.drawer = false;
        }
    }
});
export const { setDrawer, closeDrawer } = drawerSlice.actions;
export default drawerSlice.reducer;
//# sourceMappingURL=drawer.js.map