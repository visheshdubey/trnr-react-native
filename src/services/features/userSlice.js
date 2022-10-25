import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isSignnedIn: false,
    accessToken: null,
    customerID: null,
    expiresAt: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signin: (state, action) => {
            state.isSignnedIn = action.payload.isSignnedIn;
            state.accessToken = action.payload.accessToken;
            state.customerID = action.payload.customerID;
            state.expiresAt = action.payload.expiresAt;

        },
        logout: (state) => {
            state.isSignnedIn = false;
            state.accessToken = null;
            state.customerID = null
        }
    },
})

// Action creators are generated for each case reducer function
export const { signin, logout } = userSlice.actions

export default userSlice.reducer