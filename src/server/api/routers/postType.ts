import { z } from 'zod';

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const postTypeRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({
      name: z.string().min(3, { message: "Post type name is too short" })
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.postType.create({
        data: {
          name: input.name
        }
      })
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.postType.findMany();
  })
})