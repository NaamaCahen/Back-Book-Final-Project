import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

const initialState={
    booksArr:[],
    error:''
}

export const fetchBooks = createAsyncThunk(
    'books/fetchBooksStatus',
    () => {
      fetch(`http://localhost:4000/books`)
      .then(res=>res.json())
      .then(data=>{
        console.log(data);
        return data;
      })
    }
  )
  


export const booksSlice=createSlice({
    name:'books',
    initialState,
    
    extraReducers:(builder)=>{
        builder.addCase(fetchBooks.fulfilled,(state,action)=>{
            state.booksArr=action.payload
            state.error=''
        })
        builder.addCase(fetchBooks.rejected,(state,action)=>{
            state.booksArr=[]
            state.error=action.error.message
        })
    }
})

// Destructure and export the plain action creators
export const {getBooks,count}=booksSlice.actions;
 
export default booksSlice.reducer;