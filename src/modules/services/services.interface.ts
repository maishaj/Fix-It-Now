import { Prisma } from "../../../generated/prisma/client";
import { pricingType } from "../../../prisma/generated/prisma/enums";

export interface IServiceQuery{
    type?:string;
    location?:string;
    rating?:number
}

export interface IServicePayload{
  categoryId: string
  title:string             
  description:string     
  price:Prisma.Decimal | number             
  pricingType?: pricingType 
  estimatedDuration: number
}