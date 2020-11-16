
import { Action, Reducer, ActionCreator }  from 'redux';
import { ThunkAction }            from 'redux-thunk';
import { RootState, RootAction }  from '../store';

export const OPEN_SIGN  = 'OPEN_SIGN';
export const CLOSE_SIGN = 'CLOSE_SIGN';

export interface drawerState { drawer: boolean }

export interface openSignX     extends Action<'OPEN_SIGN'>          {  };
export interface closeSignX    extends Action<'CLOSE_SIGN'>         {  };

export type drawerAction = openSignX | closeSignX ;
export type drawerResult = ThunkAction<void, RootState, undefined, drawerAction>;

//  declare global { interface HTMLElementTagNameMap { "app-drawer": drawerState; } }


const start: drawerState = { drawer: false };
  
export const drawer: Reducer<drawerState, RootAction> = ( state = start, action ) => {
  switch ( action.type ) {

    case OPEN_SIGN:       return { ...state, drawer:      true };
    case CLOSE_SIGN:      return { ...state, drawer:      false };

  default: return state;

  }
}

// DRAWER STATE
export const setDrawer: ActionCreator<drawerResult> = ( drawer: boolean ) => (dispatch, getState) => {
    if ( getState().drawer!.drawer === false)  { dispatch({ type: OPEN_SIGN, drawer }); }
    else                                        { dispatch({ type: CLOSE_SIGN, drawer }); }
  }
  
  // DRAWER CLOSE
  export const closeDrawer: ActionCreator<closeSignX> = ( drawer:  boolean )  => { return { type: CLOSE_SIGN, drawer } };
  