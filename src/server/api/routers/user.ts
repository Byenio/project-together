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
      orderBy: [
        {
          role: {
            level: "desc",
          },
        },
        {
          fullname: "asc",
        },
      ],
    });
  }),
  getPostsAmount: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.post.count({ where: { createdById: input.id } });
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
  getFullNameById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.user.findUnique({
        where: { id: input.id },
        select: {
          fullname: true,
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
      const caller = await ctx.db.user.findUnique({
        where: { id: ctx.session.user.id },
        select: { role: true },
      });

      if (!(caller?.role?.level && caller.role.level >= 6)) return false;

      return ctx.db.user.update({
        where: { id: input.userId },
        data: { roleId: input.roleId },
      });
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { role } = (await ctx.db.user.findUnique({
        where: { id: ctx.session.user.id },
        select: { role: true },
      })) ?? { role: { level: 0 } };

      if (!role) return;

      const canDelete = role.level >= 9;

      if (!canDelete) return;

      return ctx.db.user.delete({
        where: { id: input.id },
      });
    }),
});
