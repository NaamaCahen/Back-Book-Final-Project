import { useSelector, useDispatch } from "react-redux";
import { Button, Label, Modal, TextInput, Card } from 'flowbite-react'
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const Profile = () => {
    const user = useSelector(state => state.users.user);
    const dispatch = useDispatch();
    const [openModal, setOpenModal] = useState(false);
    const navigate = useNavigate();


    const save = (e) => {
        e.preventDefault();
        fetch(`https://nominatim.openstreetmap.org/search?street=${e.target.numHouse.value} ${e.target.street.value}&city=${e.target.city.value}&country=${e.target.country.value}&format=json`)
            .then(res => res.json())
            .then(data => {
                if (data.length === 0) {
                    alert('the system didnt find your location, please check the address')
                    return;
                } else {
                    const userUpdate = {
                        user_id: user.user_id,
                        email: e.target.email.value,
                        // password: e.target.password.value,
                        user_first_name: e.target.firstName.value,
                        user_last_name: e.target.lastName.value,
                        country: e.target.country.value,
                        city: e.target.city.value,
                        street: e.target.street.value,
                        num_house: e.target.numHouse.value,
                        phone: e.target.phone.value,
                        lat: +data[0].lat,
                        long: +data[0].lon,
                    }

                    fetch('/updateProfile', {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'Application/json'
                        },
                        body: JSON.stringify(userUpdate)
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data)
                            setOpenModal(true)
                        })
                        .catch(e => console.log(e))
                }
            })
            .catch(e => console.log(e))

    }

    const back = () =>{
        navigate('/home')
    }

    const closeModal = ()=>{
        console.log('in the close modal func');
        setOpenModal(false);
        back();
    }

    return (
        <>
            <Card className="sm:w-full md:w-1/2 lg:w-1/3 mt-20 m-auto">
                <h1 className="text-2xl font-bold">Your Profile:</h1>
                <form onSubmit={save}>
                    <Label htmlFor='firstName' value='first name' />
                    <TextInput id="firstName" name='firstName' type='text' defaultValue={user.user_first_name} required />

                    <Label htmlFor='lastName' value='last name' />
                    <TextInput id="lastName" name='lastName' type='text' defaultValue={user.user_last_name} required />

                    <Label htmlFor='email' value='email' />
                    <TextInput id="email" name='email' type='email' defaultValue={user.email} required />

                    {/* //add the possibility to change the password */}
                    {/* <label htmlFor='password'>password</label>
                    <TextInput id="password" name='password' type='text' defaultValue={user.password}  /> */}

                    <Label htmlFor='address' value='address' />
                    <TextInput id="numHouse" name='numHouse' type='text' defaultValue={user.num_house} required />
                    <TextInput id="street" name='street' type='text' defaultValue={user.street} required />
                    <TextInput id="city" name='city' type='text' defaultValue={user.city} required />
                    <TextInput id="country" name='country' type='text' defaultValue={user.country} required />

                    <Label htmlFor='phone' value='phone' />
                    <TextInput id="phone" name='phone' type='text' defaultValue={user.phone} required />

                    <Button type="submit" className="m-5">save changes</Button>
                </form>
                <Button className="m-5" onClick={back}>back</Button>

            </Card>

            <React.Fragment>
                <Modal show={openModal} onClose={closeModal}>
                    <Modal.Header />
                    <Modal.Body>
                        <h3 className="text-indigo-800 text-lg text-center">profile changes were successfully updated!</h3>
                    </Modal.Body>
                    <Modal.Footer><Button onClick={closeModal}>ok</Button></Modal.Footer>
                </Modal>
            </React.Fragment>
        </>
    )
}

export default Profile