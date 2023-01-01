import express from "express";
import { getAges, getAssigningStatus, getBookStatus, getCategories } from "../controllers/Categories.js";
import { VerifyToken } from "../middlewares/VerifyToken.js";

export const router=express.Router();

router.get('/categories',getCategories)
router.get('/ages',getAges)
router.get('/bookStatus',getBookStatus)//not necessary
router.get('/assigningStatus',getAssigningStatus)