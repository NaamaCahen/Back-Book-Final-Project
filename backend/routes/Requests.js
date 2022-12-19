import express from 'express';
import { acceptRequest, newRequest } from '../controllers/Requests.js';

export const reqRouter=express.Router();

reqRouter.post('/request',newRequest);
reqRouter.post('/acceptReq',acceptRequest)