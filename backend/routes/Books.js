import express from 'express';
import { getBooks } from '../controllers/Books.js';

export const booksRouter=express.Router();

booksRouter.get('/books',getBooks);