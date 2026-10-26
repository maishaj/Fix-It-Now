import { Router } from "express";
import { technicianController } from "./technicians.controller";
import { auth } from "../../middlewares/auth";

const router=Router();

router.put("/profile",auth("TECHNICIAN"),technicianController.updateTechnicianProfile);
router.put("/availability",auth("TECHNICIAN"),technicianController.updateTechnicianAvailabilitySlots);
router.get("/",technicianController.getAllTechnicians);
router.get("/:id",technicianController.getTechnicianProfileById);
router.get("/bookings",technicianController.getAllTechnicianBookings);
router.patch("/bookings/:id",technicianController.updateTechnicianBookingStatus);

export const technicianRoutes=router;
