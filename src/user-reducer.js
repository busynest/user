

/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

// @ts-check

import {
  PROFILE_PAGE,
  OPEN_SIGN,
  CLOSE_SIGN,
  PROFILE_TYPE,
  SET_USER,
  SET_IMAGE,
  SET_NAME,
  LOG_IN_STATE
} from  './user-action';

const start = {
  snackState:       null,
  currentUser:      null,
  setUser:          null,
  profileChoice:    'unChosen',
  settings:         'profile',
  photoURL:         null,
  customer:         null,
  name:             null,
  phone:            null,
  email:            null
};
  
const user = ( state = start, action ) => {
  switch ( action.type ) {

    case PROFILE_PAGE:    return { ...state, settings:        action.option };

    case OPEN_SIGN:       return { ...state, snackState:      true };
    case CLOSE_SIGN:      return { ...state, snackState:      false };
    
    case LOG_IN_STATE:    return { ...state, currentUser:     action.logged };
    case SET_USER:        return { ...state, setUser:         action.user };
    case SET_IMAGE:       return { ...state, photoURL:        action.image };
    case SET_NAME:        return { ...state, customer:        action.name };

    case PROFILE_TYPE:    return { ...state, profileChoice:   action.profileChoice};
  
  default:
    return state;
  }
}
  
  export default user;