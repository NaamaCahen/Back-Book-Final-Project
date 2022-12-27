import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import booksSlice from "./booksSlice";

const initialState = {
    token: null,
    user: {
        user_id: null,
        email: '',
        password: '',
        autor_first_name: '',
        author_last_name: '',
        country: '',
        city: '',
        street: '',
        num_house: '',
        phone: '',
    },
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
            state.user.userId = null
            state.user.email = ''
            state.user.password = ''
            state.user.firstName = ''
            state.user.lastName = ''
            state.user.country = ''
            state.user.city = ''
            state.user.street = ''
            state.user.numHouse = ''
            state.user.phone = ''
        })
    }
})

export const {setToken}=usersSlice.actions

export default usersSlice.reducer