import express from 'express';
import { login, register, token } from '../controllers/Users.js';
import { VerifyToken } from '../middlewares/VerifyToken.js';

 export const users_router=express.Router();

users_router.post('/register',register);
users_router.post('/login',login);
users_router.get('/token',VerifyToken,token);