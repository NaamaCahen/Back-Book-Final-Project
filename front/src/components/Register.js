import React from 'react'

function Register() {
    const register = (e) => {
        e.preventDefault();
        const user = {
            email: e.target.email.value,
            password: e.target.password.value,
            user_first_name: e.target.first_name.value,
            user_last_name: e.target.last_name.value,
            country: e.target.country.value,
            city: e.target.city.value,
            street: e.target.street.value,
            num_house: e.target.num_house.value,
            phone: e.target.phone.value
        }
        console.log(user);
        fetch(`http://localhost:4000/register`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(user)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
        })
        .catch(e=>{
            console.log(e);
        })
    }
    return (
        <>
            <h1>Register</h1>
            <form method='POST' onSubmit={register}>
                <input type='text' required placeholder='email' name='email' id='email' className="mt-2 appearance-none text-slate-900 bg-white rounded-md block  px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200" />
                <input type='password'required placeholder='password' name='password' id='password' className="mt-2 appearance-none text-slate-900 bg-white rounded-md block  px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200" />
                <input type='text' required placeholder='first name' name='first_name' id='first_name' className="mt-2 appearance-none text-slate-900 bg-white rounded-md block  px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200" />
                <input type='text' required placeholder='last name' name='last_name' id='last_name' className="mt-2 appearance-none text-slate-900 bg-white rounded-md block  px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200" />
                {/*replace with select list of countries*/}<input type='text' required placeholder='country' name='country' id='country' className="mt-2 appearance-none text-slate-900 bg-white rounded-md block  px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200" />
                <input type='text' required placeholder='city' name='city' id='city' className="mt-2 appearance-none text-slate-900 bg-white rounded-md block  px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200" />
                <input type='text' required placeholder='street' name='street' id='street' className="mt-2 appearance-none text-slate-900 bg-white rounded-md block  px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200" />
                <input type='number' required placeholder='house number' name='num_house' id='num_house' className="mt-2 appearance-none text-slate-900 bg-white rounded-md block  px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200" />
                <input type='text' required placeholder='phone no.' name='phone' id='phone' className="mt-2 appearance-none text-slate-900 bg-white rounded-md block  px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200" />
                <button type='submit'>register</button>
            </form>
        </>

    )
}

export default Register