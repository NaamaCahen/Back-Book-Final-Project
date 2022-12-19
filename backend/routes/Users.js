import express from 'express';
import { register } from '../controllers/Users.js';

 export const users_router=express.Router();

users_router.post('/register',register)