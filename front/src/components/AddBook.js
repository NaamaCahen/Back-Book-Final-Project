import React, { useEffect } from 'react'
import { Button, Label, Modal, Select, TextInput } from 'flowbite-react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAges, fetchCategories, fetchMyBooks } from '../redux/booksSlice'

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

    const handleSubmit = (e) => {
        e.preventDefault();
        setShow(false);
        
        //find the category id and age id
        const category=categories.filter(item=>item.category_name=== e.target.categories.value)[0].category_id
        const age=ages.filter(item=>item.age_description=== e.target.ages.value)[0].age_id
        
        const book={
            title:e.target.title.value,
            author_first_name:e.target.firstName.value,
            author_last_name:e.target.lastName.value,
            category,
            book_status:1,
            age,
        } 
        console.log(book);
         addBook(book);
        
        // dispatch(fetchMyBooks());
        
    // let day = date.getDay();
    // day < 10 ? day = '0' + day : day;
    // let month = date.getMonth();
    // month < 10 ? month = '0' + month : month;
    // const year = date.getFullYear();
    // const addedat = `${year}-${month}-${day}`

    }

    const addBook=async(book)=>{
        const response=await fetch('http://localhost:4000/books',{
            method:'POST',
            headers:{
              'Content-Type': 'application/json'
          },
          body:JSON.stringify(book)
          })
          return await response.json()
        }
    

    return (
        <>
            <React.Fragment>
                <Button gradientDuoTone='purpleToBlue' onClick={() => setShow(true)}>add new book</Button>
                <Modal show={show} onClose={() => setShow(false)} popup={true} size='sm'>
                    <form onSubmit={handleSubmit}>
                        <Modal.Header>
                            Add a Book
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
                                            <option key={item.category_id}>
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
                                            <option key={item.age_id}>
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