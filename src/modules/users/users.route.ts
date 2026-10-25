import { Router } from "express";
import { userController } from "./users.controller";

const router=Router();

router.get("/",userController.getAllUsers);
router.patch("/:id",userController.updateUserStatus);

export const userRoutes=router;