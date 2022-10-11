// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://trnr-app.herokuapp.com/api/' }),
    refetchOnReconnect: true,
    tagTypes: ['Workout'],
    endpoints: (builder) => ({
        getCategory: builder.query({
            query: () => 'category-list',
        }),
        getProduct: builder.query({
            query: (categoryId) => `product-list/${categoryId}`,
            keepUnusedDataFor: 5,
        }),
        getExerciseCategory: builder.query({
            query: (endpoint) => `exercise-category-list/${endpoint}`,
            keepUnusedDataFor: 5,

        }),
        getExerciseCategoryList: builder.query({
            query: (productId) => `exercise-category-list/${productId}`,
            keepUnusedDataFor: 5,
        }),
        getExercise: builder.query({
            query: (exerciseId) => `exercise-detail/${exerciseId}`,
            keepUnusedDataFor: 5,
        }),

        getSearch: builder.query({
            query: (endpoint) => `search/${endpoint}`,
            keepUnusedDataFor: 15,

        }),
        getWorkoutsList: builder.query({
            query: (userId) => `workouts/${userId}`,
            keepUnusedDataFor: 1,
            providesTags: ['Workout']

        }),
        addWorkout: builder.mutation({
            query: ({ userId, ...patch }) => ({
                url: `workouts/${userId}`,
                method: 'POST',
                body: patch,
            }),
            invalidatesTags: ['Workout']
        }),
        deleteWorkout: builder.mutation({
            query: ({ userId, ...patch }) => ({
                url: `workouts/${userId}?DELETE`,
                method: 'PUT',
                body: patch,
            }),
            invalidatesTags: ['Workout']

        })

    })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useGetCategoryQuery,
    useGetProductQuery,
    useGetExerciseCategoryListQuery,
    useGetExerciseCategoryQuery,
    useGetExerciseQuery,
    useGetSearchQuery,
    useGetWorkoutsListQuery,
    useAddWorkoutMutation,
    useDeleteWorkoutMutation
} = productsApi