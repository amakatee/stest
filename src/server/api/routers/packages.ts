import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";
import {PackageStatus} from "@prisma/client";


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
    //   for (const [key, value] of Object.entries(PackageStatus)) {
    //       console.log(`keyyyy ${key} ${value} valuee`)
    
          
    //   }
    let updatedStatus
   
        if (status === PackageStatus.STORAGE) {
            updatedStatus = PackageStatus.STORAGE
        } else if(status === PackageStatus.AWAITS) {
            updatedStatus = PackageStatus.AWAITS
        }else if(status === PackageStatus.DOMESTIC) {
            updatedStatus = PackageStatus.DOMESTIC
        }else if(status === PackageStatus.RECEIPT) {
            updatedStatus = PackageStatus.RECEIPT
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
    })

})