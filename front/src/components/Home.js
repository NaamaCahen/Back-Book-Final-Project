import React from 'react'
// import Map from './Map'
import {MyMapComponent} from './Map';
import { useState,useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { fetchBooks } from '../redux/booksSlice';
import jwt_decode from 'jwt-decode';
import { fetchUser, setToken} from '../redux/usersSlice';
import { useNavigate } from 'react-router';

function Home() {
    const books=useSelector((state)=>state.books.booksArr);
    const token=useSelector(state=>state.users.token);
    const dispatch=useDispatch();
    const navigate=useNavigate();

    useEffect(()=>{
        const decode=jwt_decode(token);
        dispatch(fetchUser(decode.user_id))
        dispatch(fetchBooks(decode.user_id))
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
            <div>Home</div>
            <div className='w-full'>
                {books.length>0?<MyMapComponent />:null}
            </div>
            
        </>
    )
}

export default Home