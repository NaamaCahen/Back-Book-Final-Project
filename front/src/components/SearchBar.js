import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';
import { searchByAuthorFirst, searchByTitle, searchByAuthorLast, fetchCategories, searchByCategory,searchByAge, fetchAges } from '../redux/booksSlice';

function SearchBar() {
  const books = useSelector((state) => state.books.booksArr);
  const categories = useSelector(state => state.books.categories)
  const ages=useSelector(state=>state.books.ages)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchAges());
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
      <label htmlFor="" className="block text-sm font-medium text-gray-700">
        by category
      </label>
      <select className='block' onChange={(e) => dispatch(searchByCategory(e.target.value))}>
        <option></option>
        {
          categories.map((item,i) => {
            return (
              <option key={i}>{item.category_name}</option>
            )
          })
        }
      </select>

      {/* search by age */}
      <label htmlFor="" className="block text-sm font-medium text-gray-700">
        by age
      </label>
      <select className='block' onChange={(e) => dispatch(searchByAge(e.target.value))}>
        <option></option>
        {
          ages.map((item,i) => {
            return (
              <option key={i}>{item.age_description}</option>
            )
          })
        }
      </select>
    </>
  )
}

export default SearchBar