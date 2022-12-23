import React from 'react'
// import Map from './Map'
import {MyMapComponent} from './Map';
import { useState,useEffect } from 'react';

function Home() {
    const [books,setBooks]=useState([])
    useEffect(()=>{
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
            <div className='md:w-2/3 m-auto sm:w-full'>
                <MyMapComponent />
            </div>
            
        </>
    )
}

export default Home