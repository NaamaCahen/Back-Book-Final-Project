import express from 'express';
import { login, register } from '../controllers/Users.js';

 export const users_router=express.Router();

users_router.post('/register',register);
users_router.post('/login',login);