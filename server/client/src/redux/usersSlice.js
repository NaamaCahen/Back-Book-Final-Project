import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import booksSlice from "./booksSlice";

const initialState = {
    token: localStorage.getItem('token'),
    user: {},
    error: ''
}

export const fetchUser = createAsyncThunk(
    'users/fetchUserStatus',
    async (id) => {
        const response = await fetch('/user/' + id)
        return await response.json()
    }
)

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload
            localStorage.setItem('token',state.token)
        },
        
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.error = ''
            state.user={...action.payload}
            console.log(state.user);
        })
        builder.addCase(fetchUser.rejected, (state, action) => {
            state.error = action.error.message
            state.user={}
        })
    }
})

export const {setToken}=usersSlice.actions

export default usersSlice.reducer