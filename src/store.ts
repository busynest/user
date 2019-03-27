/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

declare global {
    interface Window {
      process?: Object;
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
  }

import {
  createStore,
  compose,
  applyMiddleware,
  combineReducers,
  Reducer,
  StoreEnhancer }                   from 'redux';
import thunk, { ThunkMiddleware }   from 'redux-thunk';
import { lazyReducerEnhancer }      from 'pwa-helpers/lazy-reducer-enhancer.js';
import user, { AppState }           from './user-reducer';
import { AppAction }                from './user-action';

// Overall state extends static states and partials lazy states.
export interface RootState {
    user?: AppState;
  }

export type RootAction = AppAction ;

// Sets up a Chrome extension for time travel debugging.
// See https://github.com/zalmoxisus/redux-devtools-extension for more information.
 const devCompose: <Ext0, Ext1, StateExt0, StateExt1>(
     f1: StoreEnhancer<Ext0, StateExt0>, f2: StoreEnhancer<Ext1, StateExt1>
   ) => StoreEnhancer<Ext0 & Ext1, StateExt0 & StateExt1> =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  
export const store = createStore(
    state => state as Reducer<RootState, RootAction>,
    devCompose(
        lazyReducerEnhancer(combineReducers),
        applyMiddleware(thunk as ThunkMiddleware<RootState, RootAction>)
    )
);

store.addReducers({ user });