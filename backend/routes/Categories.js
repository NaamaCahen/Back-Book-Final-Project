import express from "express";
import { getAges, getAssigningStatus, getBookStatus, getCategories } from "../controllers/Categories.js";

export const router=express.Router();

router.get('/categories',getCategories)
router.get('/ages',getAges)
router.get('/ages',getBookStatus)
router.get('/ages',getAssigningStatus)