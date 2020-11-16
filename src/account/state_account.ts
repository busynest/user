
import { Action, Reducer, ActionCreator}      from 'redux';
import { ThunkAction }            from 'redux-thunk';
import { RootState, RootAction }   from '../store';

export const SETTINGS_PAGE    = 'SETTINGS_PAGE';
export const ACC_VERIFIED     = 'ACC_VERIFIED';
export const ACC_TOGGLE       = 'ACC_TOGGLE';
export const ACC_USER         = "ACC_USER";
export const ACC_NAME         = "ACC_NAME";
export const ACC_EMAIL        = "ACC_EMAIL";
export const ACC_IMAGE        = "ACC_IMAGE";
export const ACC_ANON         = "ACC_ANON";
export const ACC_PHONE        = "ACC_PHONE";

export interface accountState {
  page:             string,
  verified:         boolean,
  editSettings:     boolean,
  user:             string,
  name:             string,
  email:            string,
  image:            string,
  anon:             boolean,
  phone:            string
}

export interface navigateX        extends Action<'SETTINGS_PAGE'>   { page:         string };
export interface accVerified      extends Action<'ACC_VERIFIED'>    { verified:     boolean };
export interface accToggle        extends Action<'ACC_TOGGLE'>      { editSettings: boolean };
export interface accUser          extends Action<'ACC_USER'>        { user:         string };
export interface accName          extends Action<'ACC_NAME'>        { name:         string };
export interface accPhone         extends Action<'ACC_PHONE'>       { phone:        string };
export interface accEmail         extends Action<'ACC_EMAIL'>       { email:        string };
export interface accImage         extends Action<'ACC_IMAGE'>       { image:        string };
export interface accAnon          extends Action<'ACC_ANON'>        { anon:         boolean };

export type accountAction =
accToggle
| accAnon
| accPhone

| navigateX
| accVerified

| accUser
| accName
| accEmail
| accImage ;
export type accountResult = ThunkAction<void, RootState, undefined, accountAction>;

/*
  declare global {
    interface HTMLElementTagNameMap {
      "app-drawer": userState;
    }
*/




// NAVIGATION
export const navigate: ActionCreator<navigateX> = ( page: string ) => {
  switch(page) {

    case 'profile':
      break;
    case 'email':
      break;
    case 'password':
      break;
    case 'delete':
      break;
  
    default: page = 'profile';
  
    }
  return { type: SETTINGS_PAGE, page }
}




const start: accountState = {
  page:             'profile',
  verified:         false,
  editSettings:     false,
  anon:             false,
  user:             '',
  name:             '',
  email:            '',
  image:            '',
  phone:            ''
};
  
export const account: Reducer<accountState, RootAction> = ( state = start, action ) => {
  switch ( action.type ) {

    case SETTINGS_PAGE:   return { ...state, page:            action.page };
    case ACC_VERIFIED:    return { ...state, verified:        action.verified };
    case ACC_TOGGLE:      return { ...state, editSettings:    action.editSettings };
    case ACC_USER:        return { ...state, user:            action.user };
    case ACC_NAME:        return { ...state, name:            action.name };
    case ACC_PHONE:       return { ...state, phone:           action.phone };
    case ACC_EMAIL:       return { ...state, email:           action.email };
    case ACC_IMAGE:       return { ...state, image:           action.image };
    case ACC_ANON:        return { ...state, anon:            action.anon };

  default: return state;

  }
}

// export const settingArea:     ActionCreator<settingsArea>     = ( area: string )          => { return { type: SETTINGS_AREA,  area }; };
// export const settingAreaId:   ActionCreator<settingsAreaId>   = ( areaId: string )        => { return { type: SETTINGS_AREA_ID,  areaId }; };
// export const settingAreaId:   ActionCreator<settingsAreaId>   = ( areaId: string )        => { return { type: SETTINGS_AREA_ID,  areaId }; };
// export const settingTrade:    ActionCreator<settingsTrade>    = ( occupation: string )    => { return { type: SETTINGS_TRADE,  occupation }; };
// export const settingService:  ActionCreator<settingsService>  = ( service: string )       => { return { type: SETTINGS_SERVICE,  service }; };

export const accountEmailVerify:    ActionCreator<accVerified>    = ( verified: boolean )       => { return { type: ACC_VERIFIED,  verified }; };
export const accountToggle:         ActionCreator<accToggle>      = ( editSettings: boolean )   => { return { type: ACC_TOGGLE,   editSettings }; };
export const accountUser:           ActionCreator<accUser>        = ( user:   string )          => { return { type: ACC_USER,     user  }; };
export const accountName:           ActionCreator<accName>        = ( name:   string )          => { return { type: ACC_NAME,     name  }; };
export const accountPhone:          ActionCreator<accPhone>       = ( phone:   string )         => { return { type: ACC_PHONE,     phone  }; };
export const accountEmail:          ActionCreator<accEmail>       = ( email:  string )          => { return { type: ACC_EMAIL,    email }; };
export const accountImage:          ActionCreator<accImage>       = ( image:  string )          => { return { type: ACC_IMAGE,    image }; };
export const accountAnon:           ActionCreator<accAnon>        = ( anon:  boolean )          => { return { type: ACC_ANON,     anon }; };
