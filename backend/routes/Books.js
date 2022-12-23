import express from 'express';
import { getBooks, newBook } from '../controllers/Books.js';
import { VerifyToken } from '../middlewares/VerifyToken.js';

export const booksRouter=express.Router();

booksRouter.get('/books', getBooks);
booksRouter.post('/books',newBook);