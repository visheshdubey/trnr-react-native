import { createSlice } from '@reduxjs/toolkit'

const initialState = {
     profileSnack: 'NO',
     workoutSnack: 'NO',
     exerciseSnack: 'NO',
}

export const snackBarSlice = createSlice({
     name: 'snackBar',
     initialState,
     reducers: {
          profileSnack: (state, action) => {
               state.profileSnack = action.payload;
               state.workoutSnack = 'NO';
               state.exerciseSnack = 'NO';

          },
          workoutSnack: (state, action) => {
               state.profileSnack = 'NO';
               state.workoutSnack = action.payload;
               state.exerciseSnack = 'NO';

          },
          exerciseSnack: (state, action) => {
               state.profileSnack = 'NO';
               state.workoutSnack = 'NO';
               state.exerciseSnack = action.payload;

          },
     },
})

// Action creators are generated for each case reducer function
export const { profileSnack, workoutSnack, exerciseSnack } = snackBarSlice.actions

export default snackBarSlice.reducer