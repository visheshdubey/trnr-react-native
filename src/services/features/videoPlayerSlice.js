import { createSlice } from '@reduxjs/toolkit'
import * as ScreenOrientation from 'expo-screen-orientation';

const initialState = {
     inFullscreen: false,
     orientation: ScreenOrientation.Orientation.PORTRAIT_UP
}

export const videoPlayerSlice = createSlice({
     name: 'videoPlayer',
     initialState,
     reducers: {
          updateFullscreen: (state, action) => {
               state.inFullscreen = action.payload;
               console.log(' 📺 Video player is now in fullscreen : ', action.payload);
          },
          updateOrientation: (state, action) => {
               state.orientation = action.payload;
               console.log(' 📺 Screen Orientation --> : ', action.payload);
          }
     },
})

// Action creators are generated for each case reducer function
export const { updateFullscreen, updateOrientation } = videoPlayerSlice.actions

export default videoPlayerSlice.reducer