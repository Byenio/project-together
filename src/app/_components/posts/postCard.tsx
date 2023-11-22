import { getServerAuthSession } from "~/server/auth";

import DeletePostButton from "./components/deletePostButton";
import { PostTitle } from "./components/PostTitle";
import { PostType } from "./components/PostType";
import { PostSubject } from "./components/PostSubject";
import { PostDescription } from "./components/PostDescription";
import { PostCreatedBy } from "./components/PostCreatedBy";
import { PostDetailsButton } from "./components/PostDetailsButton";

import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "~/server/api/root";
import { api } from "~/trpc/server";
import UpvoteButton from "./components/upvote";

type RouterOutput = inferRouterOutputs<AppRouter>;
type PostsGetOutput = RouterOutput['post']['getAll'];

export async function PostCard(
  { posts }: {
    posts:
    PostsGetOutput
  }
) {

  const session = await getServerAuthSession();

  return (
    posts.map(post => {

      const isAuthor = post.createdBy.id === session?.user.id;
      const isAdmin = () => {
        if (session?.user.id) return api.admin.isAdmin.query();
        return false;
      }

      return (
        <div key={post.id} className="card min-w-[350px] w-[500px] m-auto my-2 bg-neutral text-primary-content">
          <div className="card-body">
            <div className="flex justify-between">
              <PostTitle postTitle={post.title} />
              <PostCreatedBy user={{
                user: post.createdBy.name as string,
                userId: post.createdBy.id,
                userImage: post.createdBy.image as string
              }} />
            </div>
            <div className="flex justify-between">
              <PostType type={{
                postType: post.postType.name,
                postTypeId: post.postType.id
              }} />
              <PostSubject subject={{
                postSubject: post.subject.name,
                postSubjectId: post.subject.id
              }} />
            </div>
            <PostDescription postDescription={post.description} />
            <div className="flex justify-end gap-4">
              {(isAuthor || isAdmin()) &&
                <DeletePostButton postId={post.id} />
              }
              <PostDetailsButton postId={post.id} />
            </div>
          </div>
        </div>
      )
    })
  )

}