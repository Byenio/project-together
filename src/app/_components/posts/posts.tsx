import type { inferRouterOutputs } from "@trpc/server";
import Link from "next/link";
import type { AppRouter } from "~/server/api/root";
import { api } from "~/trpc/server";
import { PostsContainer } from "../posts-container";

type RouterOutput = inferRouterOutputs<AppRouter>;
type PostsGetOutput = RouterOutput["post"]["getAll"];

export function Posts({ posts }: { posts: PostsGetOutput }) {
  return (
    <div className="w-100 m-auto my-3 flex max-w-[1100px] flex-wrap gap-4">
      {posts.length != 0 ? <PostsContainer posts={posts} /> : <NoPostsInfo />}
    </div>
  );
}

export async function NoPostsInfo() {
  const { role } = (await api.user.getRole.query()) ?? {
    role: {
      name: "USER",
      level: 0,
    },
  };

  if (!role) return null;

  const canPost = role.level >= 3;

  return (
    <p className="card bg-error text-error-content m-auto my-2 min-w-[300px] p-2 text-center text-lg font-medium">
      Brak postów do wyświetlenia.
      {canPost && (
        <div className="w-full">
          <Link href={"/create-post"} className="w-50 btn my-4 rounded-xl">
            Utwórz nowy post
          </Link>
        </div>
      )}
    </p>
  );
}
