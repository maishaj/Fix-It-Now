import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { categoryService } from "./categories.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

const getAllCategories=catchAsync(async(req:Request, res:Response, next:NextFunction)=>{
    const result=await categoryService.getAllCategories();

    sendResponse(res,{
        success:true,
        statusCode:httpStatus.OK,
        message:"All categories retrieved successfully.",
        data:{
           result
        }
    })
})

const createCategory=catchAsync(async(req:Request, res:Response, next:NextFunction)=>{
     const payload=req.body;
     const result=await categoryService.createCategory(payload);

     sendResponse(res,{
        success:true,
        statusCode:httpStatus.CREATED,
        message:"Service category created successfully.",
        data:{
           result
        }
     })
})

export const categoryController={
    getAllCategories,
    createCategory
}
