
import { ServicesWhereInput } from "../../../prisma/generated/prisma/models";
import { prisma } from "../../lib/prisma"
import { IServicePayload, IServiceQuery } from "./services.interface"

const createService=async(id:string,payload:IServicePayload)=>{

    //Step 01: Checking if technician is logged in
    const technician=await prisma.technicianProfiles.findUniqueOrThrow({
        where:{
            userId:id
        }
    })

    //Step 02: Checking whether the requested category exists
    const category=await prisma.categories.findUnique({
        where:{
            id:payload.categoryId
        }
    })
    if(!category){
        throw new Error("Category not found. Please select an existing category.");
    }

    //Step 03: Create new Service

    const newService=await prisma.services.create({
        data:{
            technicianId:technician.id,
            categoryId:category.id,
            title:payload.title,             
            description:payload.description,  
            price:payload.price,            
            pricingType: payload.pricingType, 
            estimatedDuration:payload.estimatedDuration
        },
        include:{
            category:true,
            technician:true
        }
    })

    return newService;
}

const getAllServices=async(query:IServiceQuery)=>{

    const andConditions:ServicesWhereInput[]=[];

    //Filter by type (service name)
    if(query.type){
       andConditions.push({
          title:{
            contains:query.type,
            mode:"insensitive"
          }
       })
    }

    //Filter by Technician location
    if(query.location){
      andConditions.push({
         technician:{
            is:{
                serviceArea:{
                    contains:query.location,
                    mode:"insensitive"
                }
            }
         }
      })
    }

    //Filter by Technician Rating
    if(query.rating){
       andConditions.push({
        technician:{
            is:{
                averageRating:Number(query.rating)
            }
        }
       })
    }

    // Active Services only
    andConditions.push({
        isActive:true
    })

    const services=await prisma.services.findMany({
        where:{
           AND:andConditions
        },
        include:{
           technician:{
            include:{
                user:{
                    select:{
                        id:true,
                        name:true,
                        profileImage:true
                    }
                }
            }
           },
        },
        orderBy:{
          createdAt:"desc"
        }
    })
    
    return services;
}

export const serviceService={
    getAllServices,
    createService
}

