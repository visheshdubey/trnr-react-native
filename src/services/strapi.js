import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { STRAPI_ACCESS_TOKEN, STRAPI_URL } from '../utils/ApiConstants';
import { getDataObject } from './local';

const getLocal = async () => {
    const x = await getDataObject();
    console.log('Local Data Strapi:- ' + JSON.stringify(x));
    return x;
};
export const strapiApi = createApi({
    reducerPath: 'strapiApi',
    baseQuery: fetchBaseQuery({
        baseUrl: STRAPI_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState()).user.accessToken;

            // console.log("---->" + JSON.stringify(getState()));
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            // headers.set('Authorization', STRAPI_ACCESS_TOKEN);
            headers.set('Content-Type', 'application/json');
            return headers
        },
    }),
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
            keepUnusedDataFor: 60,

        }),
        getWorkoutsList: builder.query({
            query: (userId) => `workouts/`,
            keepUnuseDataFor: 10,
            providesTags: ['Workout']

        }),
        getUserData: builder.query({
            query: (userId) => `user-create/${userId}`,

        }),
        addProfile: builder.mutation({
            query: ({ userId, ...patch }) => ({
                url: `profile/${userId}`,
                method: 'POST',
                body: patch,
            }),
        }),
        addUser: builder.mutation({
            query: ({ ...patch }) => ({
                url: `auth/local/register/`,
                method: 'POST',
                body: patch,
            }),
        }),
        userLogin: builder.mutation({
            query: ({ ...patch }) => ({
                url: `auth/local/`,
                method: 'POST',
                body: patch,
            }),
        }),
        addWorkout: builder.mutation({
            query: ({ ...patch }) => ({
                url: `workouts/`,
                method: 'POST',
                body: patch,
            }),
            invalidatesTags: ['Workout']
        }),
        deleteWorkout: builder.mutation({
            query: ({ ...patch }) => ({
                url: `workouts/?DELETE`,
                method: 'PUT',
                body: patch,
            }),
            invalidatesTags: ['Workout']

        }),


    })
})

export const {
    useGetCategoryQuery,
    useGetProductQuery,
    useGetExerciseCategoryListQuery,
    useGetExerciseCategoryQuery,
    useGetExerciseQuery,
    useGetSearchQuery,
    useGetUserDataQuery,
    useGetWorkoutsListQuery,
    useAddProfileMutation,
    useAddUserMutation,
    useAddWorkoutMutation,
    useUserLoginMutation,
    useDeleteWorkoutMutation
} = strapiApi