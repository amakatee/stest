import { User } from '@prisma/client';
import { prisma } from './../../db';
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const usersRouter = createTRPCRouter({
  newUser: publicProcedure
    .input(z.object({ 
         token: z.string(), 
         name: z.string(),
         
         }))
    .mutation(
        async({ctx, input}) => {
        try {
            console.log(input.name, input.token)
            return await ctx.prisma.user.create({
                data: {
                    name: input.name,
                    token: input.token,
                    
                }
            })

        } catch(err) {
            console.log(err)
        }
    }),

    allUsers: publicProcedure.query(async( { ctx }) => {
        try {
            const users = ctx?.prisma?.user?.findMany({
                include: {
                    package: true,
                    address:true,
                    packingorder: true
                }
            })
            console.log(users)
            return users
        } catch(err) {

        }
    }),

    

    deleteUser: publicProcedure
    .input(z.object({
        id: z.string()
    }))
    .mutation(async({ctx, input}) => {
        try  {
            return await ctx?.prisma?.user.delete({
                where: {
                    id: input.id
                }
            })

        } catch(err) {
            console.log(err)

        }
        
    })


});


// .mutation(
//     async({ctx, input}) => {
//     try {
//         console.log(input.name, input.token)
//         return await ctx.prisma.user.create({
//             data: {
//                 name: input.name,
//                 token: input.token,
                
//             }
//         })

//     } catch(err) {
//         console.log(err)
//     }
// }),

// allUsers: publicProcedure.query(async( { ctx }) => {
//     try {
//         const users = ctx?.prisma?.user?.findMany()
//         console.log(users)
//         return users
//     } catch(err) {

//     }
// })