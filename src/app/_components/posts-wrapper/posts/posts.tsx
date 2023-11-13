import { api } from "~/trpc/server";
import { PostCard } from "./postCard";
import { GetPosts } from "../posts-wrapper";

async function getPosts(type: string) {

  if (type == "all") return await api.post.getAll.query();
  if (type == "user") return await api.post.getByUser.query();

}

export async function Posts({ type }: { type: GetPosts }) {

  const posts = await getPosts(type.type);

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
              postSubject: post.subject.name,
              description: post.description,
              user: post.createdBy.name ?? "",
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