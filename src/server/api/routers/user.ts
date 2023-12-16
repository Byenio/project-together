import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  setDefaultRole: protectedProcedure.query(async ({ ctx }) => {
    const defaultRole = await ctx.db.role.findFirst({
      where: { level: 0 },
    });
    return ctx.db.user.update({
      where: { id: ctx.session.user.id },
      data: {
        roleId: defaultRole?.id,
      },
    });
  }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.user.findMany();
  }),
  getRole: protectedProcedure.query(({ ctx }) => {
    return ctx.db.user.findUnique({
      where: { id: ctx.session.user.id },
      select: { role: true },
    });
  }),
  updateRole: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        roleId: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.user.update({
        where: { id: input.userId },
        data: { roleId: input.roleId },
      });
    }),
});
