import { Posts } from "./posts/posts";

type GetPostsByUser = {
  type: "user"
}

type GetPostsAll = {
  type: "all"
}

export type GetPosts = GetPostsAll | GetPostsByUser;

export function PostsWrapper(type: GetPosts) {

  return (
    <>
      <Posts type={type} />
    </>
  );
}