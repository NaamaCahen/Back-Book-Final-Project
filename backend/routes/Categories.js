import express from "express";
import { getAges, getCategories } from "../controllers/Categories.js";

export const router=express.Router();

router.get('/categories',getCategories)
router.get('/ages',getAges)