import { getServerAuthSession } from "~/server/auth";

import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "~/server/api/root";
import { api } from "~/trpc/server";

type RouterOutput = inferRouterOutputs<AppRouter>;
type PostsGetOutput = RouterOutput["post"]["getAll"];

export async function PostCard({ posts }: { posts: PostsGetOutput }) {
  const session = await getServerAuthSession();
  const userUpvotes = await api.upvote.upvotesByUserId.query();

  return posts.map((post) => {
    const isAuthor = post.createdBy.id === session?.user.id;

    const upvoted = userUpvotes.some((element) => {
      if (element.postId === post.id) return true;
    });

    return (
      <div
        key={post.id}
        className="card bg-neutral text-neutral-content m-auto my-2 w-[500px] min-w-[350px]"
      >
        <div className="card-body">
          <div className="flex justify-between"></div>
          <div className="flex justify-between"></div>
          <div className="flex justify-end gap-4">
            {/* <UpvoteButton postId={post.id} upvoted={upvoted} /> */}
          </div>
        </div>
      </div>
    );
  });
}
