import { PostCard } from "./postCard";
import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "~/server/api/root";

type RouterOutput = inferRouterOutputs<AppRouter>;
type PostsGetOutput = RouterOutput["post"]["getAll"];

export async function Posts({ posts }: { posts: PostsGetOutput }) {
  return (
    <div className="w-100 m-auto my-3 flex max-w-[1200px] flex-wrap">
      {posts ? <PostCard posts={posts} /> : <NoPostsInfo />}
    </div>
  );
}

export function NoPostsInfo() {
  return (
    <p className="card m-auto my-2 min-w-[300px] bg-error p-2 text-center text-error-content">
      No posts to show right now.
    </p>
  );
}
