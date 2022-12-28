import React, { useEffect } from 'react'
import { Button, Table, Tabs } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux'
import { fetchMyBooks } from '../redux/booksSlice';
import BooksTable from './BooksTable';
import AddBook from './AddBook';

function MyBooks() {
  const dispatch = useDispatch();
  const myBooks = useSelector(state => state.books.myBooks);
  const user = useSelector(state => state.users.user);
  useEffect(() => {
    dispatch(fetchMyBooks(user.user_id))
  }, [])
  return (
    <>
      <h1>MyBooks</h1>
      <div >
        <Tabs.Group aria-label="Tabs with underline" style="underline">
          <Tabs.Item title="sharing">
            <BooksTable tab='shared' filtered={myBooks.filter(item=>{ return item.status_name === 'added' || (item.status_name === 'received' && item.status_description === 'for sharing') })}/>
          </Tabs.Item>
          <Tabs.Item title="reading">
            <BooksTable tab='received' filtered={myBooks.filter(item=>item.status_name==='received')}/>
          </Tabs.Item>
          <Tabs.Item title="requested">
            <BooksTable tab='requested' filtered={myBooks.filter(item=>item.status_name==='requested')}/>
          </Tabs.Item>
          <Tabs.Item title="given">
            <BooksTable tab='given' filtered={myBooks.filter(item=>item.status_name==='given')}/>
          </Tabs.Item>
        </Tabs.Group>
      </div>
      <AddBook/>
    </>
  )
}

export default MyBooks
