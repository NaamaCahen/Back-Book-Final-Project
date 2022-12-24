import React from 'react'
// import Map from './Map'
import {MyMapComponent} from './Map';
import { useState,useEffect } from 'react';
import jwt_decode from 'jwt-decode';

function Home() {
    const [books,setBooks]=useState([])
    useEffect(()=>{
        const decode=jwt_decode(localStorage.getItem('token'));
        console.log(decode);
       
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