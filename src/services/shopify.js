// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { CREATE_USER_QUERY, GET_USER_QUERY, STOREFRONT_ACCESS_TOKEN, GRAPHQL_URL, ACCESS_TOKEN_USER_QUERY } from '../utils/ApiConstants'

// Define a service using a base URL and expected endpoints
export const shopifyApi = createApi({
    reducerPath: 'shopifyApi',
    baseQuery: fetchBaseQuery({
        baseUrl: GRAPHQL_URL,
        prepareHeaders: (headers) => {
            headers.set('X-Shopify-Storefront-Access-Token', STOREFRONT_ACCESS_TOKEN);
            headers.set('Content-Type', 'application/json');
            return headers
        },
    }),
    refetchOnReconnect: true,


    endpoints: (builder) => ({
        createShopifyUser: builder.mutation({
            query: (variables) => ({
                url: `/`,
                method: 'POST',
                body: JSON.stringify({ query: CREATE_USER_QUERY, variables: variables }),
            }),
        }),
        getShopifyUser: builder.mutation({
            query: (variables) => ({
                url: `/`,
                method: 'POST',
                body: JSON.stringify({ query: GET_USER_QUERY, variables: variables }),
            }),
        }),
        accessTokenShopifyUser: builder.mutation({
            query: (variables) => ({
                url: `/`,
                method: 'POST',
                body: JSON.stringify({ query: ACCESS_TOKEN_USER_QUERY, variables: variables }),
            }),
        }),
        updateShopifyUser: builder.mutation({
            query: ({ variables }) => ({
                url: `/`,
                method: 'POST',
                body: JSON.stringify({ query: UPDATE_USER_QUERY, variables: variables }),
            }),

        }),
        resetShopifyUser: builder.mutation({
            query: ({ variables }) => ({
                url: `/`,
                method: 'POST',
                body: JSON.stringify({ query: RESET_USER_QUERY, variables: variables }),
            }),

        })

    })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useCreateShopifyUserMutation,
    useUpdateShopifyUserMutation,
    useGetShopifyUserMutation,
    useResetShopifyUserMutation,
    useAccessTokenShopifyUserMutation

} = shopifyApi