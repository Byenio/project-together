import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const subjectRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(3, { message: "Subject name is too short" }),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { role } = (await ctx.db.user.findUnique({
        where: { id: ctx.session.user.id },
        select: { role: true },
      })) ?? { role: { level: 0 } };

      if (!role) return;

      const canCreate = role.level >= 0;

      if (!canCreate) return;

      return ctx.db.subject.create({
        data: {
          name: input.name,
        },
      });
    }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.subject.findMany();
  }),
});
