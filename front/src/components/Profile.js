import { useSelector, useDispatch } from "react-redux";
import { Button, Modal } from 'flowbite-react'
import React, { useEffect ,useState} from "react";


const Profile = () => {
    const user = useSelector(state => state.users.user);
    const dispatch = useDispatch();
    const [openModal,setOpenModal]=useState(false);


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

                    fetch('http://localhost:4000/updateProfile', {
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

    return (
        <>
            <h1>Your Profile:</h1>
            <form onSubmit={save}>
                <label htmlFor='firstName'>first name</label>
                <input id="firstName" name='firstName' type='text' defaultValue={user.user_first_name} required/>

                <label htmlFor='lastName'>last name</label>
                <input id="lastName" name='lastName' type='text' defaultValue={user.user_last_name} required/>

                <label htmlFor='email'>email</label>
                <input id="email" name='email' type='email' defaultValue={user.email} required/>

                {/* //add the possibility to change the password */}
                {/* <label htmlFor='password'>password</label>
                <input id="password" name='password' type='text' defaultValue={user.password}  /> */}

                <label htmlFor='address'>address</label>
                <input id="numHouse" name='numHouse' type='text' defaultValue={user.num_house} required/>
                <input id="street" name='street' type='text' defaultValue={user.street} required/>
                <input id="city" name='city' type='text' defaultValue={user.city} required/>
                <input id="country" name='country' type='text' defaultValue={user.country} required/>

                <input id="phone" name='phone' type='text' defaultValue={user.phone} required/>

                <Button type="submit">save changes</Button>
            </form>

            <React.Fragment>
            <Modal show={openModal} onClose={()=>setOpenModal(false)}>
                <Modal.Header />
                <Modal.Body>
                    <h3 className="text-indigo-800 text-lg text-center">profile changes were successfully updated!</h3>
                </Modal.Body>
                <Modal.Footer><Button onClick={()=>setOpenModal(false)}>ok</Button></Modal.Footer>
            </Modal>
            </React.Fragment>
        </>
    )
}

export default Profile