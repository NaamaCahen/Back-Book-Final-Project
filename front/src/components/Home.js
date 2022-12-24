import React from 'react'
// import Map from './Map'
import {MyMapComponent} from './Map';
import { useState,useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { count, fetchBooks } from '../redux/booksSlice';
import jwt_decode from 'jwt-decode';

function Home() {
    const books=useSelector((state)=>state.booksReducer.booksArr)
    const dispatch=useDispatch();
    useEffect(()=>{
        const decode=jwt_decode(localStorage.getItem('token'));
        console.log(decode);
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