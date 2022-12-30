import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

const initialState={
    myRequests:[],
    error:'',
}

export const fetchMyRequests=createAsyncThunk(
     'assigning/fetchMyRequestStatus',
     async(id)=>{
        const response=await fetch(`/request/${id}`)
        return await response.json()
     }
)

export const assigningSlice=createSlice({
    name:'assign',
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(fetchMyRequests.fulfilled,(state,action)=>{
            state.myRequests=action.payload
            state.error='';
            console.log(state.myRequests);
        })
        builder.addCase(fetchMyRequests.rejected,(state,action)=>{
            state.myRequests=[];
            state.error=action.error.message;
        })
    }
})

export default assigningSlice.reducer;