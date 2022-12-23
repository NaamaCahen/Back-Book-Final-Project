import React from 'react'
import {useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

function Auth(props) {
    const [redirect,setRedirect]=useState(false);
    const navigate=useNavigate();
    
    useEffect(()=>{
         const verify=async()=>{
        try{
            const response=await fetch(`http://localhost:4000/token`)

            console.log(response);
            // localStorage.setItem('token',response.token)
            setRedirect(true);
        }catch(err){
             localStorage.setItem('token',"null");
            navigate('/login')
        }
    }
    verify();
    },[])
   
  return (
    redirect? props.children: null
  )
}

export default Auth