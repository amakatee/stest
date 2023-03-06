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
        const {id } = input


        try {
            return await ctx?.prisma?.package.update({
                where: {
                    id
                },
                data: {
                  status: input.status

                }
                
            })
        } catch(err){
            console.log(err)
        }
    })

})