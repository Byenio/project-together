import { Posts } from "~/app/_components/posts/posts";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

async function getPosts() {

  return await api.post.getAll.query();

}

export default async function Home() {

  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const posts = await getPosts();

  return (
    <>
      <Posts posts={posts} />
    </>
  );
}
