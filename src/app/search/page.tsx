import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import PostsWrapper from "./posts-wrapper";

async function getPosts() {
  return await api.post.getAll.query();
}

export default async function Home({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  let posts = await getPosts();

  posts = posts.filter((post) => {
    if (
      searchParams.subject &&
      !searchParams.subject.includes(post.subjectId)
    ) {
      return false;
    }
    if (searchParams.type && !searchParams.type.includes(post.postTypeId)) {
      return false;
    }
    if (searchParams.user && !searchParams.user.includes(post.createdById)) {
      return false;
    }
    return true;
  });

  return (
    <>
      <PostsWrapper posts={posts} />
    </>
  );
}
