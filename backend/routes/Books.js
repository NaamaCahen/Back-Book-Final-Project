import express from 'express';
import { getBooks, newBook } from '../controllers/Books.js';

export const booksRouter=express.Router();

booksRouter.get('/books',getBooks);
booksRouter.post('/books',newBook);