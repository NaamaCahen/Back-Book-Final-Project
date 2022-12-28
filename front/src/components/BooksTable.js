import React from 'react'
import { Table } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';

function BooksTable(props) {
    const myBooks = useSelector(state => state.books.myBooks)
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
                                        {(item.addedat || item.receivedat||item.requestedat).substr(0, 10)}
                                    </Table.Cell>

                                </Table.Row>
                            )
                        })}
                </Table.Body>
            </Table>
        </>
    )
}

export default BooksTable