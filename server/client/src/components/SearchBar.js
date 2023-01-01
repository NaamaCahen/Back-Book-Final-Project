import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';
import { searchByAuthorFirst, searchByTitle, searchByAuthorLast, fetchCategories, searchByCategory,searchByAge, fetchAges } from '../redux/booksSlice';
import { Select, TextInput } from 'flowbite-react';

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

      <div className='bg-indigo-200 h-screen '>
        {/* //search by title */}
      <label htmlFor="title" className="block text-sm p-1 font-medium text-gray-700">
        by Title
      </label>
      <TextInput type="text" name="title" id="title" placeholder='title' className='m-2 w-2/3' onChange={(e) => dispatch(searchByTitle(e.target.value))}      
      />

      {/* //search by author first&last name */}
      <label htmlFor="autorFirstName" className="block p-1 text-sm font-medium text-gray-700">
        by Author
      </label>
      <TextInput type="text" name="autorFirstName" id="autorFirstName" className='m-2 w-2/3' placeholder='first name' onChange={(e) => dispatch(searchByAuthorFirst(e.target.value))}
      />
      <TextInput type="text" name="autorLastName" id="autorLastName" className='m-2 w-2/3' placeholder='last name' onChange={(e) => dispatch(searchByAuthorLast(e.target.value))}
      />


      {/* //search by category */}
      <label htmlFor="" className="block p-1 text-sm font-medium text-gray-700">
        by category
      </label>
      <Select className='block m-2 w-2/3' onChange={(e) => dispatch(searchByCategory(e.target.value))}>
        <option></option>
        {
          categories.map((item,i) => {
            return (
              <option key={i}>{item.category_name}</option>
            )
          })
        }
      </Select>

      {/* search by age */}
      <label htmlFor="" className="block p-1 text-sm font-medium text-gray-700">
        by age
      </label>
      <Select className='block m-2 w-2/3' onChange={(e) => dispatch(searchByAge(e.target.value))}>
        <option></option>
        {
          ages.map((item,i) => {
            return (
              <option key={i}>{item.age_description}</option>
            )
          })
        }
      </Select>
      </div>
      
    </>
  )
}

export default SearchBar