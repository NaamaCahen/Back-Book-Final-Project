import db from "../config/elephantsql.js"

export const newRequest = (req, res) => {
    const { user_id, book_id, status, requestedat } = req.body;
    db('book_assigning')
        .insert(user_id, book_id, status, requestedat)
        .returning('*')
        .then(rows => res.json(rows))
        .catch(e => {
            console.log(e);
            res.status(404).json({ msg: e.message });
        })
}

export const acceptRequest = (req, res) => {
    const { book_assigning_id,receivedat user_id, book_id } = req.body;
    db('book_assigning')
        .where({ book_assigning_id: book_assigning_id })
        .update({
            status: (db('assigning_status').where({ status_name: 'received' }).returning('status_id')),
            receivedat:receivedat
        })

    giveBook(user_id, book_id,receivedat);
}

const giveBook = (user_id, book_id,givenat) => {
    // const date=new Date();
    // let day=date.getDay();
    // if(day<10){day='0'+day}
    // let month=date.getMonth();
    // if(month<10){month='0'+month};
    // const year=date.getFullYear();
    // const givenat=`${year}-${month}-${day}`
    db('book_assigning')
        .where({ user_id, book_id })
        .update({
            status: (db('assigning_status').where({ status_name: 'given' }).returning('status_id')),
            givenat:givenat
        })
}

