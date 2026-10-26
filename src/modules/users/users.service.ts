import { userStatus } from "../../../prisma/generated/prisma/enums";
import { prisma } from "../../lib/prisma"

const getAllUsers=async()=>{
   const result=await prisma.users.findMany({
    omit:{
        password:true
    }
   });
   return result;
}

const updateUserStatus=async(id:string, status:userStatus)=>{
    const result=await prisma.users.update({
        where:{
            id
        },
        data:{
            status
        }
    })
    return result;
}

export const userService={
    getAllUsers,
    updateUserStatus
}