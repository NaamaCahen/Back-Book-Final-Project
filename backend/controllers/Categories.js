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

export const getBookStatus=(req,res)=>{
    db('books_status')
    .select('*')
    .then(rows=>res.json(rows))
    .catch(e=>{
        res.status(404).json({msg:e.message});
    })
}

export const getAssigningStatus=(req,res)=>{
    db('assigning_status')
    .select('*')
    .then(rows=>res.json(rows))
    .catch(e=>{
        res.status(404).json({msg:e.message});
    })
}