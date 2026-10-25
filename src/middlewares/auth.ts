import { NextFunction, Request, Response } from "express";
import { Role } from "../../prisma/generated/prisma/enums";
import { catchAsync } from "../utils/catchAsync";
import { jwtUtils } from "../utils/jwt";
import config from "../config";
import { JwtPayload } from "jsonwebtoken";
import { prisma } from "../lib/prisma";


declare global{
    namespace Express{
        interface Request{
            user?:{
                id:string,
                name:string,
                email:string,
                role:Role
            }
        }
    }
}


export const auth=(...requiredRoles:Role[])=>{
    return catchAsync(async(req:Request,res:Response,next:NextFunction)=>{

        // 1. Checking if token exists
        const token=req.cookies.accessToken?
        req.cookies.accessToken :
        req.headers.authorization?.startsWith("Bearer ")?
        req.headers.authorization?.split(" ")[1] :
        req.headers.authorization;

        if(!token){
            throw new Error("You are not logged in. Please login to access this resource.");
        }

        // 2. Verifying Token
        const verifiedToken=jwtUtils.verifyToken(token,config.jwt_access_secret as string);
        if(!verifiedToken.success){
            throw new Error(verifiedToken.error);
        }
        
        // 3. Checking if role matches
        const {id,name,email,role}=verifiedToken.data as JwtPayload;
        if(requiredRoles.length && !requiredRoles.includes(role)){
            throw new Error("Forbidden. You don't have permission to access this resource");
        }
        
        // 4. Checking if user exists
        const user=await prisma.users.findUnique({
            where:{
                id
            }
        })
        if(!user){
            throw new Error("User not found. Please login again")
        }
        
        // 5. Checking if the user is ACTIVE or BANNED
        if(user.status === "BANNED"){
            throw new Error("Your account has been banned. Please contact with our support section");
        }

        req.user={
           id,
           name,
           email,
           role
        }

        next();
    })
}

