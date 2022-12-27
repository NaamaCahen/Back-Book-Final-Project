import { Button, Modal } from 'flowbite-react'
import React from 'react'
import { useState } from 'react';

function Book(props) {
    const [isShowing,setIsShowing]=useState(false);

    const closeModal=()=>{
       setIsShowing(false);
    }
    const openModal=()=>{
        setIsShowing(true);
    }
    const sent=()=>{
        setIsShowing(false);
        //open another modal if succeeded to send the request
    }
    return (
        <>
            <div>
                <h3>title: {props.book.title}</h3>
                <p>author: {props.book.author_first_name} {props.book.author_last_name}</p>
                <p>category: {props.book.category_name}</p>
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
            </div>
        </>
    )
}

export default Book