import express from 'express';
import { acceptRequest, cancelRequest, newRequest } from '../controllers/Requests.js';
import { VerifyToken } from '../middlewares/VerifyToken.js';

export const reqRouter=express.Router();

reqRouter.post('/request',VerifyToken, newRequest);
reqRouter.post('/acceptReq',VerifyToken, acceptRequest)
reqRouter.delete('/request',VerifyToken,cancelRequest)