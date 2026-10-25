import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";

const getAllCategories=catchAsync(async(req:Request, res:Response, next:NextFunction)=>{
     
})

const createCategory=catchAsync(async(req:Request, res:Response, next:NextFunction)=>{
     
})

export const categoryController={
    getAllCategories,
    createCategory
}
