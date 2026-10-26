import { prisma } from "../../lib/prisma";
import { ICategoryPayload } from "./categories.interface"

const getAllCategories=async()=>{
   const result=await prisma.categories.findMany();
   return result;
}

const createCategory=async(payload:ICategoryPayload)=>{
    const {name,slug,description,imageUrl}=payload;
    
    const newCategory=await prisma.categories.create({
        data:{
            name:payload.name,
            slug:payload.slug,
            description:payload.description,
            imageUrl:payload.imageUrl
        }
    })

    return newCategory;
}

export const categoryService={
    getAllCategories,
    createCategory
}
