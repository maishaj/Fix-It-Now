import { Router } from "express";
import { technicianController } from "./technicians.controller";

const router=Router();

router.get("/",technicianController.getAllTechnicians);
router.get("/:id",technicianController.getTechnicianProfileById);
router.put("/profile/:id",technicianController.updateTechnicianProfileById);
router.put("/availability/:id",technicianController.updateTechnicianAvailabilitySlotsById);
router.get("/bookings",technicianController.getAllTechnicianBookings);
router.patch("/bookings/:id",technicianController.updateTechnicianBookingStatus);

export const technicianRoutes=router;
