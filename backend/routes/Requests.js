import express from 'express';
import { acceptRequest, cancelRequest, getMyRequests, newRequest } from '../controllers/Requests.js';
import { VerifyToken } from '../middlewares/VerifyToken.js';

export const reqRouter=express.Router();

reqRouter.post('/request', newRequest);
reqRouter.post('/acceptReq',VerifyToken, acceptRequest)
reqRouter.delete('/request',VerifyToken,cancelRequest)
reqRouter.get('/request/:id',getMyRequests)