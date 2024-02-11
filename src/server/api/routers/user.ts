import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.user.findMany({
      include: {
        role: true,
      },
    });
  }),
  get: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.user.findUnique({
      where: { id: ctx.session.user.id },
      select: {
        fullname: true,
        role: true,
      },
    });
  }),
  updateFullname: protectedProcedure
    .input(
      z.object({
        fullname: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.user.update({
        where: { id: ctx.session.user.id },
        data: {
          fullname: input.fullname,
        },
      });
    }),
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
  getRole: protectedProcedure.query(async ({ ctx }) => {
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
    .mutation(async ({ ctx, input }) => {
      return ctx.db.user.update({
        where: { id: input.userId },
        data: { roleId: input.roleId },
      });
    }),
});
