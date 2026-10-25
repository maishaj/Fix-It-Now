import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";

const getAllTechnicians=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{

})

const getTechnicianProfileById=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{

})

const updateTechnicianProfileById=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{

})

const updateTechnicianAvailabilitySlotsById=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{

})

const getAllTechnicianBookings=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
   
})

const updateTechnicianBookingStatus=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{

})


export const technicianController={
    getAllTechnicians,
    getTechnicianProfileById,
    updateTechnicianProfileById,
    updateTechnicianAvailabilitySlotsById,
    getAllTechnicianBookings,
    updateTechnicianBookingStatus
}