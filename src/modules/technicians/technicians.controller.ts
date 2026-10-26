import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { technicianService } from "./technicians.service";


const updateTechnicianProfile=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    const id=req.user!.id;
    const payload=req.body;

    const result=await technicianService.updateTechnicianProfile(id as string,payload);

    sendResponse(res,{
        success:true,
        statusCode:httpStatus.OK,
        message:"Technician's profile is updated successfully.",
        data:{
            result
        }
    })
})

const updateTechnicianAvailabilitySlots=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{

   const id=req.user!.id;
   const payload=req.body.availability;

   const result=await technicianService.updateTechnicianAvailabilitySlots(id as string,payload);

   sendResponse(res,{
    success:true,
    statusCode:httpStatus.OK,
    message:"Technician updated their slots successfully.",
    data:{
        result
    }
   })
})

const getAllTechnicians=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{

    const query=req.query;
    const result=await technicianService.getAllTechnicians(query);

    sendResponse(res,{
       success:true,
       statusCode:httpStatus.OK,
       message:"All technicians retrieved successfully",
       data:{
        result
       }
    });
})

const getTechnicianProfileById=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{

})

const getAllTechnicianBookings=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
   
})

const updateTechnicianBookingStatus=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{

})


export const technicianController={
    getAllTechnicians,
    getTechnicianProfileById,
    updateTechnicianProfile,
    updateTechnicianAvailabilitySlots,
    getAllTechnicianBookings,
    updateTechnicianBookingStatus,
}