import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { PostCard } from "./postCard";

export async function Posts() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const allPosts = await api.post.getAll.query();

  return (
    <div className="w-100 max-w-[1200px] m-auto my-3 flex flex-wrap">
      {allPosts ? (
        allPosts.map((post) => (
          <PostCard postData={{
            id: post.id,
            title: post.title,
            description: post.description,
            createdBy: post.createdBy.name || ""
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