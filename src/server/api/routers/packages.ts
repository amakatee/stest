import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";


export const packagesRouter = createTRPCRouter({
    newPackage: publicProcedure
    .input(z.object({
        localtracker: z.string(),
        description: z.string(),
   

    }))
    .mutation( async({ctx, input}) => {
        try {
           
            return await ctx.prisma.package.create({
                data: {
                    localtracker: input.localtracker,
                    description: input.description,
          
                    
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

        }
    })

})