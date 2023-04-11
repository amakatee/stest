import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const ordersRouter = createTRPCRouter({
  createPacking: publicProcedure
    .input(z.object({
        ownerId: z.string(),
        packageids: z.string().array(),
        orderno: z.string(),
        weightsum: z.number(),
        recipient: z.string(),
        country: z.string(),
        type: z.string(),
        usermessage: z.string() ,
        billing: z.number()
        
     
        
        
     }))
    .mutation( async ({ ctx, input }) => {
        try {
            return await ctx.prisma.packingOrder.create({
                data: {
                    packageids: input.packageids,
                    owner: { connect: {id: input.ownerId}},
                    orderno: input.orderno,
                    weightsum: input.weightsum,
                    recipient: input.recipient,
                    country: input.country,
                    type: input.type,
                    usermessage:input.usermessage ,
                    billing: input.billing
                   
                   

                }
            })

        } catch(err) {
            console.log(err)
        }
     }),
  getAllPackingOrders: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.packingOrder.findMany();
  }),

  getPackageById: publicProcedure
  .input(
    z.object({
       id: z.string()
    })
  )

  .query(async( { ctx, input }) => {

    try{
      return await ctx.prisma.packingOrder.findFirst({
        where: {
          id: input.id
        }
      })

    }catch(e) {
      console.log(e)
    }
}),
});
