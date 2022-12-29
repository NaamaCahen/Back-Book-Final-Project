import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchMyRequests } from '../redux/assigningSlice';
import { Alert, Button } from 'flowbite-react';

function MyRequests() {
  const dispatch = useDispatch();
  const myRequests = useSelector(state => state.assign.myRequests)
  const user = useSelector(state=>state.users.user)
  const myBooks=useSelector(state=>state.books.myBooks)

  useEffect(() => {
    dispatch(fetchMyRequests(user.user_id))
  }, [])

  return (
    <>
      <h1>your books are requested!</h1>
      {myRequests.length > 0 ?
        myRequests.map(item => {
          return (
            <Alert color="info">
              <span>
                <span className="font-medium">
                 Request for book:{myBooks.find(book=>book.book_id===item.book_id).title }
                </span>
                <div className='flex '>
                <Button outline={true}>more details</Button>
                <Button >give</Button>
                </div>
              </span>
            </Alert>
          )
        }) : 'no requests for now'
      }
    </>
  )
}

export default MyRequests