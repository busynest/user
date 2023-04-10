
// Here is a comment by Shalaw
declare global {
    interface Window {
      process?: Object;
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
  }

import { compose, combineReducers } from 'redux';
import { configureStore }           from '@reduxjs/toolkit';
import thunk, { ThunkMiddleware }   from 'redux-thunk';
import { lazyReducerEnhancer }      from 'pwa-helpers/lazy-reducer-enhancer.js';
import pwa_auth, { AppState }       from './user-reducer';
import { AppAction }                from './user-action';

export interface RootState { 
  pwa_auth?: AppState;
}

export type RootAction = AppAction ;

export const store = configureStore({
  reducer : { pwa_auth },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk as ThunkMiddleware <RootState, RootAction>),
  devTools: process.env.NODE_ENV == 'production',
  enhancers: [lazyReducerEnhancer(combineReducers)],
})

