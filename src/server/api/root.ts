import { postRouter } from "~/server/api/routers/post";
import { postTypeRouter } from "~/server/api/routers/postType";
import { subjectRouter } from "~/server/api/routers/subject";
import { createTRPCRouter } from "~/server/api/trpc";
import { roleRouter } from "./routers/role";
import { upvoteRouter } from "./routers/upvote";
import { userRouter } from "./routers/user";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  postType: postTypeRouter,
  subject: subjectRouter,
  upvote: upvoteRouter,
  role: roleRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
