// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { CREATE_USER_QUERY, userID } from '../utils/ApiConstants';
// CREATE_USER_QUERY
// Define a service using a base URL and expected endpoints
export const strapiApi = createApi({
    reducerPath: 'strapiApi',
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
            query: (userId) => `workouts/${userID}`,
            keepUnuseDataFor: 1,
            providesTags: ['Workout']

        }),
        addUserData: builder.mutation({
            query: (body) => ({
                url: `user-create/${userID}`,
                method: 'POST',
                body: body,
            }),
        }),
        addWorkout: builder.mutation({
            query: (body) => ({
                url: `workouts/${userID}`,
                method: 'POST',
                body: body,
            }),
            invalidatesTags: ['Workout']
        }),
        deleteWorkout: builder.mutation({
            query: ({ userId, ...patch }) => ({
                url: `workouts/${userID}?DELETE`,
                method: 'PUT',
                body: patch,
            }),
            invalidatesTags: ['Workout']

        }),


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
    useAddUserDataMutation,
    useAddWorkoutMutation,
    useDeleteWorkoutMutation
} = strapiApi