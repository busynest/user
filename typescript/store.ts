import { configureStore }     from '@reduxjs/toolkit';
import { sessionSlice }       from './redux/session.js';

/* Optional - drawer slice retired, see deprecated/drawer */
export const store = configureStore({
  reducer: {
    session: sessionSlice.reducer,
  },
  devTools: true
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
