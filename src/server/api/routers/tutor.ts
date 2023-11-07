import { z } from 'zod';

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const tutorRouter = createTRPCRouter({
  isTutor: protectedProcedure
    .query(({ ctx }) => {
      return ctx.db.tutor.findFirst({
        where: { userId: ctx.session.user.id }
      });
    })
})