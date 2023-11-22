import { PostCard } from "./postCard";
import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "~/server/api/root";

type RouterOutput = inferRouterOutputs<AppRouter>;
type PostsGetOutput = RouterOutput['post']['getAll'];

export async function Posts({ posts }: { posts: PostsGetOutput }) {

  return (
    <div className="w-100 max-w-[1200px] m-auto my-3 flex flex-wrap">
      {posts ? (
        posts?.map((post) => (
          <PostCard
            key={post.id}
            postData={{
              id: post.id,
              title: post.title,
              postType: post.postType.name,
              postTypeId: post.postType.id,
              postSubject: post.subject.name,
              postSubjectId: post.subject.id,
              description: post.description,
              user: post.createdBy.name ?? "",
              userId: post.createdBy.id,
              userImage: post.createdBy.image ?? ""
            }} />
        ))
      ) : <NoPostsInfo />
      }
    </div>
  );

}

export function NoPostsInfo() {
  return (
    <p className="card min-w-[300px] p-2 m-auto my-2 bg-error text-error-content text-center">
      No posts to show right now.
    </p>
  )
}