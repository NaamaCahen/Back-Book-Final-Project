import express from 'express';
import { getBooks, newBook,getMyBooks, newBookAssigning, share } from '../controllers/Books.js';
import { VerifyToken } from '../middlewares/VerifyToken.js';

export const booksRouter=express.Router();

booksRouter.get('/books/:id', getBooks);
booksRouter.post('/books',newBook);
booksRouter.post('/bookAssign',newBookAssigning);
booksRouter.get('/myBooks/:id',getMyBooks);
booksRouter.post('/share',share);