// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://77aa-106-203-228-195.in.ngrok.io/api/' }),
    refetchOnReconnect: true,
    endpoints: (builder) => ({
        getCategory: builder.query({
            query: () => 'category-list',
        }),
        getProduct: builder.query({
            query: (categoryId) => `product-list/${categoryId}`,
            keepUnusedDataFor: 5,
        }),
        getExerciseCategoryList: builder.query({
            query: (productId) => `exercise-category-list/${productId}`,
            keepUnusedDataFor: 5,
        }),
        getExerciseCategory: builder.query({
            query: (endpoint) => `exercise-category-list/${endpoint}`,
            keepUnusedDataFor: 5,

        }),
    })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetCategoryQuery, useGetProductQuery, useGetExerciseCategoryListQuery, useGetExerciseCategoryQuery } = productsApi