import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { setToken } from '../redux/usersSlice';
import { Button, Card, Label, TextInput } from 'flowbite-react';

function Login() {
    const navigate = useNavigate();
    const token = useSelector(state => state.users.token);
    const dispatch = useDispatch();

    const login = (e) => {
        e.preventDefault();
        const user = {
            email: e.target.email.value,
            password: e.target.password.value
        }


        fetch(`http://localhost:4000/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.token) {
                    localStorage.setItem('token', data.token)
                    dispatch(setToken(data.token))
                    navigate('/home')
                }
            })
            .catch(e => {
                console.log(e);
            })
    }
    return (
        <>
        <div className='sm:w-full md:w-1/3 m-auto' >
            <Card>
                <h1 className="text-3xl font-bold text-indigo-500">
                    Login
                </h1>
                <form method='POST' onSubmit={login}>
                    <div className="mb-2 block">
                        <Label htmlFor='email' value='email' />
                    </div>
                    <TextInput required type='email' placeholder='email' name='email' id='email'  />
                    <div className="mb-2 block">
                        <Label htmlFor='password' value='password' />
                    </div>
                    <TextInput required type='password' placeholder='password' name='password' id='password'  />
                    <Button className='m-5' type='submit'>login</Button>
                </form>
            </Card>
        </div>
            

        </>
    )
}



export default Login