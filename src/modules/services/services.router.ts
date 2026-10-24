import { Router } from "express";
import { serviceController } from "./services.controller";

const router=Router();

router.get("/",serviceController.getAllServices);

export const serviceRoutes=router;