import { Prisma } from "../../../generated/prisma/client";
import { pricingType } from "../../../prisma/generated/prisma/enums";

export interface ITechnicianProfilePayload{
  bio?:string;            
  experienceYears:number
  skills:string[]          
  serviceArea:string    
  address:string        
  hourlyRate:Prisma.Decimal | number 
  availability: Prisma.InputJsonValue
}

export interface ITechnicianQuery{         
  experienceYears?:number
  skills?:string[]          
  serviceArea?:string  
  hourlyRate?:Prisma.Decimal | number 
  availability?: Prisma.InputJsonValue
}