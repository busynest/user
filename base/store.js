import { configureStore } from '@reduxjs/toolkit';
import { sessionSlice } from './redux/session.js';
/* Optional - drawer slice retired, see deprecated/drawer */
export const store = configureStore({
    reducer: {
        session: sessionSlice.reducer,
    },
    devTools: true
});
export default store;
//# sourceMappingURL=store.js.map