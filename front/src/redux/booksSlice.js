import { createSlice } from "@reduxjs/toolkit";

const initialState={
    books:[]
}

export const booksSlice=createSlice({
    name:'books',
    initialState,
    reducers:{
        getBooks(state,action){
            state.books=action.payload
        }
    }
})

// Destructure and export the plain action creators
export const {getBooks}=booksSlice.actions;

const fetchBooks=()=> async(dispatch)=>{
    const response=await fetch(`http://localhost:4000/books`).json()
    console.log(response);
    dispatch(getBooks(response.data))
}
 