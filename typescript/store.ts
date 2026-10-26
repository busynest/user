import { configureStore }     from '@reduxjs/toolkit';
import { userSlice }          from './redux/frontend';
import { accountSlice }       from './redux/backend';

/* Optional - drawer slice retired, see deprecated/drawer */
export const store = configureStore({
  reducer: {
    frontend:   userSlice.reducer,
    backend:    accountSlice.reducer,
  },
  devTools: true
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
