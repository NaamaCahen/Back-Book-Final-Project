import React from 'react';
import SearchBar from './SearchBar';
import { useSelector,useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { initilizeSearch } from '../redux/booksSlice';
import Book from './Book';

function Search() { 
  const books=useSelector(state=>state.books.booksArr);
  const title=useSelector(state=>state.books.byTitle);
  const firstName=useSelector(state=>state.books.byAuthorFirst);
  const lastName=useSelector(state=>state.books.byAuthorLast);
  const category=useSelector(state=>state.books.byCategory);
  const age=useSelector(state=>state.books.byAge);
  const dispatch=useDispatch();

  useEffect(()=>{
    dispatch(initilizeSearch())
  },[])

  return (
    <>
        search         

        <SearchBar/>
        <div>
        {
          books.filter(item=>{
            console.log(item.category_name)
            return item.title.toLowerCase().includes(title.toLowerCase())&&
            item.author_first_name.toLowerCase().includes(firstName.toLowerCase())&&
            item.author_last_name.toLowerCase().includes(lastName.toLowerCase())&&
            item.category_name.toLowerCase().includes(category.toLowerCase())&&            
            item.age_description.toLowerCase().includes(age.toLowerCase())            
          })
          .map(item=>{
            return(
              <Book book={item}/>
            )
          })
        }</div>
    </>
  )
}

export default Search