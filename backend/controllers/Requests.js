import db from "../config/elephantsql.js"

export const newRequest = (req, res) => {
    const { user_id, book_id, status, requestedat,from_user } = req.body;
    db('book_assigning')
        .insert({ user_id, book_id, status, requestedat,from_user })
        .returning('*')
        .then(rows => res.json(rows))
        .catch(e => {
            console.log(e);
            res.status(404).json({ msg: e.message });
        })
}


export const acceptRequest = async (req,res) => {
    const { book_assigning_id, receivedat,from_user } = req.body;
    try {
      await db.transaction(async trx => {
        try {
  
            let ret = await trx('book_assigning')
                    .where({ book_assigning_id:book_assigning_id })
                    .update({
                        status:2 ,
                        receivedat,
                    })
                    .returning('*');
            console.log(ret);
  
            ret = await trx('book_assigning')
                    .where({ user_id:from_user ,book_id:ret[0].book_id})
                    .update({
                        status:3 ,
                        givenat: receivedat,
                    })
                    .returning('*');
  
            console.log(ret);
  
            ret = await trx('books')
                    .where({ book_id: ret[0].book_id })
                    .update({
                        book_status:2
                    })
                    .returning('*');
              console.log(ret);
  
  
          trx.commit;
          res.json({msg:'request accepted!'})
  
        } catch (e) {
          trx.rollback
          console.log(e);
          res.status(404).json({msg:e.message})
        }
      });
    } catch (error) {
      // If we get here, that means that neither the 'Old Books' catalogues insert,
      // nor any of the books inserts will have taken place.
      console.error(error);
      res.status(404).json({msg:e.message})
    }
  }


export const cancelRequest = (req, res) => {
    const { book_assigning_id } = req.body;
    db('book_assigning')
        .where({
            book_assigning_id
        })
        .del()
        .returning('*')
        .then(rows => res.json(rows))
        .catch(e => res.status(404).json({ msg: e.message }))
}

export const getMyRequests = (req, res) => {
    const { id } = req.params;
    db('book_assigning')
        .select('*')
        .where({
            from_user: id,
            status: 1
        })
        .then(rows=>res.json(rows))
        .catch(e => res.status(404).json({ msg: e.message }))
}