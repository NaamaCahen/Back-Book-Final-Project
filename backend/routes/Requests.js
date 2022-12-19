import express from 'express';
import { acceptRequest, cancelRequest, newRequest } from '../controllers/Requests.js';

export const reqRouter=express.Router();

reqRouter.post('/request',newRequest);
reqRouter.post('/acceptReq',acceptRequest)
reqRouter.delete('/request',cancelRequest)