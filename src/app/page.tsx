import { PostsWrapper } from "~/app/_components/posts-wrapper/posts-wrapper";
import { getServerAuthSession } from "~/server/auth";

export default async function Home() {

  const session = await getServerAuthSession();
  if (!session?.user) return null;

  return (
    <>
      <PostsWrapper type="all" />
    </>
  );
}
