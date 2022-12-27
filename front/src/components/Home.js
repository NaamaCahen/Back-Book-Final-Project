import React from 'react'
// import Map from './Map'
import {MyMapComponent} from './Map';
import { useState,useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { fetchBooks } from '../redux/booksSlice';
import jwt_decode from 'jwt-decode';
import { fetchUser } from '../redux/usersSlice';

function Home() {
    const books=useSelector((state)=>state.books.booksArr);
    const token=useSelector(state=>state.users.token);
    const dispatch=useDispatch();
    useEffect(()=>{
        const decode=jwt_decode(token);
        dispatch(fetchUser(decode.user_id))
        dispatch(fetchBooks())
    },[])
    
    return (
        <>
            <div>Home</div>
            <div className='w-full'>
                <MyMapComponent />
            </div>
            
        </>
    )
}

export default Home