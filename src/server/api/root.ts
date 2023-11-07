import { postRouter } from "~/server/api/routers/post";
import { postTypeRouter } from "~/server/api/routers/postType";
import { subjectRouter } from "~/server/api/routers/subject";
import { createTRPCRouter } from "~/server/api/trpc";
import { adminRouter } from "./routers/admin";
import { tutorRouter } from "./routers/tutor";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  postType: postTypeRouter,
  subject: subjectRouter,
  admin: adminRouter,
  tutor: tutorRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
