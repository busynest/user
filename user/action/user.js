
// @ts-check
export const LOG_IN_STATE         = 'LOG_IN_STATE';
export const OPEN_SIGN            = 'OPEN_SIGN';
export const CLOSE_SIGN           = 'CLOSE_SIGN';
export const PROFILE_TYPE         = 'PROFILE_TYPE';
export const SIGN_IN              = 'SIGN_IN';
export const SET_USER             = 'SET_USER';
export const SET_LIST             = 'SET_LIST';
export const SET_SCREEN           = 'SET_SCREEN';
export const FEEDBACK_LIST        = 'FEEDBACK_LIST';
// export const PROFILE_PAGE         = 'PROFILE_PAGE';
// export const IS_LOGGED_IN         = 'IS_LOGGED_IN';
// export const IS_LOGGED_OUT        = 'IS_LOGGED_OUT';

export const setAuth              = (currentUser)  => { return { type: LOG_IN_STATE, currentUser }; };
export const setScreen            = (size)         => { return { type: SET_SCREEN, size }; };
export const setUser              = (user)         => { return { type: SET_USER, user }; };
export const setList              = (list)         => { return { type: SET_LIST, list }; };
export const updateLogin          = (logged)       => { return { type: LOG_IN_STATE, logged }; };
export const feedbackList          =(setFeedback)  => { console.log('in in in'); return { type: FEEDBACK_LIST, setFeedback }; };

export const openSign             = (e)     => (dispatch, getState) => {
  if ( getState().user.snackState === true) { dispatch({ type: CLOSE_SIGN, e }); }
  else                                      { dispatch({ type: OPEN_SIGN,  e }); } /* this.shadowRoot.getElementById('main').setAttribute('overflow', 'hidden'); */
} 
export const closeSign            = (closeLogIN)    => (dispatch) => { dispatch({ type: CLOSE_SIGN, closeLogIN }); };
export const profile              = (profileType)   => (dispatch) => { dispatch({ type: PROFILE_TYPE, profileType }); };

/* USER LOGIN 
export const updateLog = (currentUser) => (dispatch) => {
    if (firebase.auth().currentUser) {
      console.log('yes_CREDENTIALS');
      dispatch({
        type: IS_LOGGED_IN,
        currentUser
      });
    } else {
      console.log('no_CREDENTIALS');
      dispatch({
        type: IS_LOGGED_OUT,
        currentUser
      });
    }
  };
  */
/*
  export const showSnackbars = () => (dispatch) => {
    dispatch({
      type: OPEN_SNACKBAR
    });
    window.clearTimeout(snackbarTimer);
    snackbarTimer = window.setTimeout(() =>
      dispatch({ type: CLOSE_SNACKBAR }), 3000);
  };
*/
/* Option Case 
export const profilePage = (e) => {
  const option = e;
  switch(option) {
    
    case 'profile': console.log('profile');
    break;
    case 'email': console.log('email');
    break;
    case 'password': console.log('password');
    break;
    case 'account': console.log('account');
    break;

  }
  return { type: PROFILE_PAGE, option }
}

export const navSettings = (path) => (dispatch) => {
  const option = path === '/settings#' ? 'profile' : path.slice(1);
  console.log(option);
  dispatch(loadSetting(option));
};

// LOAD PAGE
const loadSetting = (option) =>  {
  console.log(option);
  switch(option) {

    case 'profile': 
      // import('../components/pages/about.js');
      break;

    case 'email':
      // import('../components/pages/activities.js');
      break;

    case 'password':
      // import('../components/pages/labour.js');
      break;

    case 'account':
      // import('../components/pages/development/bio-building.js');
      break;

    default:
    option = 'profile';
  }

  return { type: PROFILE_PAGE, option }
}

*/

/*
export const toggleMenu           = (state)                       => {

}
*/

/*

export const UPDATE_SIGN_PAGE     = 'UPDATE_SIGN_PAGE';

export const loadFormPage = (logIN) => (dispatch) => {
  switch(logIN) {

    case 'one': 
      console.log('one');
      break;

    case 'two':
      console.log('two');
      break;

    case 'three':
      console.log('three');
      break; 
  }

  dispatch(updateFormPage(formPage));
}



// UPDATE PAGE
export const updateFormPage = (logIN) => {
  return {
    type: OPEN_SIGN,
    logIN
  };
}
*/
