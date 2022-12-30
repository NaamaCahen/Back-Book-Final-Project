import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  booksArr: [],
  error: '',
  byTitle: '',
  byAuthorFirst: '',
  byAuthorLast: '',
  categories: [],
  byCategory: '',
  ages: [],
  byAge: '',
  myBooks:[],
}


export const fetchBooks = createAsyncThunk(
  'books/fetchBooksStatus',
  // Declare the type your function argument here:
  async (id) => {
    const response = await fetch(`/books/${id}`)
    return await response.json()
  }
)

export const fetchCategories = createAsyncThunk(
  'books/fetchCategoriesStatus',
  async () => {
    const response = await fetch('/categories')
    return await response.json()
  }
)

export const fetchAges = createAsyncThunk(
  'books/fetchAgesStatus',
  async () => {
    const response = await fetch('/ages')
    return await response.json()
  }
)

export const fetchMyBooks=createAsyncThunk(
  'books/fetchMyBooksStatus',
  async(id)=>{
    const response=await fetch('/books/'+id)
    return await response.json()
  }
)


export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    searchByTitle: (state, action) => {
      state.byTitle = action.payload;
    },
    searchByAuthorFirst: (state, action) => {
      state.byAuthorFirst = action.payload;
    },
    searchByAuthorLast: (state, action) => {
      state.byAuthorLast = action.payload;
    },
    searchByCategory: (state, action) => {
      state.byCategory = action.payload
    },
    searchByAge: (state, action) => {
      state.byAge = action.payload
      console.log(state.byAge);
    },
    initilizeSearch: (state) => {
      state.byAge = ''
      state.byAuthorFirst = ''
      state.byAuthorLast = ''
      state.byCategory = ''
      state.byTitle = ''
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      state.booksArr = action.payload
      state.error = ''
      console.log(state.booksArr);
    })
    builder.addCase(fetchBooks.rejected, (state, action) => {
      state.booksArr = []
      state.error = action.error.message
    })
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload
      state.error = ''
    })
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.categories = []
      state.error = action.error.message
    })
    builder.addCase(fetchAges.fulfilled, (state, action) => {
      state.ages = action.payload
      state.error = ''
    })
    builder.addCase(fetchAges.rejected, (state, action) => {
      state.ages = []
      state.error = action.error.message
    })
    builder.addCase(fetchMyBooks.fulfilled,(state,action)=>{
      state.myBooks=action.payload
      state.error=''
      console.log(state.myBooks);
    })
    builder.addCase(fetchMyBooks.rejected,(state,action)=>{
      state.myBooks=[]
      state.error=action.error.message
    })
  },

})

// Destructure and export the plain action creators
export const {
  searchByTitle,
  searchByAuthorFirst,
  searchByAuthorLast,
  searchByCategory,
  searchByAge,
  initilizeSearch } = booksSlice.actions;

export default booksSlice.reducer;