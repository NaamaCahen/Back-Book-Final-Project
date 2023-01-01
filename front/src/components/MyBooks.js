import React, { useEffect } from 'react'
import { Button, Table, Tabs } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux'
import { fetchMyBooks } from '../redux/booksSlice';
import BooksTable from './BooksTable';
import AddBook from './AddBook';
import MyRequests from './MyRequests';
import jwt_decode from 'jwt-decode';
import { fetchUser,setToken } from '../redux/usersSlice';
import { useNavigate } from 'react-router';
 

function MyBooks() {
  const dispatch = useDispatch();
  const myBooks = useSelector(state => state.books.myBooks);
  const user = useSelector(state => state.users.user);
  const token = useSelector(state => state.users.token);
  const navigate=useNavigate();

  useEffect(() => {
    console.log(user);
    if (user.user_id === undefined) {
      const decode = jwt_decode(token);
      console.log(decode);
      dispatch(fetchUser(decode.user_id))
      dispatch(fetchMyBooks(decode.user_id))
    } else {
      dispatch(fetchMyBooks(user.user_id))
    }
  }, [])

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
      {myBooks.length > 0 ? <div>
        <Tabs.Group aria-label="Tabs with underline" style="underline">
          <Tabs.Item title="sharing">
            <BooksTable tab='shared' filtered={myBooks.filter(item => { return item.status_name === 'added' || (item.status_name === 'received' && item.status_description === 'for sharing') })} />
          </Tabs.Item>
          <Tabs.Item title="reading">
            <BooksTable tab='received' filtered={myBooks.filter(item => item.status_name === 'received' && item.status_description === 'reading')} />
          </Tabs.Item>
          <Tabs.Item title="requested">
            <BooksTable tab='requested' filtered={myBooks.filter(item => item.status_name === 'request')} />
          </Tabs.Item>
          <Tabs.Item title="given">
            <BooksTable tab='given' filtered={myBooks.filter(item => item.status_name === 'given')} />
          </Tabs.Item>
        </Tabs.Group>
      </div> : <h3 className=' text-center text-3xl text-indigo-500'>no books for now</h3>}
      
      <MyRequests />

      <AddBook />
    </>
  )
}

export default MyBooks
