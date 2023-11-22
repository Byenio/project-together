import { contextProps } from "@trpc/react-query/shared";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { api } from "~/trpc/server";

export const upvoteRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({
      postId: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.upvote.create({
        data: {
          user: { connect: { id: ctx.session.user.id } },
          post: { connect: { id: input.postId } }
        }
      });
    }),

  find: publicProcedure
    .input(z.object({
      postId: z.string()
    }))
    .query(({ ctx, input }) => {
      return ctx.db.upvote.findFirst({
        where: {
          AND: [
            { user: { id: ctx.session?.user.id } },
            { post: { id: input.postId } }
          ]
        }
      })
    }),

  upvotesByPostId: publicProcedure
    .input(z.object({
      postId: z.string()
    }))
    .query(({ ctx, input }) => {
      return ctx.db.upvote.count({
        where: {
          post: { id: input.postId }
        }
      })
    }),

  handleVote: protectedProcedure
    .input(
      z.object({
        postId: z.string()
      })
    )
    .mutation(async ({ ctx, input }) => {

      const upvote = await ctx.db.upvote.findFirst({
        where: {
          AND: [
            { user: { id: ctx.session?.user.id } },
            { post: { id: input.postId } }
          ]
        }
      })

      if (!upvote) return ctx.db.upvote.create({
        data: {
          user: { connect: { id: ctx.session.user.id } },
          post: { connect: { id: input.postId } }
        }
      })

      return ctx.db.upvote.delete({
        where: {
          id: upvote.id
        }
      })

    })
})