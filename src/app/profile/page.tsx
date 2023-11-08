import { api } from "~/trpc/server"
import { PostsWrapper } from "../_components/posts-wrapper/posts-wrapper";

export default async function Profile() {

  const userPosts = await api.post.getByUser.query();

  console.log(userPosts)

  return (
    <>
      <PostsWrapper type="user" />
    </>
  )
}