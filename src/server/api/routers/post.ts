import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({
      title: z.string().min(3),
      description: z.string().min(10),
      postType: z.string(),
      subject: z.string()
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.post.create({
        data: {
          title: input.title,
          description: input.description,
          postType: { connect: { id: input.postType } },
          subject: { connect: { id: input.subject } },
          createdBy: { connect: { id: ctx.session.user.id } },
        }
      });
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.post.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        postType: true,
        subject: true,
        createdBy: true,
        Upvote: true
      }
    });
  })
});
