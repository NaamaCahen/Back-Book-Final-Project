import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './config/elephantsql.js';
import cookieParser from 'cookie-parser';
import { router } from './routes/Categories.js';
import { booksRouter } from './routes/Books.js';
import { users_router } from './routes/Users.js';
import { reqRouter } from './routes/Requests.js';
import path from 'path'

const app=express();
dotenv.config();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(router);
app.use(booksRouter);
app.use(users_router);
app.use(reqRouter);

app.listen(process.env.PORT || 8080 ,()=>{
    console.log(`server running on ${process.env.PORT||8080}`);
})

const __dirname=path.resolve();

app.use(express.static(path.join(__dirname,'./client/build')))

app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'./client/build','index.html'))
})