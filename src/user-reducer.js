
//@ts-check

import {
  PROFILE_PAGE,
  OPEN_SIGN,
  CLOSE_SIGN,
  PROFILE_TYPE,
  SET_USER,
  SET_IMAGE,
  LOG_IN_STATE
} from  './user-action';

const start = {
  snackState:       null,
  currentUser:      null,
  setUser:          null,
  profileChoice:    'unChosen',
  settings:         'profile',
  photoURL:         null
};
  
const user = ( state = start, action ) => {
  switch ( action.type ) {

    case PROFILE_PAGE:    return { ...state, settings:        action.option };

    case OPEN_SIGN:       return { ...state, snackState:      true };
    case CLOSE_SIGN:      return { ...state, snackState:      false };
    
    case LOG_IN_STATE:    return { ...state, currentUser:     action.logged };
    case SET_USER:        return { ...state, setUser:         action.user };
    case SET_IMAGE:       return { ...state, photoURL:        action.image };

    case PROFILE_TYPE:    return { ...state, profileChoice:   action.profileChoice};
  
  default:
    return state;
  }
}
  
  export default user;