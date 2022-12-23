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
        function getBooks(){
           fetch(`http://localhost:4000/books`)
        .then(res=>res.json())
        .then(data=>console.log(data))
        .catch(e=>console.log(e)) 
        }
        getBooks()
        
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