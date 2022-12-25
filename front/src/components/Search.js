import React from 'react';
import SearchBar from './SearchBar';
import { useSelector,useDispatch } from 'react-redux';
import { useEffect } from 'react';

function Search() { 
  const books=useSelector(state=>state.booksReducer.booksArr);
  const title=useSelector(state=>state.booksReducer.byTitle);
  const firstName=useSelector(state=>state.booksReducer.byAuthorFirst);
  const lastName=useSelector(state=>state.booksReducer.byAuthorLast);
  const category=useSelector(state=>state.booksReducer.byCategory);
  const age=useSelector(state=>state.booksReducer.byAge);

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