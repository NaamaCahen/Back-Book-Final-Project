import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

const initialState={
    booksArr:[],
    error:'',
    byTitle:''
}


 export const fetchBooks = createAsyncThunk(
  'books/fetchBooksStatus',
  // Declare the type your function argument here:
  async () => {
    const response = await fetch(`http://localhost:4000/books`)
    return await response.json()
  }
)


export const booksSlice=createSlice({
    name:'books',
    initialState,
    reducers:{
      searchByTitle:(state,action)=>{
        state.byTitle=action.payload;
        console.log(state.byTitle);
      }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchBooks.fulfilled,(state,action)=>{
            state.booksArr=action.payload
            console.log(state.booksArr);
            console.log(action);
            state.error=''
        })
        builder.addCase(fetchBooks.rejected,(state,action)=>{
            state.booksArr=[]
            state.error=action.error.message
        })
    }
})

// Destructure and export the plain action creators
 export const {searchByTitle}=booksSlice.actions;
 
export default booksSlice.reducer;