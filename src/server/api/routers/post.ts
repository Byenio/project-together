import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(3),
        description: z.string().min(10),
        postType: z.string(),
        subject: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { role } = (await ctx.db.user.findUnique({
        where: { id: ctx.session.user.id },
        select: { role: true },
      })) ?? { role: { level: 0 } };

      if (!role) return;

      const canCreate = role.level >= 3;

      if (!canCreate) return;

      return ctx.db.post.create({
        data: {
          title: input.title,
          description: input.description,
          postType: { connect: { id: input.postType } },
          subject: { connect: { id: input.subject } },
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.post.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        postType: true,
        subject: true,
        createdBy: true,
        Upvote: true,
      },
    });
  }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.post.findUnique({
        where: { id: input.id },
        include: {
          postType: true,
          subject: true,
          createdBy: true,
          Upvote: true,
        },
      });
    }),

  getBySubject: publicProcedure
    .input(z.object({ subjectId: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.post.findMany({
        where: { subjectId: input.subjectId },
        include: {
          postType: true,
          subject: true,
          createdBy: true,
          Upvote: true,
        },
      });
    }),

  getByType: publicProcedure
    .input(z.object({ typeId: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.post.findMany({
        where: { postTypeId: input.typeId },
        include: {
          postType: true,
          subject: true,
          createdBy: true,
          Upvote: true,
        },
      });
    }),

  getByUser: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.post.findMany({
      where: { createdBy: { id: ctx.session.user.id } },
      include: {
        postType: true,
        subject: true,
        createdBy: true,
        Upvote: true,
      },
    });
  }),

  getLatest: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.post.findFirst({
      orderBy: { createdAt: "desc" },
    });
  }),

  deleteById: protectedProcedure
    .input(
      z.object({
        postId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const post = await ctx.db.post.findUnique({
        where: {
          id: input.postId,
        },
        include: {
          createdBy: true,
        },
      });
      const { role } = (await ctx.db.user.findUnique({
        where: { id: ctx.session.user.id },
        select: { role: true },
      })) ?? { role: { level: 0 } };

      if (!role) return;

      const canDelete =
        role.level >= 6 || post?.createdBy.id === ctx.session.user.id;

      if (!canDelete) return;

      return ctx.db.post.delete({
        where: { id: input.postId },
      });
    }),
});
