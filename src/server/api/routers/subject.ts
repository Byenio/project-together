import { z } from 'zod';

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const subjectRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({
      name: z.string().min(3, { message: "Subject name is too short" }),
      level: z.number().min(1, { message: "Subject level is invalid" }).max(5, { message: "Subject level is invalid" }),
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.subject.create({
        data: {
          name: input.name,
          level: input.level
        }
      })
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.subject.findMany();
  })
})