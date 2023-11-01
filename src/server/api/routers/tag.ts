import { z } from 'zod';

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const tagRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({
      name: z.string().min(2, { message: "Tag name is too short" })
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.tag.create({
        data: {
          name: input.name
        }
      })
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.tag.findMany();
  })
})