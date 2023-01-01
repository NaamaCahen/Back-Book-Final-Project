import express from 'express';
import { login, logout, register, token, updateProfile, userById } from '../controllers/Users.js';
import { VerifyToken } from '../middlewares/VerifyToken.js';

 export const users_router=express.Router();

users_router.post('/register',register);
users_router.post('/login',login);
users_router.get('/user/:id',userById);
users_router.delete('/logout',logout);
users_router.get('/token',VerifyToken,token);
users_router.put('/updateProfile',updateProfile);