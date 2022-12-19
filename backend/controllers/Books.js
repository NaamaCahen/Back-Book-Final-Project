import db from "../config/elephantsql.js";

export const getBooks =async  (req, res) => {
    try {
        const rows = await db('books').select('*');
       res.json(rows);
    } catch (e) {
         res.status(404).json({ msg: e.message })
    }

}

//add a new book (adding also a row in books_assignment)
export const newBook=(req,res)=>{
    let book_id;
    const {title,author_first_name,author_last_name,category,book_status,age,user_id}=req.body;
    db('books')
    .insert(title,author_first_name,author_last_name,category,book_status,age)
    .returning('*')
    .then(rows=>{
        book_id=rows[0].book_id;
        res.json(rows)
    })
    .catch(e=>res.status(404).json({msg:e.message}));

    newBookAssigning(book_id,user_id,4,new Date());
}

const newBookAssigning=(book_id,user_id,status,date)=>{
    let day=date.getDay();
    day<10?day='0'+day:day;
    let month=date.getMonth();
    month<10?month='0'+month:month;
    const year=date.getFullYear();
    const addedat=`${year}-${month}-${day}`
    db('book_assigning')
    .insert(user_id,book_id,status,addedat)
    .returning('*')
    .then(rows=>res.json(rows))
    .catch(e=>{
        console.log(e);
        res.status(404).json({msg:e.message});
    })
}