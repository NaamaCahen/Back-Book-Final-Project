import { Button, Card, Modal } from 'flowbite-react'
import React from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux';

function Book(props) {
    const [isShowing, setIsShowing] = useState(false);//show 1st the modal of details
    const [isSent, setIsSent] = useState(false);//show 2nd the modal of ok
    const user = useSelector(state => state.users.user)
    const [failed, setFailed] = useState(false);//if there are multiple requests it will popup anothe text in the modal

    const closeModal = () => {
        setIsShowing(false);
    }
    const openModal = () => {
        setIsShowing(true);
    }
    const sent = () => {
        setIsShowing(false);
        fetch('/request', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: user.user_id,
                book_id: props.book.book_id,
                status: 1,
                requestedat: new Date().toISOString().split('T')[0],
                from_user: props.book.user_id
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.msg) {
                    //check if there is already an existing request for this book
                    setFailed(true);
                    console.log(true);
                } else {
                    setFailed(false)
                }
                setIsSent(true);//open another modal if succeeded to send the request or not
                console.log(data);
            })
            .catch(e => console.log(e))

    }
    return (
        <>
            <div>
                <Card className='m-5'>
                    <div className='m-5'>
                        <h3 className='text-xl font-semibold'>title: {props.book.title}</h3>
                        <p className='italic'>author: {props.book.author_first_name} {props.book.author_last_name}</p>
                        <p>category: {props.book.category_name}</p>
                        <p>location: {props.book.num_house} {props.book.street} st. {props.book.city},{props.book.country}</p>
                        <Button gradientDuoTone='purpleToBlue' onClick={openModal} >for more details</Button>
                    </div>

                </Card>

                <React.Fragment>

                    <Modal show={isShowing} onClose={closeModal}>
                        <Modal.Header>requesting a book - "{props.book.title}"</Modal.Header>
                        <Modal.Body>
                            By clicking the "send request" button, a message will be sent to the book owner with your contact information, you will receive his as well, so you can contact each other and get the book you want.
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={sent}>send request</Button>
                            <Button color='failure' outline={true} onClick={closeModal}>cancel</Button>
                        </Modal.Footer>
                    </Modal>
                </React.Fragment>

                {/* //when request succeeded */}
                <React.Fragment>
                    <Modal show={isSent} onClose={() => setIsSent(false)} className='z-20'>
                        <Modal.Header />
                        <Modal.Body>
                            {
                                failed ? 'OOPS...  cannot allow multiple requests for the same book ' : `Great! 
                        your request was successfully sent to the current owner of the book.
                        here are his contact details:
                        phone :${props.book.phone}
                        email:${props.book.email}
                        address: ${props.book.num_house} ${props.book.street} st. ${props.book.city},${props.book.country}`



                            }

                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={() => setIsSent(false)}>ok!</Button>
                        </Modal.Footer>
                    </Modal>
                </React.Fragment>
            </div>
        </>
    )
}

export default Book