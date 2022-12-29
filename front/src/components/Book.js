import { Button, Modal } from 'flowbite-react'
import React from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux';

function Book(props) {
    const [isShowing,setIsShowing]=useState(false);
    const [isSent,setIsSent]=useState(false);
    const user=useSelector(state=>state.users.user)

    const closeModal=()=>{
       setIsShowing(false);
    }
    const openModal=()=>{
        setIsShowing(true);
    }
    const sent=()=>{
        setIsShowing(false);
        fetch('/request',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                user_id:user.user_id,
                book_id:props.book.book_id,
                status:1,
                requestedat:new Date().toISOString().split('T')[0],
                from_user:props.book.user_id
            })
        })
        .then(res=>res.json())
        .then(data=>{
            setIsSent(true);
            console.log(data);
        })
        .catch(e=>console.log(e))
        //open another modal if succeeded to send the request
    }
    return (
        <>
            <div>
                <h3>title: {props.book.title}</h3>
                <p>author: {props.book.author_first_name} {props.book.author_last_name}</p>
                <p>category: {props.book.category_name}</p>
                <p>user: {props.book.user_id}</p>
                <p>location: {props.book.num_house} {props.book.street} st. {props.book.city},{props.book.country}</p>
                <React.Fragment>
                    <Button gradientDuoTone='purpleToBlue'onClick={openModal} >for more details</Button>
                    <Modal show={isShowing} onClose={closeModal}>
                        <Modal.Header>requesting a book - "{props.book.title}"</Modal.Header>
                        <Modal.Body>
                        By clicking the "send request" button, a message will be sent to the book owner with your contact information, you will receive his as well, so you can contact each other and get the book you want.
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={sent}>send request</Button>
                            <Button color='failure' outline={true}  onClick={closeModal}>cancel</Button>
                        </Modal.Footer>
                    </Modal>
                </React.Fragment>

                {/* //when request succeeded */}
                <React.Fragment>
                <Modal show={isSent} onClose={()=>setIsSent(false)}>
                    <Modal.Header/>
                    <Modal.Body>
                        Great! 
                        your request was duccessfully sent to the current owner of the book.
                        here are his contact details:
                        phone :{props.book.phone}
                        email:{props.book.email}
                        address: {props.book.num_house} {props.book.street} st. {props.book.city},{props.book.country}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={()=>setIsSent(false)}>ok!</Button>
                    </Modal.Footer>
                </Modal>
                </React.Fragment>
            </div>
        </>
    )
}

export default Book