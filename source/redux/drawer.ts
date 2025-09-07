import { createSlice }    from "@reduxjs/toolkit";

// Object Initializer Notation
const initialState = { drawer: false }

// Create a slice for the AppState
export const drawerSlice = createSlice({
    name: 'drawers',
    initialState,
    reducers: {

       setDrawer: ( state ) => {
        
        if ( state.drawer === false)  {

          state.drawer = true;

        } else {

          state.drawer = false;

        }

      },

      closeDrawer: ( state )  => {

        state.drawer = false;

      }

    }
});

export const { setDrawer, closeDrawer } = drawerSlice.actions;

export default drawerSlice.reducer;
