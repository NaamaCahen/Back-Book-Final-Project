import React, { useEffect } from 'react'
import { Button, Modal, Table } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { fetchMyBooks } from '../redux/booksSlice';
import { HiOutlineExclamationCircle } from 'react-icons/hi'

function BooksTable(props) {
    const myBooks = useSelector(state => state.books.myBooks);
    const user = useSelector(state => state.users.user);
    const dispatch = useDispatch();
    const [shared, setShared] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const [bookId, setBookId] = useState();
    const [assigningId, setAssigningId] = useState();
    const [status,setStatus]=useState();//cancel a request or share

    useEffect(() => {
        dispatch(fetchMyBooks(user.user_id));
    }, [shared])

    const handleOk = () => {
        setOpenModal(false);
        if(status==='share'){
            fetch('/share', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ book_id: bookId })
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    setShared(data);
                })
                .catch(e => console.log(e))
        }else if(status==='cancel'){
            fetch('/request', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ book_assigning_id: assigningId })
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    setShared(data);
                })
                .catch(e => console.log(e))
        }
        
    }

    const handleClick = (id,currentStatus) => {
        setOpenModal(true);
        setStatus(currentStatus)
        if(currentStatus==='share'){
             setBookId(id)
        }else if(currentStatus==='cancel'){
            setAssigningId(id)
        }
       
    }


    return (
        <>
            <Table hoverable={true}>
                <Table.Head>
                    <Table.HeadCell>
                        title
                    </Table.HeadCell>
                    <Table.HeadCell>
                        autor
                    </Table.HeadCell>
                    <Table.HeadCell>
                        {props.tab} at
                    </Table.HeadCell>
                    <Table.HeadCell></Table.HeadCell>
                    <Table.HeadCell></Table.HeadCell>
                    <Table.HeadCell></Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {
                        props.filtered
                            .map(item => {
                                return (
                                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                        <Table.Cell >
                                            {item.title}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {item.author_first_name} {item.author_last_name}
                                        </Table.Cell>

                                        <Table.Cell>
                                            {(item.addedat || item.receivedat || item.requestedat).substr(0, 10)}
                                        </Table.Cell>
                                        <Table.Cell>
                                        {props.tab === 'received' ?
                                            <>
                                                <p>finished reading?</p>
                                                <Button size='sm' onClick={() => handleClick(item.book_id,'share')}>share!</Button>
                                           </>: null
                                        }
                                        
                                        </Table.Cell> 
                                        <Table.Cell>
                                        {
                                            props.tab ==='requested'?
                                            <>
                                                <Button color='failure' size='sm' onClick={() => handleClick(item.book_assigning_id,'cancel')}>cancel request</Button>
                                            </>:null
                                        }
                                        </Table.Cell>
                                        <Table.Cell>
                                            {
                                                props.tab ==='requested'?
                                                <>
                                                <p>phone: {item.phone}</p>
                                                <p>email: {item.email}</p>
                                                </>
                                                :null
                                            }
                                        </Table.Cell>
                                    </Table.Row>
                                )
                            })}
                </Table.Body>
            </Table>
            <React.Fragment>
                <Modal show={openModal} popup={true} onClose={() => setOpenModal(false)}>
                    <Modal.Header />
                    <Modal.Body>
                        <div className="text-center">
                            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                Are you sure you want to {status==='share'?'share this book':'cancel the request'}?
                            </h3>
                            <div className="flex justify-center gap-4">
                                <Button gradientDuoTone='purpleToBlue' onClick={() => handleOk()}>
                                    Yes, I'm sure
                                </Button>
                                <Button color="gray" onClick={() => setOpenModal(false)}>
                                    No, cancel
                                </Button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </React.Fragment>
        </>
    )
}

export default BooksTable