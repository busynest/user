import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './redux/frontend';
import { drawerSlice } from './redux/drawer';
import { accountSlice } from './redux/backend';
export const store = configureStore({
    reducer: {
        frontend: userSlice.reducer,
        drawer: drawerSlice.reducer,
        backend: accountSlice.reducer,
    },
    devTools: true
});
export default store;
//# sourceMappingURL=store.js.map