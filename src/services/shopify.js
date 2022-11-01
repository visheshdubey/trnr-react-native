import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { CREATE_USER_QUERY, GET_USER_QUERY, STOREFRONT_ACCESS_TOKEN, GRAPHQL_URL, ACCESS_TOKEN_USER_QUERY, RESET_USER_QUERY, UPDATE_USER_QUERY, RENEW_ACCESS_TOKEN_VAR, RENEW_ACCESS_TOKEN } from '../utils/ApiConstants'

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
            query: (variables) => ({
                url: `/`,
                method: 'POST',
                body: JSON.stringify({ query: UPDATE_USER_QUERY, variables: variables }),
            }),

        }),
        resetShopifyUser: builder.mutation({
            query: (variables) => ({
                url: `/`,
                method: 'POST',
                body: JSON.stringify({ query: RESET_USER_QUERY, variables: variables }),
            }),

        }),
        renewAccessToken: builder.mutation({
            query: (variables) => ({
                url: `/`,
                method: 'POST',
                body: JSON.stringify({ query: RENEW_ACCESS_TOKEN, variables: variables }),
            }),

        })

    })
})


export const {
    useCreateShopifyUserMutation,
    useUpdateShopifyUserMutation,
    useGetShopifyUserMutation,
    useResetShopifyUserMutation,
    useAccessTokenShopifyUserMutation,
    useRenewAccessTokenMutation

} = shopifyApi