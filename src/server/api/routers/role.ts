import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const roleRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ name: z.string().toUpperCase(), level: z.number() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.role.create({
        data: {
          name: input.name,
          level: input.level,
        },
      });
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.role.findMany({
      orderBy: [{ level: "desc" }],
    });
  }),
});
