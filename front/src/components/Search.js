import React from 'react';
import SearchBar from './SearchBar';
import { useSelector,useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchBooks, initilizeSearch } from '../redux/booksSlice';
import Book from './Book';
import jwt_decode from 'jwt-decode';
import { setToken } from '../redux/usersSlice';
import { useNavigate } from 'react-router';


function Search() { 
  const books=useSelector(state=>state.books.booksArr);
  const title=useSelector(state=>state.books.byTitle);
  const firstName=useSelector(state=>state.books.byAuthorFirst);
  const lastName=useSelector(state=>state.books.byAuthorLast);
  const category=useSelector(state=>state.books.byCategory);
  const age=useSelector(state=>state.books.byAge);
  const token=useSelector(state=>state.users.token);//for case he refreshes the page, refetch the books
  const dispatch=useDispatch();
  const navigate=useNavigate();

  useEffect(()=>{
    dispatch(initilizeSearch())
    if(books.length===0){
      const decode=jwt_decode(token)
      dispatch(fetchBooks(decode.user_id));
    }
  },[])

  useEffect(()=>{
    try{
      const decode = jwt_decode(token);
      const expire = decode.exp;
      if(expire * 1000 < new Date().getTime()){
        setToken(null);
        navigate('/login')
      }
    }
    catch(e){
      console.log(e);
      setToken(null);
      navigate('/login')
    }
  },[token]);

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