import { Router } from "express";
import { userController } from "./users.controller";
import { auth } from "../../middlewares/auth";

const router=Router();

router.get("/",auth("ADMIN"),userController.getAllUsers);
router.patch("/:id",auth("ADMIN"),userController.updateUserStatus);


export const userRoutes=router;
