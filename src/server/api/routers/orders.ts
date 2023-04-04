import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const ordersRouter = createTRPCRouter({
  createPacking: publicProcedure
    .input(z.object({
        ownerId: z.string(),
        packageids: z.string().array(),
        
     
        
        
     }))
    .mutation( async ({ ctx, input }) => {
        try {
            return await ctx.prisma.packingOrder.create({
                data: {
                    packageids: input.packageids,
                    owner: { connect: {id: input.ownerId}}
                   
                   

                }
            })

        } catch(err) {
            console.log(err)
        }
     }),
  getAllPackingOrders: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.packingOrder.findMany();
  }),
});
