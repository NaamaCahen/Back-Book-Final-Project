import React from 'react'

function Book(props) {
    return (
        <>
            <div >
                <h3>title: {props.book.title}</h3>
                <p>author: {props.book.author_first_name} {props.book.author_last_name}</p>
                <p>location: {props.book.num_house} {props.book.street} st. {props.book.city},{props.book.country}</p>
            </div>
        </>
    )
}

export default Book