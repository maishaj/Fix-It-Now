import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import config from "../../config";
import { ILoginUser, IRegisterUser } from "./auth.interface";
import { jwtUtils } from "../../utils/jwt";
import { JwtPayload, SignOptions } from "jsonwebtoken";

const registerUser=async(payload:IRegisterUser)=>{
    const {name,email,password,phone,profileImage}=payload;

    //Step 01: Check if user already exists
    const isUserExists=await prisma.users.findUnique({
        where:{
            email
        }
    })
    if(isUserExists){
        throw new Error("User with this email already exists!");
    }

    //Step 02: If user doesn't exist, hash the password
    const hashedPassword=await bcrypt.hash(password, Number(config.bcrypt_salt_rounds));

    //Step 03: Create User
    const createdUser=await prisma.users.create({
        data:{
            name,
            email,
            password:hashedPassword,
            phone,
            profileImage
        }
    });

    // Step 04: Sending response after omitting password
    const user=await prisma.users.findUnique({
        where:{
            id:createdUser.id,
        },
        omit:{
            password:true
        }
    })
    return user;
}

const loginUser=async(payload:ILoginUser)=>{
   const {email,password}=payload;

   // Step 01: Check if user exists
   const user=await prisma.users.findUniqueOrThrow({
    where:{
        email
    },
   });

   // Step 02: Check if password is correct or not
   const isPasswordMatched=await bcrypt.compare(password,user.password);
   if(!isPasswordMatched){
     throw new Error("You provided wrong password. Please try again!");
   }

   // Step 03: Jwt Payload
   const JwtPayload={
      id:user.id,
      name:user.name,
      email:user.email,
      role:user.role
   }

   // Step 04: Implementing Access Token
   const accessToken=jwtUtils.createToken(JwtPayload, config.jwt_access_secret as string, config.jwt_access_expires_in as SignOptions);

   // Step 05: Implementing Refresh Token
   const refreshToken=jwtUtils.createToken(JwtPayload, config.jwt_refresh_secret as string, config.jwt_refresh_expires_in as SignOptions)

   return{
    accessToken,
    refreshToken,
    user
   }
}

const refreshToken=async(refreshToken:string)=>{

    //Step 01: Verify Refresh Token
    const verifiedRefreshToken=jwtUtils.verifyToken(refreshToken, config.jwt_refresh_secret as string);
    if(!verifiedRefreshToken.success){
        throw new Error(verifiedRefreshToken.error);
    }

    //Step 02: Generating Access Token
    const {id}=verifiedRefreshToken.data as JwtPayload;

    const user=await prisma.users.findUniqueOrThrow({
        where:{
            id
        }
    });

    const JwtPayload={
        id,
        name:user.name,
        email:user.email,
        role:user.role
    }

    const accessToken=jwtUtils.createToken(JwtPayload, config.jwt_access_secret as string, config.jwt_access_expires_in as SignOptions);

    return {
        accessToken
    }
    
}

const getMe=async(id:string)=>{
    const user=await prisma.users.findUniqueOrThrow({
        where:{
            id
        },
        select:{
            id:true,
            name:true,
            email:true,
            phone:true,
            profileImage:true,
            role:true,
            status:true
        }
    });
    return user;
}

export const authService={
    registerUser,
    loginUser,
    getMe,
    refreshToken
}
