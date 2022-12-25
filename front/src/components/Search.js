import React from 'react';
import SearchBar from './SearchBar';
import { useSelector,useDispatch } from 'react-redux';
import { useEffect } from 'react';

function Search() {
  const title=useSelector(state=>state.booksReducer.byTitle);
  const firstName=useSelector(state=>state.booksReducer.byAuthorFirst);
  const lastName=useSelector(state=>state.booksReducer.byAuthorLast);
  const books=useSelector(state=>state.booksReducer.booksArr);

  return (
    <>
        search         

        <SearchBar/>
        <div>
        {
          books.filter(item=>{
            return item.title.toLowerCase().includes(title.toLowerCase())&&
            item.author_first_name.toLowerCase().includes(firstName.toLowerCase())&&
            item.author_last_name.toLowerCase().includes(lastName.toLowerCase())
          })
          .map(item=>{
            return(
              <div >
                <p>{item.title}</p>
                <p>{item.author_first_name} {item.author_last_name}</p>
              </div>
            )
          })
        }</div>
    </>
  )
}

export default Search