import { Posts } from "~/app/_components/posts/posts";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

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

  if (searchParams.subject) {
    posts = posts.filter(
      (post) => searchParams?.subject?.includes(post.subjectId),
    );
  }

  if (searchParams.type) {
    posts = posts.filter(
      (post) => searchParams?.type?.includes(post.postTypeId),
    );
  }

  if (searchParams.user) {
    posts = posts.filter(
      (post) => searchParams?.user?.includes(post.createdById),
    );
  }

  return (
    <>
      <Posts posts={posts} />
    </>
  );
}
