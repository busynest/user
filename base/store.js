import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './redux/frontend';
import { accountSlice } from './redux/backend';
export const store = configureStore({
    reducer: {
        frontend: userSlice.reducer,
        backend: accountSlice.reducer,
    },
    devTools: true
});
export default store;
//# sourceMappingURL=store.js.map