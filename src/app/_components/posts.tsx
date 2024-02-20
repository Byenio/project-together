import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "~/server/api/root";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import PostsContainer from "./posts-container";

type RouterOutput = inferRouterOutputs<AppRouter>;
export type PostsGetOutput = RouterOutput["post"]["getAll"];

export async function Posts({ posts }: { posts: PostsGetOutput }) {
  const session = await getServerAuthSession();
  const { role } = (await api.user.getRole.query()) ?? {
    role: {
      name: "USER",
      level: 0,
    },
  };

  const userId = session?.user.id;
  const isModerator = role && role.level >= 6;
  const canPost = role && role.level >= 3;

  return (
    <div className="w-100 m-auto my-3 flex max-w-[1100px] flex-wrap gap-4">
      <PostsContainer
        posts={posts}
        userId={userId}
        isModerator={isModerator}
        canPost={canPost}
      />
    </div>
  );
}
