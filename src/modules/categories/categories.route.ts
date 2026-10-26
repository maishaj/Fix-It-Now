import { Router } from "express";
import { categoryController } from "./categories.controller";
import { auth } from "../../middlewares/auth";

const router=Router();

router.post("/create",auth("ADMIN"),categoryController.createCategory);
router.get("/",auth("ADMIN"),categoryController.getAllCategories);

export const categoryRoutes=router;