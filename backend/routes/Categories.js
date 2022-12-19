import express from "express";
import { getCategories } from "../controllers/Categories.js";

export const router=express.Router();

router.get('/categories',getCategories)