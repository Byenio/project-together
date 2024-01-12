import { getServerAuthSession } from "~/server/auth";

import { PostCreatedBy } from "./components/PostCreatedBy";
import { PostDescription } from "./components/PostDescription";
import { PostDetailsButton } from "./components/PostDetailsButton";
import { PostSubject } from "./components/PostSubject";
import { PostTitle } from "./components/PostTitle";
import { PostType } from "./components/PostType";
import DeletePostButton from "./components/deletePostButton";

import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "~/server/api/root";
import { api } from "~/trpc/server";
import UpvoteButton from "./components/upvote";

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
        className="card m-auto my-2 w-[500px] min-w-[350px] bg-neutral text-neutral-content"
      >
        <div className="card-body">
          <div className="flex justify-between">
            <PostTitle postTitle={post.title} />
            <PostCreatedBy
              user={{
                user: post.createdBy.name!,
                userId: post.createdBy.id,
                userImage: post.createdBy.image!,
                fullname: post.createdBy.fullname!,
              }}
            />
          </div>
          <div className="flex justify-between">
            <PostType
              type={{
                postType: post.postType.name,
                postTypeId: post.postType.id,
              }}
            />
            <PostSubject
              subject={{
                postSubject: post.subject.name,
                postSubjectId: post.subject.id,
              }}
            />
          </div>
          <PostDescription postDescription={post.description} />
          <div className="flex justify-end gap-4">
            {isAuthor && <DeletePostButton postId={post.id} />}
            <UpvoteButton postId={post.id} upvoted={upvoted} />
            <PostDetailsButton postId={post.id} />
          </div>
        </div>
      </div>
    );
  });
}
