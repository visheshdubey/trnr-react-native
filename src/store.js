import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { strapiApi } from './services/strapi'
import { shopifyApi } from './services/shopify'

export const store = configureStore({
    reducer: {
        // Add the generated reducer as a specific top-level slice
        [strapiApi.reducerPath]: strapiApi.reducer,
        [shopifyApi.reducerPath]: shopifyApi.reducer,
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(strapiApi.middleware).concat(shopifyApi.middleware),
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)