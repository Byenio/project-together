import { api } from "~/trpc/server";
import PostsWrapper from "../search/posts-wrapper";

async function getPosts() {
  return await api.post.getByUser.query();
}

export default async function Profile() {
  const posts = await getPosts();

  return (
    <>
      <PostsWrapper posts={posts} />
    </>
  );
}
