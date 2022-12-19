
import express from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import jwt_decode from 'jwt-decode';
import db from "../config/elephantsql.js";

export const register=async(req,res)=>{
    const {email,password,user_first_name,user_last_name,country,city,street,num_house,phone} =req.body;

    const salt=await bcrypt.genSalt();
    const hash=await bcrypt.hash(password,salt);

    db('users').insert({
        email:email.toLowerCase(),
        password:hash,
        user_first_name,
        user_last_name,
        country,
        city,
        street,
        num_house,
        phone
    }).returning('*')
    .then(rows=>{
        res.json(rows)
    })
    .catch(e=>{
        console.log(e);
        res.status(404).json({msg:'email already exists'})
    })

        
}


