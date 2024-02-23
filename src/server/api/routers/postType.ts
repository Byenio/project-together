import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const postTypeRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(3, { message: "Post type name is too short" }),
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

      return ctx.db.postType.create({
        data: {
          name: input.name,
        },
      });
    }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.postType.findMany();
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

      return ctx.db.postType.delete({
        where: { id: input.id },
      });
    }),
});
