
import { Reducer }      from 'redux';
import { RootAction }   from './store';
import {
  OPEN_SIGN,
  CLOSE_SIGN,

  SIGN_UP_OPEN,
  SIGN_UP_CLOSE,

  LOGGED_IN,
  SETTINGS_PAGE,

  SET_USER,
  SET_IMAGE,
  SET_NAME

  // PROFILE_TYPE,
} from  './user-action';

export interface AppState {
  snackState:       boolean,
  // logged:           boolean
  register:         boolean,
  settings:         string,

  currentUser:      boolean,
  setUser:          string,
  customer:         string

  name:             string,
  photoURL:         string,
  phone:            string,
  email:            string

  // profileChoice:    string,
}

const start: AppState = {
  snackState:       false,
  // logged:           false,
  register:         true,
  settings:         'profile',

  currentUser:      false,
  setUser:          "user",
  customer:         "someone",

  name:             'Simon',
  photoURL:         'demo.png',
  phone:            '(555) 555-5555',
  email:            'lorium@ipsum.com',

  // profileChoice:    'unChosen',
};
  
const pwa_auth: Reducer<AppState, RootAction> = ( state = start, action ) => {
  switch ( action.type ) {

    case OPEN_SIGN:       return { ...state, snackState:      true };
    case CLOSE_SIGN:      return { ...state, snackState:      false };

    case SIGN_UP_OPEN:    return { ...state, register:        true };
    case SIGN_UP_CLOSE:   return { ...state, register:        false };

    case LOGGED_IN:       return { ...state, currentUser:     action.currentUser };
    case SETTINGS_PAGE:   return { ...state, settings:        action.option };
    
    case SET_USER:        return { ...state, setUser:         action.user };
    case SET_IMAGE:       return { ...state, photoURL:        action.image };
    case SET_NAME:        return { ...state, customer:        action.name };

    // case PROFILE_TYPE:    return { ...state, profileChoice:   action.profileType};
  
  default: return state;

  }
}
  
  export default pwa_auth;