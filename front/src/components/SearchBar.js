import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';
import { searchByAuthorFirst, searchByTitle, searchByAuthorLast, fetchCategories, searchByCategory } from '../redux/booksSlice';

function SearchBar() {
  const books = useSelector((state) => state.booksReducer.booksArr);
  const categories = useSelector(state => state.booksReducer.categories)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories())
  }, [])

  return (
    <>

      <div>SearchBar</div>
      {/* //search by title */}
      <label htmlFor="title" className="block text-sm font-medium text-gray-700">
        by Title
      </label>
      <input type="text" name="title" id="title" onChange={(e) => dispatch(searchByTitle(e.target.value))}
        className="block rounded-md border-grey-300  pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />

      {/* //search by author first&last name */}
      <label htmlFor="autorFirstName" className="block text-sm font-medium text-gray-700">
        by Author
      </label>
      <input type="text" name="autorFirstName" id="autorFirstName" placeholder='first name' onChange={(e) => dispatch(searchByAuthorFirst(e.target.value))}
      />
      <input type="text" name="autorLastName" id="autorLastName" placeholder='last name' onChange={(e) => dispatch(searchByAuthorLast(e.target.value))}
      />


      {/* //search by category */}
      <label htmlFor="autorFirstName" className="block text-sm font-medium text-gray-700">
        by category
      </label>
      <select className='block' onChange={(e) => dispatch(searchByCategory(e.target.value))}>
        <option></option>
        {
          categories.map(item => {
            return (
              <option key={item.category_id}>{item.category_name}</option>
            )
          })
        }
      </select>

    </>
  )
}

export default SearchBar