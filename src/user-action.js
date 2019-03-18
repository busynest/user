
//@ts-check
export const PROFILE_PAGE         = 'PROFILE_PAGE';
export const LOG_IN_STATE         = 'LOG_IN_STATE';
export const OPEN_SIGN            = 'OPEN_SIGN';
export const CLOSE_SIGN           = 'CLOSE_SIGN';
export const PROFILE_TYPE         = 'PROFILE_TYPE';
export const SIGN_IN              = 'SIGN_IN';
export const SET_USER             = 'SET_USER';
export const SET_IMAGE            = 'SET_IMAGE';

// NAVIGATION
export const navigate = (option) => {
  console.log(option);
  switch(option) {

    case 'profile':
      break;
    case 'email':
      break;
    case 'password':
      break;
    case 'delete':
      break;
  
    default:
    option = 'profile';
  
    }
  return { type: PROFILE_PAGE, option }
}

export const setImage             = (image)        => { return { type: SET_IMAGE, image }; };

export const closeSign            = (closeLogIN)    => (dispatch) => { dispatch({ type: CLOSE_SIGN, closeLogIN }); };
export const openSign             = (e)     => (dispatch, getState) => {
  if ( getState().user.snackState === true) { dispatch({ type: CLOSE_SIGN, e }); }
  else                                      { dispatch({ type: OPEN_SIGN,  e }); }
} 

export const setAuth              = (currentUser)  => { return { type: LOG_IN_STATE, currentUser }; };
export const setUser              = (user)         => { return { type: SET_USER, user }; };
export const updateLogin          = (logged)       => { return { type: LOG_IN_STATE, logged }; };
export const profile              = (profileType)   => (dispatch) => { dispatch({ type: PROFILE_TYPE, profileType }); };



