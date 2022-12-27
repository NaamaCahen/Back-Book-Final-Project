import React from 'react'
import {useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { setToken, tokenNull } from '../redux/usersSlice';

function Auth(props) {
    const [redirect,setRedirect]=useState(false);
    const navigate=useNavigate();
    const token=useSelector(state=>state.users.token)
    const dispatch=useDispatch();
  
    
    useEffect(()=>{
         const verify=async()=>{
        try{
            const response=await fetch(`http://localhost:4000/token`,{
              headers:{
                'x-access-token':token
              }
            })

            const res=await response.json();
            console.log(res);
            dispatch(setToken(res.token))
            setRedirect(true);
        }catch(err){
            dispatch(setToken(null))
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