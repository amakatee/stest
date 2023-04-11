import { Input } from "postcss";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";


export const addressesRouter = createTRPCRouter({
  createAddress: publicProcedure
    .input(
      z.object({
        firstName: z.string(),
        secondName: z.string(),
        phone: z.string(),
        zipcode: z.string(),
        country: z.string(),
        fulladdsress: z.string(),
        ownerId: z.string()


      })
    )
    .mutation( async ({ ctx, input }) => {
      try {
          return await ctx.prisma.address.create({
              data: {
                firstName: input.firstName,
                secondName:input.secondName,
                phone: input.phone,
                zipcode: input.zipcode,
                country: input.country,
                fulladdsress: input.fulladdsress,
                owner: { connect: {id: input.ownerId}}
              }
          })

      } catch(err) {
          console.log(err)
      }
   }),
   
  getAllAddresses: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.address.findMany();
  }),

 
});
