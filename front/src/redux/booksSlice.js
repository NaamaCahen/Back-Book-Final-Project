import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

const initialState={
    booksArr:[],
    error:'',
    byTitle:'',
    byAuthorFirst:'',
    byAuthorLast:'',
    categories:[],
    byCategory:'',
    ages:[],
}


 export const fetchBooks = createAsyncThunk(
  'books/fetchBooksStatus',
  // Declare the type your function argument here:
  async () => {
    const response = await fetch(`/books`)
    return await response.json()
  }
)

export const fetchCategories=createAsyncThunk(
  'books/fetchCategoriesStatus',
  async()=>{
    const response=await fetch('/categories')
    return await  response.json()
  }
)


export const booksSlice=createSlice({
    name:'books',
    initialState,
    reducers:{
      searchByTitle:(state,action)=>{
        state.byTitle=action.payload;
      },
      searchByAuthorFirst:(state,action)=>{
        state.byAuthorFirst=action.payload;
      },
      searchByAuthorLast:(state,action)=>{
        state.byAuthorLast=action.payload;
      },
      searchByCategory:(state,action)=>{
        state.byCategory=action.payload
        console.log(state.byCategory);
      },
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchBooks.fulfilled,(state,action)=>{
            state.booksArr=action.payload
            state.error=''
        })
        builder.addCase(fetchBooks.rejected,(state,action)=>{
            state.booksArr=[]
            state.error=action.error.message
        })
        builder.addCase(fetchCategories.fulfilled,(state,action)=>{
          state.categories=action.payload
          state.error=''
        })
        builder.addCase(fetchCategories.rejected,(state,action)=>{
          state.categories=[]
          state.error=action.error.message
        })
    },
  
})

// Destructure and export the plain action creators
 export const {searchByTitle,searchByAuthorFirst,searchByAuthorLast,searchByCategory}=booksSlice.actions;
 
export default booksSlice.reducer;