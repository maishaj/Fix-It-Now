import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { userService } from "./users.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

const getAllUsers=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
   const result=await userService.getAllUsers();

   sendResponse(res,{
    success:true,
    statusCode:httpStatus.OK,
    message:"All users retrieved successfully.",
    data:{
        result
    }
   })
})

const updateUserStatus=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
   const id=req.params.id;
   const status=req.body.status;

   const result=await userService.updateUserStatus(id as string,status);

   sendResponse(res,{
    success:true,
    statusCode:httpStatus.OK,
    message:"User status updated successfully.",
    data:{
        result
    }
   })

})

export const userController={
    getAllUsers,
    updateUserStatus
}