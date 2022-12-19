import db from "../config/elephantsql.js"

export const newRequest=(req,res)=>{
    const {user_id,book_id,status,requestedat}=req.body;
    db('book_assigning')
    .insert(user_id,book_id,status,requestedat)
    .returning('*')
    .then(rows=>res.json(rows))
    .catch(e=>{
        console.log(e);
        res.status(404).json({msg:e.message});
    })
}