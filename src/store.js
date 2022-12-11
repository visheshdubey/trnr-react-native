import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { strapiApi } from './services/strapi'
import userSlice from './services/features/userSlice'
import videoPlayerSlice from './services/features/videoPlayerSlice'
import snackBarSlice from './services/features/snackBarSlice'

export const store = configureStore({
    reducer: {
        // Add the generated reducer as a specific top-level slice
        [strapiApi.reducerPath]: strapiApi.reducer,
        user: userSlice,
        snackBar: snackBarSlice,
        videoPlayer: videoPlayerSlice

    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(strapiApi.middleware),
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)