import React from 'react'
import {useNavigate} from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux';
import { setToken } from '../redux/usersSlice';

function Login() {
    const navigate=useNavigate();
    const token=useSelector(state=>state.users.token);
    const dispatch=useDispatch();

    const login=(e)=>{
        e.preventDefault();
            const user = {
                email: e.target.email.value,
                password: e.target.password.value
            }
            
    
        fetch(`http://localhost:4000/login`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(user)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            if(data.token){
                localStorage.setItem('token',data.token)
                dispatch(setToken(data.token))
                navigate('/home')
            }
        })
        .catch(e=>{
            console.log(e);
        })
    }
    return (
        <>
            <h1 className="text-3xl font-bold underline">
                Login
            </h1>
            <form method='POST' onSubmit={login}>
                <input required type='text' placeholder='email' name='email' id='email' className="mt-2 appearance-none text-slate-900 bg-white rounded-md block  px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200" />
                <input required type='password' placeholder='password' name='password' id='password' className="mt-2 appearance-none text-slate-900 bg-white rounded-md block  px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200" />
                <button type='submit'>login</button>
            </form>
        </>
    )
}



export default Login