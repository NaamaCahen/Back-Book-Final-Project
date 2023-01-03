import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setToken } from '../redux/usersSlice';
import { Card,Label,TextInput,Button } from 'flowbite-react';

function Register() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const register = (e) => {
        e.preventDefault();
        const country = e.target.country.value;
        const city = e.target.city.value;
        const street = e.target.street.value;
        const num_house = e.target.num_house.value;
        fetch(`https://nominatim.openstreetmap.org/search?street=${num_house} ${street}&city=${city}&country=${country}&format=json`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.length === 0) {
                    alert('the system didnt find your location, please check the address')
                    return;
                } else {
                    const user = {
                        email: e.target.email.value,
                        password: e.target.password.value,
                        user_first_name: e.target.firstName.value,
                        user_last_name: e.target.lastName.value,
                        country,
                        city,
                        street,
                        num_house,
                        phone: e.target.phone.value,
                        lat: +data[0].lat,
                        long: +data[0].lon,
                    }
                    console.log(user);
                    
                    fetch(`/register`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(user)
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data);
                            if (!data.msg) {
                                localStorage.setItem('token',data.token)
                                dispatch(setToken(data.token))
                                navigate('/home');
                            }
                        })
                        .catch(e => {
                            console.log(e);
                        })
                }
            })



    }
    return (
        <>
        <div className='sm:w-full md:w-1/3 m-auto' >
            <Card>
                <h1 className="text-3xl font-bold text-indigo-500">
                    Register
                </h1>
                <form method='POST' onSubmit={register}>

                    <div className="mb-2 block">
                        <Label htmlFor='email' value='email' />
                    </div>
                    <TextInput required type='email' placeholder='email' name='email' id='email'  />

                    <div className="mb-2 block">
                        <Label htmlFor='password' value='password' />
                    </div>
                    <TextInput required type='password' placeholder='password' name='password' id='password'  />
                    
                    <div className="mb-2 block">
                        <Label htmlFor='firstName' value='first name' />
                    </div>
                    <TextInput required type='text' placeholder='first name' name='firstName' id='firstName'  />
                    
                    <div className="mb-2 block">
                        <Label htmlFor='lastName' value='last name' />
                    </div>
                    <TextInput type='text' required placeholder='last name' name='lastName' id='lastName'  />

                    <div className="mb-2 block">
                        <Label htmlFor='country' value='country' />
                    </div>
                    <TextInput type='text' required placeholder='country' name='country' id='country'  />
                
                    <div className="mb-2 block">
                        <Label htmlFor='city' value='city' />
                    </div>
                   <TextInput type='text' required placeholder='city' name='city' id='city'  />

                   <div className="mb-2 block">
                        <Label htmlFor='street' value='street' />
                    </div>
                <TextInput type='text' required placeholder='street' name='street' id='street'  />

                <div className="mb-2 block">
                        <Label htmlFor='num_house' value='house number' />
                    </div>
                <TextInput type='number' required placeholder='house number' name='num_house' id='num_house'  />

                <div className="mb-2 block">
                        <Label htmlFor='phone' value='phone' />
                    </div>
                <TextInput type='text' required placeholder='phone no.' name='phone' id='phone'  />
                

                    <Button className='m-5' type='submit'>register</Button>
                </form>
            </Card>
        </div>
            
        </>

    )
}

export default Register