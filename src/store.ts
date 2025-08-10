import { configureStore }     from '@reduxjs/toolkit';
import { userSlice }          from './settings/user-redux';
import { drawerSlice }        from './drawer/drawer-redux';
import { accountSlice }       from './settings/account-redux';

// Configuring the store
export const store = configureStore({
  reducer: {
    pwa_auth: userSlice.reducer,
    drawer: drawerSlice.reducer,
    account: accountSlice.reducer
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
