import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { serviceService } from "./services.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

const createService=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
     const id=req.user!.id;
     const payload=req.body;

     const result=await serviceService.createService(id as string, payload);

     sendResponse(res,{
        success:true,
        statusCode:httpStatus.CREATED,
        message:"Service created successfully",
        data:{
            result
        }
     })
})

const getAllServices=catchAsync(async(req:Request, res:Response, next:NextFunction)=>{

    const query=req.query;
    const result=await serviceService.getAllServices(query);

    sendResponse(res,{
        success:true,
        statusCode:httpStatus.OK,
        message:"All services retrieved successfully",
        data:{
            result
        }
    })
})

export const serviceController={
    getAllServices,
    createService
}