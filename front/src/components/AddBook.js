import React, { useEffect } from 'react'
import { Button, Label, Modal, Select, TextInput } from 'flowbite-react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAges, fetchCategories } from '../redux/booksSlice'

function AddBook() {
    const [show, setShow] = useState(false)
    const dispatch = useDispatch();
    const categories = useSelector(state => state.books.categories);
    const ages = useSelector(state => state.books.ages);

    useEffect(() => {
        if (categories.length === 0) {
            dispatch(fetchCategories());
        }
        if (ages.length === 0) {
            dispatch(fetchAges());
        }
    }, [])

    const addBook = (e) => {
        e.preventDefault();
        setShow(false);
        

    }

    return (
        <>
            <React.Fragment>
                <Button gradientDuoTone='purpleToBlue' onClick={() => setShow(true)}>add new book</Button>
                <Modal show={show} onClose={() => setShow(false)} popup={true} size='sm'>
                    <form onSubmit={addBook}>
                        <Modal.Header>
                            <h2>Add a Book</h2>
                        </Modal.Header>
                        <Modal.Body>

                            <div className='mb-2 block'>
                                <Label htmlFor='title' value='book title' />
                            </div>
                            <TextInput id='title' placeholder='title' required />
                            <div className='mb-2 block'>
                                <Label htmlFor='autor' value='author' />
                            </div>
                            <TextInput name='author' id='firstName' placeholder='first name' className='mb-2' required />
                            <TextInput name='author' id='lastName' placeholder='last name' required />
                            <div id='select'>
                                <div className='mb-2 block'>
                                    <Label htmlFor='categories' value='select a category' />
                                </div>
                                <Select id='categories' required={true}>
                                    <option disabled selected value></option>
                                    {categories.map(item => {
                                        return (
                                            <option>
                                                {item.category_name}
                                            </option>
                                        )
                                    })}
                                </Select>
                                <div className='mb-2 block'>
                                    <Label htmlFor='ages' value='book for age' />
                                </div>
                                <Select id='ages' required={true}>
                                    <option disabled selected value></option>
                                    {ages.map(item => {
                                        return (
                                            <option>
                                                {item.age_description}
                                            </option>
                                        )
                                    })}
                                </Select>
                            </div>

                        </Modal.Body>
                        <Modal.Footer>
                            <Button type='submit'>add</Button>
                            <Button color='failure' outline={true} onClick={() => setShow(false)}>cancel</Button>
                        </Modal.Footer>
                    </form>
                </Modal>
            </React.Fragment>
        </>
    )
}

export default AddBook