import { Router } from "express";
import { authController } from "./auth.controller";
import { auth } from "../../middlewares/auth";

const router=Router();

//Register new user
router.post("/register",authController.registerUser);

//Login user
router.post("/login",authController.loginUser);

//Refresh Token
router.post("refresh-token",authController.refreshToken);

//Get current authenticated user
router.get("/me",auth(),authController.getMe)


export const authRoutes=router;

