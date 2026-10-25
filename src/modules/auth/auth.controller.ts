import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { authService } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

const registerUser=catchAsync(async(req:Request, res:Response, next:NextFunction)=>{

    const payload=req.body;
    const user=await authService.registerUser(payload);
    
    sendResponse(res,{
        success:true,
        statusCode:httpStatus.CREATED,
        message:"You registered into Fix It Now successfully.",
        data:{
            user
        }
    });

});

const loginUser=catchAsync(async(req:Request, res:Response, next:NextFunction)=>{

    const payload=req.body;
    const {accessToken, refreshToken, user}=await authService.loginUser(payload);

    res.cookie("accessToken",accessToken,{
        httpOnly:true,
        secure:false,
        sameSite:"none",
        maxAge:1000*60*60*24
    })

    res.cookie("refreshToken",refreshToken,{
        httpOnly:true,
        secure:false,
        sameSite:"none",
        maxAge:1000*60*60*24*7
    })

    sendResponse(res,{
        success:true,
        statusCode:httpStatus.OK,
        message:"You logged in successfully.",
        data:{
            user
        }
    })
})

const refreshToken=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{

    const refreshToken=req.cookies.refreshToken;
    
    const {accessToken}=await authService.refreshToken(refreshToken);

    res.cookie("accessToken",accessToken,{
        httpOnly:true,
        secure:false,
        sameSite:"none",
        maxAge:1000*60*60*24
    })

    sendResponse(res,{
        success:true,
        statusCode:httpStatus.OK,
        message:"Token refreshed successfully",
        data:{
            accessToken
        }
    })
})

const getMe=catchAsync(async(req:Request, res:Response, next:NextFunction)=>{

})

export const authController={
    registerUser,
    loginUser,
    getMe,
    refreshToken
}
