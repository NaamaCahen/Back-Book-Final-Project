import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useEffect } from 'react';
import { searchByTitle } from '../redux/booksSlice';

function SearchBar() {
 const books=useSelector((state)=>state.booksReducer.booksArr);
 const dispatch=useDispatch();
 useEffect(() => {
   
 }, [])
 

  return (
    <>
   
      <div>SearchBar</div>
      <label htmlFor="title" className="block text-sm font-medium text-gray-700">
        by Title
      </label>
      <input type="text" name="title"  id="title" onChange={(e)=>dispatch(searchByTitle(e.target.value))}
        className="block rounded-md border-grey-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
    </>
  )
}

export default SearchBar