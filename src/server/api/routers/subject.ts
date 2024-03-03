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

      const canCreate = role.level >= 6;

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
  getPostsAmount: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.post.count({ where: { subjectId: input.id } });
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { role } = (await ctx.db.user.findUnique({
        where: { id: ctx.session.user.id },
        select: { role: true },
      })) ?? { role: { level: 0 } };

      if (!role) return;

      const canDelete = role.level >= 6;

      if (!canDelete) return;

      return ctx.db.subject.delete({
        where: { id: input.id },
      });
    }),
});
