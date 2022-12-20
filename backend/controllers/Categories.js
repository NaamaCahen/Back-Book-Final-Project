import db from "../config/elephantsql.js"

export const getCategories=(req,res)=>{
    db('categories')
    .select('*')
    .then(rows=>res.json(rows))
    .catch(e=>{
        res.status(404).json({msg:e.message});
    })
}

export const getAges=(req,res)=>{
    db('ages')
    .select('*')
    .then(rows=>res.json(rows))
    .catch(e=>{
        res.status(404).json({msg:e.message});
    })
}