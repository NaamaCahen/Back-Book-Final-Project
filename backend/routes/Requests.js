import express from 'express';
import { newRequest } from '../controllers/Requests.js';

export const reqRouter=express.Router();

reqRouter.post('/request',newRequest);