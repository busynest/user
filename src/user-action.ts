
import { Action, ActionCreator }  from 'redux';
import { ThunkAction }            from 'redux-thunk';
import { RootState }              from './store.js';

export const LOGGED_IN            = 'LOGGED_IN';
export const SETTINGS_PAGE        = 'SETTINGS_PAGE';

export const PROFILE_TYPE         = 'PROFILE_TYPE';
export const SIGN_IN              = 'SIGN_IN';

export const SET_USER             = 'SET_USER';
export const SET_IMAGE            = 'SET_IMAGE';
export const SET_NAME             = 'SET_NAME';

export const OPEN_SIGN            = 'OPEN_SIGN';
export const CLOSE_SIGN           = 'CLOSE_SIGN';

export const SIGN_UP_OPEN         = "SIGN_UP_OPEN";
export const SIGN_UP_CLOSE        = "SIGN_UP_CLOSE";

// export interface updateLoginX  extends Action<'LOGGED_IN'>          { logged:   boolean };
export interface navigateX     extends Action<'SETTINGS_PAGE'>      { option:   string };
export interface setImageX     extends Action<'SET_IMAGE'>          { image:    string };
export interface setNameX      extends Action<'SET_NAME'>           { name:     string };

export interface setAuthX      extends Action<'LOGGED_IN'>          { currentUser:  boolean };
export interface setUserX      extends Action<'SET_USER'>           { user:         string };
export interface profileX      extends Action<'PROFILE_TYPE'>       { profileType:  string };

export interface openSignX     extends Action<'OPEN_SIGN'>          {  };
export interface closeSignX    extends Action<'CLOSE_SIGN'>         {  };

export interface signUpOpen    extends Action<'SIGN_UP_OPEN'>       {  };
export interface signUpClose   extends Action<'SIGN_UP_CLOSE'>      {  };

export type AppAction = closeSignX | openSignX | signUpOpen | signUpClose | navigateX | setImageX | setNameX | setAuthX | setUserX | profileX;

// export type AppAction = closeSignX | openSignX | signUpOpen | signUpClose | setImageX | setNameX ;

type ThunkResult = ThunkAction<void, RootState, undefined, AppAction>;

// NAVIGATION
export const navigate: ActionCreator<navigateX> = (option: string) => {
  switch(option) {

    case 'profile':
      break;
    case 'email':
      break;
    case 'password':
      break;
    case 'delete':
      break;
  
    default: option = 'profile';
  
    }
  return { type: SETTINGS_PAGE, option }
}

export const openSign: ActionCreator<ThunkResult> = ( snackState: boolean ) => (dispatch, getState) => {
  if ( getState().pwa_auth!.snackState === true)  { dispatch({ type: CLOSE_SIGN, snackState }); }
  else                                        { dispatch({ type: OPEN_SIGN,  snackState }); }
}
export const signUpAction: ActionCreator<ThunkResult>   = ( register: boolean )   => (dispatch, getState) => {
  if ( getState().pwa_auth!.register === false)   { dispatch({ type: SIGN_UP_OPEN,  register }); }
  else                                        { dispatch({ type: SIGN_UP_CLOSE, register }); }
}

// export const updateLogin: ActionCreator<updateLoginX>   = ( logged:      boolean )  => { return { type: LOGGED_IN,      logged }; };
export const setAuth:     ActionCreator<setAuthX>       = ( currentUser: boolean )  => { return { type: LOGGED_IN,      currentUser }; };
export const setUser:     ActionCreator<setUserX>       = ( user:        string  )  => { return { type: SET_USER,       user }; };

export const setImage:    ActionCreator<setImageX>      = ( image:       string  )  => { return { type: SET_IMAGE,      image }; };
export const setName:     ActionCreator<setNameX>       = ( name:        string  )  => { return { type: SET_NAME,       name }; };
export const closeSign:   ActionCreator<closeSignX>     = ( closeLogIN:  boolean )  => { return { type: CLOSE_SIGN,     closeLogIN } };

// export const profile:     ActionCreator<profileX>       = ( profileType: string  )  => { return { type: PROFILE_TYPE,   profileType } };
// export const signUp               = (register)     => { return { type: IN_UP, register }; }

