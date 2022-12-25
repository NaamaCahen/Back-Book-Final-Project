import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useEffect } from 'react';
import { searchByAuthorFirst, searchByTitle,searchByAuthorLast } from '../redux/booksSlice';

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
        className="block rounded-md border-grey-300  pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />

      <label htmlFor="autorFirstName" className="block text-sm font-medium text-gray-700">
        by Author
      </label>
      <input type="text" name="autorFirstName"  id="autorFirstName" placeholder='first name' onChange={(e)=>dispatch(searchByAuthorFirst(e.target.value))}
        className="block rounded-md border-grey-300  pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
      <input type="text" name="autorLastName"  id="autorLastName" placeholder='last name' onChange={(e)=>dispatch(searchByAuthorLast(e.target.value))}
        className="block rounded-md border-grey-300  pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />


    </>
  )
}

export default SearchBar