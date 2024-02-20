import { api } from "~/trpc/server";
import { Posts } from "../_components/posts";

async function getPosts() {
  return await api.post.getByUser.query();
}

export default async function Profile() {
  const posts = await getPosts();

  return (
    <>
      <Posts posts={posts} />
    </>
  );
}
