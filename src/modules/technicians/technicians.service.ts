import { Prisma } from "../../../generated/prisma/client";
import { TechnicianProfilesWhereInput } from "../../../prisma/generated/prisma/models";
import { prisma } from "../../lib/prisma";
import { ITechnicianProfilePayload, ITechnicianQuery } from "./technician.interface"

const updateTechnicianProfile=async(id:string,payload:ITechnicianProfilePayload)=>{
   const result=await prisma.technicianProfiles.upsert({
    where:{
        userId:id
    },
    create:{
        user:{
            connect:{
                id
            }
        },
        bio:payload.bio,
        experienceYears:payload.experienceYears,
        availability:payload.availability,
        skills:payload.skills,
        serviceArea:payload.serviceArea,
        address:payload.address,
        hourlyRate:payload.hourlyRate
    },

    update:payload

   });

   return result;
}

const updateTechnicianAvailabilitySlots=async(id:string,payload:Prisma.InputJsonValue)=>{
    const result=await prisma.technicianProfiles.update({
        where:{
            userId:id
        },
        data:{
            availability:payload
        },
    })
    return result;
}

const getAllTechnicians=async(query:ITechnicianQuery)=>{
    const andConditions:TechnicianProfilesWhereInput[]=[];

    if(query.experienceYears){
        andConditions.push({
            experienceYears:{
                gte:Number(query.experienceYears)
            }
        })
    }

    if(query.serviceArea){
        andConditions.push({
            serviceArea:{
                contains:query.serviceArea,
                mode:"insensitive"
            }
        })
    }

    if(query.hourlyRate){
         andConditions.push({
            hourlyRate:{
                gte:Number(query.hourlyRate)
            }
        })
    }

    if(query.availability){
        andConditions.push({
            availability:{
                array_contains:[{day:query.availability}]
            }
        } )
    }

    if(query.skills){

        const rawskills=query.skills;

        const skills=(Array.isArray(rawskills)? rawskills:[rawskills])
        .map((skill)=>skill.trim())
        .filter(Boolean);

        if(skills.length>0){
            andConditions.push({
                skills:{
                    hasSome:skills
                }
            })
        }
    }

    const result=await prisma.technicianProfiles.findMany({
       where:{
        AND:andConditions
       },
       include:{
        user:true,
        services:true
       }
    });

    return result;

}

const getTechnicianProfileById=async()=>{

}

const getAllTechnicianBookings=async()=>{
    
}

const updateTechnicianBookingStatus=async()=>{
    
}


export const technicianService={
    getAllTechnicians,
    getTechnicianProfileById,
    updateTechnicianProfile,
    updateTechnicianAvailabilitySlots,
    getAllTechnicianBookings,
    updateTechnicianBookingStatus,
}
