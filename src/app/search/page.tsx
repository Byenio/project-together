import { inferRouterOutputs } from "@trpc/server";
import { AppRouter } from "~/server/api/root";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import {
  canUserAdmin,
  canUserManage,
  canUserPost,
} from "../(utils)/util-server-functions";
import PostsContainer from "./new_posts-container";

type RouterOutput = inferRouterOutputs<AppRouter>;
export type PostsGetAll = RouterOutput["post"]["getAll"];
export type SubjectsGetAll = RouterOutput["subject"]["getAll"];
export type PostTypesGetAll = RouterOutput["postType"]["getAll"];

export type User = {
  id: string | undefined;
  isAdmin: boolean;
  isModerator: boolean;
  canPost: boolean;
};

export default async function Search({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const session = await getServerAuthSession();
  const posts = await api.post.getAll.query();
  const subjects = await api.subject.getAll.query();
  const postTypes = await api.postType.getAll.query();

  const user: User = {
    id: session?.user.id,
    isAdmin: await canUserAdmin(),
    isModerator: await canUserManage(),
    canPost: await canUserPost(),
  };

  return (
    <PostsContainer
      posts={posts}
      user={user}
      subjects={subjects}
      postTypes={postTypes}
      searchParams={searchParams}
    />
  );
}
