import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";
import {PackageStatus} from "@prisma/client";
import { id } from "ethers/lib/utils";


export const packagesRouter = createTRPCRouter({
    newPackage: publicProcedure
    .input(z.object({
        localtracker: z.string(),
        description: z.string(),
        ownerId: z.string()
   

    }))
    .mutation( async({ctx, input}) => {
        try {
        
           
            return await ctx.prisma.package.create({
                data: {
                    localtracker: input.localtracker,
                    description: input.description,
                    owner: { connect: {id: input.ownerId}}
          
                    
                }
            })

        } catch(err) {
            console.log(err)
        }
    }),
   

    allPackages: publicProcedure.query(async( { ctx }) => {
        try {
            const packages = ctx?.prisma?.package?.findMany()
            return packages
        } catch(err) {
            console.log(err)

        }
    }),

    updatePackage: publicProcedure
    .input (z.object({
        id: z.string(),
        status: z.string()
        
    }))
    .mutation(async({ctx, input}) => {
        const {id, status } = input
        let updatedStatus
   
        if (status === PackageStatus.STORAGE) {
            updatedStatus = PackageStatus.STORAGE
        } else if(status === PackageStatus.AWAITS) {
            updatedStatus = PackageStatus.AWAITS
        }else if(status === PackageStatus.DOMESTIC) {
            updatedStatus = PackageStatus.DOMESTIC
        }else if(status === PackageStatus.RECEIPT) {
            updatedStatus = PackageStatus.RECEIPT
        }else if(status === PackageStatus.PAYMENT) {
            updatedStatus = PackageStatus.PAYMENT
        }
        try {
            return await ctx?.prisma?.package.update({
                where: {
                    id
                },
                data: {
                    status: updatedStatus

                }
                
            })
        } catch(err){
            console.log(err)
        }
    }),

    updateStorageData: publicProcedure
    .input (z.object({
        id: z.string(),
        weight: z.string(),
       


    }))
    .mutation(async({ctx, input }) => {
        try {
            return await ctx?.prisma?.package.update({
                where: {
                    id: input.id
                },
                data: {
                    weight: input.weight
                }
            })

        }catch(err) {
            console.log(err)
        }
    }),

    updatePaymentData: publicProcedure
    .input(z.object({
        id: z.string(),
        
        billing: z.string(),
     
    }))
    .mutation(async({ctx, input}) => {
        try {
           return await ctx?.prisma?.package?.update({
             where : {
                id: input.id
             },
             data: {
                billing: input.billing,
                 
             }
           })

        } catch(err) {
            console.log(err)
        }
    }),
    updateData: publicProcedure
    .input(z.object({
        id: z.string(),
        weight: z.string(),
        billing: z.string(),
        recipient: z.string(),
        country: z.string(),
        type: z.string(),
        tracking: z.string(),
     
    }))
    .mutation(async({ctx, input}) => {
        try {
           return await ctx?.prisma?.package?.update({
             where : {
                id: input.id
             },
             data: {
                weight: input.weight,
                billing: input.billing,
                recipient: input.recipient,
                country: input.country,
                type: input.type,
                tracking: input.tracking,
             }
           })

        } catch(err) {
            console.log(err)
        }
    })

})



