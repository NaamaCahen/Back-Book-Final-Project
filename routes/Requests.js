import express from 'express';
import { acceptRequest, cancelRequest, getMyRequests, newRequest } from '../controllers/Requests.js';
import { VerifyToken } from '../middlewares/VerifyToken.js';

export const reqRouter=express.Router();

reqRouter.post('/request', newRequest);
reqRouter.post('/acceptReq', acceptRequest)
reqRouter.delete('/request',cancelRequest)
reqRouter.get('/request/:id',getMyRequests)