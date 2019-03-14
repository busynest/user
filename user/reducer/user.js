
//@ts-check

import { OPEN_SIGN, CLOSE_SIGN, PROFILE_TYPE, SET_USER, SET_LIST, LOG_IN_STATE, SET_SCREEN, FEEDBACK_LIST }          from  '../user/action/user';
import { PROFILE_PAGE, ABOUT_PAGE, PROJECTS_PAGE }      from  '../actions/app';

const start = {
  snackState:       false,
  currentUser:      null,
  setUser:          null,
  setList:          null,
  profileChoice:    'unChosen',
  settings:         'profile',
  about:            'member',
  project:          'residential',
  size:             Boolean,
  setFeedback:      []
};
  
const user = ( state = start, action ) => {
  switch ( action.type ) {

    // case 'TOGGLE_MENU':   return toggleMenu(state);
    case OPEN_SIGN:       return { ...state, snackState:      true };
    case CLOSE_SIGN:      return { ...state, snackState:      false };
    
    case LOG_IN_STATE:    return { ...state, currentUser:     action.logged };
    case SET_SCREEN:      return { ...state, size:            action.size };
    case SET_USER:        return { ...state, setUser:         action.user };
    case SET_LIST:        return { ...state, setList:         action.list };
    case FEEDBACK_LIST:   return { ...state, setFeedback:     action.setFeedback }

    case PROFILE_TYPE:    return { ...state, profileChoice:   action.profileChoice};
    
    case PROFILE_PAGE:    return { ...state, settings:        action.option };
    case ABOUT_PAGE:      return { ...state, about:           action.what };
    case PROJECTS_PAGE:   return { ...state, project:         action.choice };
  
  default:
    return state;
  }
}
  
  export default user;


// case UPDATE_SIGN_PAGE: return { ...state, logIN: action.logIN };

// case UPDATE_PROJECT:  console.log('Update Project');   return { ...state, projectState: action.openProject };

  // UPDATE_PROJECT,

  // UPDATE_SIGN_PAGE