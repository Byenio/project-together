import { z } from 'zod';

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const adminRouter = createTRPCRouter({
  isAdmin: protectedProcedure
    .query(({ ctx }) => {
      return ctx.db.admin.findFirst({
        where: { userId: ctx.session.user.id }
      });
    })
})