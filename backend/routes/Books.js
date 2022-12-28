import express from 'express';
import { getBooks, newBook,getMyBooks, newBookAssigning } from '../controllers/Books.js';
import { VerifyToken } from '../middlewares/VerifyToken.js';

export const booksRouter=express.Router();

booksRouter.get('/books', getBooks);
booksRouter.post('/books',newBook);
booksRouter.post('/bookAssign',newBookAssigning);
booksRouter.get('/books/:id',getMyBooks);