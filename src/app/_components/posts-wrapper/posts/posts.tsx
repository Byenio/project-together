import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { PostCard } from "./postCard";

async function getPosts(type: { type: string; }) {
  let posts: ({ postType: { id: string; name: string; createdAt: Date; updatedAt: Date; }; subject: { id: string; name: string; createdAt: Date; updatedAt: Date; }; Upvote: { id: string; userId: string; postId: string; createdAt: Date; }[]; } & { id: string; title: string; description: string; createdById: string; postTypeId: string; subjectId: string; createdAt: Date; updatedAt: Date; })[] = []

  if (type.type == "all") posts = await api.post.getAll.query();
  if (type.type == "user") posts = await api.post.getByUser.query();

  return posts;
}

export async function Posts(type: any) {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const posts = getPosts(type);
  console.log(posts);

  const allPosts = await api.post.getAll.query();

  return (
    <div className="w-100 max-w-[1200px] m-auto my-3 flex flex-wrap">
      {allPosts ? (
        allPosts.map((post) => (
          <PostCard postData={{
            id: post.id,
            title: post.title,
            postType: post.postType.name,
            postSubject: post.subject.name,
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