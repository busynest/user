import { configureStore }     from '@reduxjs/toolkit';
import { userSlice }          from './redux/frontend';
import { drawerSlice }        from './redux/drawer';
import { accountSlice }       from './redux/backend';

// Configuring the store
export const store = configureStore({
  reducer: {
    frontend:   userSlice.reducer,
    drawer:     drawerSlice.reducer,
    backend:    accountSlice.reducer,
  },
  devTools: true // Enables Redux DevTools in development
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
