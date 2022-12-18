import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './config/elephantsql.js';
import cookieParser from 'cookie-parser';

const app=express();
dotenv.config();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.listen(process.env.PORT || 8080 ,()=>{
    console.log(`server running on ${process.env.PORT||8080}`);
})

