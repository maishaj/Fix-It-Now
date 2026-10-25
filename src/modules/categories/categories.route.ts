import { Router } from "express";
import { categoryController } from "./categories.controller";

const router=Router();

router.get("/",categoryController.getAllCategories);
router.post("/create",categoryController.createCategory);

export const categoryRoutes=router;