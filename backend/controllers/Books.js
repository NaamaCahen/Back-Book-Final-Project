import db from "../config/elephantsql.js";

export const getBooks = async (req, res) => {
    db('books')
        .join('book_assigning', 'books.book_id', '=', 'book_assigning.book_id')
        .join('users', 'users.user_id', '=', 'book_assigning.user_id')
        .join('categories', 'books.category', '=', 'categories.category_id')
        .join('ages', 'books.age', '=', 'ages.age_id')
        .join('assigning_status', 'assigning_status.status_id', '=', 'book_assigning.status')
        .join('books_status', 'books_status.status_id', '=', 'books.book_status')
        .select(
            'books.book_id',
            'books.title',
            'books.author_first_name',
            'books.author_last_name',
            'books_status.status_description',
            'categories.category_name',
            'ages.age_description',
            'book_assigning.book_assigning_id',
            'users.user_id',
            'assigning_status.status_name',
            'book_assigning.requestedat',
            'book_assigning.receivedat',
            'book_assigning.givenat',
            'book_assigning.addedat',
            'users.email',
            'users.user_first_name',
            'users.user_last_name',
            'users.country',
            'users.city',
            'users.street',
            'users.num_house',
            'users.phone'
        )
        .where('books_status.status_description', '=', 'for sharing')
        .then(rows => res.json(rows))
        .catch(e => {
            console.log(e);
            res.status(404).json({ msg: e.message });
        })

}

//add a new book (adding also a row in books_assignment)
export const newBook = (req, res) => {
    let book_id;
    const { title, author_first_name, author_last_name, category, book_status, age, user_id } = req.body;
    db('books')
        .insert(title, author_first_name, author_last_name, category, book_status, age)
        .returning('*')
        .then(rows => {
            book_id = rows[0].book_id;
            res.json(rows)
        })
        .catch(e => res.status(404).json({ msg: e.message }));

    newBookAssigning(book_id, user_id, 4, new Date());
}

const newBookAssigning = (book_id, user_id, status, date) => {
    let day = date.getDay();
    day < 10 ? day = '0' + day : day;
    let month = date.getMonth();
    month < 10 ? month = '0' + month : month;
    const year = date.getFullYear();
    const addedat = `${year}-${month}-${day}`
    db('book_assigning')
        .insert(user_id, book_id, status, addedat)

}

export const getMyBooks = (req, res) => {
    const {id}=req.params;
    db('books')
        .join('book_assigning', 'books.book_id', '=', 'book_assigning.book_id')
        .join('users', 'users.user_id', '=', 'book_assigning.user_id')
        .join('categories', 'books.category', '=', 'categories.category_id')
        .join('ages', 'books.age', '=', 'ages.age_id')
        .join('assigning_status', 'assigning_status.status_id', '=', 'book_assigning.status')
        .join('books_status', 'books_status.status_id', '=', 'books.book_status')
        .select(
            'books.book_id',
            'books.title',
            'books.author_first_name',
            'books.author_last_name',
            'books_status.status_description',
            'categories.category_name',
            'ages.age_description',
            'book_assigning.book_assigning_id',
            'users.user_id' ,
            'assigning_status.status_name',
            'book_assigning.requestedat',
            'book_assigning.receivedat',
            'book_assigning.givenat',
            'book_assigning.addedat',
            'users.email',
            'users.user_first_name',
            'users.user_last_name',
            'users.country',
            'users.city',
            'users.street',
            'users.num_house',
            'users.phone'
        )
        .where({'users.user_id':id})
        .then(rows => res.json(rows))
        .catch(e => {
            console.log(e);
            res.status(404).json({ msg: e.message });
        })
}